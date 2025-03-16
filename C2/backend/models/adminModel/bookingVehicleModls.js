import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        status: { type: String, default: "Pending" },
    },
    { timestamps: true }

);

export default mongoose.model("Booking", bookingSchema);
