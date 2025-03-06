import React from 'react';

const Wishlist = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500">Your wishlist is empty</p>
      </div>
    </div>
  );
};

export default Wishlist; 