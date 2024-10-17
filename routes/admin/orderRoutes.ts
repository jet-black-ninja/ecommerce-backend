import { Router } from 'express';

import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from '../../controllers/admin/orderController';

const router = Router();

router.get('/get', getAllOrdersOfAllUsers);
router.get('/details/:id', getOrderDetailsForAdmin);
router.put('/update/:id', updateOrderStatus);

export default router;
