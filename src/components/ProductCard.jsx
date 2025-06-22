import React from 'react';
import { useQuiz } from '../context/QuizContext';
import '../styles/ProductCard.css';
import favoriteIcon from '../assets/images/favorite.svg';

function ProductCard({ product }) {
  const { state, dispatch } = useQuiz();
  const isInWishlist = state.wishlist.includes(product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', productId: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', productId: product.id });
    }
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.images[0]?.src}
          alt={product.title}
          className="product-image"
        />
        <button
          className={`wishlist-button ${isInWishlist ? 'active' : ''}`}
          onClick={toggleWishlist}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <img
            src={favoriteIcon}
            alt="favorite"
            className="favorite-icon"
            style={{
              filter: isInWishlist ? 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' : 'none',
              width: '24px',
              height: '24px'
            }}
          />
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">{formatPrice(product.variants[0]?.price)}</p>

        {product.body_html && (
          <div
            className="product-description"
          />
        )}
      </div>
    </div>
  );
}

export default ProductCard;