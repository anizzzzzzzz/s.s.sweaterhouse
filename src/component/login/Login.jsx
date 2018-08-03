import React, {Component} from 'react';
import './style/Login.css';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import google from '../../images/icon/google-icon.jpg';
import facebook from '../../images/icon/facebook-icon.jpg';
import {Link} from "react-router-dom";
import NavigationBar from "../common/navbar/NavigationBar";

class Login extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
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
                    <div className="login-or-div">
                        <p className="login-or"><span>Or</span></p>
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
                    <div className="login-bottom-link">
                        <Link to="/register">Doesn't have account? Sign up</Link>
                        <Link to="/login">Forgot Password</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
