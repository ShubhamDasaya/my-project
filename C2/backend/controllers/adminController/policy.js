import express from "express";
import Policy from "../models/policyModel.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

// Get All Policies
router.get("/", async (req, res) => {
    try {
        const policies = await Policy.find();  // Changed from findAll() to find()
        res.json(policies);
    } catch (error) {
        res.status(500).json({ error: "Error fetching policies" });
    }
});

// Create Policy (Admin Only)
router.post("/", authenticate, async (req, res) => {
    try {
        if (req.user.role !== "Admin") return res.status(403).json({ error: "Unauthorized" });

        const policy = new Policy(req.body); // Mongoose uses new Model() for creating
        await policy.save(); // Save the document to MongoDB
        res.status(201).json({ message: "Policy created", policy });
    } catch (error) {
        res.status(500).json({ error: "Error creating policy" });
    }
});

// Delete Policy (Admin Only)
router.delete("/:id", authenticate, async (req, res) => {
    try {
        if (req.user.role !== "Admin") return res.status(403).json({ error: "Unauthorized" });

        await Policy.findByIdAndDelete(req.params.id); // Changed from destroy() to findByIdAndDelete()
        res.json({ message: "Policy deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting policy" });
    }
});

export default router;
