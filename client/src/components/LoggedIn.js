import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { clearLists } from '../actions/Lists';
import { logOutUser } from '../actions/login';
import { LoginContext } from '../contexts/LoginContext';
import { MainContext } from '../contexts/MainContext';
import '../css/components/LoggedIn.css';

const LoggedIn = (props) => {

    const { loginState, loginDispatch } = useContext(LoginContext);
    const { listsDispatch } = useContext(MainContext);
    const [showLogOut, setShowLogOut] = useState(false);
    let history = useHistory();

    const handleLogOut = async () => {
        await logOutUser(loginDispatch);
        await clearLists(listsDispatch);
        history.push({
            pathname: '/login',
            state: {
                isLoggedOut: true
            }
        });
    }

    return (
        <span className="logout-name">
            <span onClick={() => setShowLogOut(!showLogOut)}>
                <img 
                    src='/user.png' 
                    alt='user'
                    className="user-icon" />
                <span>{loginState.username}</span>
            </span>
            {showLogOut ? <input type="button" className="logout-button" onClick={handleLogOut} value='log out' /> : ''}
        </span>
    )
}

export default LoggedIn;