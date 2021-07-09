import { LOGIN_LOADING_FAIL, LOGIN_LOADING_REQUEST, LOGIN_LOADING_SUCCESS } from '../constants/loginConstants';

export const loginReducer = (state, action) => {
    switch(action.type) {
        case LOGIN_LOADING_REQUEST:
            return {
                ...state,
                loading: true
            }

        case LOGIN_LOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                jwtoken: action.payload
            }

        case LOGIN_LOADING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            throw new Error();
    }
}