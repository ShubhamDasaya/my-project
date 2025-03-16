import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true, // Auto-generate ObjectId
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ], // Email validation
    },
    contact: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Invalid contact number"], // Only 10-digit numbers
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      required: true,
      default: "User", 
    },
  },
  { timestamps: true }
);



const User = mongoose.model("User", userSchema);
export default User;
