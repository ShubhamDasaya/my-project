// src/components/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { loginSuccess } from "../rudux/AuthSlice.jsx";
import APIs from "../api/Api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(APIs.LOGIN_API, {
        email,
        password,
        role,
      });
      console.log(response);
      

      if (response.data.token) {
        dispatch(loginSuccess({ user: { email, role }, token: response.data.token }));
        navigate(role === "Admin" ? "/admin" : "/user");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
          </form>
            <div className="text-center mt-3">
              <Link to="/forgot-password"  className="text-decoration-none">Forgot Password?</Link>
            </div>
            <div className="text-center mt-2">
              <span> Don't have an account?</span>
              <Link to="/signup" className="text-decoration-none">Sign Up </Link>
            </div>
       
      </div>
    </div>
  );
};

export default Login;
