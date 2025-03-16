import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import APIs from "../api/Api.jsx";

const UpdateVehicle = () => {
  const { vehicleId } = useParams(); // Get Vehicle ID from URL
  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState(null); // Initialize as null
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
        console.error("Invalid Vehicle ID:", vehicleId);
        setError("Invalid Vehicle ID.");
        setLoading(false);
        return;
      }

      const response = await axios.get(APIs.VEHICLE_DETAILS_ADMIN_API(vehicleId));

      if (!response.data.vehicle) {
        throw new Error("Vehicle not found!");
      }

      setVehicleData(response.data.vehicle);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      setError(error.response?.data?.error || "Failed to load vehicle details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "license_plate") value = value.toUpperCase().trim();
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!vehicleData) return;
  
    try {
      const formData = new FormData();
      for (let key in vehicleData) {
        formData.append(key, vehicleData[key]);
      }
      if (image) formData.append("image", image);
  
      await axios.put(APIs.UPDATE_VEHICLE_API(vehicleId), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert("Vehicle updated successfully!");
      navigate("/admin/allvehicle");
    } catch (err) {
      console.error("Error updating vehicle:", err);
      alert("Failed to update vehicle.");
    }
  };
  
  

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-lg border-0 rounded">
        <h3 className="text-center mb-4 text-primary">Update Vehicle</h3>

        {loading ? (
          <h5 className="text-center text-muted">Loading vehicle details...</h5>
        ) : error ? (
          <h5 className="text-center text-danger">{error}</h5>
        ) : (
          vehicleData && (
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Car Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicle_name"
                    value={vehicleData?.vehicle_name || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Brand</label>
                  <input
                    type="text"
                    className="form-control"
                    name="brand"
                    value={vehicleData?.brand || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-bold">Year</label>
                  <input
                    type="number"
                    className="form-control"
                    name="year"
                    value={vehicleData?.year || ""}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-bold">Price Per Day ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price_per_day"
                    value={vehicleData?.price_per_day || ""}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-bold">License Plate</label>
                  <input
                    type="text"
                    className="form-control"
                    name="license_plate"
                    value={vehicleData?.license_plate || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Update Car Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                {imagePreview && (
                  <div className="text-center mt-3">
                    <img src={imagePreview} alt="Car Preview" className="img-thumbnail" width="200" />
                  </div>
                )}

                <div className="col-12 text-center mt-4">
                  <button className="btn btn-success w-50 fw-bold shadow" type="submit">
                    Update Vehicle
                  </button>
                </div>
              </div>
            </form>
          )
        )}
      </div>
    </div>
  );
};

export default UpdateVehicle;
