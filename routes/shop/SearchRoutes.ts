import { Router } from "express";
import searchProducts from "../../controllers/shop/searchController";
const router = Router();

router.get('/:keyword', searchProducts)
export default router;