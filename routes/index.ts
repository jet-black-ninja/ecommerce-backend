import express from "express";
import authRouter from './auth/authRoutes'
import commonFeatureRouter from './common/featureRoute'
import adminProductsRouter from './admin/productsRoutes';
import adminOrdersRouter from './admin/orderRoutes';
import shopProductRouter from './shop/ProductRoutes';
import shopCartRouter from './shop/CartRoutes';
export const routes = express.Router();
//auth routes
routes.use('/api/auth', authRouter);
//admin routes
routes.use('/api/admin/products', adminProductsRouter);
routes.use('/api/admin/orders', adminOrdersRouter);
//shop routes
    //address
    //order
    routes.use('/api/shop.products', shopProductRouter);
    routes.use('/api/shop/cart',shopCartRouter )
    //review
    //search
//common routes
routes.use('/api/common/feature', commonFeatureRouter);;
