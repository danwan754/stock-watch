import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getLists } from '../actions/Lists';
import getCompanies from '../actions/getCompanies';
import { MainContext } from '../contexts/MainContext';
import QuoteModal from '../components/QuoteModal';
import Loader from '../components/Loader';
import QuoteSearch from '../components/QuoteSearch';
import '../css/screens/ListsScreen.css';
import { LoginContext } from '../contexts/LoginContext';
import ListWrapper from '../components/ListWrapper';
import SideMenu from '../components/SideMenu';
import NewListModal from '../components/NewListModal';
import { ListContextProvider } from '../contexts/ListContext';
import { getCompany } from '../actions/getCompany';

const ListsScreen = () => {
    const { 
        listsState, 
        listsDispatch, 
        companyState, 
        companyDispatch,
        companiesState,
        companiesDispatch } = useContext(MainContext);
    const { loginState } = useContext(LoginContext);
    const { lists } = listsState;
    const history = useHistory();

    useEffect(() => {
        if (loginState.jwtoken) {
            getLists(listsDispatch, loginState.jwtoken);

        } else {
            history.push('/login');
        }
    },[loginState.username]);

    useEffect(() => {
        if (!companiesState.companies.length > 0) {
            getCompanies(companiesDispatch);
        }
    }, []);

    const handleSelectCompany = (e) => {
        getCompany(companyDispatch, e.target.dataset.ticker);
    }

    return (
        <ListContextProvider>
        <div className="lists-screen">
            {/* { !loginState.jwtoken ? <Auth /> : ( */}
                <React.Fragment>
                    <QuoteSearch />
                    <div className="lists-outter-container">
                        { listsState.loading ? <div className="loader-wrapper"><Loader /></div> : (
                            <React.Fragment>
                                <div className="lists-container">
                                    { lists.length > 0 && (
                                        lists.map(list => (
                                            <ListWrapper 
                                                list={list}
                                                key={`${list.list_name}${list.id}`}
                                                handleSelect={handleSelectCompany} />
                                        ))
                                    )}
                                </div>
                                <div className="side-menu-container">
                                    <SideMenu />
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </React.Fragment>
            {/* )} */}
            { companyState.loading ? <div className="loader-wrapper"><Loader /></div> :
                (Object.keys(companyState.companyObj).length > 0 && (
                    <QuoteModal dispatch={companyDispatch} company={companyState} />
                ))
            }
            <NewListModal />
        </div>
        </ListContextProvider>
    )
}

export default ListsScreen;