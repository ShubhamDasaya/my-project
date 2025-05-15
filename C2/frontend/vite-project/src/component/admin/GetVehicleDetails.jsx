import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import APIs from "../api/Api";
import "./GetVehicleDetails.css"
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

  const handleDeleteVehicle = async () => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      await axios.delete(APIs.DELETE_VEHICLE_API(vehicleId));
      alert("Vehicle deleted successfully!");
      navigate("/admin/allVehicle");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle.");
    }
  };

 

  return (
    <div className="vehicle-details-container" style={{marginTop:"0px"}}>
      <div className="row vehicle-details-card">
       
        {loading && <h5 className="text-center text-muted">Loading vehicle details...</h5>}
  
     
        {error && <h5 className="text-center text-danger">{error}</h5>}
  
       
        {!loading && !error && vehicle && (
          <>
           
            <div className="col-md-6 text-center">
              <img
                src={vehicle.image?.startsWith("http") ? vehicle.image : `${APIs.BASE_URL}/uploads/${vehicle.image || "default-car.jpg"}`}
                alt={vehicle.vehicle_name || "Vehicle"}
                className="img-fluid vehicle-image"
                onError={(e) => (e.target.src = "/default-car.jpg")}
              />
  
              {/* RC Card Image */}
              {vehicle.rcCard ? (
                <div>
                    <img
                    src={vehicle.rcCard?.startsWith("http") ? vehicle.rcCard : `${APIs.BASE_URL}/uploads/${vehicle.rcCard}`}
                    alt="RC Card"
                    className="img-fluid rounded mt-2"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
              ) : (
                <p><strong>RC Card:</strong> Not Available</p>
              )}
            </div>
  
            
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h3 className="fw-bold text-primary">{vehicle.vehicle_name || "Unnamed Vehicle"}</h3>
              <p><strong>Brand:</strong> {vehicle.brand || "N/A"}</p>
              <p><strong>Year:</strong> {vehicle.year || "N/A"}</p>
              <p><strong>Price Per Day:</strong> ₹{vehicle.price_per_day || "N/A"}</p>
              <p><strong>Fuel Type:</strong> {vehicle.fuelType || "N/A"}</p>
              <p><strong>AC:</strong> {vehicle.ac || "N/A"}</p>
              <p><strong>Seating Capacity:</strong> {vehicle.seatingCapacity || "N/A"}</p>
  
                <div className="d-flex flex-wrap">
                <button className="btn btn-outline-primary btn-custom" onClick={() => navigate(`/admin/update-vehicle/${vehicle._id}`)}>Update Vehicle</button>
                <button className="btn btn-danger btn-custom" onClick={handleDeleteVehicle}>Delete Vehicle</button>
              </div>
            </div>
          </>
        )}
  
        {!loading && !error && !vehicle && <h5 className="text-center text-muted">Vehicle not found</h5>}
      </div>
    </div>
  );
  
};

export default UserVehicleDetails;
