import { Router } from 'express';

import {
  addProductReview,
  getProductReview,
} from '../../controllers/shop/reviewController.ts';
const router = Router();
router.post('/add', addProductReview);
router.get('/:productId', getProductReview);

export default router;
