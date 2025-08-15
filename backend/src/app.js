import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import passport from 'passport';
import router from './routes/index.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

connectDB();

app.use('/api', router);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message });
});

export default app;
