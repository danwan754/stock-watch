import React from 'react';

function List(props) {

    const { list } = props;

    return (
        <div className="list-container">
            <ul>
                <li className="list-title">
                    {list.title}
                </li>
                { list.map(item => (
                    <li key={item.ticker}>
                        {item.ticker}
                        {item.company}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default List;