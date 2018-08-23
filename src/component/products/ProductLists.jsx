import React, {Component} from 'react';
import {Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import './style/ProductLists.css';
import {findAllByType} from "../../api/ImageApi";
import {ProductNullException} from "../../exception/Exceptions";
import {connect} from "react-redux";
import {BounceLoader} from "react-spinners";
import {css} from 'react-emotion';
import bindActionCreators from "redux/src/bindActionCreators";
import {storeRestUrl} from "../../action/RestUrlAction";
import ProductMainPagination from "./ProductMainPagination";

const override = css`
    display: block;
    margin: 90px auto;
    border-color: red;
`;

class ProductLists extends Component {
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
            change:false
        };
    }

    findAllByType(){
        findAllByType(this.props.selectProdType, this.props.trackingPagination,5)
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

    componentWillMount() {
        this.setState({
            loading:true
        });

        this.findAllByType();
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

    componentWillReceiveProps(nextProps){
        if(this.props.trackingPagination !== nextProps.trackingPagination){
            window.location='/products?item='+this.props.selectProdType;
        }
    }

    render() {
        return (
            <div>
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
                    <ProductMainPagination totalPages={this.state.totalPages}
                                           totalElements={this.state.totalElements}
                                           currentPage={this.state.currentPage}
                                           isFirst={this.state.isFirst}
                                           isLast={this.state.isLast}
                    />:
                    null
                }
            </div>

        );
    }
}

const mapStateToProps = (state)=>{
  return{
      selectProdType: state.selectProdType,
      trackingPagination: state.trackingPagination
  }
};

const mapDispatchToAction = (dispatch)=>{
    return bindActionCreators({
        storeRestUrl:storeRestUrl
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToAction)(ProductLists);