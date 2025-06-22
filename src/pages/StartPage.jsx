import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import '../styles/StartPage.css';

function StartPage() {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();

  const handleStartQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
    navigate('/question/1');
  };

  return (
    <div className="start-page">
      <div className="start-container">
        <div className="start-content">
          <h1 className="start-title">Build a self care routine suitable for you</h1>
          <p className="start-subtitle">
            Take our test to get a personalised self care routine based on your needs.
          </p>

          <button className="start-button" onClick={handleStartQuiz}>
            Start the quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;