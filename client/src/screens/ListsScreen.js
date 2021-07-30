import React, { useContext, useEffect } from 'react';

import List from '../components/List';
import { getLists } from '../actions/getLists';
import { MainContext } from '../contexts/MainContext';
import { getCompany } from '../actions/getCompany';
import QuoteModal from '../components/QuoteModal';
import Loader from '../components/Loader';
import QuoteSearch from '../components/QuoteSearch';
import '../css/screens/ListsScreen.css';
import { LoginContext } from '../contexts/LoginContext';

function ListsScreen(props) {

    const { 
        listsState, 
        listsDispatch, 
        companiesState, 
        companyState, 
        companyDispatch } = useContext(MainContext);
    const { loginState } = useContext(LoginContext);
    const { lists } = listsState;
    const { companies } = companiesState;
    const { jwtoken } = loginState;
    
    useEffect(() => {
        getLists(listsDispatch, companies, jwtoken);
    },[]);

    const handleSelectCompany = (e) => {
        // console.log(e.target.dataset.ticker);
        getCompany(companyDispatch, e.target.dataset.ticker);
    }

    return (
        <div className="lists-screen">
            <QuoteSearch />
            { listsState.loading ? <div className="loader-wrapper"><Loader /></div>
            : 
                (<div className="lists-container">
                    { lists.length > 0 ? (
                        lists.map(list => (
                            <List 
                                list={list}
                                dispatch={listsDispatch}
                                handleSelect={handleSelectCompany} 
                                key={`${list.list_name}${list.id}`} 
                            />
                        ))) : ''
                    }
                </div>)
            }
            { companyState.loading ? <div className="loader-wrapper"><Loader /></div> :
                (Object.keys(companyState.companyObj).length > 0 ? (
                    <QuoteModal dispatch={companyDispatch} company={companyState} />)
                    : ''
                )
            }
        </div>
    )
}

export default ListsScreen;