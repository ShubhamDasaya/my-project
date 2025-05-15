import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import APIs from "../api/Api";
import { loginSuccess } from "../rudux/AuthSlice.jsx";
import "./SignUpPage.css";

function Signup() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1); // Step 1: Enter Details | Step 2: Enter OTP
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Register & Send OTP
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.contact || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required!", { position: "top-center" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(APIs.SEND_OTP_API, {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        password: formData.password,
      });

      if (response.data.success) {
        toast.success("OTP sent to your email. Please verify.", { position: "top-center" });
        setStep(2); // Move to OTP verification step
      } else {
        toast.error(response.data.message || "Signup failed. Try again.", { position: "top-center" });
      }
    } catch (err) {
      toast.error("Signup failed. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  /// Verify OTP & Auto Login
const verifyOtpAndLogin = async (e) => {
  e.preventDefault();

  if (!formData.otp || formData.otp.length !== 6) {
    toast.error("Enter a valid 6-digit OTP!", { position: "top-center" });
    return;
  }

  try {
    setLoading(true);
    const response = await axios.post(APIs.VERIFY_OTP_API, {
      email: formData.email,
      otp: formData.otp.trim(),
    });

    if (response.data.success && response.data.token && response.data.user) {
      localStorage.setItem("token", response.data.token);
      dispatch(
        loginSuccess({
          user: response.data.user,
          token: response.data.token,
        })
      );
      toast.success("Signup successful! Redirecting...", { position: "top-center" });
      setTimeout(() => navigate("/user"), 500);
    } else {
      toast.error(response.data.message || "Invalid OTP. Please try again.", { position: "top-center" });
    }
  } catch (error) {
    toast.error("Error verifying OTP. Try again.", { position: "top-center" });
  } finally {
    setLoading(false);
  }
};


  // Resend OTP
  const resendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(APIs.RESEND_OTP_API, { email: formData.email });
      toast.success(response.data.message, { position: "top-center" });
    } catch (error) {
      toast.error("Error resending OTP. Try again.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-fullpage d-flex justify-content-center align-items-center vh-100">
      <form className="glass-form p-4 shadow rounded" onSubmit={step === 1 ? handleRegister : verifyOtpAndLogin}>
        <h2 className="text-center fw-bold mb-3">{step === 1 ? "Sign Up" : "Verify OTP"}</h2>

        {step === 1 ? (
          <>
            <div className="mb-3">
              <input type="text" name="name" className="form-control" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <input type="text" name="contact" className="form-control" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Sending OTP..." : "Register & Send OTP"}
            </button>
          </>
        ) : (
          <>
            <div className="mb-3">
              <input type="text" name="otp" className="form-control" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-2" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP & Login"}
            </button>

            <button type="button" className="btn btn-secondary w-100" onClick={resendOtp} disabled={loading}>
              {loading ? "Resending..." : "Resend OTP"}
            </button>
          </>
        )}

        <p className="mt-3 text-center">Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
}

export default Signup;
