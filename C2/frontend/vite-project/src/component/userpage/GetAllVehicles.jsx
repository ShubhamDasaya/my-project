import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/Api";

const UserGetAllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required! Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get(api.VEHICLES_USER_API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVehicles(response.data.vehicles || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Could not load vehicles. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{marginTop:"120px" , marginBottom:"20px"}}>


      {loading ? (
        <h5 className="text-center text-muted">Loading vehicles...</h5>
      ) : error ? (
        <h5 className="text-center text-danger">{error}</h5>
      ) : vehicles.length > 0 ? (

      
         <div className="row">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="col-md-4 mb-5">
              <div className="card p-3 shadow-sm border-0 rounded" >
                <div className="text-center">
                  <img
                    src={vehicle?.image?.startsWith("http") ? vehicle.image : `/uploads/${vehicle.image}`}
                    alt={vehicle.vehicle_name || "Vehicle"}
                    className="img-fluid rounded-top"
                    style={{ height: "200px", objectFit: "cover", borderBottom: "4px solid #007bff", width: "350px" }}
                  />
                </div>

                <div className="mt-3">
                  <h5 className="fw-bold">{vehicle.vehicle_name || "N/A"}</h5>
                  <p><strong>Brand:</strong> {vehicle.brand || "Unknown"}</p>
                  <p><strong>Year:</strong> {vehicle.year || "N/A"}</p>
                  <p><strong>Price Per Day:</strong> ₹{vehicle.price_per_day || "0"}</p>

                </div>

                <div className="mt-3 d-flex justify-content-between">
                  <button
                    className="btn btn-primary w-50 me-2"
                    onClick={() => navigate(`/user/booking/${vehicle._id}`)}
                  >
                    Book Now
                  </button>
                  <button
                    className="btn btn-outline-secondary w-50"
                    onClick={() => navigate(`/user/vehicle/${vehicle._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h5 className="text-center text-muted">No vehicles available</h5>
      )}
    </div>
  );
};

export default UserGetAllVehicles;