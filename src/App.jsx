import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import StartPage from './pages/StartPage';
import QuestionPage from './pages/QuestionPage';
import ResultsPage from './pages/ResultsPage';
import './App.css';

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/question/:questionId" element={<QuestionPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App
