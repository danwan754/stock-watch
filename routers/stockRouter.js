import Express from 'express';
import Axios from 'axios';
import Xml2js from 'xml2js';

import url from '../url.js';
import { cleanYahooNewsArray } from '../util.js';
// import { getCompanies } from '../db/mysql.js';
import { getCompanies, insertCompany } from '../db/postgresql/postgresql.js';
import axios from 'axios';


let router = Express.Router();

// get list of all companies listed on IEX (stored in db)
router.get('/companies', async (req, res) => {
    const companies = await getCompanies();
    if (companies) {
        res.status(200).json(companies);
    } else {
        res.sendStatus(500);
    }
});

// get quote
router.get('/:ticker/quote', (req, res) => {
    const ticker = hasTicker(req.params.ticker);
    Axios.get(url.quoteURL(ticker))
    .then(response => {
        // console.log(response.data.companyName);
        res.status(200).json(response.data);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

// get company logo
router.get('/:ticker/logo', (req, res) => {
    const ticker = req.params.ticker;
    Axios.get(url.logoURL(ticker))
    .then(response => {
        res.status(200).json(response.data);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

// get company info
router.get('/:ticker/company', (req, res) => {
    const ticker = hasTicker(req.params.ticker);
    Axios.get(url.companyURL(ticker))
    .then(response => {
        res.status(200).json(response.data);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

// get company news
router.get('/:ticker/news', (req, res) => {
    const ticker = hasTicker(req.params.ticker);
    Axios.get(url.newsURL(ticker))
    .then(response => {
        res.json(response.data);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

// get company news from Yahoo
router.get('/:ticker/news/yahoo', (req, res) => {
    const ticker = hasTicker(req.params.ticker);
    // Axios.get(url.newsURL(ticker))
    Axios.get(url.yahooNewsURL(ticker), {
            "Content-Type": "application/xml; charset=utf-8"
        })
    .then(response => {
        const parser = new Xml2js.Parser();
        const data = parser.parseString(response.data, (err, result) => {
            // console.log(result.rss.channel[0].item);
            // console.log(result.rss.channel);
            res.status(200).json(cleanYahooNewsArray(result.rss.channel[0].item));
        });
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});


const hasTicker = (ticker, res) => {
    if (!ticker) {
        res.status(401).json({ error: "Missing ticker parameter." });
    } else {
        return ticker;
    }
}


// // updates the stock listing table with data from IEX
// router.post('/dbupdate', async (req, res) => {
//     axios.get(url.companiesURL())
//     .then(response => {
//         for (const company of response.data) {
//             await insertCompany(company.symbol, company.name);
//         }
//         res.status(200).send("Finished updating database.");
//     })
//     .catch(err => {
//         throw err;
//     });
// })


export default router;