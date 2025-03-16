import React from "react";
import "./Home.css";
import GetAllVehicles from "./GetAllVehicles";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay"></div>
        <img className="hero-image" src="./HomeCarImge.jpg" alt="Luxury Car" />
        <div className="hero-text">
          <h1>Welcome to <span className="brand-name">Car Swift</span></h1>
          <p>Find Your Perfect Ride – Fast, Easy, and Affordable!</p>
          <div className="hero-buttons">
            <Link to="/user/allVehicle" className="btn btn-primary">Browse Cars</Link>
            <Link to="/user/allVehicle" className="btn btn-success">Book Now</Link>
          </div>
        </div>
      </div>

  

      {/* All Vehicles Section */}
      <div className="container mt-5">
        <h2 className="section-title text-center">🚗 Available Vehicles</h2>
        <GetAllVehicles />
      </div>
    </>
  );
};

export default Home;
