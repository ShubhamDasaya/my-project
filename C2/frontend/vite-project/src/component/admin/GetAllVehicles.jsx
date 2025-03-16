import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/Api";

const GetAllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found! Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get(api.VEHICLE_LIST_API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVehicles(response.data.vehicles || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Failed to load vehicles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center text-primary fw-bold mb-4">All Vehicles</h3>

      {loading ? (
        <h5 className="text-center text-muted">Loading vehicles...</h5>
      ) : error ? (
        <h5 className="text-center text-danger">{error}</h5>
      ) : vehicles.length > 0 ? (
        <div className="row">
          {vehicles.map((vehicle) => {
            console.log(vehicle);

            return (
              <div key={vehicle._id} className="col-md-4 mb-4">
                <div className="card p-3 shadow-sm border-0 rounded">
                  <div className="text-center">
                    <img
                      src={
                        vehicle?.image?.startsWith("http")
                          ? vehicle.image
                          : `/uploads/${vehicle.image}`
                      }
                      alt={vehicle.vehicle_name}
                      className="img-fluid rounded"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  </div>

                  <div className="mt-3">
                    <h5 className="fw-bold">{vehicle.vehicle_name}</h5>
                    <p>
                      <strong>Brand:</strong> {vehicle.brand}
                    </p>
                    <p>
                      <strong>Year:</strong> {vehicle.year}
                    </p>
                    <p>
                      <strong>Price Per Day:</strong> ${vehicle.price_per_day || "0"}
                    </p>
                    <p>
                      <strong>Status:</strong>
                      <span
                        className={`badge ${
                          vehicle.status === "available" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {vehicle.status || "Unknown"}
                      </span>
                    </p>
                  </div>

                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-outline-secondary w-50"
                      onClick={() => navigate(`/admin/vehicle/${vehicle._id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-outline-primary w-50 ms-2"
                      onClick={() => navigate(`/admin/update-vehicle/${vehicle._id}`)}
                    >
                      Update Vehicle
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h5 className="text-center text-muted">No vehicles available</h5>
      )}
    </div>
  );
};

export default GetAllVehicles;
