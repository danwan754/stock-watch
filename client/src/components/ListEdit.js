import React, { useContext, useState } from 'react';

import '../css/components/List.css';
import { updateList } from '../actions/updateList';
import { LoginContext } from '../contexts/LoginContext';

function ListEdit(props) {

    const { list, dispatch } = props;
    const [title, setTitle] = useState(list.list_name);
    const [saved, setSaved] = useState(false);
    const [updateListState,]
    const { loginState } = useContext(LoginContext);
    const { jwtoken } = loginState;

    const handleFormTitle = (e) => {
        setTitle(e.target.value);
        unsaved();
    }

    const handleCheck = (e) => {
        const checkbox = e.target.querySelector('input');
        checkbox.checked = !checkbox.checked;
        unsaved();
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const checkboxes = document.getElementById('updateListForm').elements['check'];
        updateList(dispatch, list, title, Array.from(checkboxes), jwtoken);
        setSaved(true);
    }

    const unsaved = () => {
        if (saved) { 
            setSaved(false); 
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={handleFormSubmit} id="updateListForm">
                <ul className="list-container">
                    <li className="list-edit-header"> 
                        <input type='button' value='<' onClick={()=>props.setIsEdit(false)} />
                        <span>Edit</span>
                        {saved ? <img src='check.png' alt='saved' width='25px' /> 
                            : <input type='submit' value='Save' />
                        }
                    </li>
                    <li className="list-title-edit" key={`${list.id}title`}>
                        <input type='text' value={title} onChange={handleFormTitle} />
                    </li>
                    { Object.keys(list.list).length > 0 ? (
                        Object.keys(list.list).map(ticker => (
                            <li key={`${list.list.id}${ticker}`} data-ticker={ticker} onClick={handleCheck} className="list-item no-pointer-events">
                                <span>{ticker}<br/>{list.list[ticker].quote.companyName}</span>
                                <input type="checkbox" name="check" data-ticker={ticker} defaultChecked={true} />
                            </li>
                        ))
                    ) : ''}
                </ul>
            </form>
        </React.Fragment>
    )
}

export default ListEdit;