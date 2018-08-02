import React, {Component} from 'react';
import './style/Login.css';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import google from '../../images/icon/google-icon.jpg';
import facebook from '../../images/icon/facebook-icon.jpg';

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-header-text">
                    <p>Sign in</p>
                    <p>with your social network</p>
                </div>
                <div>
                    <Button className="login-google-btn">
                        <img className="login-social-icon" src={google} alt="google"/>Google
                    </Button>
                    <Button className="login-facebook-btn">
                        <img className="login-social-icon" src={facebook} alt="facebook"/>Facebook
                    </Button>
                </div>
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
                        <Button className="login-form-button">Login</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
