import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/Api";

const VehicleDetails = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVehicleDetails();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : null;
  };

  const fetchVehicleDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const headers = getAuthHeaders();
      if (!headers) {
        setError("No token found! Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get(api.VEHICLE_DETAILS_API(vehicleId), { headers });
      setVehicle(response.data.vehicle);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      setError("Failed to load vehicle details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      const headers = getAuthHeaders();
      if (!headers) {
        alert("No token found! Please log in.");
        return;
      }

      await axios.delete(api.DELETE_VEHICLE_API(vehicleId), { headers });
      alert("Vehicle deleted successfully!");
      navigate("/admin/allVehicle");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle.");
    }
  };

  const handleMaintenance = async () => {
    try {
      const headers = getAuthHeaders();
      if (!headers) {
        alert("No token found! Please log in.");
        return;
      }

      await axios.put(api.MAINTENANCE_VEHICLE_API(vehicleId), {}, { headers });
      alert("Vehicle marked as under maintenance.");
      fetchVehicleDetails();
    } catch (error) {
      console.error("Error updating maintenance status:", error);
      alert("Failed to update maintenance status.");
    }
  };

  const handleAvailable = async () => {
    try {
      const headers = getAuthHeaders();
      if (!headers) {
        alert("No token found! Please log in.");
        return;
      }

      await axios.put(api.AVAILABLE_VEHICLE_API(vehicleId), {}, { headers });
      alert("Vehicle is now available for booking.");
      fetchVehicleDetails();
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Failed to update vehicle availability.");
    }
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <h5 className="text-center text-muted">Loading vehicle details...</h5>
      ) : error ? (
        <h5 className="text-center text-danger">{error}</h5>
      ) : vehicle ? (
        <div className="card p-4 shadow-sm border-0 rounded">
          <div className="text-center">
            <img
              src={vehicle?.image}
              alt={vehicle.vehicle_name || "Vehicle"}
              className="img-fluid rounded"
              style={{ height: "250px", objectFit: "cover" }}
            />
          </div>

          <div className="mt-4">
            <h3 className="fw-bold">{vehicle.vehicle_name}</h3>
            <p><strong>Brand:</strong> {vehicle.brand}</p>
            <p><strong>Year:</strong> {vehicle.year}</p>
            <p><strong>Price Per Day:</strong> ${vehicle.price_per_day}</p>
            <p>
              <strong>Status:</strong>
              <span className={`badge ${vehicle.status === "available" ? "bg-success" : "bg-danger"}`}>
                {vehicle.status}
              </span>
            </p>

            <div className="mt-3">
              <button className="btn btn-danger me-2" onClick={handleDelete}>
                Delete Vehicle
              </button>

              {vehicle.status === "available" ? (
                <button className="btn btn-warning me-2" onClick={handleMaintenance}>
                  Mark as Maintenance
                </button>
              ) : (
                <button className="btn btn-success me-2" onClick={handleAvailable}>
                  Make Available for Booking
                </button>
              )}

              <button className="btn btn-primary" onClick={() => navigate(`/admin/booking/${vehicle._id}`)}>
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

export default VehicleDetails;
