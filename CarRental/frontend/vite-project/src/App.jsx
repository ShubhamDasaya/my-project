import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/login_sign_up/Login.jsx";
import Signup from "./components/login_sign_up/SignUp.jsx";
import AdminDashboard from "./components/admin/AdminHomePage.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token && userRole) {
      setUser({ role: userRole });
    }
    setLoading(false); // Mark loading as false after checking
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading screen while checking auth
  }

  return (
    <Routes>
      {/* Always show Login page first */}
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup />} />

      {/* Redirect to respective dashboards only if the user is logged in */}
      {user?.role === "Admin" && (
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      )}
      {/* {user?.role === "Host" && <Route path="/host/dashboard" element={<HostDashboard />} />}
      {user?.role === "User" && <Route path="/user/dashboard" element={<UserDashboard />} />} */}

      {/* If user is not logged in, redirect to login */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
     