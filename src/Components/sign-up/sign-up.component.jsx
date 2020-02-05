import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword ){
            alert('Passwords do not match');
            return;
        }
        
        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});

            this.setState({displayName: '', email: '', password: '', confirmPassword: ''});
        }
        catch (error) {
            console.log(error);
        }

    };

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    };

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>Do not have na account?</h2>
                <span>Sign Up with your email</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        name="displayName"
                        type="text"
                        value={displayName}
                        required
                        handleChange={this.handleChange}
                        label="Display Name"
                    />
                    <FormInput
                        name="email"
                        type="email"
                        value={email}
                        required
                        handleChange={this.handleChange}
                        label="Email"
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={password}
                        required
                        handleChange={this.handleChange}
                        label="Password"
                        autoComplete="on"
                    />
                    <FormInput
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        required
                        handleChange={this.handleChange}
                        label="Confirm Password"
                        autoComplete="on"
                    />
                    <div className='buttons'>
                        <CustomButton type="submit">
                            Sign Up
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;