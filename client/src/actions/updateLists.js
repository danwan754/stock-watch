import { COMPANY_TO_LIST_LOADING_FAIL, COMPANY_TO_LIST_LOADING_REQUEST, COMPANY_TO_LIST_LOADING_SUCCESS } from '../constants/companyToListConstants';
import { addCompany } from './addCompany';
import { deleteCompany } from './deleteCompany';


export const updateLists = async (checkboxes, ticker, dispatch, lists, jwtoken) => {
    dispatch({ type: COMPANY_TO_LIST_LOADING_REQUEST });
    await Promise.all(checkboxes.map(checkbox => {
        console.log(ticker);
        for (const list of lists) {
            if (checkbox.id == list.id) {                
                const hasTicker = Object.keys(list.list).includes(ticker);
                if (checkbox.checked) {
                    console.log('add');
                    return hasTicker ? null : addCompany(list.id, ticker, jwtoken);
                } else {
                    console.log('delete');
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
        console.log(`Failed to delete ${ticker} from lists.`);
        dispatch({ type: COMPANY_TO_LIST_LOADING_FAIL, error: err.message });
    });
}