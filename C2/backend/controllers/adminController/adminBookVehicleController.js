import Vehicle from "../../models/adminModel/vehicleModels.js";
import Booking from "../../models/adminModel/bookingVehicleModls.js";

// 🚗 **Admin books a vehicle**
export const adminBookVehicle = async (req, res) => {
    try {
        const { vehicle_id, start_date, end_date, admin_email } = req.body;

        if (!admin_email) {
            return res.status(403).json({ error: "You are not authorized" });
        }

        const vehicle = await Vehicle.findById(vehicle_id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not available" });
        }

        if (vehicle.status !== "Available") {
            return res.status(400).json({ message: `Vehicle is ${vehicle.status} and cannot be booked` });
        }

        const booking = new Booking({
            vehicle_id,
            booked_by: admin_email,
            start_date,
            end_date,
            status: "Booked",
            payment_status: "Paid",
        });

        await booking.save();
        vehicle.status = "Booked";
        await vehicle.save();

        res.status(200).json({ message: "Vehicle booked successfully by Admin", booking });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Booking failed" });
    }
};

// ❌ **Cancel a booking**
export const adminCancelBooking = async (req, res) => {
    try {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = "Cancelled";
        await booking.save();

        const vehicle = await Vehicle.findById(booking.vehicle_id);
        if (vehicle) {
            vehicle.status = "Available";
            await vehicle.save();
        }

        res.status(200).json({ message: "Booking cancelled successfully by Admin" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to cancel booking" });
    }
};

// ✅ **Complete a booking**
export const completeBooking = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const booking = await Booking.findById(booking_id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = "Completed";
        await booking.save();

        const vehicle = await Vehicle.findById(booking.vehicle_id);
        if (vehicle) {
            vehicle.status = "Available";
            await vehicle.save();
        }

        res.status(200).json({ message: "Booking completed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to complete booking" });
    }
};

// 🔧 **Mark vehicle as under maintenance**
export const maintenVehicles = async (req, res) => {
    try {
        const { vehicle_id } = req.params;
        const vehicle = await Vehicle.findById(vehicle_id);

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        vehicle.status = "Maintenance";
        await vehicle.save();

        res.status(200).json({ message: "Vehicle marked as under maintenance" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to mark vehicle as maintenance" });
    }
};

// ✅ **Make vehicle available after maintenance**
export const availableVehiclesOnMainten = async (req, res) => {
    try {
        const { vehicle_id } = req.params;
        const vehicle = await Vehicle.findById(vehicle_id);

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        if (vehicle.status !== "Maintenance") {
            return res.status(400).json({ message: "Vehicle is not under maintenance" });
        }

        vehicle.status = "Available";
        await vehicle.save();

        res.status(200).json({ message: "Vehicle is now available for booking" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update vehicle status" });
    }
};
