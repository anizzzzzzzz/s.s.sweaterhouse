import React, {Component} from 'react';
import './Register.css';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import NavigationBar from "../common/navbar/NavigationBar";
import {validateEmail, validatePassword} from "../../util/Validator";
import {userRegistration} from "../../api/UserApi";
import {RegistrationException} from "../../exception/Exceptions";

class Register extends Component {
    constructor(props){
        super(props);

        this.state={
            firstname:'',
            middlename:'',
            lastname:'',
            email:'',
            password:'',
            confirmPassword:'',
            errorMsg:{},
            errorFlag:{},
            modal:false,
            message:''
        };
    }

    toggle=()=> {
        this.setState({
            modal: !this.state.modal
        });
    };

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
            let user={
                firstname:this.state.firstname,
                middlename:this.state.middlename,
                lastname:this.state.lastname,
                username:this.state.email,
                password:this.state.password
            };
            userRegistration(user)
                .then(response=>{
                    if(response.status === 200) {
                        let msg = "Dear".concat(this.state.firstname, ",\nUser has been registered. " +
                            "Activation Email has been sent to your email. Please activate your account.");
                        this.setState({
                            message: msg,
                            firstname:'',
                            lastname:'',
                            middlename:'',
                            email:'',
                            password:'',
                            confirmPassword:'',
                        });
                        this.toggle();
                    }
                    else if(response.status === 400){
                        let msg = "Dear".concat(this.state.firstname,",\n", this.state.email," has already been registered. " +
                            "Please try again with different email id.");
                        this.setState({
                            message:msg
                        });
                        this.toggle();
                    }
                    else
                        throw new RegistrationException();
                })
                .catch(e=>{
                    // Need to show error after fetching from server side
                    if(e instanceof RegistrationException){
                        console.error("Registration Exception occured");
                        Promise.resolve(e).then(p=>{
                            console.log(p);
                        });
                    }
                })
        }
    }

    formValidation(){
        const nullMsg='This field cannot be null.';
        let errorMsg={};
        let errorFlag={};

        if(this.state.firstname === ''){
            errorMsg={...errorMsg,firstname:nullMsg};
            errorFlag={...errorFlag, firstname:true};
        }
        else{
            errorMsg={...errorMsg,firstname:''};
            errorFlag={...errorFlag, firstname:false};
        }

        if(this.state.lastname === ''){
            errorMsg={...errorMsg,lastname:nullMsg};
            errorFlag={...errorFlag, lastname:true};
        }
        else{
            errorMsg={...errorMsg,lastname:''};
            errorFlag={...errorFlag, lastname:false};
        }

        if(this.state.email === ''){
            errorMsg={...errorMsg,email:nullMsg};
            errorFlag={...errorFlag,email:true};
        }
        else{
            if(!validateEmail(this.state.email)){
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
            if(!validatePassword(this.state.password)){
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

    render() {
        return (
            <div>
                <NavigationBar props={this.props}/>
                <div className="register">
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>User Registration</ModalHeader>
                        <ModalBody>
                            {this.state.message}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Ok</Button>
                        </ModalFooter>
                    </Modal>
                    <Form onSubmit={(e)=>this.handleSubmit(e)}>
                        <Row>
                            <Col lg={4} md={4} sm={12} xs={12}>
                                <FormGroup>
                                    <Label for="firstname">First name</Label>
                                    <Input type="text" name="firstname" id="firstname" placeholder="First name"
                                           onChange={(e)=>this.handleChange(e)}/>
                                    <span
                                        className="register-error"
                                        hidden={!this.state.errorFlag.firstname}>
                                {this.state.errorMsg.firstname}
                            </span>
                                </FormGroup>
                            </Col>
                            <Col lg={4} md={4} sm={12} xs={12}>
                                <FormGroup>
                                    <Label for="middlename">Middle name</Label>
                                    <Input type="text" name="middlename" id="middlename" placeholder="Middle name"
                                           onChange={(e)=>this.handleChange(e)}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4} md={4} sm={12} xs={12}>
                                <FormGroup>
                                    <Label for="lastname">Last name</Label>
                                    <Input type="text" name="lastname" id="lastname" placeholder="Last name"
                                           onChange={(e)=>this.handleChange(e)}/>
                                    <span
                                        className="register-error"
                                        hidden={!this.state.errorFlag.lastname}>
                                {this.state.errorMsg.lastname}
                            </span>
                                </FormGroup>
                            </Col>
                        </Row>
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
