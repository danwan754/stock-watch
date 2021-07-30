import axios from "axios";
import { LOGIN_LOADING_FAIL, LOGIN_LOADING_REQUEST, LOGIN_LOADING_SUCCESS, LOGOUT } from "../constants/loginConstants";

export const loginUser = (dispatch, username, password) => {
    dispatch({ type: LOGIN_LOADING_REQUEST });
    axios.post('/auth/login', {
        username,
        password
    })
    .then(res => {
        dispatch({ type: LOGIN_LOADING_SUCCESS, payload: { jwtoken: res.data.accessToken, username } });
    })
    .catch(err => {
        dispatch({ type: LOGIN_LOADING_FAIL, error: err.response.data.message || err.message });
    });
}

export const logOutUser = (dispatch) => {
    // delete cookie!

    dispatch({ type: LOGOUT });
}