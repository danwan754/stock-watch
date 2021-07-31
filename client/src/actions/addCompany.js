import axios from 'axios';

export const addCompany = (listID, tickers, jwtoken) => {
    const data = {
        list_id: listID,
        ticker: tickers
    };
    const headers = {
        headers: {
            Authorization: `token ${jwtoken}`
        }
    };

    return (
        axios.post(`/user/ticker/add`, data, headers)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(`Failed to add ${tickers} to list (id: ${listID})`);
        })
    );
}