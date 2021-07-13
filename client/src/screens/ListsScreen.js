import React, { useContext, useEffect } from 'react';

import List from '../components/List';
import { getLists } from '../actions/getLists';
import { MainContext } from '../contexts/MainContext';

function ListsScreen(props) {

    const { listsState, listsDispatch, companiesState } = useContext(MainContext);
    const { lists } = listsState;
    const { companies } = companiesState;

    useEffect(() => {
        getLists(listsDispatch, companies);
    }, []);

    return (
        <div className="lists-screen">
            <div className="lists-container">
                { lists.map(list => {
                    <List list={list} />
                })}
            </div>
        </div>
    )
}

export default ListsScreen;