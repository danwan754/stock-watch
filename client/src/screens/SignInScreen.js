import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Loader from '../components/Loader';
import { loginUser } from '../actions/login';
import { LoginContext } from '../contexts/LoginContext';
import '../css/screens/SignInScreen.css';
import { setRefreshTimeOut } from '../util/timeOutTokenRefresh';

const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginState, loginDispatch } = useContext(LoginContext);
    const history = useHistory();

    useEffect(() => {
        if (loginState.jwtoken) history.push('/lists');
    })

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await loginUser(loginDispatch, email, password);
        if (data && data.jwtoken) {
            setRefreshTimeOut(loginDispatch, data);
            history.push('/lists');
        }
    }

    return (
        <div className="sign-in-screen">
            {/* {!loginState.jwtoken ? <Auth /> : ( */}
                <React.Fragment>
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
                            { loginState.loading ? <Loader /> : ''}
                        </div>
                    )}
                </React.Fragment>
            {/* )} */}
        </div>
    );
}

export default SignInScreen;