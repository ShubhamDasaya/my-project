import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #007bff, #0056b3)",
        color: "white",
        textAlign: "center",
        padding: "10px 0",
        height:"50px",
        position:"absolute",
        bottom:"0px"
      }}
    >
      <div>
        

        {/* Social Media Icons */}
        <div style={{ display: "flex", justifyContent: "space-around", gap: "15px" }}>
        <p style={{ marginBottom: "10px"   }}>
          &copy; {new Date().getFullYear()} Carswift. All Rights Reserved.
        </p>
          <a href="#" style={{ color: "white", fontSize: "18px" }}>
            <FaFacebook />
          </a>
          <a href="#" style={{ color: "white", fontSize: "18px" }}>
            <FaTwitter />
          </a>
          <a href="#" style={{ color: "white", fontSize: "18px" }}>
            <FaInstagram />
          </a>
          <a href="#" style={{ color: "white", fontSize: "18px" }}>
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
