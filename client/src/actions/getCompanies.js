import Axios from "axios";
import { COMPANIES_LOADING_SUCCESS, COMPANIES_LOADING_REQUEST, COMPANIES_LOADING_FAIL } from '../constants/companiesConstants'; 

const getCompanies = (dispatch) => {
    dispatch({
        type: COMPANIES_LOADING_REQUEST
    });
    Axios.get('/stock/companies')
    .then(res => {
        dispatch({
            type: COMPANIES_LOADING_SUCCESS,
            payload: res.data
        });
    })
    .catch(err => {
        dispatch({
            type: COMPANIES_LOADING_FAIL,
            error: err.message
        });
    });
}

export default getCompanies;