
export const tickerAndCompanyLists = (companies, tickerLists) => {
    const lists = tickerLists.map(record => ({
        id: record.id,
        listName: record.list_name,
        list: record.list.map(item => (
            companies.find(company => company.ticker === item)
        ))
        
    }));
    return lists;
}