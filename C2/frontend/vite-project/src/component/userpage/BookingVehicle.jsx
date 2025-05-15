import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import APIs from "../api/Api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./BookingVehicle.css";

const BookVehicle = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingId, setBookingId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      toast.error("Authentication required. Please log in.");
      setLoading(false);
      return;
    }

    axios.get(APIs.VEHICLE_DETAILS_USER_API(vehicleId), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data?.vehicle) {
          setVehicle(response.data.vehicle);
        } else {
          toast.error("Vehicle details not found.");
        }
      })
      .catch((err) => toast.error(err.response?.data?.message || "Failed to fetch vehicle details."))
      .finally(() => setLoading(false));
  }, [vehicleId, token]);

  useEffect(() => {
    if (vehicle && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start) || isNaN(end) || start >= end) {
        toast.error("Invalid date selection. End date must be after start date.");
        setTotalPrice(0);
        return;
      }

      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalPrice(days * vehicle.price_per_day);
    }
  }, [startDate, endDate, vehicle]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !userId || !vehicleId) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        APIs.BOOK_VEHICLE_API,
        { user_id: userId, vehicle_id: vehicleId, start_date: startDate, end_date: endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data?.booking) {
        setBookingId(response.data.booking._id);
        toast.success("Booking confirmed! Proceed to payment.");
        setTimeout(() => setShowPayment(true), 1000);
      } else {
        toast.error("Unexpected server response.");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Booking failed. Try again.");
    }
  };

  const handlePayment = async () => {
    if (!bookingId || totalPrice <= 0) {
      toast.error("Invalid booking details for payment.");
      return;
    }
    try{
    const response = await axios.post(
      APIs.VERIFY_PAYMENT_API,
      { user_id: userId, booking_id: bookingId, total_price: totalPrice, payment_method: "Online" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    if (response.data.payment) {
      toast.success("Payment successful! Booking confirmed.");
      setTimeout(() => {
        navigate("/user/profile");
      }, 1000); 
    } else {
      toast.error("Payment verification failed.");
    }

    } catch (err) {
      toast.error(err.response?.data?.error || "Payment failed. Try again.");
    }


    



  };

  return (
    <div className="Body" style={{ 
      position: "relative", 
      minHeight: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      background: "rgba(130, 116, 116, 0.35)", 
      backdropFilter: "blur(10px)", 
      padding: "20px" 
    }}>

      {loading ? (
        <Spinner animation="border" />
      ) : vehicle ? (
        <div style={{ 
          display: "flex", 
          flexDirection: "row", 
          gap: "20px", 
          background: "rgba(219, 220, 231, 0.84)", 
          backdropFilter: "blur(15px)", 
          padding: "20px", 
          borderRadius: "10px", 
          color: "black", 
          width: "auto" 
        }}>
          
          {/* Vehicle Image */}
          <div style={{ flex: 1 }}>
            <img
              src={vehicle.image}
              alt={vehicle.vehicle_name}
              style={{ 
                width: "100%", 
                maxWidth: "400px", 
                borderRadius: "10px", 
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)" 
              }}
            />
          </div>

          {/* Booking Form */}
          <div style={{ flex: 1 }}>
            <h4>{vehicle.vehicle_name}</h4>
            <p><strong>Brand:</strong> {vehicle.brand}</p>
            <p><strong>Price per day:</strong> ₹{vehicle.price_per_day}</p>

            <Form onSubmit={handleBooking}>
              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Group controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" min={new Date().toISOString().split("T")[0]} value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="endDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" min={startDate || new Date().toISOString().split("T")[0]} value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </Form.Group>
              </div>

              <p><strong>Total Price:</strong> ₹{totalPrice > 0 ? totalPrice : "  0"}</p>

              <Button type="submit" variant="primary">Book Now</Button>
            </Form>

            {showPayment && (
              <div style={{ marginTop: "10px" }}>
                <Button onClick={handlePayment} variant="success">Proceed to Pay</Button>
                <Button onClick={() => setShowPayment(false)} variant="danger" style={{ marginLeft: "10px" }}>Cancel</Button>
              </div>
            )}
          </div>

        </div>
      ) : (
        <p>Vehicle not found.</p>
      )}
    </div>
  );
};

export default BookVehicle;
