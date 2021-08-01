import { UPDATE_LIST_LOADING_FAIL, UPDATE_LIST_LOADING_REQUEST, UPDATE_LIST_LOADING_SUCCESS } from "../constants/updateListConstants";
import { deleteCompany } from "./deleteCompany";
import { addCompany } from './addCompany';


export const updateList = async (dispatch, list, title, checkboxes, jwtoken) => {
    dispatch({ type: UPDATE_LIST_LOADING_REQUEST });
    const toDeleteTickers = [];
    const toAddTickers = [];
    for (const checkbox of checkboxes) {
        const ticker = checkbox.dataset.ticker;
        const hasTicker = Object.keys(list.list).includes(ticker);

        if (checkbox.checked) {
             if (!hasTicker) { 
                 toAddTickers.push(ticker);
             }
        } else {
            if (hasTicker) {
                toDeleteTickers.push(ticker);
            }
        }
    };

    // console.log(toAddTickers);
    // console.log(toDeleteTickers);
    await Promise.allSettled([toDeleteTickers.length > 0 ? deleteCompany(list.id, toDeleteTickers.join(','), jwtoken) : null, 
        toAddTickers.length > 0 ? addCompany(list.id, toAddTickers.join(','), jwtoken) : null])
    .then(res => {
        dispatch({ type: UPDATE_LIST_LOADING_SUCCESS });
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: UPDATE_LIST_LOADING_FAIL, error: err.message });
    });    
}