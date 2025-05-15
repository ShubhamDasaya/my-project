import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../rudux/AuthSlice.jsx";
import APIs from "../api/Api";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

import "./LoginPage.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(APIs.LOGIN_API, { email, password, role });
      console.log("Login API Response:", response.data);

      if (response.data.token && response.data.user) {
        dispatch(
          loginSuccess({
            user: response.data.user,
            token: response.data.token,
          })
        );

        toast.success("Login successful! Redirecting...", { autoClose: 500 });
        setTimeout(() => navigate(role === "Admin" ? "/admin" : "/user"), 500);
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="login-card">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select className="form-select login-input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "12px", borderRadius: "8px", fontWeight: "bold" }}
          >
            Log-in
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/forgot-password" className="login-link">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-2">
          <span className="text-white"> Don't have an account? </span>
          <Link to="/signup" className="login-link">
            Sign Up
          </Link>
        </div>
      </div>
      
     
    </div>
  );
};

export default Login;
