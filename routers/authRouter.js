import Dotenv from 'dotenv';
Dotenv.config();

import Express from 'express';
import Jwt from 'jsonwebtoken';
import Bcrypt from 'bcrypt';
import Cookie from 'cookie';

import { insertUser, getUser } from '../data_access.js';

const router = Express.Router();

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!(username && password)) {
        res.status(401).json({ message: "Username and password are required." });
    } else {
        let user = await getUser(username);

        if (user) {
            res.status(409).json({ message: "Username already exists." });
        } else {
            user = { username, password };
            const salt = await Bcrypt.genSalt(10);
            user.password = await Bcrypt.hash(user.password, salt);
            await insertUser(user)
            .then(result => {
                res.status(201).json({ message: "Registered successfully." });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ message: "An error occurred." });
            });
        }
    }
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!(username && password)) {
        res.status(400).json({ message: "Username and password required." });
        return;
    }

    const user = await getUser(username);
    if (user) {
        const validPassword = await Bcrypt.compare(password, user.password);
        if (validPassword) {
            const accessToken = generateAccessToken({ id: user.id, name: username });
            const refreshToken = Jwt.sign({ id: user.id, name: username }, process.env.REFRESH_TOKEN_SECRET);
            res.setHeader('Set-Cookie', Cookie.serialize('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                // secure: true,
                maxAge: 60 * 60 * 24 * 7 * 52 // 1 year
            }));
            res.json({ 
                accessToken, 
                username, 
                expiresAt: tokenExpireDateTime(parseInt(process.env.ACCESS_TOKEN_REFRESH_TIME_SECONDS))
            });
        } else {
            res.status(401).json({ message: "Invalid login credentials."});
        }
    } else {
        res.status(404).json({ message: "User: " + username + " does not exist. Please register an account." });
    }
});

router.post('/logout', (req, res) => {
    res.setHeader('Set-Cookie', Cookie.serialize('refreshToken', '#deleted#', {
        expires: new Date()
    }));
    res.sendStatus(204);
});

router.post('/token', (req, res) => {
    // const refreshToken = req.body.token;
    // console.log(req.headers);
    const cookies = Cookie.parse(req.headers.cookie || '');
    const refreshToken = cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401)
    Jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ id: user.id, name: user.name });
        res.json({ 
            accessToken, 
            username: user.name,
            expiresAt: tokenExpireDateTime(parseInt(process.env.ACCESS_TOKEN_REFRESH_TIME_SECONDS))
        });
    });
});


function generateAccessToken(user) {
    return Jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
}

function tokenExpireDateTime(lifeSeconds) {
    const date = new Date();
    // console.log(date);
    date.setSeconds(date.getSeconds() + lifeSeconds);
    return date.toISOString();
}

export default router;

