import axios from "axios";
import { NEW_LIST_MODAL_LOADING_FAIL, NEW_LIST_MODAL_LOADING_REQUEST, NEW_LIST_MODAL_LOADING_SUCCESS } from "../constants/newListModalConstants";

export const createList = async (dispatch, listName, jwtoken) => {

    dispatch({ type: NEW_LIST_MODAL_LOADING_REQUEST });

    const data = {
        list_name: listName
    };
    const headers = {
        headers: {
            Authorization: `token ${jwtoken}`
        }
    };

    await axios.post('/user/list/create', data, headers)
    .then(res => {
        dispatch({ type: NEW_LIST_MODAL_LOADING_SUCCESS });
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: NEW_LIST_MODAL_LOADING_FAIL });
    });
}