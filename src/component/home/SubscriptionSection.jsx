import React, {Component} from 'react';
import * as FontAwesome from 'react-icons/lib/fa'
import {Button, Col, Form, FormGroup, Input, Row} from "reactstrap";


class SubscriptionSection extends Component {
    render() {
        return (
            <div className="subscription-section">
                    <Row>
                        <Col xs="12" sm="12" md="12" lg="6" className="subscription-social-link-section">
                            <div className="subscription-social-link-div">
                                <p>Get in touch</p>
                                <button><FontAwesome.FaFacebook/></button>
                                <button><FontAwesome.FaInstagram/></button>
                            </div>
                        </Col>

                        <Col xs="12" sm="12" md="12" lg="6" className="subscription-subscriber-section">
                            <Form className="subscription-form" inline >
                                <Row>
                                    <FormGroup style={{width:'100%'}}>
                                        <Input type="email" name="email" placeholder="Email address for Newsletter" />
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <Button className="btn">Subscribe</Button>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
            </div>
        )
    }
}

export default SubscriptionSection;