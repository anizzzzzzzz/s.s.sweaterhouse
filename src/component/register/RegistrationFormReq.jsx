import * as validatorjs from "validatorjs";
import {Form} from 'mobx-react-form';

const plugins = { dvr: validatorjs };

const fields = [
    {
        name: 'name',
        label: 'Full Name',
        placeholder: 'Full name',
        rules: 'required'
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        rules: 'required|email|string',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        rules: 'required|string',
    },
    {
        name: 'confirmPassword',
        label: 'Confirm Password',
        placeholder: 'Confirm Password',
        rules: 'required|string|same:password'
    }
];

const hooks = {
    onSuccess(form) {
        // get field values
        console.log('Form Values!', form.values());
        console.log('Name', form.$('name').value);
    },
    onError(form) {
        // get all form errors
        console.log('All form errors', form.errors());
    }
}

export default new Form({ fields }, { plugins, hooks });