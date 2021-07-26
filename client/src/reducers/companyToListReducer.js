import { COMPANY_TO_LIST_LOADING_FAIL, COMPANY_TO_LIST_LOADING_REQUEST, COMPANY_TO_LIST_LOADING_SUCCESS } from "../constants/companyToListConstants"


export const companyToListReducer = (state, action) => {
    switch (action.type) {
        case COMPANY_TO_LIST_LOADING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case COMPANY_TO_LIST_LOADING_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case COMPANY_TO_LIST_LOADING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            throw new Error()
    }
}