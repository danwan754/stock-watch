import React, { useContext, useReducer, useState } from 'react';

import Loader from './Loader';
import '../css/components/List.css';
import { updateList } from '../actions/updateList';
import { LoginContext } from '../contexts/LoginContext';
import { MainContext } from '../contexts/MainContext';
import { updateListReducer } from '../reducers/updateListReducer';
import { updateListInitialState } from '../initialStates/updateList';
import { getLists } from '../actions/getLists';

function ListEdit(props) {

    const { list } = props;
    const [title, setTitle] = useState(list.list_name);
    const [saved, setSaved] = useState(false);
    const { loginState } = useContext(LoginContext);
    const { listsDispatch } = useContext(MainContext)
    const [updateListState, updateListDispatch] = useReducer(updateListReducer, updateListInitialState);
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const checkboxes = document.getElementById(`list-container${list.id}`).querySelectorAll('input[type="checkbox"]');
        await updateList(updateListDispatch, list, title, Array.from(checkboxes), jwtoken);
        setSaved(true);
        await getLists(listsDispatch, jwtoken);
    }

    const unsaved = () => {
        if (saved) { 
            setSaved(false); 
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={handleFormSubmit} id="updateListForm">
                <ul className="list-container" id={`list-container${list.id}`}>
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
                {updateListState.loading ? <Loader /> : ''}
            </form>
        </React.Fragment>
    )
}

export default ListEdit;