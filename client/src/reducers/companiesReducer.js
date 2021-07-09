import { COMPANIES_LOADING_SUCCESS, COMPANIES_LOADING_FAIL, COMPANIES_LOADING_REQUEST } from '../constants/companiesConstants';

export const companiesReducer = (state, action) => {
    switch(action.type) {
        case COMPANIES_LOADING_REQUEST:
            return {
                ...state,
                loading: true
            };
        
        case COMPANIES_LOADING_SUCCESS:
            return {
                ...state,
                loading: false,
                companies: action.payload
            };
        
        case COMPANIES_LOADING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        
        default:
            throw new Error();
    }
}