import { COMPANY_TO_LIST_LOADING_FAIL, COMPANY_TO_LIST_LOADING_REQUEST, COMPANY_TO_LIST_LOADING_SUCCESS } from '../constants/companyToListConstants';
import { addCompany } from './addCompany';
import { deleteCompany } from './deleteCompany';


export const updateLists = async (checkboxes, ticker, dispatch, lists, jwtoken) => {
    dispatch({ type: COMPANY_TO_LIST_LOADING_REQUEST });
    await Promise.all(checkboxes.map(checkbox => {
        for (const list of lists) {
            if (checkbox.id == list.id) {
                const hasTicker = Object.keys(list.list).includes(ticker);
                if (checkbox.checked) {
                    return hasTicker ? null : addCompany(list.id, ticker, jwtoken);
                } else {
                    return hasTicker ? deleteCompany(list.id, ticker, jwtoken) : null;
                }          
            }
        }
        return false;
    }))
    .then(values => {
        dispatch({ type: COMPANY_TO_LIST_LOADING_SUCCESS });
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: COMPANY_TO_LIST_LOADING_FAIL, error: err.message });
    });
}