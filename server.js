import Dotenv from 'dotenv';
Dotenv.config();

import Express from 'express';
import Jwt from 'jsonwebtoken';

import stockRouter from './routers/stockRouter.js';
import userRouter from './routers/userRouter.js';

const app = Express();

app.use(Express.json());

app.use('/api', stockRouter);
app.use('/user', authenticateToken, userRouter);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log('Resource server running at http://localhost:5000');
});


