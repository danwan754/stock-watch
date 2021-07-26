import { COMPANY_LOADING_REQUEST, COMPANY_LOADING_SUCCESS, COMPANY_LOADING_FAIL, COMPANY_RESET } from "../constants/companyConstants";

export const companyReducer = (state, action) => {
    switch(action.type) {
        case COMPANY_LOADING_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case COMPANY_LOADING_SUCCESS:
            return {
                ...state,
                companyObj: action.payload.companyObj,
                news: action.payload.news,
                loading: false
            }

        case COMPANY_LOADING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case COMPANY_RESET:
            return {
                ...state,
                companyObj: '',
                news: []
            }

        default:
            throw new Error();
    }
}