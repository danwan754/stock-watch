import React, { useContext, useReducer, useState } from 'react';

import Loader from './Loader';
import '../css/components/List.css';
import { updateList } from '../actions/updateList';
import { LoginContext } from '../contexts/LoginContext';
import { MainContext } from '../contexts/MainContext';
import { ListContext } from '../contexts/ListContext';
import { updateListReducer } from '../reducers/updateListReducer';
import { updateListInitialState } from '../initialStates/updateList';
import { getLists } from '../actions/Lists';
import { deleteList } from '../actions/deleteList';

function ListEdit(props) {

    const { list } = props;
    const [title, setTitle] = useState(list.list_name);
    const [saved, setSaved] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const { loginState } = useContext(LoginContext);
    const { listsDispatch } = useContext(MainContext)
    const { listDispatch } = useContext(ListContext);
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

    const toggleShowDelete = () => {
        setShowDelete(!showDelete);
    }
    const handleDelete = async (e) => {
        toggleShowDelete();
        await deleteList(listDispatch, list.id, jwtoken);
        getLists(listsDispatch, jwtoken);
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
            {/* <form onSubmit={handleFormSubmit} id="updateListForm"> */}
                <ul className="list-container" id={`list-container${list.id}`}>
                    <li className="list-edit-header"> 
                        <input type='button' value='<' onClick={()=>props.setIsEdit(false)} />
                        <span>Edit</span>
                        <div className='list-edit-trash'>
                            <input
                                type='image' 
                                src='delete.png' 
                                alt='delete'
                                onClick={toggleShowDelete}
                                 />
                            {showDelete ? (
                                <div className='tooltip-delete'>
                                    <div>Delete this list?</div>
                                    <input
                                        type='button' 
                                        value='Delete'
                                        onClick={handleDelete}
                                        className="confirmed-delete-button" />
                                    <input
                                        type='button'
                                        value='Cancel'
                                        onClick={toggleShowDelete}
                                        className="cancel-delete-button" />
                                </div>
                            ) : ''}
                        </div>
                        {saved ? <img src='check.png' alt='saved' width='25px' /> 
                            : <input 
                                type='image'
                                src='save.png'
                                alt='save'
                                onClick={handleFormSubmit} />
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
            {/* </form> */}
        </React.Fragment>
    )
}

export default ListEdit;