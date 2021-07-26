import React from 'react';

import '../css/components/Loader.css';

function Loader(props) {
    const loaderSize = props.mini ? 'mini' : 'max';
    return (
        <div className="loader-container">
            <div className={`loader ${loaderSize}`} >
            </div>
        </div>
    )
}

export default Loader;