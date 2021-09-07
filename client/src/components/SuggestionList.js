import React, { useEffect, useState } from 'react';

import '../css/components/SuggestionList.css';

function SuggestionList(props) {

    const { companies, handleSelect } = props; 
    const [cursor, setCursor] = useState(0);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [cursor]);

    const handleKeyDown = (e) => {
        if (e.keyCode === 40) {
            setCursor(cursor => (cursor < companies.length - 1 ? cursor + 1 : cursor));
        } else if (e.keyCode === 38) {
            setCursor(cursor => (cursor > 0 ? cursor - 1 : cursor));
        } else if (e.keyCode === 13) {
            handleSelect(cursor);
        }
    }

    return (
        <div className="suggestionList">
            {companies.map((item, i) => (
                <div 
                    key={item.ticker} 
                    data-ticker={item.ticker}
                    className={cursor === i ? "suggestion-item item-focused" : "suggestion-item"} 
                    onClick={() => handleSelect(i)}
                >
                    ({item.ticker}) &nbsp; {item.company}
                </div>
            ))}
        </div>
    );
}

export default SuggestionList;