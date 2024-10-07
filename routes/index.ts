import express from "express";
import authRouter from './auth/authRoutes'
import commonFeatureRouter from './common/featureRoute'
export const routes = express.Router();
//auth routes
routes.use('/api/auth', authRouter);
//admin routes

//shop routes

//common routes
routes.use('/api/common/feature', commonFeatureRouter);;
