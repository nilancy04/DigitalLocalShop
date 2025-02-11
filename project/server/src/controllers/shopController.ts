import { Request, Response } from 'express';
import { Shop } from '../models/Shop';

export const createShop = async (req: Request, res: Response) => {
  try {
    const shop = new Shop({
      ...req.body,
      owner: req.user._id
    });
    await shop.save();
    res.status(201).json(shop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getNearbyShops = async (req: Request, res: Response) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;
    const shops = await Shop.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(lng), Number(lat)]
          },
          $maxDistance: Number(radius)
        }
      }
    });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchShops = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const shops = await Shop.find({
      $text: { $search: query as string }
    });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getShopsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const shops = await Shop.find({ categories: category });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getShopById = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateShop = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    
    // Check if user is shop owner
    if (shop.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    Object.assign(shop, req.body);
    await shop.save();
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 