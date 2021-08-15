import { LOGIN_LOADING_FAIL, LOGIN_LOADING_REQUEST, LOGIN_LOADING_SUCCESS, LOGOUT } from '../constants/loginConstants';
import { loginInitialState } from '../initialStates/login';

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
                expiresAt: action.payload.expiresAt,
                username: action.payload.username,
                error: null
            };

        case LOGIN_LOADING_FAIL:
            return {
                ...loginInitialState,
                error: action.error
            };
        case LOGOUT:
            return loginInitialState;
            
        default:
            throw new Error();
    }
}