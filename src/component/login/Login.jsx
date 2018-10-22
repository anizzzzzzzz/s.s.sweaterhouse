import React, {Component} from 'react';
import './style/Login.css';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import google from '../../images/icon/google-icon.jpg';
import facebook from '../../images/icon/facebook-icon.jpg';
import {Link} from "react-router-dom";
import NavigationBar from "../common/navbar/NavigationBar";
import {userLogin} from "../../api/UserApi";
import {LoginException} from "../../exception/Exceptions";
import {createUserSession} from "../../action/UserSessionAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {validateEmail, validatePassword} from "../../util/Validator";
import {saveForgotPasswordUsername} from "../../action/ForgotPasswordAction";

class Login extends Component {
    constructor(props){
        super(props);

        console.log(props);
        this.state={
            username:'',
            password:'',
            errorMsg:{},
            errorFlag:{}
        };
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    handleSubmit=(e)=>{
        e.preventDefault();

        let error=false;

        const validation=this.formValidation();
        this.setState({
            errorMsg:validation.errorMsg,
            errorFlag:validation.errorFlag
        });

        Object.entries(validation.errorFlag).forEach(
            ([key, value]) => {
                if(value === true){
                    error=true;
                }
            }
        );

        if(error !== true){
            let user={
                username:this.state.username,
                password:this.state.password
            };
            userLogin(user)
                .then(response=>{
                    if(response.status === 200)
                        return response.json();
                    else
                        throw LoginException();
                })
                .then(result=>{
                    this.props.createUserSession(result);
                    this.props.history.goBack();
                })
                .catch(e=>{
                    if(e instanceof LoginException){
                        console.log("Login failed");
                    }
                });
        }
    };

    formValidation(){
        const nullMsg='This field cannot be null.';
        let errorMsg={};
        let errorFlag={};

        if(this.state.username === ''){
            errorMsg={...errorMsg,username:nullMsg};
            errorFlag={...errorFlag,username:true};
        }
        else{
            if(!validateEmail(this.state.username)){
                errorMsg={...errorMsg,username:'Email not valid'};
                errorFlag={...errorFlag,username:true};
            }
            else{
                errorMsg={...errorMsg,username:''};
                errorFlag={...errorFlag,username:false};
            }
        }

        if(this.state.password === ''){
            errorMsg={...errorMsg,password:nullMsg};
            errorFlag={...errorFlag,password:true};
        }
        else{
            if(!validatePassword(this.state.password)){
                errorMsg={...errorMsg,password:'Password must contain a capital letter, a number and minimum 8 character'};
                errorFlag={...errorFlag,password:true};
            }
            else{
                errorMsg={...errorMsg,password:''};
                errorFlag={...errorFlag,password:false};
            }
        }
        return {errorMsg:errorMsg, errorFlag:errorFlag};
    }

    handleForgotPassword = (e)=>{
        e.preventDefault();
        this.props.saveForgotPasswordUsername(this.state.username);
        this.props.history.push({
            pathname:'/forgot-password'
        });
    };

    render() {
        return (
            <div>
                <NavigationBar props={this.props}/>
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
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" placeholder="Enter Username" onChange={this.handleChange}/>
                                <span
                                    className="login-error"
                                    hidden={!this.state.errorFlag.username}>
                                {this.state.errorMsg.username}
                            </span>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Enter Password" onChange={this.handleChange}/>
                                <span
                                    className="login-error"
                                    hidden={!this.state.errorFlag.password}>
                                {this.state.errorMsg.password}
                            </span>
                            </FormGroup>
                            <Button className="login-form-button">Login</Button>
                        </Form>
                    </div>
                    <div className="login-bottom-link">
                        <Link to="/register">Doesn't have account? Sign up</Link>
                        <Link to="/forgot-password" onClick={this.handleForgotPassword}>Forgot Password</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        getUserSession:state.getUserSession
    }
};

const mapDispatchToAction = dispatch=>{
    return bindActionCreators({
        createUserSession:createUserSession,
        saveForgotPasswordUsername:saveForgotPasswordUsername
    },dispatch);
};

export default connect(mapStateToProps, mapDispatchToAction)(Login);
