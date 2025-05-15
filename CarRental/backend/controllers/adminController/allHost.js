import User from "../../models/adminModel/dataTables.js";
import Vehicle from "../../models/adminModel/vehicleModels.js";


//Admin get Requset of panding vehicles
export const getPendingVehicles = async (request, response) => {
    try {
        const pendingVehicles = await Vehicle.findAll({ where: { status: "Pending" } });

        if (!pendingVehicles.length) {
            return response.status(404).json({ error: "No pending vehicle requests found" });
        }

        return response.status(200).json({ pendingVehicles });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Failed to fetch pending vehicle requests" });
    }
};


//Admin aprove Vehicls of host
export const approveVehicle = async (req, res) => {
    try {
        const { vehicle_id } = req.params;

        // Find vehicle by ID
        const vehicle = await Vehicle.findByPk(vehicle_id);
        if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

        
        if (vehicle.status === "Approved") {
            return res.status(400).json({ error: "Vehicle is already approved" });
        }

        
        await vehicle.update({ status: "Approved" });

        res.status(200).json({ message: `Vehicle '${vehicle.vehicle_name}' approved.` });
    } catch (error) {
        console.error("Approval Error:", error);
        res.status(500).json({ error: "Failed to approve vehicle" });
    }
};


//Admin reject the Requset of hot vehicles
export const cancelVehicleRequest = async (request, response) => {
    try {
        const { vehicle_id } = request.params;


        const vehicle = await Vehicle.findByPk(vehicle_id);
        if (!vehicle) {
            return response.status(404).json({ error: "Vehicle request not found" });
        }

        if (vehicle.status === "Approved") {
            return response.status(400).json({ error: "Approved vehicles cannot be removed" });
        }

        await vehicle.destroy();

        return response.status(200).json({ message: `Vehicle request for ${vehicle.vehicle_name} has been canceled and removed.` });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Failed to cancel vehicle request" });
    }
};


// Get all Hosts
export const getAllHost = async (request, response) => {
    try {
        const hosts = await User.findAll({ where: { role: "Host" } });
        if (!hosts.length) {
            return response.status(404).json({ error: "No hosts found" });
        }
        return response.status(200).json({ hosts });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Failed to fetch hosts" });
    }
};

// Get host by ID
export const getHostById = async (request, response) => {
    try {
        const { host_id } = request.params;
        const host = await User.findByPk(host_id);
        if (!host || host.role !== "Host") {
            return response.status(404).json({ error: "Host not found" });
        }
        return response.status(200).json({ host });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Failed to fetch host" });
    }
};

 // Suspend Host by Admin
export const suspendHost = async (request, response) => {
    try {
        const { host_id } = request.params;
        const host = await User.findByPk(host_id);
        if (!host || host.role !== "Host") {
            return response.status(404).json({ error: "Host not found" });
        }
        await host.update({ status: "Suspended" });
        return response.status(200).json({ message: `Successfully suspended ${host.name}` });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Failed to suspend host" });
    }
};

 //Active Host by Admin
export const unSuspendHost = async (request, response) => {
    try {
        const { host_id } = request.params;
        const host = await User.findByPk(host_id);
        if (!host || host.role !== "Host") {
            return response.status(404).json({ error: "Host not found" });
        }
        await host.update({ status: "Active" });
        return response.status(200).json({ message: `Successfully Active ${host.name}` });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Failed to suspend host" });
    }
};

// Delete Host by Admin
export const deleteHostByAdmin = async (request, response) => {
    try {
        const { host_id } = request.params;
        const host = await User.findByPk(host_id);
        if (!host || host.role !== "Host") {
            return response.status(404).json({ error: "Host not found" });
        }
        await host.destroy();
        return response.status(200).json({ message: `Successfully deleted ${host.name}` });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Failed to delete host" });
    }
};
