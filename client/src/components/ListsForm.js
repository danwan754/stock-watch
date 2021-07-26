import React, { useContext, useReducer, useState } from 'react';
import { getLists } from '../actions/getLists';
import { updateLists } from '../actions/updateLists';
import { MainContext } from '../contexts/MainContext';
import { companyToListReducer } from '../reducers/companyToListReducer';
import Loader from './Loader';
import '../css/components/ListsForm.css';

function ListsForm(props) {

    const { 
        listsState,
        listsDispatch,
        companyState,
        loginState,
        companiesState 
    } = useContext(MainContext);
    const [listsUpdateState, listsUpdateDispatch] = useReducer(companyToListReducer, {loading: false, error: null});
    const [saved, setSaved] = useState(false);
    const { lists } = listsState;
    const { companyObj } = companyState;
    const { companies } = companiesState;
    const { jwtoken } = loginState;

    const handleForm = async (e) => {
        e.preventDefault();
        const checkboxes = document.getElementById('addToListForm').elements['listName'];
        await updateLists(Array.from(checkboxes), companyObj.symbol, listsUpdateDispatch, lists, jwtoken);
        listsUpdateState.error ? setSaved(false) : setSaved(true);
        
        //refresh lists
        await getLists(listsDispatch, companies, jwtoken);
    }

    const handleChange = () => {
        setSaved(false);
    }

    const containsTicker = (listID) => {
        for (const list of lists) {
            if (list.id == listID) {
                return Object.keys(list.list).includes(companyObj.symbol);
            }
        }
        return false;
    }

    return (
        <div className="lists-form-container">
            <form onSubmit={handleForm} onChange={handleChange} id="addToListForm">
                { lists.map(list => (
                    <div key={list.id} className="lists-form-item">
                        <label htmlFor={list.id}>{list.list_name}</label>
                        <input type="checkbox" name="listName" id={list.id} value={list.list_name} defaultChecked={containsTicker(list.id)}/>
                        <br/>
                    </div>
                ))}
                <div className="lists-form-save-container">
                    <input type="submit" value="Save" className="lists-form-item"/>
                    <img src="check.png" alt="checkmark" className={saved ? 'show-mark' : 'hide-mark'} />
                </div>
            </form>
            { listsUpdateState.loading ? <div className="lists-form-loader-wrapper"><Loader mini={true} /></div> : '' }
        </div>
    )
}

export default ListsForm;