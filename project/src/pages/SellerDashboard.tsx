import React from 'react';
import { Plus, Package, TrendingUp, Users, Clock, Settings, DollarSign } from 'lucide-react';

const SellerDashboard = () => {
  const stats = [
    { title: 'Total Sales', value: '₹12,450', change: '+12%', icon: DollarSign },
    { title: 'Total Orders', value: '156', change: '+8%', icon: Package },
    { title: 'Active Products', value: '45', change: '', icon: TrendingUp },
    { title: 'Customers', value: '89', change: '+15%', icon: Users }
  ];

  const recentOrders = [
    { id: '#ORD001', customer: 'Rahul Kumar', amount: '₹450', status: 'Pending', time: '10 mins ago' },
    { id: '#ORD002', customer: 'Priya Singh', amount: '₹890', status: 'Delivered', time: '2 hours ago' },
    { id: '#ORD003', customer: 'Amit Shah', amount: '₹1,200', status: 'Processing', time: '3 hours ago' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
        <button className="flex items-center space-x-2 bg-[#fc8019] text-white px-4 py-2 rounded-lg hover:bg-[#db6c12] transition-colors">
          <Plus size={20} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                {stat.change && (
                  <span className="text-sm text-green-600">{stat.change}</span>
                )}
              </div>
              <div className="bg-[#fff3e9] p-3 rounded-lg">
                <stat.icon className="text-[#fc8019]" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
              <button className="text-[#fc8019] hover:text-[#db6c12] text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-800">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{order.amount}</p>
                    <p className="text-sm text-gray-500">{order.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Package className="text-[#fc8019]" size={20} />
                  <span className="font-medium text-gray-700">Manage Products</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Clock className="text-[#fc8019]" size={20} />
                  <span className="font-medium text-gray-700">Order History</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Settings className="text-[#fc8019]" size={20} />
                  <span className="font-medium text-gray-700">Store Settings</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          {/* Store Performance */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Store Performance</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Order Completion</span>
                  <span className="text-gray-800 font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#fc8019] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Customer Satisfaction</span>
                  <span className="text-gray-800 font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#fc8019] h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard; 