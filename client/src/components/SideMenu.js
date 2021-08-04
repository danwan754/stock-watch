import React, { useContext } from 'react';
import { getLists } from '../actions/getLists';

import '../css/components/SideMenu.css';
import { MainContext } from '../contexts/MainContext';
import { LoginContext } from '../contexts/LoginContext';
import { ListContext } from '../contexts/ListContext';
import { LIST_MODAL_OPEN } from '../constants/listConstants';

function SideMenu(props) {

    const { loginState } = useContext(LoginContext);
    const { listsDispatch } = useContext(MainContext);
    const { listDispatch } = useContext(ListContext);
    const { jwtoken } = loginState;

    const handleList = () => {
        listDispatch({ type: LIST_MODAL_OPEN });
    }

    const handleRefresh = () => {
        getLists(listsDispatch, jwtoken);
    }

    return (
        <div className="side-menu">
            <input type='image' onClick={handleList} src='plus.png' />
            <input type='image' onClick={handleRefresh} src='refresh.png' />
        </div>
    )
}

export default SideMenu;