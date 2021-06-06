import Express from 'express';
import Jwt from 'jsonwebtoken';
import Bcrypt from 'bcrypt';
import Cookie from 'cookie';

import { insertUser, getUser } from './data_access.js';

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded());

app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!(username && password)) {
        res.status(400).json({ error: "Username and password required." });
    }

    const user = await getUser(username);
    const validPassword = await Bcrypt.compare(password, user.password);
    if (validPassword) {
        const accessToken = generateAccessToken({ id: user.id });
        const refreshToken = Jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET);
        res.setHeader('Set-Cookie', Cookie.serialize('refreshToken', refreshToken, {
            // httpOnly: true,
            // secure: true,
            maxAge: 60 * 60 * 24 * 7 * 52 // 1 year
        }));
        res.json({ accessToken });
    } else {
        res.status(400).json({ message: "Invalid login credentials."});
    }
});

app.post('/logout', (req, res) => {
    res.setHeader('Set-Cookie', Cookie.serialize('refreshToken', '#deleted#', {
        expires: new Date()
    }));
    res.sendStatus(204);
});

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401)
    Jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ id: user.id });
      res.json({ accessToken: accessToken });
    });
});


function generateAccessToken(user) {
    return Jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' });
  }

app.listen(4000, () => {
    console.log("Auth server running at http://localhost:4000");
});

