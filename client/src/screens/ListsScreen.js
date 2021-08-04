import React, { useContext, useEffect } from 'react';

import { getLists } from '../actions/getLists';
import { MainContext } from '../contexts/MainContext';
import { getCompany } from '../actions/getCompany';
import QuoteModal from '../components/QuoteModal';
import Loader from '../components/Loader';
import QuoteSearch from '../components/QuoteSearch';
import '../css/screens/ListsScreen.css';
import { LoginContext } from '../contexts/LoginContext';
import ListWrapper from '../components/ListWrapper';
import SideMenu from '../components/SideMenu';
import NewListModal from '../components/NewListModal';
import { NewListContextProvider } from '../contexts/NewListContext';

function ListsScreen(props) {
    const { 
        listsState, 
        listsDispatch, 
        companyState, 
        companyDispatch } = useContext(MainContext);
    const { loginState } = useContext(LoginContext);
    const { lists } = listsState;
    const { jwtoken } = loginState;
    
    useEffect(() => {
        getLists(listsDispatch, jwtoken);
    },[]);

    const handleSelectCompany = (e) => {
        getCompany(companyDispatch, e.target.dataset.ticker);
    }

    return (
        <NewListContextProvider>
        <div className="lists-screen">
            <QuoteSearch />
            <div className="lists-outter-container">
                { listsState.loading ? <div className="loader-wrapper"><Loader /></div>
                : 
                    (<React.Fragment>
                        <div className="lists-container">
                            { lists.length > 0 ? (
                                lists.map(list => (
                                    <ListWrapper 
                                        list={list}
                                        handleSelect={handleSelectCompany} 
                                        key={`${list.list_name}${list.id}`} 
                                    />
                                ))) : ''
                            }
                        </div>
                        <div className="side-menu-container">
                            <SideMenu />
                        </div>
                    </React.Fragment>)
                }
            </div>
            { companyState.loading ? <div className="loader-wrapper"><Loader /></div> :
                (Object.keys(companyState.companyObj).length > 0 ? (
                    <QuoteModal dispatch={companyDispatch} company={companyState} />)
                    : ''
                )
            }
            <NewListModal />
        </div>
        </NewListContextProvider>
    )
}

export default ListsScreen;