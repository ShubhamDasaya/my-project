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
    if (vehicleId) fetchVehicleDetails();
  }, [vehicleId]);

  const fetchVehicleDetails = async () => {
    setLoading(true);
    setError("");

    try {
      if (!vehicleId || vehicleId.length !== 24) {
        setError("Invalid Vehicle ID.");
        setLoading(false);
        return;
      }

      const response = await axios.get(APIs.VEHICLE_DETAILS_ADMIN_API(vehicleId));
      if (!response.data.vehicle) throw new Error("Vehicle not found!");

      setVehicle(response.data.vehicle);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to load vehicle details.");
    } finally {
      setLoading(false);
    }
  };

  // **Delete Vehicle**
  const handleDeleteVehicle = async () => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      await axios.delete(APIs.DELETE_VEHICLE_API(vehicleId));
      alert("Vehicle deleted successfully!");
      navigate("/admin/allVehicle"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle.");
    }
  };

  // **Mark Vehicle as Maintenance**
  const handleMarkAsMaintenance = async () => {
    try {
      await axios.put(APIs.VEHICLES_UNDER_MAINTENANCE_API(vehicleId));
      alert("Vehicle marked as 'Maintenance'");
      fetchVehicleDetails();
    } catch (error) {
      console.error("Error marking as maintenance:", error);
      alert("Failed to update vehicle status.");
    }
  };

  // **Mark Vehicle as Available**
  const handleMarkAsAvailable = async () => {
    try {
      await axios.put(APIs.AVAILABLE_VEHICLES_API(vehicleId));
      alert("Vehicle marked as 'Available'");
      fetchVehicleDetails();
    } catch (error) {
      console.error("Error marking as available:", error);
      alert("Failed to update vehicle status.");
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
          <div className="text-center">
            <img
              src={vehicle.image?.startsWith("http") ? vehicle.image : `${APIs.BASE_URL}/uploads/${vehicle.image}`}
              alt={vehicle.vehicle_name || "Vehicle"}
              className="img-fluid rounded"
              style={{ height: "300px", width: "100%", objectFit: "cover" }}
              onError={(e) => (e.target.src = "/default-car.jpg")}
            />
          </div>

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
            <button
  style={{ width: "25%", marginLeft: "10px", padding: "10px", fontWeight: "bold" }}
  className="btn btn-outline-primary"
  onClick={() => navigate(`/admin/update-vehicle/${vehicle._id}`)}
>
  Update Vehicle
</button>

<button
  style={{ width: "25%", marginTop: "10px", marginLeft:"5px", padding: "10px", fontWeight: "bold" }}
  className="btn btn-danger"
  onClick={handleDeleteVehicle}
>
  Delete Vehicle
</button>





          </div>
        </div>
      ) : (
        <h5 className="text-center text-muted">Vehicle not found</h5>
      )}
    </div>
  );
};

export default UserVehicleDetails;
