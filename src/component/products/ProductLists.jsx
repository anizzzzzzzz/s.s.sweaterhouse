import React, {Component} from 'react';
import {Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import './style/ProductLists.css';
import {showImages} from "../../api/ImageApi";

class ProductLists extends Component {
    constructor(){
        super();

        this.state={
            images:[],
            height:0,
        };

        this.createImagesList=this.createImagesList.bind(this);
    }

    componentWillMount() {
        const images = this.importAll(require.context('../../images/carousel', false, /\.(png|jpe?g|svg)$/));
        this.setState({
            images:images
        });
        /*
        showImages()
            .then(response=>{
                return response.json();
            })
            .then(result=>{
                console.log(result);
                this.setState({
                    images:result.content
                })
            })*/
    }

    importAll(r) {
        let images = [];
        r.keys().forEach((item, index) => {
            let image={
                id:index,
                image:r(item),
                src:index
            };
            images.push(image);
        });
        return images;
    }

    /*createImagesList(){
        return this.state.images.map((image)=>{
            let src='data:'+image.imageType+';base64,'+image.image;
            return (
                <Col sm="6" md="6" xs="12" lg="4" className="product-lists-col" key={image.productCode}>
                    <Card className={this.props.isOpen?"product-lists-card-with-filter":"product-lists-card"}>
                        <CardImg className={this.props.isOpen?"product-item-image-with-filter":"product-item-image"} top src={src} alt="Card image cap"/>
                        <CardTitle className="product-item-text">{image.productCode}</CardTitle>
                        <CardText className="product-item-text">
                            {image.type}
                            <br/>
                            {image.price}
                        </CardText>
                    </Card>
                </Col>
            )
        });
    }

    render() {
        return (
            <div className="product-lists">
                {/!*<Row className={this.props.isOpen?"products-lists-row-with-filter":"products-lists-row"}>*!/}
                <Row className="products-lists-row">
                    {this.createImagesList()}
                </Row>
                <div id="photo">

                </div>
            </div>
        );
    }*/

    createImagesList(){
        return this.state.images.map((image)=>{
            return (
                <Col sm="6" md="6" xs="12" lg="4" className="product-lists-col" key={image.id}>
                    <Card className={this.props.isOpen?"product-lists-card-with-filter":"product-lists-card"}>
                        <CardImg className={this.props.isOpen?"product-item-image-with-filter":"product-item-image"} top src={image.image} alt="Card image cap"/>
                        <CardTitle className="product-item-title">Product Code:123</CardTitle>
                        <CardText className="product-item-text">
                            Type: Sweater
                            <br/>
                            Price : 9000
                            <br/>
                            Size : XL,L
                        </CardText>
                    </Card>
                </Col>
            )
        });
    }

    render() {
        return (
            <div className="product-lists">
                {/*<Row className={this.props.isOpen?"products-lists-row-with-filter":"products-lists-row"}>*/}
                <Row className="products-lists-row">
                    {this.createImagesList()}
                </Row>
            </div>
        );
    }
}

export default ProductLists;
