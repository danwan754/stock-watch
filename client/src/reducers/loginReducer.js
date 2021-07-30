import { LOGIN_LOADING_FAIL, LOGIN_LOADING_REQUEST, LOGIN_LOADING_SUCCESS, LOGOUT } from '../constants/loginConstants';

export const loginReducer = (state, action) => {
    switch(action.type) {
        case LOGIN_LOADING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case LOGIN_LOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                jwtoken: action.payload.jwtoken,
                username: action.payload.username,
                error: null
            };

        case LOGIN_LOADING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case LOGOUT:
            return {
                ...state,
                error: null,
                username: '',
                jwtoken: ''
            }
        default:
            throw new Error();
    }
}