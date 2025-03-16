import Vehicle from "../../models/adminModel/vehicleModels.js";
import Payment from "../../models/adminModel/paymentModel.js"

export const vehiclePage = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    // Map vehicles to add full image URL
    const vehiclesWithImages = vehicles.map((vehicle) => ({
      ...vehicle._doc, // Keep existing data
      image: vehicle.image
        ? `${req.protocol}://${req.get("host")}/uploads/${vehicle.image}`
        : null, // Handle missing images
    }));

    return res.status(200).json({ vehicles: vehiclesWithImages });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).json({ error: "Failed to fetch vehicles" });
  }
};

export const getVehicleByID = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Add full image URL
    const vehicleWithImage = {
      ...vehicle._doc,
      image: vehicle.image
        ? `${req.protocol}://${req.get("host")}/uploads/${vehicle.image}`
        : null, // Handle missing images
    };

    return res.status(200).json({ vehicle: vehicleWithImage });
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return res.status(500).json({ error: "Failed to fetch vehicle details" });
  }
};



// Add a new vehicle
export const addNewVehicle = async (req, res) => {
  try {
    const { vehicle_name, brand, year, price_per_day, status, license_plate } = req.body;
    const image = req.file ? req.file.filename : null; 

    if (!vehicle_name || !brand || !year || !price_per_day || !license_plate) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newVehicle = new Vehicle({
      vehicle_name,
      brand,
      year,
      price_per_day,
      status,
      license_plate,
      image,
    });

    await newVehicle.save();
    return res.status(201).json({ message: "Vehicle added successfully!", vehicle: newVehicle });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// Update vehicle details
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicle_name, brand, year, price_per_day, status, license_plate } = req.body;
    const image = req.file ? req.file.filename : null;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

    vehicle.vehicle_name = vehicle_name || vehicle.vehicle_name;
    vehicle.brand = brand || vehicle.brand;
    vehicle.year = year || vehicle.year;
    vehicle.price_per_day = price_per_day || vehicle.price_per_day;
    vehicle.status = status || vehicle.status;
    vehicle.license_plate = license_plate || vehicle.license_plate;
    if (image) vehicle.image = image;

    await vehicle.save();
    return res.status(200).json({ message: "Vehicle updated successfully", vehicle });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete a vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

    await vehicle.deleteOne();
    return res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete vehicle" });
  }

};

// Get booked vehicles
export const bookedVehicle = async (request, response) => {
  try {
    const vehicles = await Vehicle.find({ status: "Booked" });
    if (!vehicles.length) {
      return response.status(200).json({ message: "No booked vehicles" });
    }
    return response.status(200).json({ vehicles });
  } catch (error) {
    console.error("Error fetching booked vehicles:", error);
    return response.status(500).json({ error: "Failed to fetch booked vehicles" });
  }
};



export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user_id", "name email") // Fetch user details (name & email)
      .populate("booking_id", "start_date end_date") // Fetch booking details
      .populate("vehicle_id", "vehicle_name brand"); // Fetch vehicle details

    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch payments" });
  }
};
