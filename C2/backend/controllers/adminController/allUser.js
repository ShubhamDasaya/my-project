import User from "../../models/adminModel/dataTables.js";

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

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to fetch user" });
    }
};

// Suspend user by Admin
export const suspendUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.status = "Suspended";
        await user.save();
        return res.status(200).json({ message: `Successfully suspended ${user.userName}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to suspend user" });
    }
};

// Un-suspend user by Admin
export const unSuspendUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.status = "Active";
        await user.save();
        return res.status(200).json({ message: `Successfully activated ${user.userName}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to unsuspend user" });
    }
};

// Delete user by Admin
export const deleteUserByAdmin = async (req, res) => {
    try {
        const { user_id } = req.params;  
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const user = await User.findByIdAndDelete(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: `Successfully deleted ${user.userName}` });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Failed to delete user" });
    }
};
