const intNumFt = new Intl.NumberFormat('en-US')

// return human-readable number (with commas) fixed to 2 decimal places
export const formatNum = (num) => {
    if (num == null) {
        return 'N/A';
    }
    return intNumFt.format(num.toFixed(2));
}


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