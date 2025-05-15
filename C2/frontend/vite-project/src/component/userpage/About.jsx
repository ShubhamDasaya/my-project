import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-heading">About Us</h2>
      <p className="about-paragraph">
        Welcome to <span className="highlight">DriveEase</span>, your trusted car rental service designed to make every journey smooth and hassle-free.  
        Whether you're looking for a luxury ride, a budget-friendly option, or a thrilling sports car experience, we have something for everyone.
      </p>

      {/* First Section - Luxury Sedans */}
      <div className="about-section">
        <div className="about-image-container">
          <img src="/image6.jpg" alt="Luxury Sedans" className="about-image" />
        </div>
        <div className="about-text-container">
          <h3 className="about-subheading">Luxury Sedans</h3>
          <p className="about-paragraph">
            Elevate your travel experience with our premium sedans, offering <span className="bold-text">supreme comfort and sophistication</span>.  
            Perfect for <span className="bold-text">business trips or special occasions</span>, these cars provide a smooth and luxurious ride.
          </p>
        </div>
      </div>

      {/* Second Section - Sports Cars */}
      <div className="about-section reverse">
        <div className="about-image-container">
          <img src="/image2.jpg" alt="Sports Cars" className="about-image" />
        </div>
        <div className="about-text-container">
          <h3 className="about-subheading">Sports Cars</h3>
          <p className="about-paragraph">
            Experience the <span className="bold-text">thrill of speed and performance</span> with our collection of high-end sports cars.  
            Designed for those who love adrenaline, our cars will make every drive an unforgettable adventure.
          </p>
        </div>
      </div>

      {/* Third Section - Family SUVs */}
      <div className="about-section">
        <div className="about-image-container">
          <img src="/image7.jpg" alt="Family SUVs" className="about-image" />
        </div>
        <div className="about-text-container">
          <h3 className="about-subheading">Family SUVs</h3>
          <p className="about-paragraph">
            Spacious, comfortable, and reliable – our SUVs are perfect for <span className="bold-text">family road trips</span>.  
            With extra storage and seating, these vehicles ensure <span className="bold-text">a safe and enjoyable journey for everyone</span>.
          </p>
        </div>
      </div>

      {/* Fourth Section - Convertibles */}
      <div className="about-section reverse">
        <div className="about-image-container">
          <img src="/image1.jpg" alt="Convertibles" className="about-image" />
        </div>
        <div className="about-text-container">
          <h3 className="about-subheading">Convertibles</h3>
          <p className="about-paragraph">
            <span className="bold-text">Feel the breeze and soak in the views</span> with our stylish convertibles.  
            Whether you're cruising along the beach or through the city, these cars provide the <span className="bold-text">ultimate open-air driving experience</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;