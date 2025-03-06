import React from 'react';

const Notifications = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-[#fc8019]">New Offer Available!</h2>
          <p className="text-gray-600 mt-2">Get 20% off on your first order</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 