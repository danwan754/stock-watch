import { searchOccurrences } from "../util/quoteHelper.js";

const testSearchOccurences = () => {
    const source = [
        {ticker:'blah', company:'blahcomp'},
        {ticker:'am',company:'amcomp'}, 
        {ticker:'able',company:'ablecomp'}, 
        {ticker:'sam',company:'samcomp'}, 
        {ticker:'amateur',company:'amateurcomp'},
        {ticker:'zoo',company:'zooman'}
    ];
    // expect []
    console.log(searchOccurrences('a', source, 0));
    // expect [{ticker:'am',company:'amcomp'}]
    console.log(searchOccurrences('a', source, 1));
    // expect [{ticker:'am',company:'amcomp'}, {ticker:'able',company:'ablecomp'}, '{ticker:'amateur',company:'amateurcomp'}];
    console.log(searchOccurrences('a', source, 3));
    // expect [{ticker:'able',company:'ablecomp'}]
    console.log(searchOccurrences('abl', source, 3));
    // expect [{ticker:'zoo',company:'zooman'}]
    console.log(searchOccurrences('z', source, 1));
    // expect [{ticker:'zoo',company:'zooman'}]
    console.log(searchOccurrences('z', source, 4));
}
testSearchOccurences();