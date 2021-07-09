import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import getCompanies from '../actions/getCompanies';
import { MainContext } from '../contexts/MainContext';
import { searchOccurrences } from '../util/quoteHelper';

import QuoteDetails from '../components/QuoteDetails';
// import QuoteNews from '../components/QuoteNews';
import QuoteNewsYahoo from '../components/QuoteNewsYahoo';
import SuggestionList from '../components/SuggestionList';
import Loader from '../components/Loader';

function QuoteScreen(props) {

    const [search, setSearch] = useState('');
    const [company, setCompany] = useState({});
    const [companies, setCompanies] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const { companiesState, companiesDispatch } = useContext(MainContext);

    useEffect(() => {
        if (!companiesState.companies.length > 0) {
            getCompanies(companiesDispatch);
        }
    }, []);

    const resetSearch = () => {
        setSearch('');
        setCompanies([]);
    }

    const updateSearch = (event) => {
        const val = event.target.value;
        setSearch(val);
        setCompanies(searchOccurrences(val, companiesState.companies, 5));
    }

    const handleSelect = (event) => {
        const regex = /(?<=\().*(?=\))/;
        const ticker = event.target.textContent.match(regex);
        setLoading(true);
        const companyInfoPromise = axios.get('/stock/' + ticker + '/quote')
            .then(res => {
                return res.data;
            }) 
            .catch(err => {
                throw err;
            });
        const companyLogoPromise = axios.get('/stock/' + ticker + '/logo')
            .then(res => {
                return res.data;
            })
            .catch(err => {
                throw err;
            });
        const companyNewsPromise = axios.get('/stock/' + ticker + '/news/yahoo')
            .then(res => {
                return res.data;
            })
            .catch(err => {
                throw err;
            });

        Promise.all([companyInfoPromise, companyLogoPromise, companyNewsPromise])
        .then(values => {
            let companyObj = {
                ...values[0], 
                logoURL: values[1].url
            };
            // console.log(companyObj);
            setCompany(companyObj);
            setSearch(event.target.textContent);
            setNews(values[2]);
            setCompanies([]);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            throw err;
        });
    }

    return (
        <div className="quote-screen-container">
            { companiesState.loading ? <Loader /> 
            : (
            <div className="search-bar-container">
                <div className="search-input-container">
                    <label>
                        Company:
                    </label>
                    <div className="search-input-and-reset-container">
                        <input type="text" onChange={updateSearch} value={search} className="searchInput" />
                        {search && <input type="button" value="x" onClick={resetSearch} className="searchInput-reset" />}
                    </div>
                </div>
                {companies.length > 0  && <SuggestionList companies={companies} handleSelect={handleSelect} />}
            </div> )
            }
            { loading ? <Loader />
            : (Object.keys(company).length > 0 ? (
                <React.Fragment>
                    <div className="quote-results-wrapper">
                        <QuoteDetails company={company} />
                    </div>
                    <div className="quote-results-wrapper">
                        {/* <QuoteNews news={news} /> */}
                        <QuoteNewsYahoo news={news} />
                    </div>
                </React.Fragment>
            )   
            : (<div></div>)
            )}
        </div>
    );
}

export default QuoteScreen;