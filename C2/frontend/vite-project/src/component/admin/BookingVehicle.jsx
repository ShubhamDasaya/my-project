
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import APIs from "../api/Api";

const CarBooking = () => {
  const { vehicleId } = useParams();  // Get vehicleId from URL params
  const [carId, setCarId] = useState(vehicleId);  // Set initial carId as vehicleId
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    // Fetch vehicle details based on vehicleId
    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.get(`${APIs.BOOKED_VEHICLES_BYID_API}/${vehicleId}`);
        setCarId(response.data.id);  
        setTotalAmount(response.data.pricePerDay * days);  // Assuming pricePerDay is part of the response data
      } catch (error) {
        console.error("Error fetching vehicle details", error);
      }
    };
    fetchVehicleDetails();
  }, [vehicleId, days]);  // Re-fetch vehicle details when vehicleId or days change

  const handleBooking = async () => {
    try {
      const response = await axios.post(APIs.BOOKED_VEHICLES_API, {
        carId,
        startDate,
        days,
        totalAmount,
      });
      const { order } = response.data;

      // Razorpay payment integration
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        handler: async (response) => {
          await axios.post(APIs.VERIFY_PAYMENT_API, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            bookingDetails: { carId, startDate, days, totalAmount },
          });
          alert("Booking confirmed!");
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Error in booking");
    }
  };

  const handleCancelBooking = async () => {
    try {
      await axios.delete(`${APIs.CANCEL_BOOKING_API}/${bookingId}`);
      alert("Booking cancelled successfully");
    } catch (error) {
      console.error(error);
      alert("Error in cancelling booking");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Car Booking</h2>
      <div className="mb-3">
        <label className="form-label">Car ID</label>
        <input type="text" className="form-control" value={carId} onChange={(e) => setCarId(e.target.value)} disabled />
      </div>
      <div className="mb-3">
        <label className="form-label">Start Date</label>
        <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Days</label>
        <input type="number" className="form-control" value={days} onChange={(e) => setDays(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Total Amount</label>
        <input type="number" className="form-control" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} disabled />
      </div>
      <button className="btn btn-primary" onClick={handleBooking}>Book Now</button>
      <hr />
      <h2>Cancel Booking</h2>
      <div className="mb-3">
        <label className="form-label">Booking ID</label>
        <input type="text" className="form-control" value={bookingId} onChange={(e) => setBookingId(e.target.value)} />
      </div>
      <button className="btn btn-danger" onClick={handleCancelBooking}>Cancel Booking</button>
    </div>
  );
};

export default CarBooking;
