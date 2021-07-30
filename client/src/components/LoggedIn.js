import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logOutUser } from '../actions/login';
import { LoginContext } from '../contexts/LoginContext';

function LoggedIn(props) {

    const { loginState, loginDispatch } = useContext(LoginContext);
    const [showLogOut, setShowLogOut] = useState(false);
    let history = useHistory();

    const handleLogOut = () => {
        logOutUser(loginDispatch);
        history.push('/login');
    }

    return (
        <span className="logout-name">
            <span onClick={() => setShowLogOut(!showLogOut)}>{loginState.username}</span>
            {showLogOut ? <input type="button" className="logout-button" onClick={handleLogOut} value='log out' /> : ''}
        </span>
    )
}

export default LoggedIn;