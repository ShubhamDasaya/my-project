import Vehicle from "../../models/adminModel/vehicleModels.js";

// Get all vehicles ok
export const vehiclePage = async (request, response) => {
  try {
    const vehicles = await Vehicle.findAll();
    if (vehicles.length === 0) {
      return response.status(200).json({ message: "No vehicles found" });
    }
    return response.status(200).json({ vehicles });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return response.status(500).json({ error: "Failed to fetch vehicles" });
  }
};

// Add a new vehicle ok 
export const addNewVehicle = async (request, response) => {
  try {
    const {owner_id} = request.params;
    const { vehicle_name, brand, year, price_per_day, city, status, license_plate,  } = request.body;

    if (!owner_id) {
      return response.status(400).json({ error: "Owner ID is required" });
    }

    // Create a new vehicle
    const newVehicle = await Vehicle.create({vehicle_name,brand,year,price_per_day,city,status,license_plate,owner_type: "Admin",owner_id:owner_id,});

    return response.status(201).json({ message: "Vehicle added successfully", vehicle: newVehicle });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    return response.status(500).json({ error: error.message || "Something went wrong" });
  }
};

// Update vehicle details ok 
export const updateVehicle = async (request, response) => {
  try {
    const { id } = request.params;
    const { vehicle_name, brand, year, price_per_day, city, status, license_plate } = request.body;

    if (!id) {
      return response.status(400).json({ error: "Vehicle ID is required" });
    }

    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return response.status(404).json({ error: "Vehicle not found" });
    }

    await vehicle.update({ vehicle_name, brand, year, price_per_day, city, status, license_plate });

    return response.status(200).json({ message: "Vehicle updated successfully", vehicle });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return response.status(500).json({ error: "Something went wrong" });
  }
};

// Delete a vehicle
export const deleteVehicle = async (request, response) => {
  try {
    const { id } = request.params;
    if (!id) return response.status(400).json({ error: "Vehicle ID is required" });

    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) return response.status(404).json({ error: "Vehicle not found" });

    await vehicle.destroy();
    return response.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return response.status(500).json({ error: "Failed to delete vehicle" });
  }
};

// Get vehicles under maintenance
export const maintenanceVehicles = async (request, response) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { status: "Maintenance" } });
    if (vehicles.length === 0) {
      return response.status(200).json({ message: "No vehicles under maintenance" });
    }
    return response.status(200).json({ vehicles });
  } catch (error) {
    console.error("Error fetching maintenance vehicles:", error);
    return response.status(500).json({ error: "Failed to fetch maintenance vehicles" });
  }
};

// Get available vehicles
export const availableVehicles = async (request, response) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { status: "Available" } });
    if (vehicles.length === 0) {
      return response.status(200).json({ message: "No available vehicles" });
    }
    return response.status(200).json({ vehicles });
  } catch (error) {
    console.error("Error fetching available vehicles:", error);
    return response.status(500).json({ error: "Failed to fetch available vehicles" });
  }
};

// Get booked vehicles
export const bookedVehicle = async (request, response) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { status: "Booked" } });
    if (vehicles.length === 0) {
      return response.status(200).json({ message: "No booked vehicles" });
    }
    return response.status(200).json({ vehicles });
  } catch (error) {
    console.error("Error fetching booked vehicles:", error);
    return response.status(500).json({ error: "Failed to fetch booked vehicles" });
  }
};

