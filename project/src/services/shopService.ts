import { ShopModel } from '../models/Shop';

export const shopService = {
  // Find shops near a location
  async findNearbyShops(lat: number, lng: number, radius: number = 5000) {
    return ShopModel.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: radius
        }
      }
    });
  },

  // Search shops by text
  async searchShops(query: string) {
    return ShopModel.find({
      $text: { $search: query }
    });
  },

  // Filter shops by category and rating
  async filterShops(category: string, minRating: number = 4) {
    return ShopModel.find({
      categories: category,
      'metrics.rating': { $gte: minRating }
    });
  },

  // Get top rated shops in a city
  async getTopShops(city: string, limit: number = 10) {
    return ShopModel.find({
      'location.city': city
    })
    .sort({ 'metrics.rating': -1 })
    .limit(limit);
  }
}; 