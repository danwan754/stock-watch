
export const tickerAndCompanyLists = (companies, tickerLists) => {
    const lists = tickerLists.map(list => ({
        listName: list.list_name,
        list: list.list.map(item => (
            companies.find(company => company.ticker === item)
        ))
        
    }));
    return lists;
}