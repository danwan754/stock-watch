import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { clearLists } from '../actions/Lists';
import { logOutUser } from '../actions/login';
import { LoginContext } from '../contexts/LoginContext';
import { MainContext } from '../contexts/MainContext';

function LoggedIn(props) {

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
            <span onClick={() => setShowLogOut(!showLogOut)}>{loginState.username}</span>
            {showLogOut ? <input type="button" className="logout-button" onClick={handleLogOut} value='log out' /> : ''}
        </span>
    )
}

export default LoggedIn;