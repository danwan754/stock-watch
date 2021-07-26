import React from 'react';

import { formatNum } from '../util/quoteHelper';
import '../css/components/List.css';

function List(props) {

    const { list } = props;

    return (
        <ul className="list-container">
            <li className="list-title" key={`${list.id}title`}>
                {list.list_name}
            </li>
            { Object.keys(list.list).length > 0 ? (
                Object.keys(list.list).map(ticker => (
                    <li key={`${list.list.id}${ticker}`} data-ticker={ticker} onClick={props.handleSelect}>
                        <span>{ticker}<br/>{list.list[ticker].quote.companyName}</span>
                        <span>
                            <span className="price-current">{formatNum(list.list[ticker].quote.latestPrice)}</span><br/>
                            {list.list[ticker].quote.changePercent > 0 ? (
                                <span className={"price-change positive-color"}>+{(formatNum(list.list[ticker].quote.changePercent * 100))} %</span>
                                ) : <span className={"price-change negative-color"}>{(formatNum(list.list[ticker].quote.changePercent * 100))} %</span>
                            }
                        </span>
                    </li>
                ))
            ) : ''
            }
        </ul>
    )
}

export default List;