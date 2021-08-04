import React from 'react';

import List from './List';
import '../css/components/ListWrapper.css';

function ListWrapper(props) {

    return (
        <div className="list-wrapper">
            <List 
                list={props.list}
                handleSelect={props.handleSelect} />
        </div>
    )
}

export default ListWrapper;