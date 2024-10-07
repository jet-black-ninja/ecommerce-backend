import { Router } from "express";
import { addFeatureImage, getFeatureImage } from "../../controllers/common/featureController";


const router = Router();

router.post('/add', addFeatureImage);
router.get('/get', getFeatureImage);

export default router;