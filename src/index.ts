import express from 'express';
import dotenv from 'dotenv';
import connection from '~/configs/connection';
import router from '~/routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  }));
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

connection();

const PORT = process.env.PORT || 3000;

app.use('/api', router);

app.listen(PORT, () => {
  console.log('Server is running');
});