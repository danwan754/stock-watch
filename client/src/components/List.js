import React, { useState } from 'react';

import { formatNum } from '../util/quoteHelper';
import '../css/components/List.css';
import ListEdit from './ListEdit';

function List(props) {

    const { list } = props;
    const [isEdit, setIsEdit] = useState(false);


    const handleEdit = () => {
        setIsEdit(true);
    }

    return (
        <React.Fragment>
        {isEdit ? <ListEdit list={list} setIsEdit={setIsEdit} />
        : (
        <ul className="list-container">
            <li className="list-title" key={`${list.id}title`}>
                <span>{list.list_name}</span>
                <img src='edit.png' alt='edit' onClick={handleEdit} width='20px' height='20px' className="pointer-events-on"/>
            </li>
            { Object.keys(list.list).length > 0 ? (
                Object.keys(list.list).map(ticker => (
                    <li key={`${list.list.id}${ticker}`} data-ticker={ticker} onClick={props.handleSelect} className="list-item no-pointer-events">
                        <span>{ticker}<br/>{list.list[ticker].quote.companyName}</span>
                        <span className="price-container">
                            <span className="price-current">{formatNum(list.list[ticker].quote.latestPrice)}</span><br/>
                            {list.list[ticker].quote.changePercent > 0 ? (
                                <span className={"price-change positive-color"}>+{(formatNum(list.list[ticker].quote.changePercent * 100))}%</span>
                                ) : <span className={"price-change negative-color"}>{(formatNum(list.list[ticker].quote.changePercent * 100))}%</span>
                            }
                        </span>
                    </li>
                ))
            ) : ''
            }
        </ul>
        )}
        </React.Fragment>
    )
}

export default List;