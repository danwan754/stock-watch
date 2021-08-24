import Axios from 'axios';
import { LISTS_CLEAR, LISTS_LOADING_FAIL, LISTS_LOADING_REQUEST, LISTS_LOADING_SUCCESS } from '../constants/listsConstants';

export const getLists = async (dispatch, jwt) => {
    dispatch({ 
        type: LISTS_LOADING_REQUEST 
    });
    await Axios.get('/user/lists', { 
        headers: {
            Authorization: `token ${jwt}`
        }
    })
    .then(res => {
        dispatch({ 
            type: LISTS_LOADING_SUCCESS, 
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

export const  clearLists = (dispatch) => {
    dispatch({ type: LISTS_CLEAR });
}