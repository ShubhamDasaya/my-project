import React from "react";
import { FaUsers, FaCar, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router-dom";


const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Admin Dashboard</h2>
      <div className="row">
        {/* Users Card */}
        <div className="col-md-4">
          <div className="card shadow p-3 mb-4 bg-white rounded">
            <div className="card-body text-center">
              <FaUsers size={50} className="text-primary mb-3" />
              <h4>Total Users</h4>
              <p className="text-muted">Manage all users</p>
              <Link to="/admin/allUsers" className="btn btn-primary">
                View Users
              </Link>
            </div>
          </div>
        </div>

        {/* Vehicles Card */}
        <div className="col-md-4">
          <div className="card shadow p-3 mb-4 bg-white rounded">
            <div className="card-body text-center">
              <FaCar size={50} className="text-success mb-3" />
              <h4>Total Vehicles</h4>
              <p className="text-muted">Manage all vehicles</p>
              <Link to="/admin/allVehicle" className="btn btn-success">
                View Vehicles
              </Link>
            </div>
          </div>
        </div>

        {/* Payments Card */}
        <div className="col-md-4">
          <div className="card shadow p-3 mb-4 bg-white rounded">
            <div className="card-body text-center">
              <FaMoneyBillWave size={50} className="text-warning mb-3" />
              <h4>Total Payments</h4>
              <p className="text-muted">Manage transactions</p>
              <Link to="/admin/payments" className="btn btn-warning">
                View Payments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;