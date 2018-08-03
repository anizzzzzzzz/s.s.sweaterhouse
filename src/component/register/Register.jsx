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
            error:{},
            flag:false
        };

        this.checkPasswordAndConfirmPassword = this.checkPasswordAndConfirmPassword.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    checkPasswordAndConfirmPassword(){
        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                error:{confirmPassword:'Password and Confirm Password doesn\'t match'},
                flag:true
            });
        }
        else{
            this.setState({
                flag:false
            });
        }
    }

    componentDidUpdate(nextProps, nextState) {
        if(this.state.confirmPassword !== nextState.confirmPassword){
            this.checkPasswordAndConfirmPassword()
        }
        if(this.state.password !== nextState.password){
            this.checkPasswordAndConfirmPassword();
        }
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="register">
                    <Form>
                        <FormGroup>
                            <Label for="name">Full name</Label>
                            <Input type="text" name="name" id="name" placeholder="Full name"
                                   onChange={(e)=>this.handleChange(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email"
                                   onChange={(e)=>this.handleChange(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password"
                                   onChange={(e)=>this.handleChange(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"
                                   onChange={(e)=>this.handleChange(e)}/>
                            <span hidden={!this.state.flag}>{this.state.error.confirmPassword}</span>
                        </FormGroup>
                        <Button>Register</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Register;
