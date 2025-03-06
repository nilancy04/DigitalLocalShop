import React from 'react';

const Offers = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Available Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-[#fc8019]">First Order Discount</h2>
          <p className="text-gray-600 mt-2">Get 20% off on your first order</p>
          <button className="mt-4 bg-[#fc8019] text-white px-4 py-2 rounded-md">
            Apply Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offers; 