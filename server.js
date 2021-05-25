import Express from 'express';
import Mysql from 'mysql';

import authRouter from './routers/authRouter.js';
import stockRouter from './routers/stockRouter.js';
import { db } from './.config.js';

const app = Express();

app.use(Express.json());



// connect to db
let con = Mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password
  });
  
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



app.use('/api', authRouter);
app.use('/api', stockRouter);


app.listen(process.env.PORT || 5000, () => {
  console.log('Server started http://localhost:5000');
});


