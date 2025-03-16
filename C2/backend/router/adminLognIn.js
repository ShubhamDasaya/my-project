import express from 'express';
import upload from '../middlewares/upload.js';
import auth from '../middlewares/auth.js';
import {addNewVehicle,updateVehicle,vehiclePage,deleteVehicle, bookedVehicle, getVehicleByID,getAllPayments} from "../controllers/adminController/vehicleInfoController.js"
import { completeBooking, userBookingHistory, userBookVehicle,makePayment,cancelBooking } from "../controllers/adminController/bookingVehicleController.js";

import { deleteUserByAdmin, getAllUsers, getUserById } from '../controllers/adminController/allUser.js';

const router = express.Router();




    
//Get all vehicles
router.get("/vehicle",vehiclePage); //ok 

router.get("/vehicle/:vehicleId",getVehicleByID)
// Add a new vehicle
router.post("/addVehicle",upload.single("image"), addNewVehicle);
// Update vehicle details
router.put("/updateVehicle/:id",upload.single("image"), updateVehicle);
//Delete a vehicle
router.delete("/vehicle/:id",deleteVehicle); //ok

// Get booked vehicles
router.get('/vehicle-booked',bookedVehicle);//ok





//Admin books a vehicle
//  Route: Book a Vehicle   ok
router.post("/book", userBookVehicle);
// Router: To sent the payment
router.post("/payment",  makePayment);
//  Route: Fetch User Booking History
router.get("/history/:user_id",  userBookingHistory);
//  Complete a booking
router.put("/complete", completeBooking);
//  Cancel a booking
router.put("/cancel", cancelBooking);



//Get all user 
router.get("/all-user",getAllUsers);//ok
//Get user by id 
router.get("/all-user/:user_id",getUserById);//ok

// Admin delete user
router.delete("/user-delete/:user_id",deleteUserByAdmin);//ok

router.get("/payment-table",getAllPayments)



export default router;
