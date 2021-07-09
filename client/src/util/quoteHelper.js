
// Takes a source array and finds num occurrences that starts with string.
// Returns an array of num matching results.
export const searchOccurrences = (string, sourceArr, num) => {
    let count = 0;
    let resultArr = [];
    
    if (string) {
        const inputString = string.toLowerCase();
        sourceArr.forEach(item => {
            if (count >= num) {
                return resultArr;
            }
            if (item.company.toLowerCase().startsWith(inputString)) {
                resultArr.push(item);
                count++;
            }
        });
    }
    return resultArr;
}

