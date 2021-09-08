import React, { useContext, useEffect, useState } from 'react';

import { MainContext } from '../contexts/MainContext';
import { searchOccurrences } from '../util/quoteHelper';
import SuggestionList from '../components/SuggestionList';
import { getCompany } from '../actions/getCompany';
import '../css/components/QuoteSearch.css';

function QuoteSearch(props) {

    const [search, setSearch] = useState('');
    const [companies, setCompanies] = useState([]);

    const { companiesState, companyDispatch } = useContext(MainContext);

    const resetSearch = () => {
        setSearch('');
        setCompanies([]);
    }

    const updateSearch = (event) => {
        const val = event.target.value;
        setSearch(val);
        setCompanies(searchOccurrences(val, companiesState.companies, 5));
    }

    const handleSelect = (index) => {
        if (index < 0) {
            return;
        }
        const { ticker, company } = companies[index];
        getCompany(companyDispatch, ticker);
        setSearch(`(${ticker}) ${company}`);
        setCompanies([]);
    }

    const selectText = (e) => {
        e.target.select();
    }

    return (
        <div className="search-bar-container">
            <div className="search-input-container">
                <label>
                    Company:
                </label>
                <div className="search-input-and-reset-container">
                    <input 
                        type="text" 
                        onChange={updateSearch} 
                        onClick={selectText}
                        value={search} 
                        className="searchInput" 
                    />
                    {search && <input type="button" value="x" onClick={resetSearch} className="searchInput-reset" />}
                </div>
            </div>
            {companies.length > 0  && <SuggestionList companies={companies} handleSelect={handleSelect} setCompanies={setCompanies} />}
        </div> 
    )
}

export default QuoteSearch;