import React, { useContext, useState } from 'react';
import Axios from 'axios';

import Loader from '../components/Loader';
import { MainContext } from '../contexts/MainContext';
import { LOGIN_LOADING_FAIL, LOGIN_LOADING_REQUEST, LOGIN_LOADING_SUCCESS } from '../constants/loginConstants';
import '../css/screens/SignInScreen.css';


function SignInScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginState, loginDispatch } = useContext(MainContext);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginDispatch({ type: LOGIN_LOADING_REQUEST });
        Axios.post('/auth/login', {
            username: email,
            password
        })
        .then(res => {
            if (!res.data.error) {
                // redirect to watch lists
                console.log(res.data);
                loginDispatch({ type: LOGIN_LOADING_SUCCESS, payload: res.data.accessToken });
            } else {
                loginDispatch({ type: LOGIN_LOADING_FAIL, error: res.data.error });
            }
        })
        .catch(err => {
            loginDispatch({ type: LOGIN_LOADING_FAIL, error: err.response.data.error || err.message });
        });
    }

    return (
        <div className="sign-in-screen">
            <p className="login-error">{loginState.error || '' }</p>
            { loginState.loading ? <Loader /> : (
                <div className="sign-in-container">
                    <h4>Log In</h4>
                    <form onSubmit={handleSubmit}>
                        <label>Email: </label><br/>
                        <input type='text' onChange={handleChangeEmail} /><br/><br/>
                        <label>Password: </label><br/>
                        <input type='password' onChange={handleChangePassword} /><br/>
                        <input type='submit' value='Log in' className="log-in-submit" />
                    </form>
                </div>
            )}
        </div>
    );
}

export default SignInScreen;