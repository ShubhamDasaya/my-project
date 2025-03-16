import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <div className="container">
          <NavLink className="navbar-brand" to="/">Carswift</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/addVehicle">Add Car</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/allVehicle">All Vehicles</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/allUsers">All Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">log-out</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Ensure content doesn't get hidden under the fixed navbar */}
      <div style={{ marginTop: '60px' }}></div>
    </>
  );
};

export default AdminHeader;
