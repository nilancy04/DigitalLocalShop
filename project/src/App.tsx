import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoryGrid from './components/CategoryGrid';
import PromotionalBanners from './components/PromotionalBanners';
import Banner from './components/Banner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Main Hero Banner */}
          <div className="mb-12">
            <Banner
              title="Your favourite local shops are now online"
              subtitle="Order from nearby stores and get delivery at your doorstep"
              buttonText="Explore Shops"
              image="https://img.freepik.com/free-vector/shop-with-sign-we-are-open_23-2148547718.jpg?w=1380&t=st=1709774548~exp=1709775148~hmac=8f6c6a1f0a4c4b0b8f8c9f8c9f8c9f8c9f8c9f8c9f8c9f8c9f8c9f8c9f8c9f8"
              backgroundColor="bg-gradient-to-r from-[#fc8019] to-[#ff9f4a]"
            />
          </div>

          {/* Categories */}
          <section className="mb-12">
            <CategoryGrid />
          </section>

          {/* Promotional Banners */}
          <section className="mb-12">
            <PromotionalBanners />
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;