import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../api/BaseApi.jsx";

export default function AdminDashboard() {
    const [vehicles, setVehicles] = useState([]);
    const [stats, setStats] = useState({ available: 0, booked: 0, maintenance: 0 });

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
    
            if (!token) {
                console.error("No token found, redirecting to login.");
                return;
            }
    
            let response = await axios.get(Api.GET_ALL_VEHICLES, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token in headers
                },
            });
    
            let allVehicles = response.data.vehicles || [];
            console.log(allVehicles);
            setVehicles(allVehicles);
    
            let available = allVehicles.filter(v => v.status === "Available").length;
            let booked = allVehicles.filter(v => v.status === "Booked").length;
            let maintenance = allVehicles.filter(v => v.status === "Maintenance").length;
    
            setStats({ available, booked, maintenance });
        } catch (err) {
            console.error("Error fetching vehicles:", err.response?.data || err.message);
        }
    };
    

    const deleteVehicle = async (id) => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token
    
            if (!token) {
                console.error("No token found, redirecting to login.");
                return;
            }
    
            await axios.delete(`${Api.DELETE_VEHICLE}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token
                },
            });
    
            loadVehicles(); // Refresh list after deletion
        } catch (err) {
            console.error("Error deleting vehicle:", err.response?.data || err.message);
        }
    };
    
    return (
        <>
        <div className="container mt-5">
            <h2>Admin Dashboard</h2>
            <div className="row">
                <div className="col-md-4 p-3 shadow-sm">
                    <h4>Available Vehicles: {stats.available}</h4>
                </div>
                <div className="col-md-4 p-3 shadow-sm">
                    <h4>Booked Vehicles: {stats.booked}</h4>
                </div>
                <div className="col-md-4 p-3 shadow-sm">
                    <h4>Maintenance Vehicles: {stats.maintenance}</h4>
                </div>
            </div>

            <div className="mt-4">
                <h3>Vehicle List</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Year</th>
                            <th>Price/Day</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle._id}>
                                <td>{vehicle.vehicle_name}</td>
                                <td>{vehicle.brand}</td>
                                <td>{vehicle.year}</td>
                                <td>{vehicle.price_per_day} Rs</td>
                                <td>{vehicle.status}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteVehicle(vehicle._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
        </>
    );
}
