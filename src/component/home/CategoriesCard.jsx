import React, {Component} from 'react';
import {Button, Card, CardImg, Col, Row} from 'reactstrap';
import './style/CategoriesCard.css';

class CategoriesCard extends Component {
    render() {
        return (
            <div className="categories-card">
                <Row>
                    <Col sm="6" md="4" xs="6" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button">Handwarmer</Button>
                        </Card>
                    </Col>
                    <Col sm="6" md="4" xs="6" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button">Jacket</Button>
                        </Card>
                    </Col>
                    <Col sm="6" md="4" xs="6" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button">Shock</Button>
                        </Card>
                    </Col>
                    <Col sm="6" md="4" xs="6" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button">Sweater</Button>
                        </Card>
                    </Col>
                    <Col sm="6" md="4" xs="6" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button">Trouser</Button>
                        </Card>
                    </Col>
                    <Col sm="6" md="4" xs="6" lg="4" className="categories-card-item">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button">Others</Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CategoriesCard;