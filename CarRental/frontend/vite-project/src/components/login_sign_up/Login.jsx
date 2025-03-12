import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../api/BaseApi.jsx"; // Import the API file

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User"); // Default role selection
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API.USER_LOGIN, { email, password, role });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role);

      setUser({ role });

      if (role === "Admin") navigate("/admin/dashboard");
      else if (role === "Host") navigate("/host/dashboard");
      else navigate("/user/dashboard");
    } catch (error) {
      alert(error.response?.data?.error || "Invalid credentials!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Select Role:</label>
          <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Admin">Admin</option>
            <option value="Host">Host</option>
            <option value="User">User</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
