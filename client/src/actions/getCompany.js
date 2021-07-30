import { COMPANY_LOADING_FAIL, COMPANY_LOADING_REQUEST, COMPANY_LOADING_SUCCESS } from "../constants/companyConstants"
import { getCompanyInfo, getCompanyLogo, getCompanyNews } from "./company";


export const getCompany = (dispatch, ticker) => {
    dispatch({ type: COMPANY_LOADING_REQUEST});
    Promise.allSettled([getCompanyInfo(ticker), getCompanyLogo(ticker), getCompanyNews(ticker)])
    .then(values => {
        let companyObj = {
            ...values[0].value || null, 
            logoURL: values[1].value.url || null
        };
        dispatch({ type: COMPANY_LOADING_SUCCESS, payload: { companyObj, news: values[2].value || [] }});
    })
    .catch(err => {
        dispatch({ type: COMPANY_LOADING_FAIL, error: err.message });
    });
}