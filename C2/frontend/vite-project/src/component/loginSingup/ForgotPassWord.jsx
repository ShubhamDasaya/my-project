import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import APIs from "../api/Api";
import { toast } from "react-toastify";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  // Get user ID from Redux store
  const userId = useSelector((state) => state.auth.user?._id); 

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(APIs.FORGOT_PASSWORD_API, { email, userId });

      
      toast.success(response.data.message || "Password reset link sent!");
      setEmail(""); 
    } catch (err) {
      
      toast.error(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{ opacity: 0.9 }}>
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "350px",
          background: "rgba(253, 253, 253, 0.7)", 
          padding: "35px",
          borderRadius: "12px",
          backdropFilter: "blur(20px)",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          maxWidth: "420px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
        }}
      >
        <h2 className="text-center mb-3">Forgot Password</h2>

        <form onSubmit={handleForgotPassword}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
