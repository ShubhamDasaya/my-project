import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Footer from "../userpage/layout/Footer";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <div className="container mt-5 mb-3">
        <Outlet /> 
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
