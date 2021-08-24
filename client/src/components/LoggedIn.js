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

    // const handleOutsideClick = (e) => {
    //     if (!e.target.id == 'user-link') {
    //         console.log('outside click');
    //         handleClick(e);
    //     } else {
    //         console.log('other');
    //     }
    // }

    // const handleClick = (e) => {
    //     if (e.target.id == 'user-link' && !showLogOut) {
    //         console.log('open');
    //         document.addEventListener("click", handleOutsideClick, false);
    //     } else {
    //         console.log('close');
    //         document.removeEventListener("click", handleOutsideClick, false);
    //     }
    //     setShowLogOut(!showLogOut);
    // }

    return (
        <span className="logout-name">
            <span 
                id="user-link"
                onClick={() => setShowLogOut(!showLogOut)}>
                {/* onClick={handleClick}> */}
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