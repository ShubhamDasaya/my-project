import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import APIs from "../api/Api.jsx";
import { toast } from "react-toastify";




const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post(APIs.LOGOUT_API, {}, { withCredentials: true });

        // Clear stored user data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Show toast notification
        toast.success("Logged out successfully!");

        // Redirect after a short delay
        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        console.error("Error logging out:", error);
        toast.error("Failed to log out. Please try again.");
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="text-center mt-5">
      <h4>Logging out...</h4>
    </div>
  );
};

export default Logout;
