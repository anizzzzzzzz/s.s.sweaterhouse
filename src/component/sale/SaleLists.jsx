import React, {Component} from 'react';
import {Card, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import './style/SaleLists.css';

class SaleLists extends Component {
    constructor(){
        super();

        this.state={
            images:[],
            height:0
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
                <Col sm="6" md="6" xs="12" lg="4" className="sales-lists-col" key={image.id}>
                    <Card className={this.props.isOpen?"sales-lists-card-with-filter":"sales-lists-card"}>
                        <CardImg className={this.props.isOpen?"sales-item-image-with-filter":"sales-item-image"} top src={image.image} alt="Card image cap"/>
                        <CardTitle className="sales-item-title">Product Code:123</CardTitle>
                        <CardText className="sales-item-text">
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
            <div className="sales-lists">
                {/*<Row className={this.props.isOpen?"saless-lists-row-with-filter":"saless-lists-row"}>*/}
                <Row className="sales-lists-row">
                    {this.createImagesList()}
                </Row>
            </div>
        );
    }
}

export default SaleLists;
