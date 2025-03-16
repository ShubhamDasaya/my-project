import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicle_name: { type: String,required: true,},
    license_plate: {type: String,required: true,unique: true,},
    price_per_day: {type: Number,required: true,},
    brand: {type: String,required: true,},
    image: String,
    year:Number,
status: {type: String,enum: ["Pending", "Available", "Booked", "Maintenance", "Cancelled"],
      default: "Pending",
      
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
