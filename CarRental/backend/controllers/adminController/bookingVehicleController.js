import Booking from "../../models/adminModel/bookingVehicleModls.js";
import Vehicle from "../../models/adminModel/vehicleModels.js";

// Create a Booking (User, Admin, or Host can book)
export const createBooking = async (request, response) => {
  try {
    const { vehicle_id, booked_by_type, booked_by_id, start_date, end_date, total_price,  } = request.body;

    // Validate the booked_by_type
    if (!["User", "Admin", "Host"].includes(booked_by_type)) {
      return response.status(400).json({ error: "Invalid booked_by_type. It must be 'User', 'Admin', or 'Host'." });
    }

    // Check if vehicle exists
    const vehicle = await Vehicle.findByPk(vehicle_id);
    if (!vehicle) {
      return response.status(404).json({ error: "Vehicle not found." });
    }

    // Check if vehicle is available
    if (vehicle.status !== "Available") {
      return response.status(400).json({ error: "Vehicle is not available for booking." });
    }

    // Create a new booking
    const newBooking = await Booking.create({vehicle_id,booked_by_type,booked_by_id,start_date,end_date,total_price,status: "Booked",});

    // Update vehicle status to 'Booked'
    await vehicle.update({ status: "Booked" });

    return response.status(201).json({ message: "Vehicle booked successfully!", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return response.status(500).json({ error: "Failed to create booking. Please try again." });
  }
};

// Get All Bookings
export const getAllBookings = async (request, response) => {
  try {
    const bookings = await Booking.findAll();
    if (!bookings.length) {
      return response.status(200).json({ message: "No bookings found." });
    }
    return response.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return response.status(500).json({ error: "Failed to fetch bookings." });
  }
};

// Get Booking by ID
export const getBookingById = async (request, response) => {
  try {
    const { id } = request.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return response.status(404).json({ error: "Booking not found." });
    }
    return response.status(200).json({ booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return response.status(500).json({ error: "Failed to fetch booking data." });
  }
};

// Update Booking - Modify End Date
export const updateBooking = async (request, response) => {
  try {
    const { id } = request.params;
    const { end_date } = request.body;

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return response.status(404).json({ message: "Booking not found." });
    }

    // Ensure end date is valid
    await booking.update({ end_date });

    return response.status(200).json({ message: "Booking updated successfully!", booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    return response.status(500).json({ error: "Failed to update booking." });
  }
};

// Cancel a Booking
export const cancelBooking = async (request, response) => {
  try {
    const { id } = request.params;

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return response.status(404).json({ message: "Booking not found." });
    }

    // Update vehicle status to 'Available'
    await Vehicle.update({ status: "Available" }, { where: { id: booking.vehicle_id } });

    // Cancel the booking
    await booking.distory({where:{user_id:id}});

    return response.status(200).json({ message: "Booking cancelled successfully!" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return response.status(500).json({ error: "Failed to cancel booking." });
  }
};
