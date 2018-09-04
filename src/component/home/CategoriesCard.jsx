import React, {Component} from 'react';
import {Button, Card, CardImg, Col, Row} from 'reactstrap';
import './style/CategoriesCard.css';

class CategoriesCard extends Component {
    render() {
        return (
            <div className="categories-card">
                <Row>
                    <Col sm="6" md="6" xs="10" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button" href="/products?item=handwarmer&page=1">Handwarmer</Button>
                        </Card>
                    </Col>
                    <Col sm="6" md="6" xs="10" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button" href="/products?item=jacket&page=1">Jacket</Button>
                        </Card>
                    </Col>
                    <Col sm="6" md="6" xs="10" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button" href="/products?item=shock&page=1">Shock</Button>
                        </Card>
                    </Col>
                    <Col sm="6" md="6" xs="10" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button" href="/products?item=sweater&page=1">Sweater</Button>
                        </Card>
                    </Col>
                    <Col sm="6" md="6" xs="10" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button" href="/products?item=trouser&page=1">Trouser</Button>
                        </Card>
                    </Col>
                    <Col sm="6" md="6" xs="10" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button" href="/products?item=other&page=1">Others</Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CategoriesCard;