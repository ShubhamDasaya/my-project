import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import APIs from "../api/Api";
import "./Profile.css"; 

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = useSelector((state) => state.auth.userId);
  
  const [bookings, setBookings] = useState([]);

  // Function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch bookings for logged-in user
  const fetchBookings = async () => {
    if (!userId) {
      toast.error("User  ID is missing.");
      return;
    }

    try {
      const response = await axios.get(APIs.USER_BOOKING_HISTORY_API(userId), {
        headers: getAuthHeaders(),
      });
      setBookings(response.data.bookings);
      console.log("Fetched Bookings:", response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error.response?.data || error);
      toast.error("Failed to load bookings. Please try again.");
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  // Cancel Booking
  const handleCancelBooking = async (bookingId) => {
    if (!userId) return toast.error("User  not authenticated.");
    
    try {
      await axios.put(
        APIs.CANCEL_BOOKING_API, 
        { booking_id: bookingId }, 
        { headers: getAuthHeaders() }
      );
      toast.success("Booking canceled successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Error canceling booking:", error.response?.data || error);
      toast.error("Failed to cancel booking.");
    }
  };

  return (
    <div className="profile-container">
      <div className="container mt-5 mb-10">
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-3">My Bookings</h2>
          {bookings.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Car</th>
                    <th>Pickup Date</th>
                    <th>Return Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {booking.vehicle_id?.image && (
                            <img
                              src={booking.vehicle_id.image}
                              alt={booking.vehicle_id.vehicle_name}
                              className="me-2"
                              width="60"
                              height="40"
                              style={{ objectFit: "cover", borderRadius: "5px" }}
                            />
                          )}
                          {booking.vehicle_id?.vehicle_name} ({booking.vehicle_id?.brand})
                        </div>
                      </td>
                      <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                      <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${booking.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        {booking.status === "Booked" ? (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleCancelBooking(booking._id)}
                          >
                            Cancel
                          </button>
                        ) : booking.status === "Completed" ? (
                          <span className="text-muted">Completed</span>
                        ) : (
                          <span className="text-danger">Canceled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted text-center">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;