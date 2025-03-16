import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./component/loginSingup/LoginPage";
import Signup from "./component/loginSingup/SignUpPage";
import ForgotPassWord from './component/loginSingup/ForgotPassWord';
import AdminDashboard from "./component/admin/AdminHome";
import AdminLayout from "./component/admin/AdminLayOut";
import AddVehicle from "./component/admin/AddVehicles";
import GetAllVehicles from "./component/admin/GetAllVehicles";
import GetAllUsers from "./component/admin/GetAllUSer";
import VehicleDetails from './component/admin/GetVehicleDetails';
import AppLayout from './component/userpage/layout/AppLayout';
import Home from './component/userpage/Home';
import UserVehicleDetails from './component/userpage/GetVehicleDetails';
import About from './component/userpage/About';
import UserGetAllVehicles from './component/userpage/GetAllVehicles';
import Profile from './component/userpage/Profile';
import VehicleBooking from './component/userpage/BookingVehicle';
import UpdateVehiclel from './component/admin/UpdateVehiclel';
import PaymentTable from './component/admin/PaymentTable';
const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassWord/>}/>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" index element={<AdminDashboard />} />  {/* Default Admin Page */}
          <Route path="addVehicle" element={<AddVehicle />} />
          <Route path="allVehicle" element={<GetAllVehicles />} />
          <Route path="allUsers" element={<GetAllUsers />} />
          <Route path="payment" element={<PaymentTable />} />
          <Route path="vehicle/:vehicleId" element={<VehicleDetails />} />
          <Route path='update-vehicle/:vehicleId' element={ <UpdateVehiclel />} />
          <Route path="logOut" element={<Login />} />
        </Route>

        <Route path="/user" element={<AppLayout />}>
          <Route index element={<Home />} />  {/* Default page when /user is visited */}
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="allVehicle" element={<UserGetAllVehicles/>} />
          <Route path="vehicle/:vehicleId" element={<UserVehicleDetails />} />
          <Route path="booking/:vehicleId" element={<VehicleBooking />} />
          <Route path="logOut" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default RouterConfig;
