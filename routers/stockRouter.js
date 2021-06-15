import Express from 'express';
import Axios from 'axios';

import url from '../url.js';

let router = Express.Router();

// get quote
router.get('/:ticker/quote', (req, res) => {
    const ticker = hasTicker(req.params.ticker);
    Axios.get(url.quote(ticker))
    .then(response => {
        res.status(200).json(response.data);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
});

// get company info
router.get('/:ticker/company', (req, res) => {
    const ticker = hasTicker(req.params.ticker);
    Axios.get(url.company(ticker))
    .then(response => {
        res.status(200).json(response.data);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})


const hasTicker = (ticker, res) => {
    if (!ticker) {
        res.status(401).json({ error: "Missing ticker parameter." });
    } else {
        return ticker;
    }
}


export default router;