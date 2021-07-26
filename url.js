import Dotenv from 'dotenv';
Dotenv.config();

const KEY = process.env.IEX_API_KEY;

const companyURL = (ticker) => {
    return `https://cloud.iexapis.com/stable/stock/${ticker}/company?token=${KEY}`;
}

const quoteURL = (ticker) => {
    return `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${KEY}`;
}

const batchQuoteURL = (tickers) => {
    return `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickers}&types=quote&token=${KEY}`;
}

const companiesURL = () => {
    return `https://cloud.iexapis.com/stable/ref-data/symbols?token=${KEY}`;
}

const logoURL = (ticker) => {
    return `https://cloud.iexapis.com/stable/stock/${ticker}/logo?token=${KEY}`;
}

const newsURL = (ticker) => {
    return `https://cloud.iexapis.com/stable/stock/${ticker}/news/last/5?token=${KEY}`;
}

const yahooNewsURL = (ticker) => {
    return `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${ticker}`;
}

export default {
    companyURL,
    quoteURL,
    batchQuoteURL,
    companiesURL,
    logoURL,
    newsURL,
    yahooNewsURL
}