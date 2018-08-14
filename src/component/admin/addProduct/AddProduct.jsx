import React, {Component} from 'react';
import './AddProduct.css';
import {Col, Form, FormGroup, FormText, Input, InputGroup, InputGroupAddon, Label} from "reactstrap";

class AddProduct extends Component {
    render() {
        return (
            <div>
                <div className="add-product">
                    <Form>
                        <FormGroup row>
                            <Label for="exampleFile" sm={2}>File</Label>
                            <Col sm={10}>
                                <Input type="file" name="file" id="exampleFile" multiple accept="image/jpeg, image/png"/>
                                <FormText color="muted">
                                    You can only upload image with jpeg/png extension.
                                </FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="size" sm={2}>Size</Label>
                            <Col sm={10} className="add-product-size-checkbox">
                               <div>
                                   <input type="checkbox" id="smallCheck"/>
                                   <label for="smallCheck">Small</label>
                               </div>
                                <div>
                                    <input type="checkbox" id="mediumCheck"/>
                                    <label for="mediumCheck">Medium</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="largeCheck"/>
                                    <label for="largeCheck">Large</label>
                                </div>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="price" sm={2}>Price</Label>
                            <Col sm={10}>
                                <div className="add-product-price-input">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">NRs</InputGroupAddon>
                                        <Input type="number" id="price"/>
                                    </InputGroup>
                                </div>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddProduct;