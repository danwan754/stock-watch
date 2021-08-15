import React, { useContext, useState } from 'react';
import { LIST_MODAL_CLOSE } from '../constants/listConstants';
import { ListContext } from '../contexts/ListContext';
import { LoginContext} from '../contexts/LoginContext';

import { createList } from '../actions/createList';
import { getLists } from '../actions/Lists';
import { MainContext } from '../contexts/MainContext';
import '../css/components/NewListModal.css';
import { useHistory } from 'react-router-dom';


function NewListModal(props) {
    const [listName, setListName] = useState('');
    const { listState, listDispatch } = useContext(ListContext);
    const { loginState } = useContext(LoginContext);
    const { listsDispatch } = useContext(MainContext);
    const { jwtoken } = loginState;
    const { isOpen } = listState;

    const handleClose = () => {
        listDispatch({ type: LIST_MODAL_CLOSE });
    }

    const handleNameChange = (e) => {
        setListName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createList(listDispatch, listName, jwtoken);
        setListName('');
        getLists(listsDispatch, jwtoken);
        listDispatch({ type: LIST_MODAL_CLOSE });
    }

    return (
        <div className={`new-list-modal-container ${isOpen ? 'show-modal' : 'hide-modal'}`}>
        <div className={`modal`}>
            <div className="modal-content">
                <div className="modal-heading">
                    <h4>New List</h4>
                    <span className="close" onClick={handleClose}>&times;</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name: &nbsp;
                    </label>
                    <input 
                        type='text' 
                        className='new-list-name-input' 
                        onChange={handleNameChange}
                        value={listName} />
                    <input 
                        type='submit' 
                        className='new-list-name-submit' 
                        value='Done' />
                </form>
            </div>
        </div>
        </div>
    )
}

export default NewListModal;