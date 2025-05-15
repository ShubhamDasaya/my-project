import Vehicle from "../../models/adminModel/vehicleModels.js";
import User from "../../models/adminModel/dataTables.js";
import Booking from "../../models/adminModel/bookingVehicleModls.js";
import Payment from "../../models/adminModel/paymentModel.js";

//  User Homepage (Fetch available vehicles)
export const userHomepage = async (request, response) => {
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


// Get  User Profile
export const userProfile  =    async (req, res) => {
    try {
        const { user_id } = req.params; 
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user profile" });
    }
};


// user update his profile 
export const updateUserProfile = async (request,response)=>{
try {
    const {id} = request.params;
    const{userName, email, contact, city, address} = request.body;
    const user = await User.findByPk(id);
    if(!user)return response.status(404).json({error:"User not Found"});
    const hostUpdate = await User.create({userName, email, contact, city, address});
    return response.status(200).json({message:"Successfully update profile",hostUpdate});
} catch (error) {
        response.status(500).json({ error: "Failed to Update User Profile" });        

}
}

// Get vehicle by ID
export const getVehicleById = async (request, response) => {
    try {
        const { id } = request.params;
        const vehicle = await Vehicle.findByPk(id);

        if (!vehicle) {
            return response.status(404).json({ message: "Vehicle not found" });
        }

        return response.status(200).json({ vehicle });
    } catch (error) {
        console.error("Error fetching vehicle details:", error);
        return response.status(500).json({ error: "Error fetching vehicle details" });
    }
};

// Book a Vehicle (User)
export const usrBookVehicle = async (request, response) => {
    try {
        const { user_id } = request.params;
        const { vehicle_id, start_date, end_date, amount } = request.body;

        if (!user_id || !vehicle_id || !start_date || !end_date || !amount) {
            return response.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findByPk(user_id);
        if (!user) {
            return response.status(404).json({ error: "User not found" });
        }

        const vehicle = await Vehicle.findByPk(vehicle_id);
        if (!vehicle) {
            return response.status(404).json({ error: "Vehicle not available" });
        }

        if (vehicle.status !== "Available") {
            return response.status(400).json({ error: `Vehicle is ${vehicle.status} and cannot be booked` });
        }

        const rentalDays = Math.ceil((new Date(end_date) - new Date(start_date)) / 86400000);
        const total_price = rentalDays * vehicle.price_per_day;

        if (Number(amount) !== total_price) {
            return response.status(400).json({ error: `Payment must be exactly ₹${total_price}` });
        }

        const booking = await Booking.create({user_id,vehicle_id,booked_by_type: "User",start_date,end_date,total_price,status: "Booked",});

        await Payment.create({
            user_id,
            booking_id: booking.id,
            vehicle_id,
            amount: total_price,
            payment_method: "Online",
            status: "Completed",
        });

        await vehicle.update({ status: "Booked" });

        return response.status(200).json({
            message: "Vehicle booked successfully",
            booking,
            total_price,
        });
    } catch (error) {
        console.error("Booking error:", error);
        return response.status(500).json({ error: "Booking failed" });
    }
};



// Fetch User Booking History
export const userBookingHistory = async (request, response) => {
    try {
        const { user_id } = request.query;

        if (!user_id) {
            return response.status(400).json({ message: "User ID is required" });
        }

        const bookings = await Booking.findAll({ where: { user_id } });

        if (!bookings.length) {
            return response.status(404).json({ message: "No booking history found" });
        }

        return response.status(200).json({ bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return response.status(500).json({ error: "Error fetching bookings" });
    }
};



// Complete Booking (User)
export const completeBooking = async (request, response) => {
    try {
        const { booking_id } = request.params;
        const booking = await Booking.findByPk(booking_id);

        if (!booking) {
            return response.status(404).json({ message: "Booking not found" });
        }

        await booking.update({ status: "Completed" });
        await Vehicle.update({ status: "Available" }, { where: { id: booking.vehicle_id } });

        response.status(200).json({ message: "Booking completed successfully" });
    } catch (error) {
        console.lod("Error completing booking:");
        return response.status(500).json({ error: "Failed to complete booking" });
    }
};



