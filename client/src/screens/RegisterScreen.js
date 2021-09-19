import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Loader from '../components/Loader';
import { registerReducer } from '../reducers/registerReducer';
import { registerInitialState } from '../initialStates/register';
import { registerUser, validatePassword } from '../actions/register';
import '../css/screens/SignInScreen.css';
import { LoginContext } from '../contexts/LoginContext';


function RegisterScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerState, registerDispatch] = useReducer(registerReducer, registerInitialState);
    const { loginState } = useContext(LoginContext);
    const history = useHistory();

    useEffect(() => {
        if (loginState.username) {
            history.push('/lists');
        }
    }, []);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePassword(registerDispatch, password, confirmPassword)) {
            registerUser(registerDispatch, email, password);
        }
    }

    return (
        <div className="sign-in-screen">
            { registerState.registered ? (
                <React.Fragment>
                    <div className="register-success-container">
                        <span>Registered.</span>
                        <img src="check.png" alt="checkmark" className="register-success-img" />
                    </div>
                    <Link to={{ 
                        pathname: '/login', 
                        state: {
                            email, 
                            password,
                            from: 'register'    
                        }
                    }}>
                        Proceed to log in.
                    </Link>
                </React.Fragment>
            ) : (
            <React.Fragment>
                { registerState.error ? <p className="login-error">{registerState.error}</p> : '' }
                { registerState.loading ? <Loader /> : (
                    <div className="sign-in-container">
                        <h4>Register</h4>
                        <form onSubmit={handleSubmit}>
                            <label>Email: </label><br/>
                            <input type='text' onChange={handleChangeEmail} /><br/><br/>
                            <label>Password: </label><br/>
                            <input type='password' onChange={handleChangePassword} /><br/><br/>
                            <label>Confirm password: </label><br/>
                            <input type='password' onChange={handleChangeConfirmPassword} /><br/><br/>
                            <input type='submit' value='Register' className="log-in-submit" />
                        </form>
                        <p>Already registered? <Link to='/login'>Log in.</Link></p>
                    </div>
                )}
                </React.Fragment>
            )}
        </div>
    );
}

export default RegisterScreen;