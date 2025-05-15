import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation(); // Get the current URL path

  return (
    <>
      <nav
        className="navbar navbar-expand-lg   fixed-top shadow"
        style={{ height: "60px", padding: "10px 0",   background: "linear-gradient(135deg, rgb(15, 100, 191), rgb(57, 143, 234))", }}
      >
        <div className="container">
          {/* Brand */}
          <NavLink
            className="navbar-brand fw-bold"
            to="/"
            style={{ fontSize: "22px", letterSpacing: "1px", color: "#f8f9fa" }}
          >
            Carswift
          </NavLink>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse fw-bold" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/user"
                  style={{
                    color: location.pathname === "/user" ? "#FFD700" : "#f8f9fa",
                    fontWeight: location.pathname === "/user" ? "bold" : "normal",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/user/about"
                  style={{
                    color: location.pathname === "/user/about" ? "#FFD700" : "#f8f9fa",
                    fontWeight: location.pathname === "/user/about" ? "bold" : "normal",
                  }}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/user/profile"
                  style={{
                    color: location.pathname === "/user/profile" ? "#FFD700" : "#f8f9fa",
                    fontWeight: location.pathname === "/user/profile" ? "bold" : "normal",
                  }}
                >
                  History
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  style={{
                    color: "#DC3545",
                    fontWeight: "bold",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#FF5733")}
                  onMouseOut={(e) => (e.target.style.color = "#DC3545")}
                >
                  LogOut
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Ensure content doesn't hide behind navbar */}
      <div style={{ marginTop: "20px" }}></div>
    </>
  );
};

export default Header;
