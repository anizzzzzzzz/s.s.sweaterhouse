import React, {Component} from 'react';
import {Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import './style/ProductMain.css';
import {findAllProducts, findAllProductsByType} from "../../api/ProductApi";
import {ProductNullException} from "../../exception/Exceptions";
import ProductPagination from "./ProductPagination";
import {FIND_ALL_PRODUCTS, FIND_ALL_PRODUCTS_BY_TYPE} from "../../constant/Constants";
import sale_icon from '../../images/icon/sale-icon.png';
import API_DICT from "../../config/appConfig";
import {Empty, Icon, message, Modal, Spin} from "antd";
import ViewIndex from "../view-product/ViewIndex";
import {ADMIN, SUPER_ADMIN} from "../../constant/RoleConstant";
import AddProductModal from "../admin/addProduct/AddProductModal";

class ProductMain extends Component {
    constructor(props){
        super(props);

        this.state={
            products:[],
            loading:false,
            totalPages:0,
            totalElements:0,
            currentPage:0,
            isFirst:false,
            isLast:false,
            change:false,
            page:this.props.page,
            selectedMethod : this.selectMethod(this.props.item),
            message:'',
            error:false,
            modalVisible:false,
            editModalVisible:false,
            selectedProductId:'',
            selectedProductCode:'',
        };
        this.handlePagination=this.handlePagination.bind(this);
    }

    error = (msg) => {
        message.error(msg);
    };

    selectMethod = (item) =>{
        if(item!==undefined )
            return FIND_ALL_PRODUCTS_BY_TYPE;
        else
            return FIND_ALL_PRODUCTS;
    };

    componentWillMount() {
        this.setState({
            loading:true
        });

        this.findAllByType();
    }

    componentDidUpdate(nextProps,nextState){
        if(this.state.page !== nextState.page){
            if(this.props.item!==undefined)
                window.location='/products?item='+this.props.item+"&page="+(this.state.page);
            else
                window.location='/products?page='+(this.state.page);
        }
    }

    findAllByType(){
        let select = null;
        const size = 18;
        switch (this.state.selectedMethod){
            case FIND_ALL_PRODUCTS_BY_TYPE:
                select = findAllProductsByType(this.props.item, this.state.page-1, size, this.props.userSession.token);
                break;
            case FIND_ALL_PRODUCTS:
                select = findAllProducts(this.state.page-1, size, this.props.userSession.token);
                break;
            default:
                this.setState({
                    error:true,
                    message:'Error while requesting product. Please recheck your request'
                })
        }

        select.then(response=>{
                if(response.status === 200){
                    return response.json();
                }
                else{
                    throw new ProductNullException();
                }
            })
            .then(result=>{
                const page = (this.state.page > result.totalPages)?result.totalPages:this.state.page;
                this.setState({
                    products:result.content,
                    loading:false,
                    totalPages:result.totalPages,
                    totalElements:result.totalElements,
                    currentPage:result.number,
                    isFirst:result.first,
                    isLast:result.last,
                    page: (result.totalElements > 0)? page : page+1
                });
            })
            .catch((ex)=>{
                if(ex instanceof ProductNullException){
                    this.setState({
                        loading:false
                    });
                    this.error('Error Occured while loading.');
                }
            })
    }

    handleProductSelectUnselect = (id, productCode, visible) => {
        this.setState({
            selectedProductId : id,
            selectedProductCode : productCode,
            modalVisible:visible
        });
    };

    // For Edit Model
    handleEditModalVisible = (id, productCode, visible) => {
        this.setState({
            editModalVisible:visible,
            selectedProductId : id,
            selectedProductCode : productCode,
        });
    };

    showEditDeleteButtonAdmin = (id, productCode) => {
        if(this.props.userSession.roles.includes(ADMIN, SUPER_ADMIN)){
            return (
                <div className="admin-edit-delete-div-wrapper">
                    <div className="admin-edit-delete-div-child">
                    </div>
                    <div className="admin-edit-delete-div-icon">
                        <Icon type="delete" />
                        <Icon type="edit" onClick={() => this.handleEditModalVisible(id, productCode, true)}/>
                    </div>
                </div>
            )
        }
    };

    createImagesList(){
        if(this.state.products.length > 0) {
            return this.state.products.map((product) => {
                let selectedPhoto = product.productInfos.filter(img => img.highlight === true)[0];
                let src = API_DICT.IMAGE_API + '/' + selectedPhoto.location;
                return (
                    <Col sm="6" md="6" xs="12" lg="4"
                         className="product-lists-col"
                         key={product.productCode}
                    >
                        <Card className={this.props.isOpen ? "product-lists-card-with-filter" : "product-lists-card"}>
                                <CardImg
                                    className={this.props.isOpen ? "product-item-image-with-filter" : "product-item-image"}
                                    top src={src} alt="Card image cap"
                                    onClick={() => this.handleProductSelectUnselect(product.id, product.productCode, true)}
                                />
                            <CardTitle className="product-item-text">{product.name}</CardTitle>
                            <CardText className="product-item-text">
                                Product Code: {product.productCode}
                                <br/>
                                Product Type: {product.type}
                                <br/>
                                Price: {product.price}
                            </CardText>
                            {product.sale?<img className="sale-icon-on-product-top" src={sale_icon} alt="Sale Icon"/>:null}
                            {this.showEditDeleteButtonAdmin(product.id, product.productCode)}
                        </Card>
                    </Col>
                )
            });
        }
        else {
            if (this.state.loading === false) {
                return (
                    <div className="product-no-product-text">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                );
            }
        }
    }

    handlePagination(number){
        this.setState({
            page:number
        });
    }

    render() {
        return (
            <div className={this.props.isOpen?"products-main-with-filter":"products-main"}>
                <Spin size="large" spinning={this.state.loading}>
                    <div className="product-lists">
                        {/*<Row className={this.props.isOpen?"products-lists-row-with-filter":"products-lists-row"}>*/}
                        <Row className="products-lists-row">
                            {this.createImagesList()}
                        </Row>
                    </div>
                    {(!this.state.loading && this.state.totalElements !== 0 && this.state.totalPages > 1)?
                        <ProductPagination totalPages={this.state.totalPages}
                                           currentPage={this.state.currentPage}
                                           isFirst={this.state.isFirst}
                                           isLast={this.state.isLast}
                                           handlePagination={this.handlePagination}
                                           page={this.state.page}
                        />:
                        null
                    }

                    <Modal
                        width="80%"
                        style={{top: 20}}
                        title=""
                        visible={this.state.modalVisible}
                        onCancel={()=>this.handleProductSelectUnselect('','',false)}
                        onOk={()=>this.handleProductSelectUnselect('','',false)}
                    >
                        {this.state.selectedProductId !== '' && this.state.selectedProductCode !== '' ?
                            <ViewIndex
                                userToken={this.props.userSession.token}
                                productId={this.state.selectedProductId}
                                productCode={this.state.selectedProductCode}/>
                            : null}
                    </Modal>

                    {/*Editing Product*/}
                    <AddProductModal modalVisible={this.state.editModalVisible}
                                     handleModalVisible={this.handleEditModalVisible}
                                     productId={this.state.selectedProductId}
                                     productCode={this.state.selectedProductCode}/>
                </Spin>
            </div>
        );
    }
}

export default ProductMain;