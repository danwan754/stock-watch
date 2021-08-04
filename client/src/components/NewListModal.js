import React, { useContext } from 'react';
import { NEW_LIST_MODAL_CLOSE } from '../constants/newListModalConstants';
import { NewListContext } from '../contexts/NewListContext';
import { LoginContext} from '../contexts/LoginContext';

import { createList } from '../actions/createList';
import { getLists } from '../actions/getLists';
import { MainContext } from '../contexts/MainContext';
import '../css/components/NewListModal.css';


function NewListModal(props) {
    const { newListState, newListDispatch } = useContext(NewListContext);
    const { loginState } = useContext(LoginContext);
    const { listsDispatch } = useContext(MainContext);
    const { jwtoken } = loginState;
    const { isOpen } = newListState;

    const handleClose = () => {
        newListDispatch({ type: NEW_LIST_MODAL_CLOSE });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        await createList(newListDispatch, name, jwtoken);
        getLists(listsDispatch, jwtoken);
        newListDispatch({ type: NEW_LIST_MODAL_CLOSE });
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
                    <input type='text' name='name' className='new-list-name-input' />
                    <input type='submit' className='new-list-name-submit' value='Done' />
                </form>
            </div>
        </div>
        </div>
    )
}

export default NewListModal;