export const deleteCompany = (listID, tickers, jwtoken) => {
    const config = {
        params: {
            list_id: listID,
            tickers: tickers
        },
        headers: {
            Authorization: `token ${jwtoken}`
        }
    }
    return (
        axios.delete(`/user/tickers/remove`, config)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(`Failed to delete ${tickers} in list (id: ${listID})`);
        })
    );
}