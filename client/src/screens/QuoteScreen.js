import React, { useState } from 'react';

function QuoteScreen(props) {

    const [value, setValue] = useState('');

    const resetSearch = () => {
        setValue('');
    }

    const updateSearch = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="quote-screen-container">
            <div className="search-bar-container">
                <input type="text" onChange={updateSearch} value={value} />
                {value && <input type="button" value="x" onClick={resetSearch} />}
            </div>
        </div>
    );
}

export default QuoteScreen;