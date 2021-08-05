import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LoginContext } from '../contexts/LoginContext';
import '../css/components/NavBar.css';
import LoggedIn from './LoggedIn';

function NavBar(props) {

    const { loginState } = useContext(LoginContext);

    return (
        <div className="header-links">
            { loginState.username ? (
                <React.Fragment>
                    <Link to="/lists">Watch-Lists</Link>
                    <Link to="/top">Top-Picks</Link>
                    <LoggedIn />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Link to="/quote">Quote</Link>
                    <Link to="/login">Sign-In</Link>
                </React.Fragment>
            )}
        </div>
    )
}

export default NavBar;