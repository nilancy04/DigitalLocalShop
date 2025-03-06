import { useState } from 'react';
import { MapPin, Search, ShoppingCart, Heart, User, Bell, Store } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [location, setLocation] = useState('Select Location');
  const [cartCount, setCartCount] = useState(0);
  const [isSellerMode, setIsSellerMode] = useState(false);
  const navigate = useNavigate();

  const handleLocationClick = () => {
    // TODO: Implement location selection functionality
    console.log('Location button clicked');
  };

  const toggleInterface = () => {
    setIsSellerMode(!isSellerMode);
    // TODO: Implement interface switch logic
    console.log(`Switched to ${isSellerMode ? 'customer' : 'seller'} interface`);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-20 justify-between">
          {/* Logo and Location */}
          <div className="flex items-center space-x-8">
            <Link to="/">
              <Logo />
            </Link>
            
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
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder={isSellerMode ? "Search your store items" : "Search for shops, products, or categories"}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fc8019]"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#fc8019] text-white p-1.5 rounded-md hover:bg-[#db6c12] transition-colors">
                <Search size={18} />
              </button>
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => navigate('/explore')}
              className="flex items-center space-x-2 hover:text-[#fc8019]"
            >
              <span>Explore</span>
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center space-x-2 hover:text-[#fc8019]"
            >
              <Bell size={20} />
              <span className="text-xs text-white bg-[#ffa700] px-1 rounded absolute -mt-4 ml-3">2</span>
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center space-x-2 hover:text-[#fc8019]"
            >
              <span>Offers</span>
              <span className="text-xs text-white bg-[#ffa700] px-1 rounded">NEW</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-[#fc8019]">
              <Heart size={20} />
              <span>Wishlist</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-[#fc8019]">
              <User size={20} />
              <span onClick={() => navigate('/login')}>Sign In</span>
            </button>

            {/* Interface Toggle */}
            <button
              onClick={toggleInterface}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                isSellerMode 
                  ? 'bg-[#fc8019] text-white hover:bg-[#db6c12]' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Store size={18} />
              <span className="text-sm font-medium">
                {isSellerMode ? 'Seller Mode' : 'Become a Seller'}
              </span>
            </button>

            <button className="flex items-center space-x-2 hover:text-[#fc8019] relative">
              <ShoppingCart size={20} />
              <span>{isSellerMode ? 'Orders' : 'Cart'}</span>
              {!isSellerMode && cartCount > 0 && (
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
