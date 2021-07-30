import { REGISTER_LOADING_REQUEST, REGISTER_LOADING_SUCCESS, REGISTER_LOADING_FAIL } from '../constants/registerConstants'; 

export const registerReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_LOADING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case REGISTER_LOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                registered: true
            }
        case REGISTER_LOADING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            throw new Error();
    }
}