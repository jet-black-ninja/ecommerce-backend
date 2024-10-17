import express from 'express';
import authRouter from './auth/authRoutes';
import commonFeatureRouter from './common/featureRoute';
import adminProductsRouter from './admin/productsRoutes';
import adminOrdersRouter from './admin/orderRoutes';
import shopProductRouter from './shop/ProductRoutes';
import shopCartRouter from './shop/CartRoutes';
import shopAddressRouter from './shop/AddressRoutes';
import shopReviewRouter from './shop/ReviewRoutes';
export const routes = express.Router();
//auth routes
routes.use('/api/auth', authRouter);
//admin routes
routes.use('/api/admin/products', adminProductsRouter);
routes.use('/api/admin/orders', adminOrdersRouter);
//shop routes
routes.use('/api/shop/products', shopProductRouter);
routes.use('/api/shop/cart', shopCartRouter);
routes.use('/api/shop/address', shopAddressRouter);
//review
routes.use('/api/shop/review', shopReviewRouter);
//search

//common route
routes.use('/api/common/feature', commonFeatureRouter);
