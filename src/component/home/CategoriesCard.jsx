import React, {Component} from 'react';
import {Button, Card, CardImg, CardTitle, Col, Container, Row} from 'reactstrap';

class CategoriesCard extends Component {
    render() {
        return (
            <Container className="categories-card">
                <Row>
                    <Col sm="6" md="4">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button">Button</Button>
                            <CardTitle>Sweater</CardTitle>
                        </Card>
                    </Col>
                    <Col sm="6" md="4">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button">Button</Button>
                            <CardTitle>Sweater</CardTitle>
                        </Card>
                    </Col>
                    <Col sm="6" md="4">
                        <Card>
                            <CardImg className="categories-card-image" top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <Button className="categories-card-button">Button</Button>
                            <CardTitle>Sweater</CardTitle>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CategoriesCard;