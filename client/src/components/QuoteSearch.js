import React, { useContext, useEffect, useState } from 'react';
import getCompanies from '../actions/getCompanies';
import { MainContext } from '../contexts/MainContext';
import { searchOccurrences } from '../util/quoteHelper';

import SuggestionList from '../components/SuggestionList';
import { getCompany } from '../actions/getCompany';

function QuoteSearch(props) {

    const [search, setSearch] = useState('');
    const [companies, setCompanies] = useState([]);

    const { companiesState, companiesDispatch, companyDispatch } = useContext(MainContext);

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
        // const regex = /(?<=\().*(?=\))/;
        const regex = /(?<=\()[^\)]*/;
        const ticker = event.target.textContent.match(regex);
        // console.log(ticker);
        getCompany(companyDispatch, ticker);
        setSearch(event.target.textContent);
        setCompanies([]);
    }

    return (
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
        </div> 
    )
}

export default QuoteSearch;