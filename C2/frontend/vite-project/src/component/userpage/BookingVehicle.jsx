import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import APIs from "../api/Api";
import { useSelector } from "react-redux";

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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    axios
      .get(APIs.VEHICLE_DETAILS_USER_API(vehicleId), getAuthHeaders())
      .then((response) => {
        if (response.data && response.data.vehicle) {
          setVehicle(response.data.vehicle);
        } else {
          setError("Vehicle data not found.");
        }
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load vehicle details."))
      .finally(() => setLoading(false));
  }, [vehicleId]);

  useEffect(() => {
    if (vehicle && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start >= end) {
        setError("End date must be after start date.");
        setTotalPrice(0);
        return;
      }
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalPrice(days * vehicle.price_per_day);
      setError("");
    }
  }, [startDate, endDate, vehicle]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    if (!startDate || !endDate || !userId || !vehicleId) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        APIs.BOOK_VEHICLE_API,
        { user_id: userId, vehicle_id: vehicleId, start_date: startDate, end_date: endDate },
        getAuthHeaders()
      );

      if (response.data && response.data.booking) {
        setBookingId(response.data.booking._id);
        setMessage("Booking created! Proceed with payment.");
        setTimeout(() => setShowPayment(true), 100);
      } else {
        setError("Unexpected response format from server.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Booking failed. Try again.");
    }
  };

  const handlePayment = async () => {
    if (!bookingId || totalPrice <= 0) {
      setError("Booking ID is missing or total price is invalid.");
      return;
    }
    try {
      await axios.post(
        APIs.VERIFY_PAYMENT_API,
        { user_id: userId, booking_id: bookingId, total_price: totalPrice, payment_method: "Online" },
        getAuthHeaders()
      );
      setMessage("Payment successful! Booking confirmed.");
      navigate("/user/profile");
    } catch (err) {
      setError(err.response?.data?.error || "Payment failed. Try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Book Vehicle</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" />
      ) : vehicle ? (
        <div>
          <h4>{vehicle.vehicle_name}</h4>
          <img src={vehicle.image} alt={vehicle.vehicle_name} width="300" />
          <p>Brand: {vehicle.brand}</p>
          <p>Price per day: ₹{vehicle.price_per_day}</p>

          <Form onSubmit={handleBooking}>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </Form.Group>

            <p>Total Price: ₹{totalPrice > 0 ? totalPrice : "-"}</p>

            <Button type="submit" variant="primary" disabled={!startDate || !endDate || !vehicle}>
              Book Now
            </Button>
          </Form>

          {showPayment && (
            <div className="mt-3">
              <Alert variant="success">{message}</Alert>
              <Button onClick={handlePayment} variant="success" className="me-2">Proceed to Pay</Button>
              <Button onClick={() => setShowPayment(false)} variant="danger">Cancel Payment</Button>
            </div>
          )}
        </div>
      ) : (
        <p>Vehicle not found.</p>
      )}
    </Container>
  );
};

export default BookVehicle;
