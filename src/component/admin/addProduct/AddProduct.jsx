import React, {Component} from 'react';
import './style/AddProduct.css';
import {Button, Col, Form, FormGroup, FormText, Input, InputGroup, InputGroupAddon, Label} from "reactstrap";
import ShowSelectedImages from "./ShowSelectedImages";
import {uploadProduct} from "../../../api/UploadApi";
import {ProductUploadFailure} from "../../../exception/Exceptions";
import NavigationBar from "../../common/navbar/NavigationBar";
import Footer from "../../common/footer/Footer";

const productType=[
    {
        'key':'Handwarmer',
        'value':'handwarmer'
    },
    {
        'key':'Jacket',
        'value':'jacket'
    },
    {
        'key':'Shock',
        'value':'shock'
    },
    {
        'key':'Sweater',
        'value':'sweater'
    },
    {
        'key':'Trouser',
        'value':'trouser'
    },
];

const productSize=[
    {
        'key':'S',
        'value':'S'
    },
    {
        'key':'L',
        'value':'L'
    },
    {
        'key':'XL',
        'value':'XL'
    },
    {
        'key':'XXL',
        'value':'XXL'
    },
    {
        'key':'XXXL',
        'value':'XXXL'
    },
];

class AddProduct extends Component {
    constructor(props){
        super(props);

        this.state={
            images:[],
            name:'',
            type:'',
            size:[],
            price:'',
            sale:'',
            selectedImage:'',
            error:false,
            successs:false
        };

        this.handleSelectForHighlight=this.handleSelectForHighlight.bind(this);
    }

    createListForType(){
        return productType.map((type)=>
            <option key={type.key} value={type.value}>{type.key}</option>
        );
    }

    createListForSize(){
        return productSize.map((size)=>
            <div key={size.key}>
                <input type="checkbox" id={size.key} name="size" value={size.value} onChange={this.handleChangeSize.bind(this)}/>
                <label style={{paddingLeft:'5px'}} htmlFor={size.key}>{size.value}</label>
            </div>
        )
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleChangeSize(e){
        let sizeArr = [...this.state.size];
        const value = e.target.value;
        const index = sizeArr.findIndex(size => size === value);
        if(index > -1) {
            sizeArr = [...sizeArr.slice(0, index), ...sizeArr.slice(index + 1)];
        } else {
            sizeArr.push(value);
        }
        this.setState({size: sizeArr});
    }

    handleFileChange(e){
        let images=[];
        for(let i=0; i< e.target.files.length; i++){
            images.push(e.target.files[i]);
            this.setState({
                images
            });
        }
        console.log(images.length);
    }

    handleSelectForHighlight(name){
        this.setState({
            selectedImage:name
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let state=this.state;

        uploadProduct(state.images, state.name, state.type, state.size, state.price, state.sale, state.selectedImage)
            .then(response=>{
                if(response.status ===200){
                    return response.json();
                }
                else{
                    throw new ProductUploadFailure();
                }
            })
            .then(result=>{
                this.setState({
                    name:'',
                    images:[],
                    type:'',
                    size:[],
                    price:'',
                    sale:'',
                    selectedImage:'',
                    error:false,
                    success:true
                });
            })
            .catch((ex)=>{
                if(ex instanceof ProductUploadFailure){
                    this.setState({
                        success:false,
                        error:true
                    });
                }
            });
        e.target.reset();
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="add-product-parent-div">
                    <div className="add-product">
                        {
                            this.state.success === true ?
                                (
                                    <div style={{minHeight:'100%',textAlign:'center'}}>
                                        <p style={{color:'green'}}>Saved product successfully.</p>
                                    </div>
                                ):null
                        }
                        {
                            this.state.error === true ?
                                (
                                    <div style={{minHeight:'100%',textAlign:'center'}}>
                                        <p style={{color:'red'}}>Error while saving product.</p>
                                    </div>
                                ):null
                        }
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
                                                            selectedImage={this.state.selectedImage}/>:
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
                                    {this.createListForSize()}
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
                                <Label sm={2}>Sale</Label>
                                <Col sm={10} className="add-product-sale-radio">
                                    <div>
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
                                    </div>
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
                <Footer/>
            </div>
        )
    }
}

export default AddProduct;