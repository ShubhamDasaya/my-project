import mongoose from "mongoose";
import Vehicle from "../../models/adminModel/vehicleModels.js";
import User from "../../models/adminModel/dataTables.js";
import Booking from "../../models/adminModel/bookingVehicleModls.js";
import Payment from "../../models/adminModel/paymentModel.js";



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
        const { id } = req.params; //  Standard RESTful API naming

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Vehicle ID format" });
        }

        // Fetch vehicle from database`
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        // Construct full image URL (if image exists)
        const vehicleData = vehicle.toObject(); // Convert Mongoose document to plain object
        vehicleData.image = vehicle.image 
            ? `${req.protocol}://${req.get("host")}/uploads/${vehicle.image}`
            : null; // Handle missing images

        return res.status(200).json({ vehicle: vehicleData });
    } catch (error) {
        console.error(" Error fetching vehicle:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



//  User Booking Vehicle
export const userBookVehicle = async (req, res) => {
    try {
        console.log("Received booking request:", req.body);

        const { user_id, vehicle_id, start_date, end_date } = req.body;

        if (!user_id || !vehicle_id || !start_date || !end_date) {
            console.error("Missing required fields:", req.body);
            return res.status(400).json({ error: "All fields are required" });
        }

        const vehicle = await Vehicle.findById(vehicle_id);
        if (!vehicle) {
            console.error("Vehicle not found:", vehicle_id);
            return res.status(404).json({ error: "Vehicle not found" });
        }

        if (vehicle.status !== "Available") {
            console.error("Vehicle is not available:", vehicle_id);
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

        res.status(200).json({ message: "Booking created. Proceed with payment.", booking });
    } catch (error) {
        console.error("Error in booking vehicle:", error);
        res.status(500).json({ error: "Booking failed. Please try again later." });
    }
};

export const makePayment = async (req, res) => {
    try {
        console.log("Received payment request:", req.body);

        const { user_id, booking_id, payment_method, total_price } = req.body;
        console.log(user_id, booking_id, payment_method, total_price);
        
        if (!user_id || !booking_id || !payment_method || !total_price) {
            return res.status(400).json({ error: "All fields are required for payment" });
        }

        const booking = await Booking.findById(booking_id);
        if (!booking) {
            console.error("Booking not found:", booking_id);
            return res.status(404).json({ error: "Booking not found" });
        }

        if (booking.status !== "Pending") {
            return res.status(400).json({ error: "Booking is already processed or invalid" });
        }

        const payment = await Payment.create({
            user_id,
            booking_id,
            vehicle_id: booking.vehicle_id,
            amount: total_price,
            payment_method,
            status: "Completed",
        });

        await Booking.findByIdAndUpdate(booking_id, { status: "Booked" });
        await Vehicle.findByIdAndUpdate(booking.vehicle_id, { status: "Booked" });

        console.log("Payment successful:", payment);

        res.status(200).json({ message: "Payment successful. Booking confirmed!", payment });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ error: "Payment failed. Please try again later." });
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



// Cancel Booking (User)
export const cancelBooking = async (req, res) => {
    try {
        const { booking_id } = req.body;
        console.log(booking_id);
        
        if (!mongoose.Types.ObjectId.isValid(booking_id)) {
            return res.status(400).json({ error: "Invalid Booking ID" });
        }

        const booking = await Booking.findById(booking_id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        if (booking.status === "Completed") {
            return res.status(400).json({ error: "Cannot cancel a completed booking" });
        }

        // If the booking is already paid, process refund
        const payment = await Payment.findOne({ booking_id });
        if (payment) {
            await Payment.findByIdAndUpdate(payment._id, { status: "Refunded" });
        }

        // Update booking status
        await Booking.findByIdAndUpdate(booking_id, { status: "Cancelled" });
        await Vehicle.findByIdAndUpdate(booking.vehicle_id, { status: "Available" });

        res.status(200).json({ message: "Booking cancelled successfully. Refund processed if applicable." });
    } catch (error) {
        console.error("Error cancelling booking:", error);
        return res.status(500).json({ error: "Failed to cancel booking" });
    }
};

// Complete Booking (User)
export const completeBooking = async (req, res) => {
    try {
        const { booking_id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(booking_id)) {
            return res.status(400).json({ error: "Invalid Booking ID" });
        }

        const booking = await Booking.findById(booking_id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        if (booking.status !== "Booked") {
            return res.status(400).json({ error: "Booking is not active or already completed" });
        }

        await Booking.findByIdAndUpdate(booking_id, { status: "Completed" });
        await Vehicle.findByIdAndUpdate(booking.vehicle_id, { status: "Available" });

        res.status(200).json({ message: "Booking completed successfully" });
    } catch (error) {
        console.error("Error completing booking:", error);
        return res.status(500).json({ error: "Failed to complete booking" });
    }
};



