import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css"; 

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container d-flex flex-column justify-content-center align-items-center">
      <img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif" 
        alt="404 Not Found"
        className="error-gif"
      />
      <h2 className="text-danger mt-3">Oops! Page Not Found</h2>
      <p className="text-muted">The page you're looking for doesn't exist.</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
