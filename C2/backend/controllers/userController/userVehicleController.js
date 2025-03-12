import mongoose from "mongoose";
import Vehicle from "../../models/adminModel/vehicleModels.js";
import User from "../../models/adminModel/dataTables.js";
import Booking from "../../models/adminModel/bookingVehicleModls.js";
import Payment from "../../models/adminModel/paymentModel.js";

// ✅ Fetch Available Vehicles (User Homepage)
export const userHomepage = async (request, response) => {
    try {
        const vehicles = await Vehicle.find({ status: "Available" }).select("vehicle_name brand price_per_day status");

        if (!vehicles.length) {
            return response.status(404).json({ message: "No available vehicles found" });
        }

        return response.status(200).json({ vehicles });
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return response.status(500).json({ error: "Error fetching vehicles" });
    }
};

// ✅ Get User Profile
export const userProfile = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ error: "Invalid User ID" });
        }

        const user = await User.findById(user_id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Failed to fetch user profile" });
    }
};

// ✅ Update User Profile
export const updateUserProfile = async (request, response) => {
    try {
        const { id } = request.params;
        const { userName, email, contact, city, address } = request.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ error: "Invalid User ID" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { userName, email, contact, city, address },
            { new: true, runValidators: true }
        );

        if (!updatedUser) return response.status(404).json({ error: "User not Found" });

        return response.status(200).json({ message: "Successfully updated profile", updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        response.status(500).json({ error: "Failed to Update User Profile" });
    }
};

// ✅ Get Vehicle by ID
export const getVehicleById = async (request, response) => {
    try {
        const { id } = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ error: "Invalid Vehicle ID" });
        }

        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return response.status(404).json({ message: "Vehicle not found" });
        }

        return response.status(200).json({ vehicle });
    } catch (error) {
        console.error("Error fetching vehicle details:", error);
        return response.status(500).json({ error: "Error fetching vehicle details" });
    }
};

// ✅ Book a Vehicle (User)
export const usrBookVehicle = async (request, response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { user_id } = request.params;
        const { vehicle_id, start_date, end_date, amount } = request.body;

        if (!user_id || !vehicle_id || !start_date || !end_date || !amount) {
            await session.abortTransaction();
            session.endSession();
            return response.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findById(user_id).session(session);
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return response.status(404).json({ error: "User not found" });
        }

        const vehicle = await Vehicle.findById(vehicle_id).session(session);
        if (!vehicle || vehicle.status !== "Available") {
            await session.abortTransaction();
            session.endSession();
            return response.status(400).json({ error: `Vehicle is ${vehicle?.status || "Unavailable"}` });
        }

        const rentalDays = Math.ceil((new Date(end_date) - new Date(start_date)) / 86400000);
        const total_price = rentalDays * vehicle.price_per_day;

        if (Number(amount) !== total_price) {
            await session.abortTransaction();
            session.endSession();
            return response.status(400).json({ error: `Payment must be exactly ₹${total_price}` });
        }

        const booking = await Booking.create([{ user_id, vehicle_id, booked_by_type: "User", start_date, end_date, total_price, status: "Booked" }], { session });

        await Payment.create([{ user_id, booking_id: booking[0]._id, vehicle_id, amount: total_price, payment_method: "Online", status: "Completed" }], { session });

        await vehicle.updateOne({ status: "Booked" }, { session });

        await session.commitTransaction();
        session.endSession();

        return response.status(200).json({ message: "Vehicle booked successfully", booking: booking[0], total_price });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Booking error:", error);
        return response.status(500).json({ error: "Booking failed" });
    }
};

// ✅ Fetch User Booking History
export const userBookingHistory = async (request, response) => {
    try {
        const { user_id } = request.query;

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return response.status(400).json({ error: "Invalid User ID" });
        }

        const bookings = await Booking.find({ user_id }).populate("vehicle_id", "vehicle_name brand");

        if (!bookings.length) {
            return response.status(404).json({ message: "No booking history found" });
        }

        return response.status(200).json({ bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return response.status(500).json({ error: "Error fetching bookings" });
    }
};

// ✅ Complete Booking (User)
export const completeBooking = async (request, response) => {
    try {
        const { booking_id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(booking_id)) {
            return response.status(400).json({ error: "Invalid Booking ID" });
        }

        const booking = await Booking.findById(booking_id);
        if (!booking) {
            return response.status(404).json({ message: "Booking not found" });
        }

        await booking.updateOne({ status: "Completed" });
        await Vehicle.findByIdAndUpdate(booking.vehicle_id, { status: "Available" });

        response.status(200).json({ message: "Booking completed successfully" });
    } catch (error) {
        console.error("Error completing booking:", error);
        return response.status(500).json({ error: "Failed to complete booking" });
    }
};
