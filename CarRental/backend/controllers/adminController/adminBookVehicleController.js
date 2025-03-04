import Vehicle from "../../models/adminModel/vehicleModels.js";
import Booking from "../../models/adminModel/bookingVehicleModls.js";

//Here Show How Many Vehicles Are Booked Note All Details

// Create a new booking
export const adminBookVehicle = async (request, response) => {
    try {
        const { vehicle_id, start_date, end_date, admin_email } = request.body;

        if (!admin_email) {
            return response.status(403).json({ error: "You are not authorized" });
        }

        const vehicle = await Vehicle.findByPk(vehicle_id);
        if (!vehicle) {
            return response.status(404).json({ error: "Vehicle not available" });
        }

        if (vehicle.status !== "Available") {
            return response.status(400).json({ message: `Vehicle is ${vehicle.status} and cannot be booked` });
        }

        const booking = await Booking.create({ vehicle_id, user_email: admin_email, start_date, end_date, status: "Booked", payment_status: "Paid" });

        await vehicle.update({ status: "Booked" });

        response.status(200).json({ message: "Vehicle booked successfully by Admin" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Booking failed" });
    }
};


//Cancel booking 
export const adminCancelBooking = async (request, response) => {
    try {
        const { booking_id } = request.params;
        const booking = await Booking.findByPk(booking_id);

        if (!booking) {
            return response.status(404).json({ message: "Booking not found" });
        }

        await booking.update({ status: "Cancelled" });
        await Vehicle.update({ status: "Available" }, { where: { id: booking.vehicle_id } });

        response.status(200).json({ message: "Booking Cancelled Successfully by Admin" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Failed to Cancel Booking" });
    }
};


// complite Booking
export const completeBooking = async (request, response) => {
    try {
        const { booking_id } = request.params; // Extract booking_id properly
        const booking = await Booking.findByPk(booking_id);

        if (!booking) {
            return response.status(404).json({ message: "Booking not found" });
        }

        // Update booking status to "Completed"
        await booking.update({ status: "Completed" });

        // Make the vehicle available again
        await Vehicle.update({ status: "Available" }, { where: { id: booking.vehicle_id } });

        response.status(200).json({ message: "Booking completed successfully" });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: "Failed to complete booking" });
    }
};


//Maintenance of vehicle
export const maintenVehicles = async (request, response) => {
    try {
        const { vehicle_id } = request.params;
        const vehicle = await Vehicle.findByPk(vehicle_id);
        if (!vehicle) {
            return response.status(404).json({ message: "Vehicle not found" });
        }

        await vehicle.update({ status: "Maintenance" });
        response.status(200).json({ message: "Vehicle marked as maintenance" });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: "Failed to mark vehicle as maintenance" });
    }
};

// Maintenance , now availabel of vehicle for booking 
export const availableVehiclesOnMainten = async (request, response) => {
    try {
        const { vehicle_id } = request.params;
        const vehicle = await Vehicle.findByPk(vehicle_id);

        if (!vehicle) {
            return response.status(404).json({ message: "Vehicle not found" });
        }

        if (vehicle.status !== "Maintenance") {
            return response.status(400).json({ message: "Vehicle is not under maintenance" });
        }

        await vehicle.update({ status: "Available" });

        response.status(200).json({ message: "Vehicle is now available for booking" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Failed to update vehicle status" });
    }
};



