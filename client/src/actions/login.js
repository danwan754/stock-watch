import axios from "axios";
import { LOGIN_LOADING_FAIL, LOGIN_LOADING_REQUEST, LOGIN_LOADING_SUCCESS, LOGOUT, RESET_ERROR } from "../constants/loginConstants";

export const loginUser = (dispatch, username, password) => {
    dispatch({ type: LOGIN_LOADING_REQUEST });
    return (
        axios.post('/auth/login', {
            username,
            password
        })
        .then(res => {
            dispatch({ 
                type: LOGIN_LOADING_SUCCESS, 
                payload: { 
                    jwtoken: res.data.accessToken,
                    expiresAt: res.data.expiresAt, 
                    username 
                } 
            });
            return {
                jwtoken: res.data.accessToken,
                expiresAt: res.data.expiresAt
            }
        })
        .catch(err => {
            dispatch({ 
                type: LOGIN_LOADING_FAIL, 
                error: err.response.data.message || err.message 
            });
        })
    );
}

export const resetLoginError = (dispatch) => {
    dispatch({ type: RESET_ERROR });
}

export const logOutUser = (dispatch) => {
    return (
        axios.post('/auth/logout')
        .then(res => {
            dispatch({ type: LOGOUT });
        })
        .catch(err => {
            console.log("error while logging out: ");
            console.log(err);
        })
    )
}