import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
   
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      required: true,
    },
   
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
