import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import APIs from "../api/Api";

const UserVehicleDetails = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(" Extracted Vehicle ID:", vehicleId); // Debugging
    if (vehicleId) fetchVehicleDetails();
  }, [vehicleId]);

  const fetchVehicleDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required! Please log in.");
        setLoading(false);
        return;
      }

      //  Check if vehicleId is valid before making API call
      if (!vehicleId || vehicleId.length !== 24) { // MongoDB ObjectId is 24 characters
        console.error(" Invalid Vehicle ID:", vehicleId);
        setError("Invalid Vehicle ID.");
        setLoading(false);
        return;
      }

     

      const response = await axios.get(APIs.VEHICLE_DETAILS_USER_API(vehicleId), {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched vehicle data:", response.data);

      if (!response.data.vehicle) {
        throw new Error("Vehicle not found!");
      }

      setVehicle(response.data.vehicle);
    } catch (error) {
      console.error(" Error fetching vehicle details:", error);
      setError(error.response?.data?.error || "Failed to load vehicle details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <h5 className="text-center text-muted">Loading vehicle details...</h5>
      ) : error ? (
        <h5 className="text-center text-danger">{error}</h5>
      ) : vehicle ? (
        <div className="card p-4 shadow-lg border-0 rounded">
          {/* Vehicle Image */}
          <div className="text-center">
            <img
              src={vehicle.image?.startsWith("http") ? vehicle.image : `${APIs.BASE_URL}/uploads/${vehicle.image}`}
              alt={vehicle.vehicle_name || "Vehicle"}
              className="img-fluid rounded"
              style={{ height: "300px", width: "100%", objectFit: "cover" }}
              onError={(e) => (e.target.src = "/default-car.jpg")} // Fallback Image
            />
          </div>

          {/* Vehicle Details */}
          <div className="mt-4">
            <h3 className="fw-bold text-primary">{vehicle.vehicle_name || "Unnamed Vehicle"}</h3>
            <p><strong>Brand:</strong> {vehicle.brand || "N/A"}</p>
            <p><strong>Year:</strong> {vehicle.year || "N/A"}</p>
            <p><strong>Price Per Day:</strong> ${vehicle.price_per_day || "N/A"}</p>
            <p>
              <strong>Status:</strong>
              <span className={`badge ${vehicle.status === "Available" ? "bg-success" : "bg-danger"} ms-2`}>
                {vehicle.status || "Unknown"}
              </span>
            </p>

            {/* Book Now Button */}
            <div className="mt-3 text-center">
              <button className="btn btn-primary px-4 py-2" onClick={() => navigate(`/user/booking/${vehicle._id}`)}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h5 className="text-center text-muted">Vehicle not found</h5>
      )}
    </div>
  );
};

export default UserVehicleDetails;
