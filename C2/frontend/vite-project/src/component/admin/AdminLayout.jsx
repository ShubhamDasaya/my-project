import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Footer from "../layout/Footer";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <div className="container mt-4">
        <Outlet /> 
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
