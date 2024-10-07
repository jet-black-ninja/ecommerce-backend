import {Router} from 'express';
import { addProduct, deleteProduct, editProduct, fetchAllProducts, handleImageUpload } from '../../controllers/admin/productsController';
import { upload } from '../../helpers/cloudinary';

const router = Router();

router.post('/upload-image', upload.single('my-file'), handleImageUpload);
router.post('add', addProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/get',fetchAllProducts);

export default router;