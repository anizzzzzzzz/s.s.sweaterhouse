import React, {Component} from 'react';
import form from './RegistrationFormReq';
import './Register.css';
import FormCreator from "./FormCreator";

class Index extends Component {
    render() {
        console.log("name",form.$('name').value);
        return (
            <div className="register">
                <form>
                    <FormCreator field={form.$('name')}/>
                    <FormCreator field={form.$('email')}/>
                    <FormCreator field={form.$('password')}/>
                    <FormCreator field={form.$('confirmPassword')}/>
                    <br/>
                    <button type="submit" onClick={form.onSubmit}>Submit</button>
                    <p>{form.error}</p>
                </form>
            </div>
        );
    }
}

export default Index;
