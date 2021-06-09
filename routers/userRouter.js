import Express from 'express';
import { addTicker, deleteTicker, getLists, insertList, deleteList } from '../data_access.js';

let router = Express.Router();

// return all lists belonging to user
router.get('/lists', async (req, res) => {
    let lists = await getLists(req.user.id);
    res.status(200).json(lists);
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

// delete list
router.post('/list/delete', async (req, res) => {
    const { list_id } = req.body;
    const uid = req.user.id;
    if (list_id) {
        const id = await deleteList(list_id, uid);
        console.log(id);
        res.status(201).json({ message: "Deleted list." });
    }
    res.status(400).json({ message: "Missing list ID."});
});

// add items to list
router.post('/list/ticker/add', async (req, res) => {
    const { list_id, ticker } = req.body;
    const uid = req.user.id;
    if (list_id && ticker) {
        await addTicker(list_id, uid, ticker);
        res.status(201).json({ message: "Added: " + ticker });
    } else {
        res.status(400).json({ error: "Request to add item requires list ID and ticker" });
    }
});

// delete ticker from list
router.delete('/list/ticker/delete', async (req, res) => {
    const { list_id, ticker } = req.body;
    const uid = req.user.id;
    if (list_id && ticker) {
        await deleteTicker(list_id, uid, ticker);
        res.sendStatus(204);
    } else {
        res.status(400).json({ error: "Request to delete item requires list ID and ticker" });
    }
})

export default router;