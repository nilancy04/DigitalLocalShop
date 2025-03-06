import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'; // Move existing home content to this component
import Login from './pages/Login'; // Import the Login component
import ExploreShops from './pages/ExploreShops';
import SellerDashboard from './pages/SellerDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExploreShops />} />
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/login" element={<Login />} /> // Add route for Login page
        </Routes>
      </div>
    </Router>
  );
}

export default App;
