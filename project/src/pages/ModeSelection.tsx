import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ShoppingBag } from 'lucide-react';

const ModeSelection: React.FC = () => {
    const navigate = useNavigate();

    const handleModeSelect = (mode: 'customer' | 'seller') => {
        // Store the selected mode in localStorage
        localStorage.setItem('userMode', mode);
        
        // Navigate to the appropriate dashboard
        if (mode === 'seller') {
            navigate('/seller');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Choose Your Mode
                </h1>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Customer Mode Card */}
                    <div 
                        onClick={() => handleModeSelect('customer')}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    >
                        <div className="p-8">
                            <div className="w-16 h-16 bg-[#fff3e9] rounded-full flex items-center justify-center mb-6">
                                <ShoppingBag className="w-8 h-8 text-[#fc8019]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Mode</h2>
                            <p className="text-gray-600 mb-6">
                                Browse local shops, order products, and get them delivered to your doorstep.
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-[#fc8019] rounded-full mr-2"></span>
                                    Browse products from local shops
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-[#fc8019] rounded-full mr-2"></span>
                                    Easy ordering and checkout
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-[#fc8019] rounded-full mr-2"></span>
                                    Track your orders in real-time
                                </li>
                            </ul>
                            <button className="w-full mt-8 bg-[#fc8019] text-white py-3 rounded-lg hover:bg-[#db6c12] transition-colors flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 mr-2" />
                                Continue as Customer
                            </button>
                        </div>
                    </div>

                    {/* Seller Mode Card */}
                    <div 
                        onClick={() => handleModeSelect('seller')}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    >
                        <div className="p-8">
                            <div className="w-16 h-16 bg-[#fff3e9] rounded-full flex items-center justify-center mb-6">
                                <Store className="w-8 h-8 text-[#fc8019]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Seller Mode</h2>
                            <p className="text-gray-600 mb-6">
                                Manage your shop, products, and orders all in one place.
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-[#fc8019] rounded-full mr-2"></span>
                                    Manage your product inventory
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-[#fc8019] rounded-full mr-2"></span>
                                    Track orders and sales
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-[#fc8019] rounded-full mr-2"></span>
                                    Analyze business performance
                                </li>
                            </ul>
                            <button className="w-full mt-8 bg-[#fc8019] text-white py-3 rounded-lg hover:bg-[#db6c12] transition-colors flex items-center justify-center">
                                <Store className="w-5 h-5 mr-2" />
                                Continue as Seller
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeSelection; 