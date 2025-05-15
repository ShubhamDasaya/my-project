
import Booking from "../../models/adminModel/bookingVehicleModls.js";
import Vehicle from "../../models/adminModel/vehicleModels.js";
import User from "../../models/adminModel/dataTables.js";

//Get home page of host
export const hostHomepage = async (request, response) => {
    try {
        const vehicles = await Vehicle.findAll({
            where: { status: "Available" }
        });

        if (!vehicles.length) {
            return response.status(404).json({ message: "No available vehicles found" });
        }

        return response.status(200).json({ vehicles });
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return response.status(500).json({ error: "Error fetching vehicles" });
    }
};

// Get Host Profile
export const getHostProfile = async (request, response) => {
    try {
        const { id } = request.params;
        const host = await User.findByPk(id);

        if (!host || host.role !== "Host") {
            return response.status(404).json({ error: "Host not found" });
        }

        return response.status(200).json(host);
    } catch (error) {
        return response.status(500).json({ error: "Failed to fetch Host Profile" });
    }
};

//  Update Host Profile
 export const updateHostProfile = async (request, response) => {
    try {
        const { id } = request.params;
        const { name, email, contact, address } = request.body;

        const host = await User.findByPk(id);
        if (!host || host.role !== "Host") {
            return response.status(404).json({ error: "Host not found" });
        }

        await host.update({ name, email, contact, address });

        return response.status(200).json({ message: "Profile updated successfully", host });
    } catch (error) {
        return response.status(500).json({ error: "Failed to update Host Profile" });
    }
};

// Host Adds a Vehicle
export const addHostVehicle = async (request, response) => {
    try {
        const {host_id} = request.params; 
        const {  vehicle_name, license_plate, price_per_day, brand } = request.body;

        if (!host_id || !vehicle_name || !license_plate || !price_per_day || !brand) {
            return response.status(400).json({ error: "All fields are required" });
        }

        const newVehicle = await Vehicle.create({owner_id: host_id,owner_type: "Host",vehicle_name,license_plate,price_per_day,brand,status: "Pending",});

        return response.status(201).json({ message: "Vehicle added. Awaiting approval.", newVehicle });
    } catch (error) {
        return response.status(500).json({ error: "Failed to add vehicle" });
    }
};

// Mark Booking as Completed
export const completeHostBooking = async (request, response) => {
    try {
        const { id } = request.params;

        const booking = await Booking.findOne({ where: { id } });
        if (!booking) {
            return response.status(404).json({ error: "Booking not found" });
        }

        await booking.update({ status: "Completed" });
        await Vehicle.update({ status: "Available" }, { where: { id: booking.vehicle_id } });

        return response.status(200).json({ message: "Booking completed successfully" });
    } catch (error) {
        return response.status(500).json({ error: "Failed to complete booking" });
    }
};

// Get All Vehicles of a Host
export const getHostVehicles = async (request, response) => {
    try {
        const { host_id } = request.params;

        const vehicles = await Vehicle.findAll({ where: { owner_id: host_id, owner_type: "Host" } });
        if (!vehicles.length) {
            return response.status(404).json({ error: "No vehicles found" });
        }

        return response.status(200).json(vehicles);
    } catch (error) {
        return response.status(500).json({ error: "Failed to fetch vehicles" });
    }
};

// Get Vehicle Details by ID
export const getHostVehicleById = async (request, response) => {
    try {
        const { id } = request.params;
        const vehicle = await Vehicle.findByPk(id);

        if (!vehicle) {
            return response.status(404).json({ error: "Vehicle not found" });
        }

        return response.status(200).json(vehicle);
    } catch (error) {
        return response.status(500).json({ error: "Failed to fetch vehicle details" });
    }
};

// Delete Vehicle
export const deleteVehicle = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedVehicle = await Vehicle.destroy({ where: { id } });

        if (!deletedVehicle) {
            return response.status(404).json({ error: "Vehicle not found" });
        }

        return response.status(200).json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        return response.status(500).json({ error: "Failed to delete vehicle" });
    }
};

// Get All Bookings for a Host's Vehicles
export const getHostBookings = async (request, response) => {
    try {
        const { host_id } = request.params;

        const bookings = await Booking.findAll({ where: { host_id } });
        if (!bookings.length) {
            return response.status(404).json({ error: "No bookings found" });
        }

        return response.status(200).json({ message: "Bookings retrieved successfully", bookings });
    } catch (error) {
        return response.status(500).json({ error: "Failed to fetch bookings" });
    }
};

// Get Booking Details by ID
export const getHostBookingById = async (request, response) => {
    try {
        const { id } = request.params;
        const booking = await Booking.findOne({ where: { id } });

        if (!booking) {
            return response.status(404).json({ error: "Booking not found" });
        }

        return response.status(200).json(booking);
    } catch (error) {
        return response.status(500).json({ error: "Failed to fetch booking details" });
    }
};

// Cancel Booking by Host
export const cancelBookingByHost = async (request, response) => {
    try {
        const { id } = request.params;
        const booking = await Booking.findOne({ where: { id } });

        if (!booking) {
            return response.status(404).json({ error: "Booking not found" });
        }

        await booking.update({ status: "Cancelled" });
        await Vehicle.update({ status: "Available" }, { where: { id: booking.vehicle_id } });
        await booking.destroy();

        return response.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
        return response.status(500).json({ error: "Failed to cancel booking" });
    }
};
