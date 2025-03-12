import express from "express";
import auth from "../middlewares/auth.js";
import {
    userHomepage,
    getVehicleById,
    usrBookVehicle,
    userBookingHistory,
    completeBooking,
    userProfile,
    updateUserProfile
} from "../controllers/userController/userVehicleController.js";

const router = express.Router();

// User Profile Routes
router.get("/profile/:user_id", auth, userProfile);
router.put("/profile/:id", auth, updateUserProfile);

// Vehicle Routes
router.get("/vehicle", auth, userHomepage);
router.get("/vehicle/:id", auth, getVehicleById);

// Booking Routes
router.post("/book/:user_id", auth, usrBookVehicle);
router.get("/bookings", auth, userBookingHistory);
router.put("/complete/:booking_id", auth, completeBooking);

export default router;
