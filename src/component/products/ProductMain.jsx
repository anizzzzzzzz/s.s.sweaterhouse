import React, {Component} from 'react';
import {Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import './style/ProductMain.css';
import {findAllByType} from "../../api/ImageApi";
import {ProductNullException} from "../../exception/Exceptions";
import {BounceLoader} from "react-spinners";
import {css} from 'react-emotion';
import ProductPagination from "./ProductPagination";

const override = css`
    display: block;
    margin: 90px auto;
    border-color: red;
`;

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
            page:this.props.page
        };
        this.handlePagination=this.handlePagination.bind(this);
    }

    componentWillMount() {
        this.setState({
            loading:true
        });

        this.findAllByType();
    }

    componentDidUpdate(nextProps,nextState){
        if(this.state.page !== nextState.page){
            window.location='/products?item='+this.props.item+"&page="+(this.state.page);
        }
    }

    findAllByType(){
        findAllByType(this.props.item, this.props.page-1,2)
            .then(response=>{
                if(response.status === 200){
                    return response.json();
                }
                else{
                    throw new ProductNullException();
                }
            })
            .then(result=>{
                this.setState({
                    products:result.content,
                    loading:false,
                    totalPages:result.totalPages,
                    totalElements:result.totalElements,
                    currentPage:result.number,
                    isFirst:result.first,
                    isLast:result.last
                });
            })
            .catch((ex)=>{
                if(ex instanceof ProductNullException){
                    return (
                        <div style={{minHeight:'100%'}}>
                            <p style={{color:'red'}}>Error Occured while loading.</p>
                        </div>
                    );
                }
            })
    }

    createImagesList(){
        if(this.state.products.length > 0) {
            return this.state.products.map((image) => {
                let src = 'data:' + image.imageType + ';base64,' + image.image;
                return (
                    <Col sm="6" md="6" xs="12" lg="4" className="product-lists-col" key={image.productCode}>
                        <Card className={this.props.isOpen ? "product-lists-card-with-filter" : "product-lists-card"}>
                            <CardImg
                                className={this.props.isOpen ? "product-item-image-with-filter" : "product-item-image"}
                                top src={src} alt="Card image cap"/>
                            <CardTitle className="product-item-text">Product Code: {image.productCode}</CardTitle>
                            <CardText className="product-item-text">
                                Product Type: {image.type}
                                <br/>
                                Price: {image.price}
                            </CardText>
                        </Card>
                    </Col>
                )
            });
        }
        else {
            if (this.state.loading === false) {
                return (
                    <div className="product-no-product-text">
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
            <div className={this.props.isOpen?"products-main-with-filter":"products-main"}>
                <div className="product-lists">
                    {/*<Row className={this.props.isOpen?"products-lists-row-with-filter":"products-lists-row"}>*/}
                    <Row className="products-lists-row">
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
                    <ProductPagination totalPages={this.state.totalPages}
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

export default ProductMain;