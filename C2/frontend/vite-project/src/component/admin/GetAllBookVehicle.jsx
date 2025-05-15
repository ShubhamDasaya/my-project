import React, { useEffect, useState } from "react";
import axios from "axios";
import APIs from "../api/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const GetAllBookVehicle = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.auth.userId);

  const fetchBookings = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    setError(null);

    axios
      .get(APIs.ADMIN_SEE_BOOKED_VEHICLE, { signal })
      .then((response) => {
        console.log("API Response:", response.data);
        setBookings(response.data.bookings || []);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          setError("Failed to load booked vehicles");
          toast.error("Error fetching bookings.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!userId) return toast.error("User not authenticated.");
    if (!bookingId) return toast.error("Invalid Booking ID.");

    console.log("Canceling booking with ID:", bookingId);

    try {
      const response = await axios.put(APIs.ADMIN_CANCEL_BOOKING_API, {
        booking_id: bookingId,
      });

      
        fetchBookings();
      
    } catch (error) {
      console.error("Error canceling booking:", error.response?.data || error);
      toast.error(error.response?.data?.error || "Failed to cancel booking.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">Booked Vehicles</h2>

      {loading && <p className="text-center text-muted">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {!loading && !error && bookings.length === 0 && (
        <p className="text-center text-muted">No vehicles booked.</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Vehicle Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Cancel Booking</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{booking?.vehicle?.vehicle_name || "N/A"}</td> 
                  <td>
                    {booking?.startDate
                      ? new Date(booking.startDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    {booking?.endDate
                      ? new Date(booking.endDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{booking?.user?.name || "N/A"}</td>
                  <td>{booking?.user?.email || "N/A"}</td>
                  <td>{booking?.user?.contact || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking?.status?.toLowerCase() === "booked"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {booking?.status || "Unknown"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancelBooking(booking?.bookingId)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetAllBookVehicle;
