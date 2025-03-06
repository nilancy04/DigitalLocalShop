import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  const handleUpdateQuantity = (itemId: string, currentQuantity: number, increment: boolean) => {
    const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;
    updateQuantity(itemId, newQuantity);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/explore')}
            className="bg-[#fc8019] text-white px-6 py-2 rounded-lg hover:bg-[#db6c12] transition-colors"
          >
            Explore Shops
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {items.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.shopName}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800">₹{item.price}</span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, false)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, true)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Items Total</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹40</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Platform Fee</span>
                <span>₹5</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{totalAmount + 45}</span>
                </div>
              </div>
              <button className="w-full bg-[#fc8019] text-white py-3 rounded-lg mt-6 hover:bg-[#db6c12] transition-colors">
                Confirm your booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 