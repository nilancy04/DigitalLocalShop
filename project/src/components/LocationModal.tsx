import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const LocationModal = ({ isOpen, onClose, onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const popularLocations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
  ];

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Select your location</h2>
        
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for area, street name..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fc8019]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>

        <div className="mb-6">
          <h3 className="text-gray-500 mb-3">Popular locations</h3>
          <div className="grid grid-cols-2 gap-4">
            {popularLocations.map((location) => (
              <button
                key={location}
                className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-[#fc8019]"
                onClick={() => onSelectLocation(location)}
              >
                <MapPin className="text-[#fc8019]" size={20} />
                <span>{location}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#fc8019] text-white py-3 rounded-lg hover:bg-[#db6c12]"
        >
          Confirm Location
        </button>
      </div>
    </div>
  ) : null;
};

export default LocationModal; 