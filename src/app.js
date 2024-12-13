import bodyParser from 'body-parser';
import { config } from 'dotenv';
import cors from 'cors'
import express from 'express';
import studentRouter from './routes/studentRoute.js';
const app = express();

config();
const corsOptions = {
  origin: 'http://localhost:5173', // Origine de votre frontend
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Autorise les méthodes nécessaires
  // credentials: true,
  // allowedHeaders: ['Content-Type', 'Authorization'],
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', studentRouter );
app.get('/', (_req, res) => {
  res.send('hello Suivi');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
