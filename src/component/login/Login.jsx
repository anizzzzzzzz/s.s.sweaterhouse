import React, {Component} from 'react';
import './style/Login.css';
import {Form, FormGroup, Input, Label} from "reactstrap";

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-form">
                    <Form>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="email" name="username" id="username" placeholder="Enter Username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter Password" />
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
