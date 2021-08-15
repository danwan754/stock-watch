import { LISTS_LOADING_REQUEST, LISTS_LOADING_SUCCESS, LISTS_LOADING_FAIL, LISTS_CLEAR } from '../constants/listsConstants';
import { listsInitialState } from '../initialStates/lists';


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
        
        case LISTS_CLEAR:
            return listsInitialState;

        default:
            throw new Error();
    }
}