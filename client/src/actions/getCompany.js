import { COMPANY_LOADING_FAIL, COMPANY_LOADING_REQUEST, COMPANY_LOADING_SUCCESS } from "../constants/companyConstants"
import { getCompanyInfo, getCompanyLogo, getCompanyNews } from "./company";


export const getCompany = (dispatch, ticker) => {
    dispatch({ type: COMPANY_LOADING_REQUEST});
    Promise.all([getCompanyInfo(ticker), getCompanyLogo(ticker), getCompanyNews(ticker)])
    .then(values => {
        let companyObj = {
            ...values[0], 
            logoURL: values[1].url
        };
        dispatch({ type: COMPANY_LOADING_SUCCESS, payload: { companyObj, news: values[2] }});
    })
    .catch(err => {
        dispatch({ type: COMPANY_LOADING_FAIL, error: err.message });
    });
}