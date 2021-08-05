import axios from "axios";
import { 
    REGISTER_LOADING_FAIL,
    REGISTER_LOADING_REQUEST,
    REGISTER_LOADING_SUCCESS,
    REGISTER_PASSWORDS_NO_MATCH,
    REGISTER_PASSWORDS_NO_MATCH_MESSAGE } from "../constants/registerConstants";

export const validatePassword = (dispatch, password, confirmPassword) => {
    if (!(password === confirmPassword)) {
        dispatch({ type: REGISTER_PASSWORDS_NO_MATCH, error: REGISTER_PASSWORDS_NO_MATCH_MESSAGE });
        return false;
    }
    return true;
}

export const registerUser = (dispatch, username, password) => {
    dispatch({ type: REGISTER_LOADING_REQUEST });
    axios.post('/auth/register', {
        username,
        password,
    })
    .then(res => {
        if (!res.data.error) {
            // redirect to watch lists
            console.log(res.data);
            dispatch({ type: REGISTER_LOADING_SUCCESS });
        } else {
            dispatch({ type: REGISTER_LOADING_FAIL, error: res.data.error });
        }
    })
    .catch(err => {
        dispatch({ type: REGISTER_LOADING_FAIL, error: err.response.data.error || err.message });
    });
}