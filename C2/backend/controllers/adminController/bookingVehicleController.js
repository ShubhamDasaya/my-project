import mongoose from "mongoose";
import Vehicle from "../../models/adminModel/vehicleModels.js";
import Booking from "../../models/adminModel/bookingVehicleModls.js";
import Payment from "../../models/adminModel/paymentModel.js";
import User from "../../models/adminModel/dataTables.js";
import { sendEmail } from "../../middlewares/resetPassword.js";
import dotenv from 'dotenv'
dotenv.config();
//  Get all available vehicles with full image URLs
export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ status: "Available" });

        
        const vehiclesWithImages = vehicles.map((vehicle) => ({
            ...vehicle._doc, 
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
            : null; // Handle missing images

        return res.status(200).json({ vehicle: vehicleData });
    } catch (error) {
        console.error(" Error fetching vehicle:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get booked vehicles
export const bookedVehicle = async (req, res) => {
    try {
        const bookings = await Booking.find({ status: "Booked" }) 
            .populate("user_id", "name email contact")
            .populate( "vehicle_id","vehicle_name brand price_per_day");

     

        if (!bookings.length) {
            return res.status(200).json({ message: "No booked vehicles" });
        }

        const bookedVehicles = bookings.map((booking) => ({
            bookingId: booking._id,
            startDate: booking.start_date,
            endDate: booking.end_date,
            status: booking.status,

            user: booking.user_id
                ? {
                      name: booking.user_id.name,
                      email: booking.user_id.email,
                      contact: booking.user_id.contact,
                  }
                : { message: "User details not available" },

            vehicle: booking.vehicle_id && booking.vehicle_id.vehicle_name
                ? {
                      vehicle_name: booking.vehicle_id.vehicle_name,
                      brand: booking.vehicle_id.brand,
                      pricePerDay: booking.vehicle_id.price_per_day,
                  }
                : { message: "Vehicle details not available" },
        }));

        
        return res.status(200).json({ bookings: bookedVehicles });
    } catch (error) {
        console.error("Error fetching booked vehicles:", error);
        return res.status(500).json({ error: "Failed to fetch booked vehicles" });
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


// User Payment
export const makePayment = async (req, res) => {
    try {
       

        const { user_id, booking_id, payment_method, total_price } = req.body;
        if (!user_id || !booking_id || !payment_method || !total_price) {
            return res.status(400).json({ error: "All fields are required for payment" });
        }

        // Fetch booking details along with user and vehicle using populate
        const booking = await Booking.findById(booking_id)
            .populate("user_id", "name email contact") // Populate user details
            .populate("vehicle_id", "vehicle_name status"); // Populate vehicle details

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
                `Dear ${user.name},<br><br> We are excited to confirm your booking for the ${vehicle.name}!`,
                `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
                        <h2 style="color: #4CAF50; text-align: center;">🎉 Booking Confirmation 🎉</h2>
                        <h3 style="text-align: center;">Dear ${user.name},</h3>
                        <p style="text-align: center;">Your booking for <b style="color: #4CAF50;">${vehicle.name}</b> is confirmed!</p>
                        <div style="border: 1px solid #4CAF50; padding: 15px; border-radius: 5px; background-color: #ffffff;">
                            <p><b>Vehicle Name:</b> ${vehicle.name}</p>
                            <p><b>Start Date:</b> ${startDate}</p>
                            <p><b>End Date:</b> ${endDate}</p>
                        </div>
                        <p style="text-align: center;">Thank you for choosing our service! Have a fantastic experience.</p>
                        <footer style="margin-top: 20px; font-size: 12px; color: #777; text-align: center;">
                            <p>Best Regards,</p>
                            <p>The CarSwift Team</p>
                            <p><a href="http://localhost:5173" style="color: #F44336; text-decoration: none;">Visit our website</a></p>
                        </footer>
                    </div>
                </div>`
            );
       

        // Send Email to Admin
       
            await sendEmail(
                process.env.ADMIN_EMAIL,
                "🚗 CarSwift: New Vehicle Booking Alert! 📅",
                `New booking from ${user.name} for ${vehicle.name}.`,
                `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
                        <h2 style="color: #FF5722; text-align: center;">🚨 New Booking Alert 🚨</h2>
                        <p style="text-align: center;"><b>User Details:</b></p>
                        <div style="border: 1px solid #FF5722; padding: 15px; border-radius: 5px; background-color: #ffffff;">
                            <p><b>Name:</b> ${user.name}</p>
                            <p><b>Email:</b> ${user.email}</p>
                               <p><b>Contact:</b> ${user.contact}</p>
                        </div>
                        <p style="text-align: center;"><b>Vehicle Details:</b></p>
                        <div style="border: 1px solid #FF5722; padding: 15px; border-radius: 5px; background-color: #ffffff;">
                            <p><b>Vehicle Name:</b> ${vehicle.name}</p>
                            <p><b>Start Date:</b> ${startDate}</p>
                            <p><b>End Date:</b> ${endDate}</p>
                        </div>
                        <p style="text-align: center;">Please take the necessary actions to process this booking.</p>
                        <footer style="margin-top: 20px; font-size: 12px; color: #777; text-align: center;">
                            <p>Best Regards,</p>
                            <p>The CarSwift Team</p>
                            <p><a href="http://localhost:5173" style="color: #FF5722; text-decoration: none;">Visit our website</a></p>
                        </footer>
                    </div>
                </div>`
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


// Complete Booking (User)


export const completeExpiredBookings = async () => {
    try {
        
        console.log("Checking for expired bookings...");

        const currentDate = new Date();

        // Find all bookings where end_date has passed and status is still "Booked"
        const expiredBookings = await Booking.find({
            end_date: { $lt: currentDate },  
            status: "Booked",
        });

        if (expiredBookings.length === 0) {
            console.log("No expired bookings found.");
            return;
        }

        const updates = [];
        for (const booking of expiredBookings) {
            updates.push(
                Booking.findByIdAndUpdate(booking._id, { status: "Completed" }),
                Vehicle.findByIdAndUpdate(booking.vehicle_id, { status: "Available" })
            );

            // Fetch user details
            const user = await User.findById(booking.user_id);
            if (!user) continue;  

            console.log(`Booking ${booking._id} marked as Completed`);

            // Send Email to User
            await sendEmail(
                user.email,
                "🎉 Carswift: Booking Completed 🚗",
                `Dear ${user.name}, your booking for the vehicle has been successfully completed.`,
                `<div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #4CAF50;">🎉 Booking Completed Successfully! 🎉</h2>
                    <h3>Dear ${user.name},</h3>
                    <p>We are pleased to inform you that your booking has been completed successfully.</p>
                    <div style="border: 1px solid #4CAF50; padding: 15px; border-radius: 5px; background-color: #f9f9f9;">
                        <p><b>End Date:</b> ${booking.end_date}</p>
                    </div>
                    <p>We hope you had a great experience with your vehicle!</p>
                    <p>If you have any questions or need further assistance, feel free to reach out to our support team.</p>
                    <footer style="margin-top: 20px; font-size: 12px; color: #777;">
                        <p>Thank you for choosing Carswift!</p>
                        <p>Best Regards,</p>
                        <p> Carswift </p>
                        <p><a href="http://localhost:5173" style="color: #4CAF50;">Visit Carswift</a></p>
                    </footer>
                </div>`
            );

            // Send Email to Admin
            await sendEmail(
                process.env.ADMIN_EMAIL,
                "🎉 Carswift: Booking Completed 🚗",
                `User  ${user.name}'s booking has been completed.`,
                `<div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #4CAF50;">🎉 Booking Completion Alert 🎉</h2>
                    <p><b style="color: #4CAF50;">User  Details:</b></p>
                    <div style="border: 1px solid #4CAF50; padding: 15px; border-radius: 5px; background-color: #f9f9f9;">
                        <p><b>Name:</b> ${user.name}</p>
                        <p><b>Email:</b> ${user.email}</p>
                    </div>
                    <p><b style="color: #4CAF50;">Booking Details:</b></p>
                    <div style="border: 1px solid #4CAF50; padding: 15px; border-radius: 5px; background-color: #f9f9f9;">
                        <p><b>Booking ID:</b> ${booking._id}</p>
                        <p><b>End Date:</b> ${booking.end_date}</p>
                    </div>
                    <p style="margin-top: 20px;">Please take note of this completed booking.</p>
                    <footer style="margin-top: 20px; font-size: 12px; color: #777;">
                        <p>Best Regards,</p>
                        <p>CarSwift</p>
                    <p><a href="http://localhost:5173" style="color: #F44336;">Visit our website</a></p>
                    </footer>
                </div>`
            );

        // Run all updates in parallel
        await Promise.all(updates);

        console.log("Expired bookings processed successfully.");
    }
}
     catch (error) {
        console.error("Error completing expired bookings:", error);
}
}

