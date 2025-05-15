import express from "express";
import { getVehicles, getVehicleById, userBookingHistory, userBookVehicle,makePayment,cancelBooking } from "../controllers/userController/userVehicleController.js";
import auth from "../middlewares/auth.js";


const router = express.Router();

//  Route: Get All Vehicles
router.get("/vehicles",auth, getVehicles);
// Route: Get Vehicle Details by ID    ok
router.get("/vehicle/:id",auth, getVehicleById);

//  Route: Book a Vehicle   ok
router.post("/book",auth, userBookVehicle);

// Router: To sent the payment
router.post("/payment", auth, makePayment);

//  Route: Fetch User Booking History
router.get("/history/:user_id", auth, userBookingHistory);



//  Cancel a booking
router.put("/cancel", cancelBooking);

export default router;
