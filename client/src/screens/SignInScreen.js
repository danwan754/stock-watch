import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import Loader from '../components/Loader';
import { loginUser } from '../actions/login';
import { LoginContext } from '../contexts/LoginContext';
import '../css/screens/SignInScreen.css';


function SignInScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginState, loginDispatch } = useContext(LoginContext);
    
    // const location = useLocation();
    // const fromRegister = location.state || {};
    // const history = useHistory();
    // if (loginState.username) {
    //     history.push('/lists');
    // }
    // if (Object.keys(fromRegister).length > 0) {
    //     loginUser(loginDispatch, fromRegister.email, fromRegister.password);
    // }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(loginDispatch, email, password);
    }

    return (
        <div className="sign-in-screen">
            <p className="login-error">{loginState.error || '' }</p>
            { loginState.loading ? <Loader /> : (
                <div className="sign-in-container">
                    <h4>Log In</h4>
                    <form onSubmit={handleSubmit}>
                        <label>Email / Username: </label><br/>
                        <input type='text' onChange={handleChangeEmail} value={email} /><br/><br/>
                        <label>Password: </label><br/>
                        <input type='password' onChange={handleChangePassword} value={password} /><br/>
                        <input type='submit' value='Log in' className="log-in-submit" />
                    </form>
                    <p>Don't have an account? <Link to='/register'>Register now.</Link></p>
                </div>
            )}
        </div>
    );
}

export default SignInScreen;