import axios from "axios";
import { LIST_MODAL_LOADING_FAIL, LIST_MODAL_LOADING_REQUEST, LIST_MODAL_LOADING_SUCCESS } from "../constants/listConstants";

export const deleteList = async (dispatch, listID, jwtoken) => {

    dispatch({ type: LIST_MODAL_LOADING_REQUEST });
    const config = {
        params: {
            list_id: listID
        },
        headers: {
            Authorization: `token ${jwtoken}`
        }
    }

    await axios.delete('/user/list/delete', config)
    .then(res => {
        dispatch({ type: LIST_MODAL_LOADING_SUCCESS });
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: LIST_MODAL_LOADING_FAIL });
    })
}