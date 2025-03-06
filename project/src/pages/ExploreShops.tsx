import React, { useState } from 'react';
import { Star, Clock, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DistanceFilter from '../components/DistanceFilter';
import ImageWithFallback from '../components/ImageWithFallback';

interface Shop {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distance: number;
  deliveryTime: string;
  address: string;
  phone: string;
  categories: string[];
  isOpen: boolean;
}

const ExploreShops = () => {
  const [selectedDistance, setSelectedDistance] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = [
    'All Shops',
    'Grocery',
    'Restaurant',
    'Bakery',
    'Medical',
    'Stationery'
  ];

  const shops: Shop[] = [
    {
      id: '1',
      name: 'Super Mart Grocery',
      image: 'https://img.freepik.com/free-photo/supermarket-grocery-store_74190-4275.jpg',
      rating: 4.5,
      reviews: 128,
      distance: 1.2,
      deliveryTime: '20-30 min',
      address: '123 Main Street, Local Area',
      phone: '+91 98765 43210',
      categories: ['Grocery'],
      isOpen: true
    },
    {
      id: '2',
      name: 'City Medical Store',
      image: 'https://img.freepik.com/free-photo/pharmacist-working-pharmacy-store_1170-2053.jpg',
      rating: 4.8,
      reviews: 256,
      distance: 0.8,
      deliveryTime: '15-25 min',
      address: '45 Health Avenue, City Center',
      phone: '+91 98765 43211',
      categories: ['Medical'],
      isOpen: true
    },
    {
      id: '3',
      name: 'Fresh Bakery House',
      image: 'https://img.freepik.com/free-photo/bakery-shop-owner-wearing-apron_23-2149318546.jpg',
      rating: 4.6,
      reviews: 189,
      distance: 1.5,
      deliveryTime: '25-35 min',
      address: '78 Baker Street, Downtown',
      phone: '+91 98765 43212',
      categories: ['Bakery'],
      isOpen: true
    },
    {
      id: '4',
      name: 'Student Stationery Hub',
      image: 'https://img.freepik.com/free-photo/stationery-store-with-variety-supplies_23-2149309654.jpg',
      rating: 4.3,
      reviews: 92,
      distance: 2.1,
      deliveryTime: '30-40 min',
      address: '156 College Road, Education Zone',
      phone: '+91 98765 43213',
      categories: ['Stationery', 'Books'],
      isOpen: false
    },
    {
      id: '5',
      name: 'Green Fresh Vegetables',
      image: 'https://img.freepik.com/free-photo/fresh-vegetables-fruits-market-stall_342744-1386.jpg',
      rating: 4.7,
      reviews: 312,
      distance: 1.0,
      deliveryTime: '15-25 min',
      address: '34 Market Road, Fresh Complex',
      phone: '+91 98765 43214',
      categories: ['Grocery', 'Fruits & Vegetables'],
      isOpen: true
    },
    {
      id: '6',
      name: 'Daily Needs Store',
      image: 'https://img.freepik.com/free-photo/convenience-store-shop_74190-4266.jpg',
      rating: 4.4,
      reviews: 167,
      distance: 1.8,
      deliveryTime: '25-35 min',
      address: '89 Residential Block, New Area',
      phone: '+91 98765 43215',
      categories: ['Grocery', 'Daily Needs'],
      isOpen: true
    },
    {
      id: '7',
      name: 'Royal Restaurant',
      image: 'https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg',
      rating: 4.6,
      reviews: 423,
      distance: 2.3,
      deliveryTime: '35-45 min',
      address: '45 Food Street, Dining District',
      phone: '+91 98765 43216',
      categories: ['Restaurant'],
      isOpen: true
    }
  ];

  // Filter shops based on selected category and distance
  const filteredShops = shops.filter(shop => {
    const matchesCategory = !selectedCategory || shop.categories.includes(selectedCategory);
    const matchesDistance = shop.distance <= selectedDistance;
    return matchesCategory && matchesDistance;
  });

  const handleViewShop = (shopId: string) => {
    navigate(`/shop/${shopId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Explore Local Shops</h1>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Filters Sidebar */}
        <div className="col-span-3">
          <DistanceFilter onDistanceChange={setSelectedDistance} />
          
          {/* Categories Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'All Shops' ? null : category)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-all ${
                    (category === 'All Shops' && !selectedCategory) || category === selectedCategory
                      ? 'bg-[#fff3e9] text-[#fc8019] font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Shops Grid */}
        <div className="col-span-9">
          {filteredShops.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No shops found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map((shop) => (
                <div 
                  key={shop.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Shop Image */}
                  <div className="relative h-48 rounded-t-lg overflow-hidden">
                    <ImageWithFallback 
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-md text-sm font-medium">
                      {shop.isOpen ? (
                        <span className="text-green-600">Open</span>
                      ) : (
                        <span className="text-red-600">Closed</span>
                      )}
                    </div>
                  </div>

                  {/* Shop Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{shop.name}</h3>
                      <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                        <Star className="text-green-600 w-4 h-4 mr-1" />
                        <span className="text-sm font-medium text-green-600">{shop.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{shop.distance} km away</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{shop.deliveryTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{shop.phone}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {shop.categories.map((category) => (
                        <span 
                          key={category}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => handleViewShop(shop.id)}
                      className="w-full mt-4 bg-[#fc8019] text-white py-2 rounded-md hover:bg-[#db6c12] transition-colors"
                    >
                      View Shop
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreShops; 