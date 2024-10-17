import { Router } from 'express';
import {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} from '../../controllers/shop/addressController';
const router = Router();

router.get('/get/:userId', fetchAllAddress);
router.post('/add', addAddress);
router.put('/update/:userId/:addressId', editAddress);
router.delete('/delete/:userId/:addressId', deleteAddress);

export default router;
