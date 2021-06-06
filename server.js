import Express from 'express';

import stockRouter from './routers/stockRouter.js';

const app = Express();

app.use(Express.json());

app.use('/api', stockRouter);


app.listen(process.env.PORT || 5000, () => {
  console.log('Resource server started http://localhost:5000');
});


