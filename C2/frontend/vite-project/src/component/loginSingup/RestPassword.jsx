import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import APIs from "../api/Api";
import { toast } from "react-toastify";
import "./ResetPassword.css";



const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !newPassword || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(APIs.RESET_PASSWORD_API(token), { newPassword });

      if (!res.data || !res.data.success) {
        throw new Error("Invalid response from server.");
      }

      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      toast.error(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center backgroundImage">
      <div className="reset-password-container shadow-lg p-4 rounded">
        <h2 className="text-center mb-3">Reset Your Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-100">
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
