import { LIST_MODAL_OPEN, LIST_MODAL_CLOSE, LIST_MODAL_LOADING_REQUEST, LIST_MODAL_LOADING_SUCCESS, LIST_MODAL_LOADING_FAIL } from '../constants/listConstants';

export const listReducer = (state, action) => {
    switch(action.type) {
        case LIST_MODAL_OPEN:
            return {
                ...state,
                isOpen: true
            }
        case LIST_MODAL_CLOSE:
            return {
                ...state,
                isOpen: false
            }
        case LIST_MODAL_LOADING_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LIST_MODAL_LOADING_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case LIST_MODAL_LOADING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            throw new Error();
    }
}