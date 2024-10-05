import express from "express";
import authRouter from './auth/authRoutes'

export const routes = express.Router();
routes.use('/api/auth', authRouter)