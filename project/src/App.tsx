import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'; // Move existing home content to this component
import Login from './pages/Login'; // Import the Login component
import ExploreShops from './pages/ExploreShops';
import ViewShop from './pages/ViewShop';
import SellerDashboard from './pages/SellerDashboard';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Notifications from './pages/Notifications';
import Offers from './pages/Offers';
import ModeSelection from './pages/ModeSelection';
import { CartProvider } from './context/CartContext';
import SellerOrders from './pages/SellerOrders';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExploreShops />} />
            <Route path="/shop/:shopId" element={<ViewShop />} />
            <Route path="/seller" element={<SellerDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mode-selection" element={<ModeSelection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/seller/orders" element={<SellerOrders />} />
          </Routes>
          <Toaster 
            position="top-right"
            reverseOrder={false}
            containerStyle={{}}
            containerClassName=""
            gutter={8}
            toastOptions={{
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
