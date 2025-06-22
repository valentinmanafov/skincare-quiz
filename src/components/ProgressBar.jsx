import React from 'react';
import '../styles/ProgressBar.css';

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-container">
      <svg className="progress-ring" width="135" height="135">
        <circle
          className="progress-ring-circle-bg"
          stroke="#EEF7FB"
          strokeWidth="5"
          fill="transparent"
          r="45"
          cx="50%"
          cy="50%"
        />
        <circle
          className="progress-ring-circle"
          stroke="#AADDF3"
          strokeWidth="5"
          strokeLinecap="round"
          fill="transparent"
          r="45"
          cx="50%"
          cy="50%"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.3s ease'
          }}
        />
      </svg>
      <div className="progress-text">
        <span className="progress-current">{current}</span>
        <span className="progress-divider">/</span>
        <span className="progress-total">{total}</span>
      </div>
    </div>
  );
}

export default ProgressBar;