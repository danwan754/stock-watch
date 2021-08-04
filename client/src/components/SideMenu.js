import React, { useContext } from 'react';
import { getLists } from '../actions/getLists';

import '../css/components/SideMenu.css';
import { MainContext } from '../contexts/MainContext';
import { LoginContext } from '../contexts/LoginContext';
import { NewListContext } from '../contexts/NewListContext';
import { NEW_LIST_MODAL_OPEN } from '../constants/newListModalConstants';

function SideMenu(props) {

    const { loginState } = useContext(LoginContext);
    const { listsDispatch } = useContext(MainContext);
    const { newListDispatch } = useContext(NewListContext);
    const { jwtoken } = loginState;

    const handleNewList = () => {
        newListDispatch({ type: NEW_LIST_MODAL_OPEN });
    }

    const handleRefresh = () => {
        getLists(listsDispatch, jwtoken);
    }

    return (
        <div className="side-menu">
            <input type='image' onClick={handleNewList} src='plus.png' />
            <input type='image' onClick={handleRefresh} src='refresh.png' />
        </div>
    )
}

export default SideMenu;