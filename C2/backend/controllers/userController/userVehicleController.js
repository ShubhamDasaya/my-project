import mongoose from "mongoose";
import Vehicle from "../../models/adminModel/vehicleModels.js";
import User from "../../models/adminModel/dataTables.js";
import Booking from "../../models/adminModel/bookingVehicleModls.js";
import Payment from "../../models/adminModel/paymentModel.js";
import { sendEmail } from "../../middlewares/resetPassword.js";
import dotenv from 'dotenv'
dotenv.config();

//  Get all available vehicles with full image URLs
export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ status: "Available" });

        // Map vehicles to include full image URL
        const vehiclesWithImages = vehicles.map((vehicle) => ({
            ...vehicle._doc, // Keep existing data
            image: vehicle.image
                ? `${req.protocol}://${req.get("host")}/uploads/${vehicle.image}`
                : null, // Handle missing images
        }));

        return res.status(200).json({ vehicles: vehiclesWithImages });
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return res.status(500).json({ error: "Failed to fetch vehicles" });
    }
};



export const getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Vehicle ID format" });
        }

        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        const vehicleData = vehicle.toObject(); 
        vehicleData.image = vehicle.image 
            ? `${req.protocol}://${req.get("host")}/uploads/${vehicle.image}`
            : null; 

        vehicleData.rcCard = vehicle.rcCard 
            ? `${req.protocol}://${req.get("host")}/uploads/${vehicle.rcCard}`
            : null; 

        return res.status(200).json({ vehicle: vehicleData });
    } catch (error) {
        console.error("Error fetching vehicle:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

  

//  User Booking Vehicle
export const userBookVehicle = async (req, res) => {
    try {
        const { user_id, vehicle_id, start_date, end_date } = req.body;

        if (!user_id || !vehicle_id || !start_date || !end_date) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const vehicle = await Vehicle.findById(vehicle_id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        if (vehicle.status !== "Available") {
            return res.status(400).json({ error: "Vehicle is currently unavailable" });
        }

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        if (isNaN(startDate) || isNaN(endDate) || startDate >= endDate) {
            return res.status(400).json({ error: "Invalid start or end date" });
        }

        const rentalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        if (rentalDays <= 0) {
            return res.status(400).json({ error: "Booking must be at least 1 day" });
        }

        const total_price = rentalDays * vehicle.price_per_day;

        const booking = await Booking.create({
            user_id,
            vehicle_id,
            start_date,
            end_date,
            total_price,
            status: "Pending",
        });

        console.log("Booking created successfully:", booking);
        return res.status(200).json({ message: "Booking created. Proceed with payment.", booking });

    } catch (error) {
        console.error("Error in booking vehicle:", error);
        return res.status(500).json({ error: "Booking failed. Please try again later." });
    }
};

// **User Payment**
export const makePayment = async (req, res) => {
    try {
       

        const { user_id, booking_id, payment_method, total_price } = req.body;
        if (!user_id || !booking_id || !payment_method || !total_price) {
            return res.status(400).json({ error: "All fields are required for payment" });
        }

        // Fetch booking details along with user and vehicle using populate
        const booking = await Booking.findById(booking_id)
            .populate("user_id", "name email contact") // Populate user details
            .populate("vehicle_id", "vehicle_name brand status"); // Populate vehicle details

        if (!booking) {
            console.error("Booking not found:", booking_id);
            return res.status(404).json({ error: "Booking not found" });
        }

        if (booking.status !== "Pending") {
            return res.status(400).json({ error: "Booking is already processed or invalid" });
        }

        const user = booking.user_id;
        const vehicle = booking.vehicle_id;

        if (!user || !vehicle) {
            return res.status(404).json({ error: "User or Vehicle not found" });
        }

        // Create payment record
        const payment = await Payment.create({
            user_id: user._id,
            booking_id: booking._id,
            vehicle_id: vehicle._id,
            amount: total_price,
            payment_method,
            status: "Completed",
        });

        // Update booking and vehicle status
        booking.status = "Booked";
        vehicle.status = "Booked";

        await booking.save();
        await vehicle.save();

        console.log("Payment successful:", payment);

        // Extract booking dates safely
        const startDate = booking.start_date ? new Date(booking.start_date).toDateString() : "N/A";
        const endDate = booking.end_date ? new Date(booking.end_date).toDateString() : "N/A";

        // Send Email to User
        
        await sendEmail(
            user.email,
            "🎉 CarSwift: Your Vehicle Booking is Confirmed! 🚗",
            `Dear ${user.name},<br><br> We are excited to confirm your booking for the ${vehicle.vehicle_name}!`,
            `<html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }
                        .container {
                            max-width: 600px;
                            margin: auto;
                            background: #ffffff;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #4CAF50;
                            color: #ffffff;
                            padding: 20px;
                            text-align: center;
                        }
                        .content {
                            padding: 20px;
                            line-height: 1.6;
                        }
                        .footer {
                            background-color: #f4f4f4;
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                            color: #777;
                        }
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            margin: 20px 0;
                            background-color: #4CAF50;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        @media (max-width: 600px) {
                            .container {
                                width: 100%;
                                box-shadow: none;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎉 Booking Confirmation 🎉</h1>
                        </div>
                        <div class="content">
                            <h3>Dear ${user.name},</h3>
                            <p>We are excited to confirm your booking for the <strong style="color: #4CAF50;">${vehicle.vehicle_name}</strong> !</p>
                            <div style="border: 1px solid #4CAF50; padding: 15px; border-radius: 5px; background-color: #f9f9f9;">
                                <p><strong>Vehicle Name:</strong> ${vehicle.vehicle_name}</p>
                                 <p><strong>Vehicle Brand:</strong> ${vehicle.brand}</p>
                                <p><strong>Start Date:</strong> ${startDate}</p>
                                <p><strong>End Date:</strong> ${endDate}</p>
                            </div>
                            <p>Thank you for choosing our service! Have a fantastic experience.</p>
                            <p>For any concerns, contact our support team.</p>
                            <p> + 123456789</p>
                            <a href="http://localhost:5173" class="button">Visit Our Website</a>
                        </div>
                        <div class="footer">
                            <p>Best Regards,</p>
                            <p>The CarSwift Team</p>
                            <p><a href="http://localhost:5173" style="color: #4CAF50; text-decoration: none;">Visit our website</a></p>
                        </div>
                    </div>
                </body>
            </html>`
        );

        // Send Email to Admin
        await sendEmail(
            process.env.EMAIL_ADMIN,
            "🚗 CarSwift: New Vehicle Booking Alert! 📅",
            `New booking from ${user.name} for ${vehicle.vehicle_name}.`,
            `<html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }
                        .container {
                            max-width: 600px;
                            margin: auto;
                            background: #ffffff;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #FF5722;
                            color: #ffffff;
                            padding: 20px;
                            text-align: center;
                        }
                        .content {
                            padding: 20px;
                            line-height: 1.6;
                        }
                        .footer {
                            background-color: #f4f4f4;
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                            color: #777;
                        }
                        .details {
                            border: 1px solid #FF5722;
                            padding: 15px;
                            border-radius: 5px;
                            background-color: #ffffff;
                            margin-bottom: 20px;
                        }
                        @media (max-width: 600px) {
                            .container {
                                width: 100%;
                                box-shadow: none;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>🚨 New Booking Alert 🚨</h2>
                        </div>
                        <div class="content">
                            <p><strong>User Details:</strong></p>
                            <div class="details">
                                <p><strong>Name:</strong> ${user.name}</p>
                                <p><strong>Email:</strong> ${user.email}</p>
                                <p><strong>Contact:</strong> ${user.contact}</p>
                            </div>
                            <p><strong>Vehicle Details:</strong></p>
                            <div class="details">
                                <p><strong>Vehicle Name:</strong> ${vehicle.vehicle_name}</p>
                                <p><strong>Vehicle Brand:</strong> ${vehicle.brand}</p>
                                <p><strong>Start Date:</strong> ${startDate}</p>
                                <p><strong>End Date:</strong> ${endDate}</p>
                            </div>
                            <p>Please take the necessary actions to process this booking.</p>
                        </div>
                        <div class="footer">
                            <p>Best Regards,</p>
                            <p>The CarSwift Team</p>
                            <p><a href="http://localhost:5173" style="color: #FF5722; text-decoration: none;">Visit our website</a></p>
                        </div>
                    </div>
                </body>
            </html>`
        );

        res.status(200).json({ message: "Payment successful. Booking confirmed!", payment });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ error: "Payment failed. Please try again later." });
    }
};


// Cancel Booking (User)
export const cancelBooking = async (req, res) => {
    try {
        const { booking_id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(booking_id)) {
            return res.status(400).json({ error: "Invalid Booking ID" });
        }

        // Fetch booking details
        const booking = await Booking.findById(booking_id).populate("user_id vehicle_id");
        if (!booking) return res.status(404).json({ error: "Booking not found" });

        if (booking.status === "Completed") {
            return res.status(400).json({ error: "Cannot cancel a completed booking" });
        }

        const { user_id: user, vehicle_id: vehicle, start_date, end_date } = booking;

        // Check if payment exists and process refund
        const payment = await Payment.findOne({ booking_id });
        let refundMessage = "";
        if (payment) {
            await Payment.findByIdAndUpdate(payment._id, { status: "Refunded" });
            refundMessage = " A refund has been processed.";
        }

        // Update booking and vehicle status
        await Booking.findByIdAndUpdate(booking_id, { status: "Cancelled" });
        await Vehicle.findByIdAndUpdate(vehicle._id, { status: "Available" });

        console.log("Booking cancelled successfully.");

// **Send Email to User**

    await sendEmail(
        user.email,
        "❌ CarSwift: Booking Cancellation Confirmation",
        `Dear ${user.name}, your booking for ${vehicle.name} has been cancelled. ${refundMessage}`,
        `<html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: auto;
                        background: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #F44336;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        text-align: center;
                        padding: 10px;
                        font-size: 12px;
                        color: #777;
                    }
                    .details {
                        border: 1px solid #F44336;
                        padding: 15px;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                        margin-bottom: 20px;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        margin: 20px 0;
                        background-color: #4CAF50;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    @media (max-width: 600px) {
                        .container {
                            width: 100%;
                            box-shadow: none;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>❌ Booking Cancellation Confirmation ❌</h2>
                    </div>
                    <div class="content">
                        <p>Dear ${user.name},</p>
                        <p>Your booking for <strong style="color: #F44336;">${vehicle.name}</strong> has been cancelled.</p>
                        <div class="details">
                            <p><b>Vehicle Name:</b> ${vehicle.vehicle_name}</p>
                             <p><b>Vehicle Brand:</b> ${vehicle.brand}</p> 
                            <p><strong>Start Date:</strong> ${start_date ? start_date.toDateString() : "N/A"}</p>
                            <p><strong>End Date:</strong> ${end_date ? end_date.toDateString() : "N/A"}</p>
                        </div>
                        <p>${refundMessage}</p>
                        <p>For any concerns, contact our support team.</p>
                          <p> + 123456789</p>
                        <a href="http://localhost:5173/payment" class="button">Return to Payment Process</a>
                    </div>
                    <div class="footer">
                        <p>Best Regards,</p>
                        <p>The CarSwift Team</p>
                        <p><a href="http://localhost:5173" style="color: #F44336; text-decoration: none;">Visit our website</a></p>
                    </div>
                </div>
            </body>
        </html>`
    );

// **Send Email to Admin**
await sendEmail(
    process.env.EMAIL_ADMIN,
    "🚗 CarSwift: Vehicle Booking Cancellation Alert ❌",
    `User ${user.name} has canceled their booking for ${vehicle.vehicle_name}.`,
    `<html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #F44336;
                    color: #ffffff;
                    padding: 20px;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                    line-height: 1.6;
                }
                .footer {
                    background-color: #f4f4f4;
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #777;
                }
                .details {
                    border: 1px solid #F44336;
                    padding: 15px;
                    border-radius: 5px;
                    background-color: #ffffff;
                    margin-bottom: 20px;
                }
                @media (max-width: 600px) {
                    .container {
                        width: 100%;
                        box-shadow: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>🚨 Booking Cancellation Alert 🚨</h2>
                </div>
                <div class="content">
                    <p><b style="color: #F44336;">User Details:</b></p>
                    <div class="details">
                        <p><b>Name:</b> ${user.name}</p>
                        <p><b>Email:</b> ${user.email}</p>
                        <p><b>Contact:</b> ${user.contact}</p>
                    </div>
                    <p><b style="color: #F44336;">Vehicle Details:</b></p>
                    <div class="details">
                        <p><b>Vehicle Name:</b> ${vehicle.vehicle_name}</p>
                        <p><b>Vehicle Brand:</b> ${vehicle.brand}</p>
                        <p><b>Start Date:</b> ${start_date ? start_date.toDateString() : "N/A"}</p>
                        <p><b>End Date:</b> ${end_date ? end_date.toDateString() : "N/A"}</p>
                        <p><b>Status:</b> <span style="color: #F44336;">Cancelled</span></p>
                    </div>
                    <p>Please take the necessary actions to process this cancellation.</p>
                </div>
                <div class="footer">
                    <p>Best Regards,</p>
                    <p>The CarSwift Team</p>
                    <p><a href="http://localhost:5173" style="color: #F44336; text-decoration: none;">Visit our website</a></p>
                </div>
            </div>
        </body>
    </html>`
);


        res.status(200).json({ message: "Booking cancelled successfully. Refund processed if applicable." });

    } catch (error) {
        console.error("Error cancelling booking:", error);
        res.status(500).json({ error: "Failed to cancel booking" });
    }
};


//  Fetch User Booking History
export const userBookingHistory = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ error: "Invalid User ID" });
        }

        const bookings = await Booking.find({ user_id }).populate("vehicle_id", "vehicle_name brand");

        if (!bookings.length) {
            return res.status(404).json({ message: "No booking history found" });
        }

        return res.status(200).json({ bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({ error: "Error fetching bookings" });
    }
};








