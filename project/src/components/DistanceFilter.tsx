import React, { useState } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

interface DistanceFilterProps {
  onDistanceChange: (distance: number) => void;
}

const DistanceFilter = ({ onDistanceChange }: DistanceFilterProps) => {
  const [selectedDistance, setSelectedDistance] = useState(5);
  const [isExpanded, setIsExpanded] = useState(true);

  const distances = [
    { value: 1, label: '1 km', description: 'Very close by' },
    { value: 2, label: '2 km', description: 'Walking distance' },
    { value: 5, label: '5 km', description: 'Short drive' },
    { value: 10, label: '10 km', description: 'Extended area' }
  ];

  const handleDistanceChange = (distance: number) => {
    setSelectedDistance(distance);
    onDistanceChange(distance);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 transition-all duration-300 hover:shadow-md">
      {/* Header with toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <div className="flex items-center">
          <MapPin className="text-[#fc8019] mr-2 group-hover:scale-110 transition-transform" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Delivery Distance</h3>
        </div>
        <ChevronRight 
          className={`text-gray-400 transition-transform duration-300 ${
            isExpanded ? 'rotate-90' : 'rotate-0'
          }`} 
          size={20} 
        />
      </button>
      
      {/* Expandable content */}
      <div className={`space-y-3 overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        {/* Distance buttons */}
        <div className="space-y-2">
          {distances.map((distance) => (
            <button
              key={distance.value}
              onClick={() => handleDistanceChange(distance.value)}
              className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 
                ${selectedDistance === distance.value 
                  ? 'bg-[#fff3e9] text-[#fc8019] shadow-sm transform -translate-y-0.5' 
                  : 'text-gray-600 hover:bg-gray-50 hover:transform hover:-translate-y-0.5'
                }`}
              aria-label={`Set delivery distance to ${distance.label}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{distance.label}</span>
                  <p className="text-sm text-gray-500">{distance.description}</p>
                </div>
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedDistance === distance.value 
                    ? 'bg-[#fc8019] scale-100' 
                    : 'bg-gray-300 scale-75'
                }`} />
              </div>
            </button>
          ))}
        </div>

        {/* Distance Range Slider */}
        <div className="mt-6 px-2">
          <label htmlFor="distance-range" className="sr-only">
            Adjust delivery distance
          </label>
          <input
            id="distance-range"
            type="range"
            min="1"
            max="10"
            step="1"
            value={selectedDistance}
            onChange={(e) => handleDistanceChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#fc8019]
              hover:bg-gray-300 transition-colors"
            title={`Current distance: ${selectedDistance}km`}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">1 km</span>
            <span className="text-lg font-medium text-[#fc8019] animate-pulse">
              {selectedDistance} km
            </span>
            <span className="text-sm text-gray-500">10 km</span>
          </div>
        </div>

        {/* Current selection indicator */}
        <div className="mt-4 p-3 bg-[#fff3e9] rounded-md">
          <p className="text-sm text-[#fc8019]">
            Showing shops within <strong>{selectedDistance}km</strong> of your location
          </p>
        </div>
      </div>
    </div>
  );
};

export default DistanceFilter; 