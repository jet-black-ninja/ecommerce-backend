import express from "express";
import authRouter from './auth/authRoutes'
import commonFeatureRouter from './common/featureRoute'
import adminProductsRouter from './admin/productsRoutes';
import adminOrdersRouter from './admin/orderRoutes';

export const routes = express.Router();
//auth routes
routes.use('/api/auth', authRouter);
//admin routes
routes.use('/api/admin/products', adminProductsRouter);
routes.use('/api/admin/orders', adminOrdersRouter);
//shop routes
    //address
    //cart
    //order
    //products
    //review
    //search
//common routes
routes.use('/api/common/feature', commonFeatureRouter);;
