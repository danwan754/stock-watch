import Axios from 'axios';

import url from './url.js';
import { insertCompany } from './data_access.js';


const updateStockTable = () => {
    Axios.get(url.companiesURL())
    .then(res => {
        res.data.forEach((item, index) => {
            insertCompany(item.symbol, item.name);    
        });
    })
    .catch(err => {
        throw err;
    });
}

updateStockTable();
