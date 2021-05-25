import Express from 'express';

let router = Express.Router();

// test return a symbol
router.get('/symbol', (req, res) => {
    res.json({symbol: 'appl'});
});

// get stock price
router.get('/aapl/price', (req, res) => {
    res.json({price: 129.56});
});

// get company name
router.get('/aapl/company', (req, res) => {
    res.json({company: "Apple, Inc."});
});

export default router;