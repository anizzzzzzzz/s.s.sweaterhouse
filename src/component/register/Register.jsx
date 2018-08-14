import React, {Component} from 'react';
import './Register.css';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import NavigationBar from "../common/navbar/NavigationBar";

class Register extends Component {
    constructor(props){
        super(props);

        this.state={
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
            errorMsg:{},
            errorFlag:{}
        };
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    checkPasswordAndConfirmPassword(){
        if(this.state.password !== this.state.confirmPassword){
            this.setState(prevState=>{
                return{
                    errorMsg:{...prevState.errorMsg,confirmPassword:'Password and Confirm Password doesn\'t match'},
                    errorFlag:{...prevState.errorFlag,confirmPassword:true}
                }
            });
        }
        else{
            this.setState(prevState=>{
                return{
                    errorMsg:{...prevState.errorMsg,confirmPassword:''},
                    errorFlag:{...prevState.errorFlag,confirmPassword:false}
                }
            });
        }
    }

    componentDidUpdate(nextProps, nextState) {
        if((this.state.confirmPassword !== nextState.confirmPassword) || (this.state.password !== nextState.password)){
            this.checkPasswordAndConfirmPassword();
        }
    }

    handleSubmit(e){
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
            alert('Form is ok');
        }
    }

    formValidation(){
        const nullMsg='This field cannot be null.';
        let errorMsg={};
        let errorFlag={};

        if(this.state.name === ''){
            errorMsg={...errorMsg,name:nullMsg};
            errorFlag={...errorFlag, name:true};
        }
        else{
            errorMsg={...errorMsg,name:''};
            errorFlag={...errorFlag, name:false};
        }

        if(this.state.email === ''){
            errorMsg={...errorMsg,email:nullMsg};
            errorFlag={...errorFlag,email:true};
        }
        else{
            if(!this.validateEmail(this.state.email)){
                errorMsg={...errorMsg,email:'Email not valid'};
                errorFlag={...errorFlag,email:true};
            }
            else{
                errorMsg={...errorMsg,email:''};
                errorFlag={...errorFlag,email:false};
            }
        }

        if(this.state.password === ''){
            errorMsg={...errorMsg,password:nullMsg};
            errorFlag={...errorFlag,password:true};
        }
        else{
            if(!this.validatePassword(this.state.password)){
                errorMsg={...errorMsg,password:'Password must contain a capital letter, a number and minimum 8 character'};
                errorFlag={...errorFlag,password:true};
            }
            else{
                errorMsg={...errorMsg,password:''};
                errorFlag={...errorFlag,password:false};
            }
        }

        if(this.state.confirmPassword === ''){
            errorMsg={...errorMsg,confirmPassword:nullMsg};
            errorFlag={...errorFlag,confirmPassword:true};
        }
        else {
            if(this.state.password !== this.state.confirmPassword){
                errorMsg={...errorMsg,confirmPassword:'Password and Confirm Password doesn\'t match'};
                errorFlag={...errorFlag,confirmPassword:true};
            }
            else{
                errorMsg = {...errorMsg, confirmPassword: ''};
                errorFlag = {...errorFlag, confirmPassword: false};
            }
        }

        return {errorMsg:errorMsg, errorFlag:errorFlag};
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validatePassword(password){
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        return re.test(password);
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="register">
                    <Form onSubmit={(e)=>this.handleSubmit(e)}>
                        <FormGroup>
                            <Label for="name">Full name</Label>
                            <Input type="text" name="name" id="name" placeholder="Full name"
                                   onChange={(e)=>this.handleChange(e)}/>
                            <span
                                className="register-error"
                                hidden={!this.state.errorFlag.name}>
                                {this.state.errorMsg.name}
                            </span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" id="email" placeholder="Email"
                                   onChange={(e)=>this.handleChange(e)}/>
                            <span
                                className="register-error"
                                hidden={!this.state.errorFlag.email}>
                                {this.state.errorMsg.email}
                            </span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password"
                                   onChange={(e)=>this.handleChange(e)}/>
                            <span
                                className="register-error"
                                hidden={!this.state.errorFlag.password}>
                                {this.state.errorMsg.password}
                            </span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"
                                   onChange={(e)=>this.handleChange(e)}
                            />
                            <span
                                className="register-error"
                                hidden={!this.state.errorFlag.confirmPassword}>
                                {this.state.errorMsg.confirmPassword}
                            </span>
                        </FormGroup>
                        <Button>Register</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Register;
