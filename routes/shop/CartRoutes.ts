import { Router } from "express";

import {
    addToCart,
    fetchCartItems,
    deleteCartItem,
    updateCartItems,
} from '../../controllers/shop/cartController'
const router = Router();

router.post('/add', addToCart);
router.get('/get/:userId',fetchCartItems);
router.put('/update-cart', updateCartItems);
router.delete('/:userId/:productId',deleteCartItem);

export default router;