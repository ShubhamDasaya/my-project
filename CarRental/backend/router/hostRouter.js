import express from "express";
import auth from "../middlewares/auth.js";
const router = express.Router();
import {getHostProfile,updateHostProfile,addHostVehicle,completeHostBooking,getHostVehicles,getHostVehicleById,deleteVehicle,getHostBookings,getHostBookingById,cancelBookingByHost, hostHomepage} from "../controllers/hostController/hostBookingVehicles.js"

//home page of host
router.get('/homehost',hostHomepage)

// Host Profile Routes
router.get("/profile/:id",auth, getHostProfile); //ok
router.put("/profile/:id", updateHostProfile); //ok

// Vehicle Management Routes
 // Add a new vehicle
router.post("/add-vehicle/:host_id",auth, addHostVehicle);//ok
 // Get all vehicles of a host
router.get("/vehicles/:host_id", auth,getHostVehicles);//ok
 // Get a specific vehicle by ID
router.get("/vehicle/:id",auth, getHostVehicleById);//ok
// Delete a vehicle
router.delete("/vehicle/:id",auth, deleteVehicle); //ok



// Booking Management Routes
// Get all bookings for a host
router.get("/bookings/:host_id",auth, getHostBookings); // pending 
// Get a specific booking
router.get("/booking/:id",auth,getHostBookingById); //pending 
 // Mark booking as completed
router.put("/booking/:id/complete", auth,completeHostBooking);//pending
// Cancel booking by host
router.put("/booking/:id/cancel",auth, cancelBookingByHost); //pending




export default router;
