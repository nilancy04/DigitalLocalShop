import { useState } from 'react';
import { MapPin, Search, ShoppingCart, Heart, User, Bell } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [location, setLocation] = useState('Select Location');
  const [cartCount, setCartCount] = useState(0);

  const handleLocationClick = () => {
    // TODO: Implement location selection functionality
    console.log('Location button clicked');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-20 justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-12">
            <Logo />
            
            {/* Location Button */}
            <button
              onClick={handleLocationClick}
              className="flex items-center group"
            >
              <div className="flex items-center border-b-2 border-black pb-1">
                <MapPin className="text-[#fc8019] mr-2" size={20} />
                <span className="text-gray-700 font-medium">{location}</span>
              </div>
              <div className="flex items-center ml-2">
                <span className="text-gray-500">▼</span>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for shops, products, or categories"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fc8019]"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 hover:text-[#fc8019]">
              <Bell size={20} />
              <span className="text-xs text-white bg-[#ffa700] px-1 rounded absolute -mt-4 ml-3">2</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-[#fc8019]">
              <span>Offers</span>
              <span className="text-xs text-white bg-[#ffa700] px-1 rounded">NEW</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-[#fc8019]">
              <Heart size={20} />
              <span>Wishlist</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-[#fc8019]">
              <User size={20} />
              <span>Sign In</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-[#fc8019] relative">
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fc8019] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 