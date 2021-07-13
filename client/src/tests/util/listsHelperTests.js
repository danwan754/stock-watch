import { tickerAndCompanyLists } from "../../util/listsHelper.js";

const testTickerAndCompanyLists = () => {
    const companies = [
        {ticker:'blah', company:'blahcomp'},
        {ticker:'am',company:'amcomp'}, 
        {ticker:'able',company:'ablecomp'}, 
        {ticker:'sam',company:'samcomp'}, 
        {ticker:'amateur',company:'amateurcomp'},
        {ticker:'zoo',company:'zooman'}
    ];
    const lists1 = [
        {list_name: 'tech', list: ['blah', 'sam']}
    ];
    const lists2 = [
        {list_name: 'tech', list: ['blah', 'sam']},
        {list_name: 'tech2', list: ['am', 'zoo']},
        {list_name: 'tech3', list: ['amateur', 'NOTHING']}
    ];

    // expected: [{listName: 'tech', list: [{ticker:'blah',company:'blahcomp'},{ticker:'sam',company:'samcomp'}]}]
    console.log(tickerAndCompanyLists(companies, lists1));

    console.log(tickerAndCompanyLists(companies, lists2));
}

testTickerAndCompanyLists();