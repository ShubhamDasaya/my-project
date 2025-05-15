import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose"; // MongoDB connection
import { body } from "express-validator";
import path from 'path'
import adminRouter from "./router/adminLognIn.js";
import userRouter from "./router/userLognIn.js";
import { forgotPasswordUser, resetPasswordUser, userSignIn, userSignUp,logoutUser, sendOtpUser, resendOtp, verifyOtp } from "./controllers/adminController/adminControllers.js";
import auth from "./middlewares/auth.js";
import { completeExpiredBookings } from "./controllers/adminController/bookingVehicleController.js";
const app = express();



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//for images 
app.use("/uploads", express.static(path.join("uploads")));



// Routes
app.post(
  "/signup",
  body("name", "Name is required").notEmpty(),
  body("email", "Invalid Email").isEmail(),
  body("email", "Email is required").notEmpty(),
  body("contact", "Contact is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
  body("password", "Password must be 6-10 characters").isLength({ min: 6, max: 10 }),
  userSignUp
);

app.post(
  "/login",
  body("email", "Invalid Email").isEmail(),
  body("password", "Password is required").notEmpty(),
  userSignIn
);


// Routers


app.use('/send-otp',sendOtpUser);
app.use('/resend-otp',resendOtp);
app.use('/verify-otp',verifyOtp);

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.use('/logout',auth,logoutUser);

//Forget Password
app.post('/forgot-password',forgotPasswordUser);

//Reset password 
app.post('/reset-password/:token',resetPasswordUser);



// Start the Server
// const PORT = process.env.PORT || 5000;
const PORT = 3000;
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB Connected Successfully...");
    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}...`);
    });
    
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
connectDB();



