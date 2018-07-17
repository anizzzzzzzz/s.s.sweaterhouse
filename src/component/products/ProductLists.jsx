import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Row} from "reactstrap";
import './style/ProductLists.css';

class ProductLists extends Component {
    constructor(){
        super();

        this.state={
            images:[]
        };

        this.createImagesList=this.createImagesList.bind(this);
    }

    componentWillMount() {
        const images = this.importAll(require.context('../../images/carousel', false, /\.(png|jpe?g|svg)$/));
        this.setState({
            images:images
        });
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

    createImagesList(){
        return this.state.images.map((image)=>{
            return (
                <Card key={image.id} className="product-lists-card">
                    <CardImg className="product-item-image" top src={image.image} alt="Card image cap"/>
                    <CardText>Sweater</CardText>
                    <CardBody>
                        <CardTitle>Sweater</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    </CardBody>
                </Card>
            )
        });
    }

    render() {
        return (
            <div className="product-lists">
                <Row className="products-lists-row">
                    <Col className="product-lists-col">
                        {this.createImagesList()}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ProductLists;
