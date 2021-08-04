import axios from 'axios';
import Express from 'express';

import url from '../url.js';
import { addTicker, deleteTicker, getLists, insertList, deleteList, updateListName } from '../data_access.js';

let router = Express.Router();

// return all lists belonging to user
router.get('/lists', async (req, res) => {
    let listRecords = await getLists(req.user.id);
    // console.log(listRecords);
    
    function getBatchQuotes(arr) {
        return axios.get(url.batchQuoteURL(arr.join()))
            .then(response => {
                return response.data;
            });
    }
    const resultArr = await Promise.all(listRecords.map(listRecord => listRecord.list.length > 0 && listRecord.list[0] ? getBatchQuotes(listRecord.list) : {} ))
    .then(values => {
        const result = values.map((listObj, idx) => {
            return {
                id: listRecords[idx].id,
                list_name: listRecords[idx].list_name,
                list: listObj
            }
        })
        return res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });

    // res.status(200).json(listRecords);
    // res.status(200).json(resultArr);
});

// create new list
router.post('/list/create', async (req, res) => {
    const { list_name } = req.body;
    const uid = req.user.id;
    if (list_name) {
        const id = await insertList(uid, list_name);
        res.status(201).json({ 
            message: "Created new list: " + list_name,
            listId: id
        });
    } else {
        res.status(400).json({ message: "Missing list name."});
    }
});

// update list name
router.put('/list/put/name', async (req, res) => {
    const { list_id, title } = req.body;
    const uid = req.user.id;
    if (list_id) {
        updateListName(uid, list_id, title);
        res.sendStatus(204);
    } else {
        res.status(400).json({ message: "Require list id and new name/title."});
    }
});

// delete list
router.delete('/list/delete', async (req, res) => {
    const { list_id } = req.query;
    const uid = req.user.id;
    if (list_id) {
        const success = await deleteList(uid, list_id);
        success ? res.status(201).json({ message: "Deleted list." })
            : res.sendStatus(500);
    }
    else {
        res.status(400).json({ message: "Missing list ID."});
    }
});

// add ticker to list
router.post('/ticker/add', async (req, res) => {
    const { list_id, ticker } = req.body;
    const uid = req.user.id;
    if (list_id && ticker) {
        const tickers = ticker.split(',');
        await Promise.allSettled(tickers.map(ticker => addTicker(uid, list_id, ticker)));
        res.status(201).json({ message: "Added: " + ticker });
    } else {
        res.status(400).json({ error: "Request to add item requires list ID and ticker" });
    }
});

// delete ticker from list
router.delete('/ticker/remove', async (req, res) => {
    const { list_id, tickers } = req.query;
    const uid = req.user.id;
    if (list_id && tickers) {
        await deleteTicker(uid, list_id, tickers.split(','));
        res.sendStatus(204);
    } else {
        res.status(400).json({ error: "Request to delete item requires list ID and ticker(s)" });
    }
})

export default router;