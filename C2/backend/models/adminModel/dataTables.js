import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {type: mongoose.Schema.Types.ObjectId,auto: true,},
    name: {type: String,required: true,trim: true,},
    email: {type: String,required: true,unique: true,trim: true,lowercase: true,match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email address",],},
    contact: {type: String,required: true,trim: true,match: [/^\d{10}$/, "Invalid contact number"], },
    password: {type: String,required: true,},
    role: {type: String,enum: ["User", "Admin"],required: true,default: "User",},
    resetToken: {type: String, default: null,},
    resetTokenExpiry: {type: Date, default: null,},
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    isVerified: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
