import React from 'react';

const SellerOrders = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <select className="border rounded-md px-3 py-1">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Delivered</option>
          </select>
        </div>
        <p className="text-gray-500">No orders found</p>
      </div>
    </div>
  );
};

export default SellerOrders; 