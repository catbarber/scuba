import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        
        <div className="error-icon">
          <svg viewBox="0 0 24 24" width="80" height="80">
            <path 
              fill="currentColor" 
              d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"
            />
          </svg>
        </div>
        
        <h1 className="error-title">Page Not Found</h1>
        
        <p className="error-message">
          Oops! The page you're looking for seems to have drifted away with the tide.
        </p>
        
        <div className="button-group">
          <button className="home-button" onClick={handleGoHome}>
            Return Home
          </button>
          <button className="back-button" onClick={handleGoBack}>
            Go Back
          </button>
        </div>

        <div className="quick-links">
          <p>Popular Pages:</p>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        
        <div className="wave-decoration">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;