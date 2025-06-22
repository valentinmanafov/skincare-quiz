import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { quizQuestions, totalQuestions } from '../data/quizData';
import ProgressBar from '../components/ProgressBar';
import ArrowIcon from '../assets/images/arrow.svg';
import '../styles/QuestionPage.css';

function QuestionPage() {

  const { questionId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const [selectedOption, setSelectedOption] = useState('');


  const questionNumber = parseInt(questionId);
  const question = quizQuestions.find(q => q.id === questionNumber);


  useEffect(() => {
    const savedAnswer = state.answers[questionNumber];
    if (savedAnswer) {
      setSelectedOption(savedAnswer);
    } else {
      setSelectedOption('');
    }
  }, [questionId, state.answers, questionNumber]);


  if (!question) {
    navigate('/');
    return null;
  }


  const selectOption = (optionId) => {
    setSelectedOption(optionId);

    dispatch({
      type: 'SET_ANSWER',
      questionId: questionNumber,
      answer: optionId
    });
  };


  const goToNext = () => {
    if (!selectedOption) return;


    if (questionNumber === totalQuestions) {
      dispatch({ type: 'COMPLETE_QUIZ' });
      navigate('/results');
    } else {
  
      navigate(`/question/${questionNumber + 1}`);
    }
  };


  const goBack = () => {
    if (questionNumber > 1) {
      navigate(`/question/${questionNumber - 1}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="question-container">

      <div className="question-header">
        <h2 className="question-title">{question.question}</h2>
        <ProgressBar current={questionNumber} total={totalQuestions} />
      </div>


      <div className="options-list">
        {question.options.map((option) => (
          <button
            key={option.id}
            className={`option-button ${selectedOption === option.id ? 'selected' : ''}`}
            onClick={() => selectOption(option.id)}
          >
            <span className="option-text">{option.text}</span>
          </button>
        ))}
      </div>

      <div className="question-navigation">
        <button
          className="nav-button prev-button"
          onClick={goBack}
        >
          Back
        </button>

        <button
          className="nav-button next-button"
          onClick={goToNext}
          disabled={!selectedOption}
        >
          {questionNumber === totalQuestions ? <span className='discoverText'>Discover your results</span> : (
            <>
              Next question
              <img src={ArrowIcon} alt="arrow" className="arrow-icon" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default QuestionPage;