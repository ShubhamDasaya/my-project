import express from 'express';
import upload from '../middlewares/upload.js';
import auth from '../middlewares/auth.js';
import {addNewVehicle,updateVehicle,vehiclePage,deleteVehicle,maintenanceVehicles,availableVehicles, bookedVehicle, getVehicleByID} from "../controllers/adminController/vehicleInfoController.js"
import {cancelBooking, bookCar, verifyPayment, getBookedVehiclesData, getBookingById   } from '../controllers/adminController/bookingVehicleController.js';
import { deleteUserByAdmin, getAllUsers, getUserById, suspendUser,unSuspendUser } from '../controllers/adminController/allUser.js';

const router = express.Router();




    
//Get all vehicles
router.get("/vehicle",auth,vehiclePage); //ok 

router.get("/vehicle/:vehicleId",getVehicleByID)
// Add a new vehicle
router.post("/addVehicle",upload.single("image"), addNewVehicle);
// Update vehicle details
router.put("/updateVehicle/:id", auth,upload.single("image"), updateVehicle);
//Delete a vehicle
router.delete("/vehicle/:id",auth,deleteVehicle); //ok
//Get available vehicles
router.get('/vehicle-available',auth,availableVehicles);//ok
// Get booked vehicles
router.get('/vehicle-booked',auth,bookedVehicle);//ok
//Get vehicles under maintenance //ok
router.get('/vehicle-maintenance',auth,maintenanceVehicles);//ok
//Now vehicle is Available for booking
router.put('/vehicle-maintenance',auth,availableVehicles);//ok





//Admin books a vehicle
router.post("/book", auth, bookCar);
router.post("/verify-payment", auth, verifyPayment);
router.delete("/cancel/:bookingId", auth, cancelBooking);
router.get('/book',auth,getBookedVehiclesData)
router.get('/book:/bookingID',auth,getBookingById)

//Get all user 
router.get("/all-user",auth,getAllUsers);//ok
//Get user by id 
router.get("/all-user/:user_id",auth,getUserById);//ok
// User suspendUser by Abmin
router.put("/user-suspend/:user_id",auth,suspendUser);//ok
// User suspendUser by Abmin
router.put("/user-unsuspend/:user_id",auth,unSuspendUser)//ok
// Admin delete user
router.delete("/user-delete/:user_id",auth,deleteUserByAdmin);//ok




export default router;
