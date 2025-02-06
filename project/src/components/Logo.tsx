import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#fc8019] to-[#ff9f4a] rounded-lg blur"></div>
        <div className="relative flex items-center space-x-2 bg-white px-4 py-2 rounded-lg">
          <ShoppingBag className="text-[#fc8019] h-8 w-8" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fc8019] to-[#ff9f4a]">
            GrabNear
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo; 