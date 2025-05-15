import React, { useState } from "react";
import axios from "axios";
import APIs from "../api/Api.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./AddVehicle.css";

const AddVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    vehicle_name: "",
    brand: "",
    year: "",
    price_per_day: "",
    license_plate: "",
    fuelType: "",
    seatingCapacity: "",
    ac: "",
    status: "Available",
  });

  const [image, setImage] = useState(null);
  const [rcCard, setRcCard] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [rcCardPreview, setRcCardPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "license_plate") {
      value = value.toUpperCase().trim();
    }
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "image") {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      } else if (type === "rcCard") {
        setRcCard(file);
        setRcCardPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image || !rcCard) {
      toast.error("Please upload both car image and RC Card image!");
      return;
    }

    try {
      const formData = new FormData();
      for (let key in vehicleData) {
        formData.append(key, vehicleData[key]);
      }
      formData.append("image", image);
      formData.append("rcCard", rcCard);

      await axios.post(APIs.ADD_VEHICLE_API, formData);

      toast.success("Vehicle added successfully!");
      setTimeout(() => {
        navigate("/admin/allvehicle");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add vehicle");
    }
  };

  return (
    <div className="add-vehicle-container mt-1 mb-5">
      <div className="container">
        <div className="card p-4 shadow-lg border-0 rounded">
          <h3 className="text-center mb-4 text-primary fw-bold">
            Add New Vehicle
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
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

              <div className="col-md-4">
                <label className="form-label fw-bold">Year</label>
                <input
                  type="number"
                  className="form-control"
                  name="year"
                  placeholder="2025"
                  value={vehicleData.year}
                  onChange={handleChange}
                  min="2015"
                  max={new Date().getFullYear()}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold">Price Per Day ₹</label>
                <input
                  className="form-control"
                  name="price_per_day"
                  placeholder="Enter Price"
                  value={vehicleData.price_per_day}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
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

              <div className="col-md-6">
                <label className="form-label fw-bold">AC</label>
                <select
                  className="form-control"
                  name="ac"
                  value={vehicleData.ac || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select AC Type</option>
                  <option value="Non-AC">Non-AC</option>
                  <option value="AC">AC</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Seating Capacity</label>
                <select
                  className="form-control"
                  name="seatingCapacity"
                  value={vehicleData.seatingCapacity || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Seating Capacity</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold">Fuel Type</label>
                <select
                  className="form-select"
                  name="fuelType"
                  value={vehicleData.fuelType || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              

              <div className="col-md-6">
                <label className="form-label fw-bold">Upload Car Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "image")}
                  required
                />
              </div>

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

              <div className="col-md-6">
                <label className="form-label fw-bold">Upload RC Card</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "rcCard")}
                  required
                />
              </div>

              {rcCardPreview && (
                <div className="text-center mt-3">
                  <img
                    src={rcCardPreview}
                    alt="RC Card Preview"
                    className="img-thumbnail"
                    width="200"
                  />
                </div>
              )}

              <div className="col-12 text-center mt-4">
                <button
                  className="btn btn-primary w-50 fw-bold shadow-lg"
                  type="submit"
                >
                  Add Car
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddVehicle;
