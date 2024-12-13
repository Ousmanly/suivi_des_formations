import bodyParser from 'body-parser';
import { config } from 'dotenv';
import express from 'express';
import { router } from './routes/userRoute.js';
import { routerAuth } from './routes/authRoute.js';


const app = express();

config();

app.use(bodyParser.json());



app.use(routerAuth)
app.use(router)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
