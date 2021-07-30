import axios from 'axios';

import { COMPANY_TO_LIST_LOADING_FAIL, COMPANY_TO_LIST_LOADING_REQUEST, COMPANY_TO_LIST_LOADING_SUCCESS } from '../constants/companyToListConstants';

export const addCompany = (listID, ticker, jwtoken) => {
    const data = {
        list_id: listID,
        ticker: ticker
    };
    const headers = {
        headers: {
            Authorization: `token ${jwtoken}`
        }
    };
    return (
        axios.post(`/user/ticker/add`, data, headers)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(`Failed to add ${ticker} to list (id: ${listID})`);
        })
    );
}

export const deleteCompany = (listID, ticker, jwtoken) => {
    const config = {
        params: {
            list_id: listID,
            ticker: ticker
        },
        headers: {
            Authorization: `token ${jwtoken}`
        }
    }
    return (
        axios.delete(`/user/ticker/remove`, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(`Failed to delete ${ticker} to list (id: ${listID})`);
        })
    );
}

export const updateLists = async (checkboxes, ticker, dispatch, lists, jwtoken) => {
    dispatch({ type: COMPANY_TO_LIST_LOADING_REQUEST });
    await Promise.all(checkboxes.map(checkbox => {
        for (const list of lists) {
            if (checkbox.id == list.id) {                
                const hasTicker = Object.keys(list.list).includes(ticker);
                if (checkbox.checked) {
                    return hasTicker ? null : addCompany(list.id, ticker, jwtoken);
                } else {
                    return hasTicker ? deleteCompany(list.id, ticker, jwtoken) : null;
                }          
            }
        }
        return false;
    }))
    .then(values => {
        dispatch({ type: COMPANY_TO_LIST_LOADING_SUCCESS });
    })
    .catch(err => {
        console.log(`Failed to delete ${ticker} from lists.`);
        dispatch({ type: COMPANY_TO_LIST_LOADING_FAIL, error: err.message });
    });
}