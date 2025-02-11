import React from 'react';
import Banner from '../components/Banner';
import CategoryGrid from '../components/CategoryGrid';
import PromotionalBanners from '../components/PromotionalBanners';

const HomePage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Main Hero Banner */}
      <div className="mb-12">
        <Banner
          title="Your favourite local shops are now online"
          subtitle="Order from nearby stores and get delivery at your doorstep"
          buttonText="Explore Shops"
          image="https://img.freepik.com/free-vector/shop-with-sign-we-are-open_23-2148547718.jpg"
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
  );
};

export default HomePage; 