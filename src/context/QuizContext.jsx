import React, { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
  answers: JSON.parse(localStorage.getItem('haircare-quiz-answers') || '{}'),
  currentQuestion: 1,
  isCompleted: JSON.parse(localStorage.getItem('haircare-quiz-completed') || 'false'),
  wishlist: JSON.parse(localStorage.getItem('haircare-wishlist') || '[]')
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_ANSWER': {
      const newAnswers = {
        ...state.answers,
        [action.questionId]: action.answer
      };
      localStorage.setItem('haircare-quiz-answers', JSON.stringify(newAnswers));
      return {
        ...state,
        answers: newAnswers
      };
    }
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1
      };
    case 'PREV_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion - 1
      };
    case 'SET_CURRENT_QUESTION':
      return {
        ...state,
        currentQuestion: action.questionId
      };
    case 'COMPLETE_QUIZ':
      localStorage.setItem('haircare-quiz-completed', JSON.stringify(true));
      return {
        ...state,
        isCompleted: true
      };
    case 'RESET_QUIZ':

      localStorage.setItem('haircare-quiz-completed', JSON.stringify(false));
      return {
        ...state,
        currentQuestion: 1,
        isCompleted: false
      };
    case 'ADD_TO_WISHLIST': {
      const newWishlist = [...state.wishlist, action.productId];
      localStorage.setItem('haircare-wishlist', JSON.stringify(newWishlist));
      return {
        ...state,
        wishlist: newWishlist
      };
    }
    case 'REMOVE_FROM_WISHLIST': {
      const filteredWishlist = state.wishlist.filter(id => id !== action.productId);
      localStorage.setItem('haircare-wishlist', JSON.stringify(filteredWishlist));
      return {
        ...state,
        wishlist: filteredWishlist
      };
    }
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}