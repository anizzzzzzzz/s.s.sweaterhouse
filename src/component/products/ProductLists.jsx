import React, {Component} from 'react';
import {Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import './style/ProductLists.css';
import {showImagesByType} from "../../api/ImageApi";
import {ProductNullException} from "../../exception/Exceptions";
import {connect} from "react-redux";
import {BounceLoader} from "react-spinners";
import {css} from 'react-emotion';

const override = css`
    display: block;
    margin: 90px auto;
    border-color: red;
`;

class ProductLists extends Component {
    constructor(props){
        super(props);

        this.state={
            images:[],
            height:0,
            loading:false
        };
    }

    componentWillMount() {
        this.setState({
            loading:true
        });
        showImagesByType(this.props.selectProdType)
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
                    images:result.content,
                    loading:false
                })
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
        if(this.state.images.length > 0) {
            return this.state.images.map((image) => {
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
            </div>

        );
    }
}

const mapStateToProps = (state)=>{
  return{
      selectProdType: state.selectProdType
  }
};

export default connect(mapStateToProps)(ProductLists);
// export default ProductLists;