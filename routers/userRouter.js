import Express from 'express';
import { addTicker, getLists, insertList } from '../data_access.js';

let router = Express.Router();

// return all lists belonging to user
router.get('/lists', async (req, res) => {
    let lists = await getLists(req.user.id);
    res.status(200).json(lists);
});

// create new list
router.post('/list', async (req, res) => {
    const { list_name } = req.body;
    const uid = req.user.id;
    if (list_name) {
        const id = await insertList(uid, list_name);
        res.status(201).json({ 
            message: "Created new list: " + list_name,
            listId: id
        });
    }
});

// add items to list
router.post('/add', async (req, res) => {
    const { list_id, ticker } = req.body;
    if (list_id && ticker) {
        addTicker(list_id, ticker);
        res.status(201).json({ message: "Added: " + ticker });
    } else {
        res.status(400).json({ error: "Request to add item requires list ID and ticker" });
    }
})

export default router;