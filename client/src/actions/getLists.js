import Axios from 'axios';
import { LISTS_LOADING_FAIL, LISTS_LOADING_REQUEST, LISTS_LOADING_SUCCESS } from '../constants/listsConstants';
import { tickerAndCompanyLists } from '../util/listsHelper';

export const getLists = (dispatch, companies) => {

    dispatch({ 
        type: LISTS_LOADING_REQUEST 
    });
    Axios.get('/user/lists')
    .then(res => {
        const lists = tickerAndCompanyLists(companies, res.data);
        dispatch({ 
            type: LISTS_LOADING_SUCCESS, 
            payload: lists
        });
    })
    .catch(err => {
        dispatch({ 
            type: LISTS_LOADING_FAIL,
            error: err.message 
        });
    })
}