import { UPDATE_LIST_LOADING_FAIL, UPDATE_LIST_LOADING_REQUEST, UPDATE_LIST_LOADING_SUCCESS } from "../constants/updateListConstants";


export const updateListReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_LIST_LOADING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_LIST_LOADING_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case UPDATE_LIST_LOADING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        default:
            throw new Error();
    }
}