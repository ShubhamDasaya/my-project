import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
        vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
        amount: { type: Number, required: true, min: 0 },
        payment_method: { type: String, enum: ["Online", "Cash"], default: "Online" },
        status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
    },
    { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
