import React, {Component} from 'react';
import {Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import './style/SaleMain.css';
import {findAllBySalesAndType, findAllSales} from "../../api/SalesApi";
import {ProductNullException} from "../../exception/Exceptions";
import {Link} from "react-router-dom";
import {BounceLoader} from "react-spinners";
import {css} from "react-emotion";
import SalePagination from "./SalePagination";
import {FIND_ALL_BY_SALES_AND_TYPE, FIND_ALL_SALES} from "../../constant/Constants";
import API_DICT from "../../config/appConfig";

const override = css`
    display: block;
    margin: 90px auto;
    border-color: red;
`;

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
            error:false,
            selectedMethod : this.selectMethod(this.props.item),
            message:''
        };

        this.handlePagination=this.handlePagination.bind(this);
    }

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
    }

    findAllSales(){
        let select = null;
        const size = 18;
        switch (this.state.selectedMethod){
            case FIND_ALL_BY_SALES_AND_TYPE:
                select = findAllBySalesAndType(this.props.item,this.state.page-1,size);
                break;
            case FIND_ALL_SALES:
                select = findAllSales(this.state.page-1,size);
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
                    isFirst:result.first,
                    isLast:result.last,
                    page: (result.totalElements > 0)? page : page+1
                });
            })
            .catch((e)=>{
                if(e instanceof ProductNullException){
                    this.setState({
                        error:true,
                        message:'No products are listed for sale.'
                    });
                }
            });
    }

    createImagesList(){
        if(this.state.products.length > 0) {
            return this.state.products.map((product)=>{
                let selectedPhoto = product.productInfos.filter(img => img.highlight === true)[0];
                let src = API_DICT.IMAGE_API + '/' + selectedPhoto.location;
                return (
                    <Col sm="6" md="6" xs="12" lg="4" className="sales-lists-col" key={product.productCode}>
                        <Card className={this.props.isOpen?"sales-lists-card-with-filter":"sales-lists-card"}>
                            <Link to={"/view?code="+product.productCode+"&id="+product.id}>
                                <CardImg
                                    className={this.props.isOpen?"sales-item-image-with-filter":"sales-item-image"}
                                    top src={src} alt="prod"
                                />
                            </Link>
                            <CardTitle className="sales-item-title">{product.name}</CardTitle>
                            <CardText className="sales-item-title">
                                Product Code: {product.productCode}
                                <br/>
                                Product Type: {product.type}
                                <br/>
                                Price: {product.price}
                            </CardText>
                        </Card>
                    </Col>
                )
            });
        }
        else{
            if (this.state.loading === false) {
                return (
                    <div className="sales-no-product-text">
                        <p>No products Found.</p>
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
                <BounceLoader
                    className={override}
                    sizeUnit={"px"}
                    size={100}
                    color={'#01A390'}
                    loading={this.state.loading}
                />
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
            </div>
        );
    }
}

export default SaleMain;