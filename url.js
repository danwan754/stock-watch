import Dotenv from 'dotenv';
Dotenv.config();

const KEY = process.env.IEX_API_KEY;

const company = (ticker) => {
    return `https://cloud.iexapis.com/stable/stock/${ticker}/company?token=${KEY}`;
}

const quote = (ticker) => {
    return `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${KEY}`;
}


export default {
    company,
    quote
}


// console.log(company('aapl'));