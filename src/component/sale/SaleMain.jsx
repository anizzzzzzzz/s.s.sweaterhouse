import React, {Component} from 'react';
import {Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import './style/SaleMain.css';
import {findAllBySalesAndType, findAllSales} from "../../api/SalesApi";
import {ProductNullException} from "../../exception/Exceptions";
import SalePagination from "./SalePagination";
import {
    FIND_ALL_BY_SALES_AND_TYPE,
    FIND_ALL_SALES
} from "../../constant/Constants";
import API_DICT from "../../config/appConfig";
import ViewIndex from "../view-product/ViewIndex";
import {Empty, Icon, message, Modal, Popconfirm, Spin} from "antd";
import {ADMIN, SUPER_ADMIN} from "../../constant/RoleConstant";
import AddProductModal from "../admin/addProduct/AddProductModal";
import {deleteProduct} from "../../api/ProductApi";

class SaleMain extends Component {
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
            modalVisible:false,
            editModalVisible:false,
            selectedProductId:'',
            selectedProductCode:'',
        };

        this.handlePagination=this.handlePagination.bind(this);
    }

    success = (msg) => {
        message.success(msg);
    };

    error = (msg) => {
        message.error(msg);
    };

    selectMethod = (item) =>{
        if(item!==undefined )
            return FIND_ALL_BY_SALES_AND_TYPE;
        else
            return FIND_ALL_SALES;
    };

    componentWillMount() {
        this.setState({
            loading:true
        });

        this.findAllSales();
    }

    componentDidUpdate(nextProps,nextState){
        if(this.state.page !== nextState.page){
            if(this.props.item!==undefined)
                window.location='/sale?item='+this.props.item+'&page='+(this.state.page);
            else
                window.location='/sale?page='+(this.state.page);
        }

        if(this.props.refreshpage !== nextProps.refreshpage){
            this.findAllSales();
        }
    }

    findAllSales(){
        let select = null;
        const size = 12;
        switch (this.state.selectedMethod){
            case FIND_ALL_BY_SALES_AND_TYPE:
                select = findAllBySalesAndType(this.props.item, this.state.page, size, this.props.userSession.token);
                break;
            case FIND_ALL_SALES:
                select = findAllSales(this.state.page, size, this.props.userSession.token);
                break;
            default:
                this.setState({
                   error:true,
                   message:'Error while requesting product. Please recheck your request'
                });
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
                    isFirst:result.number === 1,
                    isLast:result.number === result.totalPages,
                    page: (result.totalElements > 0)? page : page+1
                });
            })
            .catch((e)=>{
                if(e instanceof ProductNullException){
                    this.setState({
                        loading:false,
                    });
                    this.error('Error Occured while loading.');
                }
            });
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

    deleteProduct = (id) => {
        this.setState({loading:true});
        deleteProduct(id, this.props.userSession.token)
            .then(response => {
                if(response.status === 200){
                    this.success("Deleted image.");
                    this.findAllSales();
                }
                else
                    this.error("Cannot delete image.");
            });
        this.setState({loading:false});
    };

    showEditDeleteButtonAdmin = (id, productCode) => {
        if(this.props.userSession.roles.includes(ADMIN, SUPER_ADMIN)){
            return (
                <div className="admin-edit-delete-div-wrapper">
                    <div className="admin-edit-delete-div-child">
                    </div>
                    <div className="admin-edit-delete-div-icon">
                        <Popconfirm
                            title="Are you sure delete this product?"
                            onConfirm={() => this.deleteProduct(id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Icon type="delete"/>
                        </Popconfirm>
                        <Icon type="edit" onClick={() => this.handleEditModalVisible(id, productCode, true)}/>
                    </div>
                </div>
            )
        }
    };

    createImagesList(){
        if(this.state.products.length > 0) {
            return this.state.products.map((product)=>{
                let selectedPhoto = product.productInfos.filter(img => img.highlight === true)[0];
                if(selectedPhoto === undefined)
                    selectedPhoto = product.productInfos[0];
                let src = API_DICT.IMAGE_API + '/' + selectedPhoto.location;
                return (
                    <Col sm="6" md="6" xs="12" lg="4" className="sales-lists-col" key={product.productCode}>
                        <Card className={this.props.isOpen?"sales-lists-card-with-filter":"sales-lists-card"}>
                            <CardImg
                                className={this.props.isOpen?"sales-item-image-with-filter":"sales-item-image"}
                                top src={src} alt="prod"
                                onClick={() => this.handleProductSelectUnselect(product.id, product.productCode, true)}
                            />
                            <CardTitle className="sales-item-title">{product.name}</CardTitle>
                            <CardText className="sales-item-title">
                                Product Code: {product.productCode}
                                <br/>
                                Product Type: {product.type}
                                <br/>
                                Price: {product.price}
                            </CardText>
                            {this.showEditDeleteButtonAdmin(product.id, product.productCode)}
                        </Card>
                    </Col>
                )
            });
        }
        else{
            if (this.state.loading === false) {
                return (
                    <div className="sales-no-product-text">
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
            <div className={this.props.isOpen?"sales-main-with-filter":"sales-main"}>
                <Spin size="large" spinning={this.state.loading}>
                    <div className="sales-lists">
                        {
                            this.state.error === true ?
                                (
                                    <div style={{minHeight:'100%',textAlign:'center'}}>
                                        <p style={{color:'red'}}>{this.state.message}</p>
                                    </div>
                                ):null
                        }
                        {/*<Row className={this.props.isOpen?"saless-lists-row-with-filter":"saless-lists-row"}>*/}
                        <Row className="sales-lists-row">
                            {this.createImagesList()}
                        </Row>
                    </div>
                    {(!this.state.loading && this.state.totalElements !== 0 && this.state.totalPages > 1)?
                        <SalePagination totalPages={this.state.totalPages}
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
                                     productCode={this.state.selectedProductCode}
                                     handleRefreshPage = {this.props.handleRefreshPage}/>
                </Spin>
            </div>
        );
    }
}

export default SaleMain;