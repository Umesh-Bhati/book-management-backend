
import express from 'express';
import "express-async-errors";
import authRoutes from './routes/auth.route';
import bookRoutes from './routes/book.route';
import verifyToken from './middlewares/verifyToken';
import { errorMiddleware } from './middlewares/error';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { getSelfUser } from './controllers/user.controller';

export const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: [process.env.FRONT_END_URL],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', verifyToken, bookRoutes);
app.get('/api/v1', verifyToken, getSelfUser)


// Using Error Middleware
app.use(errorMiddleware);

