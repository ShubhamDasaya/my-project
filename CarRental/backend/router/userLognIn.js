import express from "express";
import auth from "../middlewares/auth.js"
import {userHomepage,getVehicleById,usrBookVehicle,userBookingHistory,completeBooking, userProfile,updateUserProfile} from "../controllers/userController/userVehicleController.js";

const  router = express.Router();


// Get Logged-in User Profile
router.get("/profile/:user_id",auth,userProfile); //ok

//get update user profile 
router.put("/profile/:id",auth,updateUserProfile);//ok



// Fetch all available vehicles (Home Page)
router.get("/vehicle",auth, userHomepage);//ok

// Fetch a specific vehicle by ID
router.get("/vehicle/:id",auth, getVehicleById);//ok

// Book a vehicle (User)
router.post("/book/:user_id",auth, usrBookVehicle); // pending

// Fetch user booking history
router.get("/bookings/",auth, userBookingHistory); // pending 

// Complete a booking
router.put("/complete/:booking_id",auth,completeBooking);//peding


export default router;