import express from 'express';
import { 
  createShop,
  getShopById,
  updateShop,
  getNearbyShops,
  searchShops,
  getShopsByCategory
} from '../controllers/shopController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createShop);
router.get('/nearby', getNearbyShops);
router.get('/search', searchShops);
router.get('/category/:category', getShopsByCategory);
router.get('/:id', getShopById);
router.put('/:id', authMiddleware, updateShop);

export default router; 