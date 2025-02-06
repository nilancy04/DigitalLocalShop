import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFallback = ({ src, alt, className }: ImageWithFallbackProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
      )}
      {error ? (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-md">
          <span className="text-gray-400">Image not available</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoading ? 'invisible' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default ImageWithFallback; 