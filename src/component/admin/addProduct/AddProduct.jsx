import React, {Component} from 'react';
import './style/AddProduct.css';
import {Button, Col, Form, FormGroup, FormText, Input, InputGroup, InputGroupAddon, Label} from "reactstrap";
import ShowSelectedImages from "./ShowSelectedImages";
import {uploadProduct} from "../../../api/UploadApi";
import {ProductNullException, ProductUploadFailure} from "../../../exception/Exceptions";
import {connect} from "react-redux";
import {ADMIN, SUPER_ADMIN} from "../../../constant/RoleConstant";
import {productType} from "../../../constant/ProductTypeConstant";
import {productSizeArr} from "../../../constant/ProductSizeConstant";
import {findOneByPrductIdAndProductCode} from "../../../api/ProductApi";
import {Checkbox, Spin, message} from "antd";

const CheckboxGroup = Checkbox.Group;

class AddProduct extends Component {
    constructor(props){
        super(props);

        this.state={
            id:'',
            images:[],
            name:'',
            type:'',
            size:[],
            price:'',
            sale:false,
            selectedImage:'',
            productInfos : [],
            newImages:[], // it will contain multipart file of newly added images in edit product process.
            deletedImagesId:[], // it will contain only ids of deleted images.
            loading:false,
            serverResponse:{}, // The response retrieved from backend server while selecting an item
        };

        this.handleSelectForHighlight=this.handleSelectForHighlight.bind(this);
    }

    success = (msg) => {
        message.success(msg);
    };

    error = (msg) => {
        message.error(msg);
    };

    componentWillMount(){
        if(this.props.userSession.token === '' || !this.props.userSession.roles.includes(ADMIN, SUPER_ADMIN)){
            this.props.history.push({
                pathname:"/login"
            });
        }
        else{
            if((this.props.productId !== undefined && this.props.productId.trim().length > 0)
                && (this.props.productCode !== undefined && this.props.productCode.trim().length > 0))
                this.loadExistingProductForEdit(this.props.productId, this.props.productCode);
        }
    }

    componentWillUpdate(nextProps, nextState){
        if(nextProps.productId !== this.props.productId && nextProps.productCode !== this.props.productCode){
            if(nextProps.productId !== undefined && nextProps.productCode !== undefined )
                this.loadExistingProductForEdit(nextProps.productId, nextProps.productCode);
        }
    }

    /*componentDidUpdate(prevProps, prevState){
        if(prevProps.productId !== this.props.productId && prevProps.productCode !== this.props.productCode){
            if((this.props.productId !== undefined || this.props.productId.trim() !== "")
                && (this.props.productCode !== undefined || this.props.productCode.trim()!== ""))
                this.loadExistingProductForEdit(this.props.productId, this.props.productCode);
        }
    }*/

    loadExistingProductForEdit = (productId, productCode) => {
        if(productId !== "" && productCode !== "") {
            findOneByPrductIdAndProductCode(productId, productCode)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        throw new ProductNullException();
                    }
                })
                .then(result => {
                    this.setState({
                        serverResponse:result,
                        name: result.name,
                        images: result.productInfos,
                        // productInfos : result.productInfos,
                        type: result.type,
                        price: result.price,
                        size: result.size.map(si => si.size),
                        sale: result.sale,
                        selectedImage: result.productInfos.filter(img => img.highlight === true)[0].name,
                        comments: result.comments,
                    });
                })
                .catch(ex => {
                    if (ex instanceof ProductNullException) {
                        this.error('Sorry. Cannot find product.');
                        // alert("No such product");
                    }
                })
        }
    };

    createListForType = () =>{
        return productType.map((type)=>
            <option key={type.key} value={type.value}>{type.key}</option>
        );
    };

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleChangeSize = size => {
        this.setState({size});
    };

    handleChangeOnSale = () => {
        this.setState({sale:!this.state.sale})
    };


    handleFileChange(e){
        let images=[];
        for(let i=0; i< e.target.files.length; i++){
            images.push(e.target.files[i]);
            this.setState(prevState => ({
                images : [...prevState.images, images[i]]
            }));
        }
    }

    handleSelectForHighlight(name){
        this.setState({
            selectedImage:name
        });
    }

    handleDeleteImage = (id) =>{
        this.setState(prevState => ({
            deletedImagesId : [...prevState.deletedImagesId, id]
        }));
    };

    handleSubmit(e){
        e.preventDefault();
        let state=this.state;

        if(state.images.length > 0 && state.name.trim().length > 0 && state.price.trim().length > 0) {
            this.setState({loading:true});
            uploadProduct(state.images, state.name, state.type, state.size, state.price, state.sale, state.selectedImage)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        throw new ProductUploadFailure();
                    }
                })
                .then(result => {
                    this.setState({
                        serverResponse:{},
                        name: '',
                        images: [],
                        type: '',
                        size: [],
                        price: '',
                        sale: '',
                        productInfos : [],
                        selectedImage: '',
                        loading: false
                    });
                    this.success('Saved product successfully.');
                })
                .catch((ex) => {
                    if (ex instanceof ProductUploadFailure) {
                        this.setState({
                            loading: false
                        });
                        this.error('Error while saving product.');
                    }
                });
            e.target.reset();
        }
        else{
            this.setState({loading:false});
            this.error('Name, Images and Price cannot be null.');
        }
    }

    render() {
        return (
            <Spin size="large" spinning={this.state.loading}>
                <div className="add-product-parent-div">
                    <div className="add-product">
                        <Form encType="multipart/form-data" onSubmit={e=>this.handleSubmit(e)}>
                            <FormGroup row>
                                <Label for="name" sm={2}>Name</Label>
                                <Col sm={10}>
                                    <Input type="text"
                                           name="name"
                                           placeholder="Enter name"
                                           onChange={this.handleChange.bind(this)}
                                           value={this.state.name}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="images" sm={2}>Images</Label>
                                <Col sm={10}>
                                    <Input type="file"
                                           id="images"
                                           multiple
                                           accept="image/jpeg, image/png"
                                           onChange={this.handleFileChange.bind(this)}
                                    />
                                    <FormText color="muted">
                                        You can only upload image with jpeg/png extension.
                                    </FormText>
                                    {this.state.images.length > 0?
                                        <ShowSelectedImages images={this.state.images}
                                                            handleSelectImage={this.handleSelectForHighlight}
                                                            selectedImage={this.state.selectedImage}
                                                            deletedImagesId={this.state.deletedImagesId}
                                                            handleDeleteImage={this.handleDeleteImage}/>:
                                        null}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="type" sm={2}>Type</Label>
                                <Col sm={10}>
                                    <div className="add-product-type-input">
                                        <Input type="select"
                                               name="type"
                                               id="selectType"
                                               onChange={this.handleChange.bind(this)}
                                               value={this.state.type}
                                        >
                                            {this.state.type === ""?<option value="none">None</option>:null}
                                            {this.createListForType()}
                                        </Input>
                                    </div>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="size" sm={2}>Size</Label>
                                <Col sm={10} className="add-product-size-checkbox">
                                    <CheckboxGroup
                                        options={productSizeArr}
                                        value={this.state.size}
                                        onChange={this.handleChangeSize}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="price" sm={2}>Price</Label>
                                <Col sm={10}>
                                    <div className="add-product-price-input">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">NRs</InputGroupAddon>
                                            <Input type="number"
                                                   id="price"
                                                   name="price"
                                                   onChange={this.handleChange.bind(this)}
                                                   value={this.state.price}
                                            />
                                        </InputGroup>
                                    </div>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>On Sale</Label>
                                <Col sm={10} className="add-product-sale-radio">
                                    <Checkbox checked={this.state.sale} onChange={this.handleChangeOnSale}/>
                                    {/*<div>
                                        <input type="radio"
                                               id="yes"
                                               name="sale"
                                               onChange={this.handleChange.bind(this)}
                                               value="true"
                                        />
                                        <label htmlFor="yes" style={{marginLeft:'5px'}}>Yes</label>
                                    </div>
                                    <div>
                                        <input type="radio"
                                               id="no"
                                               name="sale"
                                               onChange={this.handleChange.bind(this)}
                                               value="false"
                                        />
                                        <label htmlFor="no" style={{marginLeft:'5px'}}>No</label>
                                    </div>*/}

                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 2 }}>
                                    <Button type="submit">Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        userSession: state.getUserSession
    }
};

export default connect(mapStateToProps)(AddProduct);