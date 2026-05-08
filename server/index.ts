import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import googleAuthRouter from './routes/googleAuth';
import adminRouter from './routes/admin';

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ahilepharma';
const PORT = Number(process.env.API_PORT || 5000);

app.use(cors({ origin: true, credentials: true }));
app.use(require('passport').initialize());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/google', googleAuthRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error('Server error:', (err as Error).message);
  if ((err as Error).message.includes('validation')) {
    res.status(400).json({ message: (err as Error).message });
  } else {
    res.status(500).json({ message: 'Erreur serveur interne.' });
  }
};

app.use(errorHandler);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
