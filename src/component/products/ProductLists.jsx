import React, {Component} from 'react';
import {Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
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
                <Col sm="6" md="6" xs="10" lg="4" className="product-lists-col" key={image.id}>
                    <Card className={this.props.isOpen?"product-lists-card-with-filter":"product-lists-card"}>
                        <CardImg className={this.props.isOpen?"product-item-image-with-filter":"product-item-image"} top src={image.image} alt="Card image cap"/>
                        <CardTitle className="product-item-text">Sweater</CardTitle>
                        <CardText className="product-item-text">Sweater</CardText>
                    </Card>
                </Col>
            )
        });
    }

    render() {
        return (
            <div className={this.props.isOpen?"product-lists-with-filter":"product-lists"}>
                <Row className={this.props.isOpen?"products-list-row-with-filter":"products-lists-row"}>
                    {this.createImagesList()}
                </Row>
            </div>
        );
    }
}

export default ProductLists;
