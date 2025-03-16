import React, { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";


const Header = () => {
  const [user, setUser] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Convert string to object
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top h-5">
        <div className="container">
          <NavLink className="navbar-brand" to="/">Carswift</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/user">Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/user/about">About</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/user/profile">Profile</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/">log-out</NavLink></li>
             
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Header;
