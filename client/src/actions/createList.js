import axios from "axios";
import { LIST_MODAL_LOADING_FAIL, LIST_MODAL_LOADING_REQUEST, LIST_MODAL_LOADING_SUCCESS } from "../constants/listConstants";

export const createList = async (dispatch, listName, jwtoken) => {

    dispatch({ type: LIST_MODAL_LOADING_REQUEST });

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
        dispatch({ type: LIST_MODAL_LOADING_SUCCESS });
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: LIST_MODAL_LOADING_FAIL });
    });
}