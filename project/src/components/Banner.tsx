import React from 'react';

interface BannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  backgroundColor: string;
}

const Banner = ({ title, subtitle, buttonText, image, backgroundColor }: BannerProps) => {
  return (
    <div className={`${backgroundColor} rounded-lg overflow-hidden relative`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.6" fill="currentColor"/>
          </pattern>
          <rect x="0" y="0" width="100" height="100" fill="url(#pattern-circles)"/>
        </svg>
      </div>

      <div className="relative flex items-center justify-between p-8 md:p-12">
        {/* Content */}
        <div className="max-w-[50%] z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            {subtitle}
          </p>
          <button className="bg-white text-[#fc8019] px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
            {buttonText}
          </button>
        </div>

        {/* Image */}
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fc8019] to-transparent opacity-90 z-10" />
          <img 
            src={image} 
            alt="Local Shops"
            className="h-full w-full object-cover object-center transform scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner; 