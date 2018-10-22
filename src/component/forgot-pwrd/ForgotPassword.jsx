import React, {Component} from 'react';
import NavigationBar from "../common/navbar/NavigationBar";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {bindActionCreators} from "redux";
import {clearForgotPasswordUsername, saveForgotPasswordUsername} from "../../action/ForgotPasswordAction";
import {connect} from "react-redux";
import {validateEmail} from "../../util/Validator";
import './ForgotPassword.css'
import Footer from "../common/footer/Footer";

class ForgotPassword extends Component {
    constructor(props){
        super(props);

        this.state={
            username : this.props.getUsername.username,
            errorMsg:{},
            errorFlag:{}
        };
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    handleSubmit = (e)=>{
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
        if(this.state.username !== ''){

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

        return {errorMsg:errorMsg, errorFlag:errorFlag};
    }

    render() {
        return (
            <div>
                <NavigationBar props={this.props}/>
                <div className="forgot-password-div">
                    <Form className="forgot-password-form" onSubmit={(e)=>this.handleSubmit(e)}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" placeholder="Username"
                                   value={this.state.username}
                                   onChange={(e)=>this.handleChange(e)}/>
                            <span
                                className="forgot-password-div-error"
                                hidden={!this.state.errorFlag.username}>
                                {this.state.errorMsg.username}
                            </span>
                        </FormGroup>
                        <Button>Forgot Password</Button>
                    </Form>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        getUsername : state.forgotPasswordUsername
    };
};

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        clearForgotPasswordUsername:clearForgotPasswordUsername,
        saveForgotPasswordUsername:saveForgotPasswordUsername
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);