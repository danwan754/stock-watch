import axios from "axios"
import { LOGIN_LOADING_FAIL, LOGIN_LOADING_REQUEST, LOGIN_LOADING_SUCCESS, LOGOUT } from "../constants/loginConstants";

export const refreshToken = (dispatch) => {
    // dispatch({ type: LOGIN_LOADING_REQUEST });
    const config = {};
    return (
        axios.post('/auth/token', config)
        .then(res => {
            dispatch({ 
                type: LOGIN_LOADING_SUCCESS, 
                payload: { 
                    jwtoken: res.data.accessToken,
                    expiresAt: res.data.expiresAt, 
                    username: res.data.username
                }
            });
            return {
                jwtoken: res.data.accessToken,
                expiresAt: res.data.expiresAt
            }
        })
        .catch(err => {
            // dispatch({ type: LOGIN_LOADING_FAIL, error: err.message });
            if (err.response) {
                console.log("error: " + err.response.status);
                if (err.response.status === 403 || err.response.status === 401) {
                    dispatch({ type: LOGOUT });
                    return {
                        path: '/login',
                        shallLogOut: true
                    }
                }
            }
            throw err;
        })
    )
}