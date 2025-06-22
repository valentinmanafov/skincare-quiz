import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductSlider.css';
import nextIcon from '../assets/images/next.svg';

function ProductSlider({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const itemsPerView = 2;
  const maxIndex = Math.max(0, Math.ceil(products.length / itemsPerView) - 1);

  useEffect(() => {
    setCanScrollRight(currentIndex < maxIndex);
  }, [currentIndex, products.length, maxIndex]);

  const scrollRight = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getCurrentProducts = () => {
    const startIndex = currentIndex * itemsPerView;
    return products.slice(startIndex, startIndex + itemsPerView);
  };

  if (!products || products.length === 0) {
    const placeholderProducts = [
      {
        id: 'placeholder-1',
        title: 'Loading...',
        variants: [{ price: '0.00' }],
        images: [{ src: '' }]
      },
      {
        id: 'placeholder-2',
        title: 'Loading...',
        variants: [{ price: '0.00' }],
        images: [{ src: '' }]
      }
    ];

    return (
      <div className="slider-container">
        <div className="products-container">
          {placeholderProducts.map((product) => (
            <div key={product.id} className="product-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentProducts = getCurrentProducts();

  return (
    <div className="slider-container">
      <div className="slider-track">
        {currentProducts.map((product) => (
          <div key={product.id} className="slider-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {products.length > itemsPerView && (
        <div className="slider-controls">
          <button
            className={`slider-button next ${!canScrollRight ? 'disabled' : ''}`}
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Next products"
          >
            <img src={nextIcon} alt="Next" width="18" height="18" />
          </button>
        </div>
      )}

      {products.length > itemsPerView && (
        <div className="slider-indicators">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductSlider;