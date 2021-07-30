import { UPDATE_LIST_LOADING_REQUEST } from "../constants/updateListConstants";
import { deleteCompany } from "./deleteCompany";


export const updateList = (dispatch, list, title, checkboxes, jwtoken) => {
    dispatch({ type: UPDATE_LIST_LOADING_REQUEST });
    const toDeleteTickers = [];
    const toAddTickers = [];
    for (checkbox of checkbxoes) {
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

    console.log(toAddTickers);
    console.log(toDeleteTickers);

    deleteCompany(list.id, toDeleteTickers.join(','), jwtoken);
    
    
}