import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const AdminHeader = () => {
  const location = useLocation();

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          background: "linear-gradient(135deg, rgb(15, 100, 191), rgb(57, 143, 234))",
          position: "sticky",
          top: "0",
          width: "100%",
          zIndex: "1000",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          padding: "10px 0",
        }}
      >
        <div className="container">
          <NavLink
            className="navbar-brand fw-bold"
            to="/"
            style={{ fontSize: "22px", letterSpacing: "1px" }}
          >
            CarSwift
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/admin"
                  style={{
                    color: location.pathname === "/admin" ? "#FFD700" : "#ffffff",
                    fontWeight: location.pathname === "/admin" ? "bold" : "normal",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/admin/addVehicle"
                  style={{
                    color: location.pathname === "/admin/addVehicle" ? "#FFD700" : "#ffffff",
                    fontWeight: location.pathname === "/admin/addVehicle" ? "bold" : "normal",
                  }}
                >
                  Add Car
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/admin/allVehicle"
                  style={{
                    color: location.pathname === "/admin/allVehicle" ? "#FFD700" : "#ffffff",
                    fontWeight: location.pathname === "/admin/allVehicle" ? "bold" : "normal",
                  }}
                >
                  All Vehicles
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/admin/allUsers"
                  style={{
                    color: location.pathname === "/admin/allUsers" ? "#FFD700" : "#ffffff",
                    fontWeight: location.pathname === "/admin/allUsers" ? "bold" : "normal",
                  }}
                >
                  All Users
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
      <div style={{ marginTop: "30px" }}></div>
    </>
  );
};

export default AdminHeader;
