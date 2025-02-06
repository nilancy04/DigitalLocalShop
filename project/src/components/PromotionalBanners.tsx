import React from 'react';

const promotionalBanners = [
  {
    id: 'groceries',
    title: 'Daily Groceries at your doorstep!',
    subtitle: 'Fresh vegetables, fruits, dairy & more',
    buttonText: 'Order Now',
    image: 'https://img.freepik.com/free-photo/shopping-basket-with-vegetables-fruits_23-2148183846.jpg',
    backgroundColor: 'bg-[#2ECC71]'
  },
  {
    id: 'restaurant',
    title: 'Local Restaurant Delivery',
    subtitle: 'Order from your favorite local eateries',
    buttonText: 'Order Now',
    image: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg',
    backgroundColor: 'bg-[#E67E22]'
  },
  {
    id: 'stationery',
    title: 'School & Office Supplies',
    subtitle: 'Books, stationery & all study materials',
    buttonText: 'Order Now',
    image: 'https://img.freepik.com/free-photo/school-supplies-blue-background_23-2148224872.jpg',
    backgroundColor: 'bg-[#3498DB]'
  }
];

const PromotionalBanners = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {promotionalBanners.map((banner) => (
        <div 
          key={banner.id}
          className={`${banner.backgroundColor} rounded-lg p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300`}
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2">{banner.title}</h3>
            <p className="text-white/90 mb-4 text-sm">{banner.subtitle}</p>
            <button className="bg-white text-gray-800 px-6 py-2 rounded-md text-sm hover:bg-opacity-90 transition-colors">
              {banner.buttonText}
            </button>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img 
              src={banner.image}
              alt={banner.title}
              className="h-full w-full object-contain object-bottom"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromotionalBanners; 