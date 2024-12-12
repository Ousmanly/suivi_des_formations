import bodyParser from 'body-parser';
import { config } from 'dotenv';

import express from 'express';
const app = express();

config();

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send('hello POS');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
