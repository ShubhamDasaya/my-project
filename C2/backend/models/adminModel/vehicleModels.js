import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicle_name: { type: String, required: true },
    license_plate: { type: String, required: true, unique: true },
    price_per_day: { type: Number, required: true },
    brand: { type: String, required: true },
    image: String,
    year: { type: Number, required: true },
    fuelType: { type: String, enum: ["Petrol", "Diesel", "CNG", "Electric" ], required: true },
    rcCard: { type: String, required: true },
    seatingCapacity: { type: Number, enum: [2, 4, 5, 7], required: true },
    ac: { type: String, enum: ["Non-AC", "AC"], required: true },
    status: {
      type: String,
      enum: ["Pending", "Available", "Booked", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true } 
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
