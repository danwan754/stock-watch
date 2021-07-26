import axios from "axios";

export const getCompanyInfo = (ticker) => {
    return (
        axios.get('/stock/' + ticker + '/quote')
        .then(res => {
            return res.data;
        }) 
        .catch(err => {
            throw err;
        })
    );
}

export const getCompanyLogo = (ticker) => {
    // console.log('/stock/' + ticker + '/logo');
    
    return (
        axios.get('/stock/' + ticker + '/logo')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            throw err;
        })
    );
}

export const getCompanyNews = (ticker) => {
    return (
        axios.get('/stock/' + ticker + '/news/yahoo')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            throw err;
        })
    );
}