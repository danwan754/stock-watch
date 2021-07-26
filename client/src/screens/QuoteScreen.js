import React, { useContext, useEffect, useReducer, useState } from 'react';
import getCompanies from '../actions/getCompanies';
import { MainContext } from '../contexts/MainContext';
import QuoteDetails from '../components/QuoteDetails';
// import QuoteNews from '../components/QuoteNews';
import QuoteNewsYahoo from '../components/QuoteNewsYahoo';
import Loader from '../components/Loader';
import QuoteSearch from '../components/QuoteSearch';
import '../css/screens/QuoteScreen.css';

function QuoteScreen(props) {

    const { companiesState, companiesDispatch, companyState } = useContext(MainContext);

    useEffect(() => {
        if (!companiesState.companies.length > 0) {
            getCompanies(companiesDispatch);
        }
    }, []);

    console.log(companiesState.loading);
    return (
        <div className="quote-screen-container">
            { companiesState.loading ? <Loader /> : <QuoteSearch />}
            { companyState.loading ? <Loader />
            : (Object.keys(companyState.companyObj).length > 0 ? (
                <React.Fragment>
                    <div className="quote-results-wrapper">
                        <QuoteDetails company={companyState.companyObj} />
                    </div>
                    <div className="quote-results-wrapper">
                        {/* <QuoteNews news={news} /> */}
                        <QuoteNewsYahoo news={companyState.news} />
                    </div>
                </React.Fragment>
            )   
            : (<div></div>)
            )}
        </div>
    );
}

export default QuoteScreen;