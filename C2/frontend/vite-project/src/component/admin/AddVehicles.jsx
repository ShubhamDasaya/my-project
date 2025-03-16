import React, { useState } from "react";
import axios from "axios";
import APIs from "../api/Api.jsx";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    vehicle_name: "",
    brand: "",
    year: "",
    price_per_day: "",
    license_plate: "",
    status: "Available",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    let { name, value } = e.target;
    
    // Auto-format license plate
    if (name === "license_plate") {
      value = value.toUpperCase().trim();
    }

    setVehicleData({ ...vehicleData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found! Please log in.");
        return;
      }

      const formData = new FormData();
      for (let key in vehicleData) {
        formData.append(key, vehicleData[key]);
      }
      formData.append("image", image);

      await axios.post(APIs.ADD_VEHICLE_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Vehicle added successfully!");
      navigate("/allvehicles");
    } catch (err) {
      console.error(err);
      alert("Failed to add vehicle");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-lg border-0 rounded">
        <h3 className="text-center mb-4 text-primary"> Add New Vehicle</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Car Name */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Car Name</label>
              <input
                type="text"
                className="form-control"
                name="vehicle_name"
                placeholder="Enter Car Name"
                value={vehicleData.vehicle_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Brand */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Brand</label>
              <input
                type="text"
                className="form-control"
                name="brand"
                placeholder="Enter Brand"
                value={vehicleData.brand}
                onChange={handleChange}
                required
              />
            </div>

            {/* Year */}
            <div className="col-md-4">
              <label className="form-label fw-bold">Year</label>
              <input
                type="number"
                className="form-control"
                name="year"
                placeholder="2024"
                value={vehicleData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()} // Prevents future years
                required
              />
            </div>

            {/* Price Per Day */}
            <div className="col-md-4">
              <label className="form-label fw-bold">Price Per Day ($)</label>
              <input
                type="number"
                className="form-control"
                name="price_per_day"
                placeholder="Enter Price"
                value={vehicleData.price_per_day}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            {/* License Plate */}
            <div className="col-md-4">
              <label className="form-label fw-bold">License Plate</label>
              <input
                type="text"
                className="form-control"
                name="license_plate"
                placeholder="Enter License Plate"
                value={vehicleData.license_plate}
                onChange={handleChange}
                required
              />
            </div>

         

            {/* Image Upload */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Upload Car Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="text-center mt-3">
                <img
                  src={imagePreview}
                  alt="Car Preview"
                  className="img-thumbnail"
                  width="200"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="col-12 text-center mt-4">
              <button className="btn btn-primary w-50 fw-bold shadow" type="submit">
                Add Car
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
