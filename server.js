import Dotenv from 'dotenv';
Dotenv.config();

import Express from 'express';
import path from 'path';
import Jwt from 'jsonwebtoken';

import stockRouter from './routers/stockRouter.js';
import userRouter from './routers/userRouter.js';
import authRouter from './routers/authRouter.js';

const app = Express();
const __dirname = process.cwd();

app.use(Express.json());

app.use('/stock', stockRouter);
app.use('/user', authenticateToken, userRouter);
app.use('/auth', authRouter);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}


app.use(Express.static(path.join(__dirname, '/client/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server started');
});


