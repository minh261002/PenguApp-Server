import express from 'express';
import dotenv from 'dotenv';
import connection from '~/configs/connection';
import router from '~/routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5174'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection();

const PORT = process.env.PORT || 3000;

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log('Server is running');
});