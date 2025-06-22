import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import ProductSlider from '../components/ProductSlider';
import '../styles/ResultsPage.css';

function ResultsPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    if (!state.isCompleted || Object.keys(state.answers).length === 0) {
      navigate('/');
    }
  }, [state.isCompleted, state.answers, navigate]);


  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      let allProducts = [];
      let page = 1;
      let hasMorePages = true;
      const maxPages = 10;

      while (hasMorePages && page <= maxPages) {
        const response = await fetch(
          `https://jeval.com.au/collections/hair-care/products.json?page=${page}`
        );

        if (response.ok) {
          const data = await response.json();
          const products = data.products || [];

          if (products.length > 0) {
            allProducts = [...allProducts, ...products];
            page++;
          } else {
            hasMorePages = false;
          }
        } else {
          hasMorePages = false;
        }
      }

      setProducts(allProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    }
  };


  const getRecommendedProducts = () => {
    if (!products.length) return [];

    const answers = state.answers;
    let scored = products.map(product => {
      let score = 0;

  
      const title = (product.title || '').toLowerCase();
      const description = (product.body_html || '').toLowerCase();
      const tags = (product.tags || []).join(' ').toLowerCase();

  
      Object.values(answers).forEach(answer => {
        if (typeof answer === 'string') {
          const answerLower = answer.toLowerCase();
          const answerWords = answerLower.split(' ').filter(word => word.length > 2);

          answerWords.forEach(word => {
        
            if (title.includes(word)) {
              score += 5;
            }

        
            if (tags.includes(word)) {
              score += 4;
            }


        
            if (description.includes(word)) {
              score += 3;
            }
          });

          if (title.includes(answerLower)) score += 3;
          if (tags.includes(answerLower)) score += 2;
          if (description.includes(answerLower)) score += 1;
        }
      });

      return { ...product, score };
    });

    const matchingProducts = scored.filter(product => product.score > 0);

  
    matchingProducts.sort((a, b) => {
      const aInWishlist = state.wishlist.includes(a.id);
      const bInWishlist = state.wishlist.includes(b.id);

      if (aInWishlist && !bInWishlist) return -1;
      if (!aInWishlist && bInWishlist) return 1;

      return b.score - a.score;
    });

    return matchingProducts;
  };

  const recommendedProducts = getRecommendedProducts();

  const handleRetakeQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
    navigate('/');
  };

  return (
    <div className="results-page">

      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Build you everyday self care routine.</h1>
          <p className="hero-description">
            Perfect for if you're looking for soft, nourished skin, our moisturizing body
            washes are made with skin-natural nutrients that work with your skin to
            replenish moisture. With a light formula, the bubbly lather leaves your skin
            feeling cleansed and cared for. And by choosing relaxing fragrances you can
            add a moment of calm to the end of your day.
          </p>
          <button className="retake-button" onClick={handleRetakeQuiz}>
            <span className="retake-button-text">Retake the quiz</span>
          </button>
        </div>
      </div>


      <div className="routine-section">
        <div className="routine-content">
          <div className="routine-text">
            <h2 className="routine-title">Daily routine</h2>
            <p className="routine-description">
              Perfect for if you're looking for soft, nourished skin, our
              moisturizing body washes are made with skin-natural nutrients
              that work with your skin to replenish moisture. With a light
              formula, the bubbly lather leaves your skin feeling cleansed and
              cared for. And by choosing relaxing fragrances you can add
              a moment of calm to the end of your day.
            </p>
          </div>

    
          <div className="products-section">
            <ProductSlider
              products={recommendedProducts}
              title=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;