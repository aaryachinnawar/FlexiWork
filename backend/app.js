import express from 'express'
import connectDb from './config/db.js';
import authRoutes from './routes/authRoute.js';
import jobRoutes from './routes/jobRoutes.js';
import paymentRoutes from './routes/paymentRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
connectDb();


const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/payments", paymentRoutes);


app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});