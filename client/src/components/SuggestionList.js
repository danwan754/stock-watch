import React from 'react';

function SuggestionList(props) {

    const { companies, handleSelect } = props; 

    return (
        <div className="suggestionList">
            {companies.map(item => (
                <div key={item.ticker} className="tickerAndCompany" onClick={handleSelect}>
                    ({item.ticker}) &nbsp; {item.company}
                </div>
            ))}
        </div>
    );
}

export default SuggestionList;