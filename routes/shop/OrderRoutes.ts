import { Router } from 'express';

import {
  createOrder,
  getAllOrderByUser,
  getOrderDetails,
  capturePayment,
} from '../../controllers/shop/orderController';

const router = Router();

router.post('/create', createOrder);
router.get('/capture', capturePayment);
router.get('/list/:userId', getAllOrderByUser);
router.get('/details/:id', getOrderDetails);

export default router;
