import React from "react";
import { FaUsers, FaCar, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard container mt-2 mb-5">
      <div className="row">
        {/* Users Card */}
        <div className="col-md-6">
          <div className="admin-card card shadow p-3 mb-4 bg-white rounded same-size-card">
            <div className="card-body text-center d-flex flex-column justify-content-between">
              <FaUsers size={50} className="text-primary mb-3" />
              <h4>Total Users</h4>
              <p className="text-muted">Manage all users</p>
              <Link to="/admin/allUsers" className="btn btn-primary mt-auto">
                View Users
              </Link>
            </div>
          </div>
        </div>

        {/* Vehicles Card */}
        <div className="col-md-6">
          <div className="admin-card card shadow p-3 mb-4 bg-white rounded same-size-card">
            <div className="card-body text-center d-flex flex-column justify-content-between">
              <FaCar size={50} className="text-success mb-3" />
              <h4>Total Vehicles</h4>
              <p className="text-muted">Manage all vehicles</p>
              <Link to="/admin/allVehicle" className="btn btn-success mt-auto">
                View Vehicles
              </Link>
            </div>
          </div>
        </div>

        {/* Payments Card */}
        <div className="col-md-6">
          <div className="admin-card card shadow p-3 mb-4 bg-white rounded same-size-card">
            <div className="card-body text-center d-flex flex-column justify-content-between">
              <FaMoneyBillWave size={50} className="text-warning mb-3" />
              <h4>Total Payments</h4>
              <p className="text-muted">Manage transactions</p>
              <Link to="/admin/payment" className="btn btn-warning mt-auto">
                View Payments
              </Link>
            </div>
          </div>
        </div>

        {/* Bookings Card */}
        <div className="col-md-6">
          <div className="admin-card card shadow p-3 mb-4 bg-white rounded same-size-card">
            <div className="card-body text-center d-flex flex-column justify-content-between">
              <FaClipboardList size={50} className="text-danger mb-3" />
              <h4>Total Bookings</h4>
              <p className="text-muted">Manage all bookings</p>
              <Link to="/admin/bookings" className="btn btn-danger mt-auto">
                View Bookings
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
