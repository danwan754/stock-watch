import { LISTS_LOADING_REQUEST, LISTS_LOADING_SUCCESS, LISTS_LOADING_FAIL } from '../constants/listsConstants';


export const listsReducer = (state, action) => {
    switch(action.type) {
        case LISTS_LOADING_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case LISTS_LOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                lists: action.payload
            }
        
        case LISTS_LOADING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        
        default:
            throw new Error();
    }
}