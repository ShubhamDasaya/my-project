import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Footer from "../userpage/layout/Footer";

const AdminLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", 
      }}
    >
      <AdminHeader />

     
     
      <div style={{ flex: "1" }}>
        <Outlet />
      </div>

      
      <Footer />
    </div>
  );
};

export default AdminLayout;
