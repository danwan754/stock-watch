import Axios from 'axios';
import { LISTS_LOADING_FAIL, LISTS_LOADING_REQUEST, LISTS_LOADING_SUCCESS } from '../constants/listsConstants';
import { tickerAndCompanyLists } from '../util/listsHelper';

export const getLists = async (dispatch, companies, jwt) => {
    dispatch({ 
        type: LISTS_LOADING_REQUEST 
    });
    await Axios.get('/user/lists', { 
        headers: {
            Authorization: `token ${jwt}`
        }
    })
    .then(res => {
        // const lists = tickerAndCompanyLists(companies, res.data);
        dispatch({ 
            type: LISTS_LOADING_SUCCESS, 
            // payload: lists
            payload: res.data
        });
    })
    .catch(err => {
        console.log(err);
        dispatch({ 
            type: LISTS_LOADING_FAIL,
            error: err.message 
        });
    })
}