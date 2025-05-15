import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import APIs from "../api/Api";
import "./GetVehicleDetails.css";

const UserVehicleDetails = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (vehicleId && vehicleId.trim().length === 24) {
      fetchVehicleDetails();
    } else {
      setError("Invalid Vehicle ID.");
      setLoading(false);
    }
  }, [vehicleId]);

  const fetchVehicleDetails = async () => {
    if (!vehicleId || vehicle) return; 

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required! Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get(APIs.VEHICLE_DETAILS_USER_API(vehicleId), {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVehicle(response.data.vehicle || null);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to load vehicle details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vehicle-card mt-4">
      <div className="card-content">
        {loading && <h5 className="text-center text-muted">Loading vehicle details...</h5>}
        {error && <h5 className="text-center text-danger">{error}</h5>}

        {!loading && !error && vehicle ? (
          <div className="row text-black">
            {/* Left Side - Vehicle Image */}
            <div className="col-md-6 text-center">
              <img
                src={vehicle.image || "/default-car.jpg"}
                alt={vehicle.vehicle_name || "Vehicle"}
                className="img-fluid rounded"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "/default-car.jpg"; 
                }}
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />

              {/* RC Card Image */}
              {vehicle.rcCard ? (
                <div className="mt-2">
                  <strong>RC Card:</strong>
                  <img
                    src={vehicle.rcCard}
                    alt="RC Card"
                    className="img-fluid rounded mt-2"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "/default-rc-card.jpg";
                    }}
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
              ) : (
                <p><strong>RC Card:</strong> Not Available</p>
              )}
            </div>

            {/* Right Side - Vehicle Details */}
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h3 className="fw-bold text-primary">{vehicle.vehicle_name || "Unnamed Vehicle"}</h3>
              <p><strong>Brand:</strong> {vehicle.brand || "N/A"}</p>
              <p><strong>Year:</strong> {vehicle.year || "N/A"}</p>
              <p><strong>Price Per Day:</strong> ₹{vehicle.price_per_day || "N/A"}</p>
              <p><strong>Fuel Type:</strong> {vehicle.fuelType || "N/A"}</p>
              <p><strong>AC:</strong> {vehicle.ac || "N/A"}</p>
              <p><strong>Seating Capacity:</strong> {vehicle.seatingCapacity || "N/A"}</p>

              {/* Book Now Button */}
              <div className="mt-3">
                <button className="btn btn-primary px-4 py-2" onClick={() => navigate(`/user/booking/${vehicle._id}`)}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          !loading && !error && <h5 className="text-center text-muted">Vehicle not found</h5>
        )}
      </div>
    </div>
  );
};

export default UserVehicleDetails;
