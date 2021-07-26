import axios from 'axios';

import { COMPANY_TO_LIST_LOADING_FAIL, COMPANY_TO_LIST_LOADING_REQUEST, COMPANY_TO_LIST_LOADING_SUCCESS } from '../constants/companyToListConstants';

export const deleteCompany = (listIDs, ticker, dispatch) => {
    dispatch({ type: COMPANY_TO_LIST_LOADING_REQUEST });
    Promise.all(listIDs.map(id => {
        return (
            axios.post(`/user/list/delete`, {
                list_id: id,
                ticker: ticker
            })
            .then(res => {
                dispatch({ type: COMPANY_TO_LIST_LOADING_SUCCESS });
            })
            .catch(err => {
                console.log(`Failed to delete ${ticker} to list (id: ${id})`);
                dispatch({ type: COMPANY_TO_LIST_LOADING_FAIL, error: err.message });
            })
        )
    }));
}