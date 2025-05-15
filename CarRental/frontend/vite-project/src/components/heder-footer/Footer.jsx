import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">

          {/* About Section */}
          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-3">Carswift</h5>
            <p>
              Your go-to platform for car rentals. Find your perfect ride at the best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><NavLink className="text-light text-decoration-none" to="/">Home</NavLink></li>
              <li><NavLink className="text-light text-decoration-none" to="/about">About</NavLink></li>
              <li><NavLink className="text-light text-decoration-none" to="/contect">Contact</NavLink></li>
              <li><NavLink className="text-light text-decoration-none" to="/terms">Terms & Conditions</NavLink></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-3">Contact</h5>
            <p>Email: support@carswift.com</p>
            <p>Phone: +91 12345 67890</p>
            <p>Location: Indore, India</p>
          </div>

          {/* Social Media Links */}
          <div className="col-md-3 col-sm-6">
            <h5 className="text-uppercase mb-3">Follow Us</h5>
            <div>
              <a href="#" className="text-light me-3"><FaFacebook size={20} /></a>
              <a href="#" className="text-light me-3"><FaTwitter size={20} /></a>
              <a href="#" className="text-light me-3"><FaInstagram size={20} /></a>
              <a href="#" className="text-light"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <hr className="my-4 text-light"/>
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Carswift. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
