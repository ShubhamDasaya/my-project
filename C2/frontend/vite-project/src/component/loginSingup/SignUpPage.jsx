import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import APIs from "../api/Api"; 

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when typing
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match!" });
      return;
    }

    try {
      console.log("Sending Data:", formData);

      const response = await axios.post(
        APIs.SIGNUP_API,
        {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          password: formData.password,
          role: "User",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response Data:", response.data);

      if (response.data.success) {
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setErrors({ apiError: response.data.message || "Signup failed. Try again." });
      }
    } catch (err) {
      console.log("Error Response:", err.response?.data);

      if (err.response?.data?.errors) {
        // Backend validation errors
        const formattedErrors = err.response.data.errors.reduce((acc, error) => {
          acc[error.param] = error.msg;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        setErrors({ apiError: "Signup failed. Please try again." });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto p-4 shadow rounded">
        {errors.apiError && <p className="text-danger text-center">{errors.apiError}</p>}
        {success && <p className="text-success text-center">{success}</p>}

        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        {/* Contact */}
        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          {errors.contact && <small className="text-danger">{errors.contact}</small>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
        </div>

        <button type="submit" className="btn btn-dark w-100">Sign Up</button>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
