import express from 'express';

import auth from '../middlewares/auth.js';
import {addNewVehicle,updateVehicle,vehiclePage,deleteVehicle,maintenanceVehicles,availableVehicles, bookedVehicle} from "../controllers/adminController/vehicleInfoController.js"
import {createBooking, getAllBookings, getBookingById,updateBooking,cancelBooking   } from '../controllers/adminController/bookingVehicleController.js';
import { adminBookVehicle,adminCancelBooking, completeBooking, maintenVehicles, availableVehiclesOnMainten } from "../controllers/adminController/adminBookVehicleController.js"
import { deleteUserbyAdmin, getAllUser, getAllUserById, suspendUser,unSuspendUser } from '../controllers/adminController/allUser.js';
import {getAllHost, getHostById,suspendHost,unSuspendHost,deleteHostByAdmin,approveVehicle,cancelVehicleRequest,getPendingVehicles } from '../controllers/adminController/allHost.js'

const router = express.Router();

// router.get('/sign-up', adminHomepage);
// Admin registration



    
//Get all vehicles
router.get("/vehicle",auth,vehiclePage); //ok 
// Add a new vehicle
router.post("/vehicle/:owner_id",auth,addNewVehicle); //ok
// Update vehicle details
router.put("/vehicle-update/:id",auth,updateVehicle); //ok
//Delete a vehicle
router.delete("/vehicle-delete/:id",auth,deleteVehicle); //ok
//Get available vehicles
router.get('/vehicle-available',auth,availableVehicles);//ok
// Get booked vehicles
router.get('/vehicle-booked',auth,bookedVehicle);//ok
//Get vehicles under maintenance //ok
router.get('/vehicle-maintenance',auth,maintenanceVehicles);//ok
//Now vehicle is Available for booking
router.put('/vehicle-maintenance',auth,availableVehicles);//ok




// Book Vehicle from booking tabels
router.post("/booking-vehicle",auth,createBooking)//pending
//Get all bookings
router.get("/bookings",auth, getAllBookings);// pending 
// Get booking details by ID
router.get("/bookings/:id",auth, getBookingById);//pending
//Update booking details
router.put("/bookings/:id",auth, updateBooking);//pendign 
//Cancel booking
router.delete("/bookings/:id",auth, cancelBooking);//pending

//Admin books a vehicle
router.post("/book",auth, adminBookVehicle);//pending
//Admin cancels a booking
router.put("/cancel/:booking_id",auth, adminCancelBooking);//pending
//Mark booking as completed
router.put("/complete/:booking_id",auth, completeBooking);//pending
//Mark vehicle under maintenance
router.put("/maintenance/:vehicle_id",auth, maintenVehicles);//pending
//Mark vehicle as available after maintenance
router.put("/available/:vehicle_id",auth, availableVehiclesOnMainten);//pending


//Get all user 
router.get("/all-user",auth,getAllUser);//ok
//Get user by id 
router.get("/all-user/:user_id",auth,getAllUserById);//ok
// User suspendUser by Abmin
router.put("/user-suspend/:user_id",auth,suspendUser);//ok
// User suspendUser by Abmin
router.put("/user-unsuspend/:user_id",auth,unSuspendUser)//ok
// Admin delete user
router.delete("/user-delete/:user_id",auth,deleteUserbyAdmin);//ok



// Get all hosts
//Admin see host requset for vehicle
router.get("/vehicles-pending",auth, getPendingVehicles);//ok
// Approve a vehicle request (Admin Only)
router.put("/vehicles-approve/:vehicle_id",auth, approveVehicle);// not Working 
// Cancel (Reject) a vehicle request (Admin Only)
router.delete("/vehicles-cancel/:vehicle_id", cancelVehicleRequest);// not working 
//Get all host data
router.get("/hosts",auth, getAllHost);//ok
// Get host by ID
router.get("/hosts/:host_id",auth, getHostById);//ok
// Suspend host by admin
router.put("/hosts-suspend/:host_id", auth,suspendHost);//ok
// Activate (unSuspend) host by admin
router.put("/hosts-unsuspend/:host_id",auth, unSuspendHost);//ok
// Delete host by admin
router.delete("/hosts-delete/:host_id",auth, deleteHostByAdmin);//ok

export default router;
