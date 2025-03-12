import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./component/loginSingup/LoginPage";
import AdminDashboard from "./component/admin/AdminHome";
import UserDashboard from "./component/users/UserRoute";
import Signup from "./component/loginSingup/SignUpPage";
import AdminLayout from "./component/admin/AdminLayOut";
import AddVehicle from "./component/admin/AddVehicles";
import GetAllVehicles from "./component/admin/GetAllVehicles";
import GetAllUsers from "./component/admin/GetAllUSer";
import VehicleDetails from './component/admin/GetVehicleDetails';
import CarBooking from './component/admin/BookingVehicle';

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" index element={<AdminDashboard />} />  {/* Default Admin Page */}
          <Route path="addVehicle" element={<AddVehicle />} />
          <Route path="allVehicle" element={<GetAllVehicles />} />
          <Route path="allUsers" element={<GetAllUsers />} />
          <Route path="vehicle/:vehicleId" element={<VehicleDetails />} />
          <Route path="booking/:vehicleId" element={<CarBooking />} /> 
        </Route>

        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
};

export default RouterConfig;
