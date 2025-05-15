import User from "../../models/adminModel/dataTables.js";
import Booking from "../../models/adminModel/bookingVehicleModls.js";
import Payment from "../../models/adminModel/paymentModel.js";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) {
            return res.status(404).json({ error: "No users found" });
        }
        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Validate user_id
        if (!user_id) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        // Fetch user from database
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Server error" });
    }
};



// Delete user by Admin

export const deleteUserByAdmin = async (req, res) => {
    try {
        const { user_id } = req.params;  
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Check if the user exists
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

       
        await Booking.deleteMany({ userId: user_id });

        await Payment.deleteMany({ userId: user_id });

      
        await User.findByIdAndDelete(user_id);

        return res.status(200).json({ message: `Successfully deleted ${user.userName} and all related data.` });

    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Failed to delete user and related data." });
    }
};

