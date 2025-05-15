import Vehicle from "../../models/adminModel/vehicleModels.js";
import Payment from "../../models/adminModel/paymentModel.js"




export const vehiclePage = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

   
    const vehiclesWithImages = vehicles.map((vehicle) => ({
      ...vehicle._doc, // Keep existing data
      image: vehicle.image
        ? `${req.protocol}://${req.get("host")}/uploads/${vehicle.image}`
        : null, 
      rcCard: vehicle.rcCard
        ? `${req.protocol}://${req.get("host")}/uploads/${vehicle.rcCard}`
        : null, 
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

    const vehicleWithImage = {
      ...vehicle._doc,
      image: vehicle.image
        ? `${req.protocol}://${req.get("host")}/uploads/${vehicle.image}`
        : null,
      rcCard: vehicle.rcCard
        ? `${req.protocol}://${req.get("host")}/uploads/${vehicle.rcCard}`
        : null,
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
    const {
      vehicle_name,
      brand,
      year,
      price_per_day,
      license_plate,
      fuelType,
      seatingCapacity,
      ac,
      status,
    } = req.body;

    const image = req.files?.image ? req.files.image[0].filename : null;
    const rcCard = req.files?.rcCard ? req.files.rcCard[0].filename : null;

    if (
      !vehicle_name ||
      !brand ||
      !year ||
      !price_per_day ||
      !license_plate ||
      !fuelType ||
      !rcCard ||
      !seatingCapacity ||
      !ac
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required, including RC Card image!" });
    }

    const newVehicle = new Vehicle({
      vehicle_name,
      brand,
      year,
      price_per_day,
      status,
      license_plate,
      fuelType,
      seatingCapacity,
      ac,
      image,
      rcCard,
    });

    await newVehicle.save();
    return res
      .status(201)
      .json({ message: "Vehicle added successfully!", vehicle: newVehicle });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};



// Update vehicle details
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicle_name, brand, year, price_per_day, status, license_plate, fuelType ,seatingCapacity ,ac } = req.body;

    if (!id || id.length !== 24) {
      return res.status(400).json({ error: "Invalid Vehicle ID" });
    }

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const image = req.files?.image ? req.files.image[0].filename : vehicle.image;
    const rcCard = req.files?.rcCard ? req.files.rcCard[0].filename : vehicle.rcCard;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      {
        vehicle_name: vehicle_name || vehicle.vehicle_name,
        brand: brand || vehicle.brand,
        year: year || vehicle.year,
        price_per_day: price_per_day || vehicle.price_per_day,
        status: status || vehicle.status,
        license_plate: license_plate || vehicle.license_plate,
        fuelType: fuelType || vehicle.fuelType,
        seatingCapacity:seatingCapacity ||  vehicle.seatingCapacity,
        ac:ac || vehicle.ac,
        image,
        rcCard,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ message: "Vehicle updated successfully", vehicle: updatedVehicle });
  } catch (error) {
    console.error("Error updating vehicle:", error);
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









export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user_id", "name email") 
      .populate("booking_id", "start_date end_date") 
      .populate("vehicle_id", "vehicle_name brand");

    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch payments" });
  }
};
