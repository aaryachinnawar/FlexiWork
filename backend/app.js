import express from 'express'
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoute.js';
import dotenv from 'dotenv';

dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('FlexiWork API is running');
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});