import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'; // Move existing home content to this component
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;