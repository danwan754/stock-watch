import { NEW_LIST_MODAL_OPEN, NEW_LIST_MODAL_CLOSE, NEW_LIST_MODAL_LOADING_REQUEST, NEW_LIST_MODAL_LOADING_SUCCESS, NEW_LIST_MODAL_LOADING_FAIL } from '../constants/newListModalConstants';

export const newListReducer = (state, action) => {
    switch(action.type) {
        case NEW_LIST_MODAL_OPEN:
            return {
                ...state,
                isOpen: true
            }
        case NEW_LIST_MODAL_CLOSE:
            return {
                ...state,
                isOpen: false
            }
        case NEW_LIST_MODAL_LOADING_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEW_LIST_MODAL_LOADING_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case NEW_LIST_MODAL_LOADING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            throw new Error();
    }
}