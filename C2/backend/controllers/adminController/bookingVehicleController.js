import Razorpay from "razorpay";
import Booking from "../../models/adminModel/bookingVehicleModls.js";
import Payment from "../../models/adminModel/paymentModel.js";
import dotenv from "dotenv";
dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Book a car & initiate payment
export const bookCar = async (req, res) => {
  try {
    const { carId, startDate, days, totalAmount } = req.body;
    const userId = req.user.id;

    const options = {
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Payment & Save Booking
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, bookingDetails } = req.body;

    const newPayment = new Payment({
      userId: req.user.id,
      razorpay_order_id,
      razorpay_payment_id,
      amount: bookingDetails.totalAmount,
    });
    await newPayment.save();

    const newBooking = new Booking({
      userId: req.user.id,
      carId: bookingDetails.carId,
      startDate: bookingDetails.startDate,
      endDate: new Date(new Date(bookingDetails.startDate).setDate(new Date(bookingDetails.startDate).getDate() + bookingDetails.days)),
      totalAmount: bookingDetails.totalAmount,
      paymentId: newPayment._id,
      status: "Confirmed",
    });
    await newBooking.save();

    res.json({ success: true, message: "Booking successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel Booking (Only if start date is at least 2 days ahead)
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({ _id: bookingId, userId });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const currentDate = new Date();
    const startDate = new Date(booking.startDate);
    const daysDifference = Math.ceil((startDate - currentDate) / (1000 * 60 * 60 * 24));

    if (daysDifference < 2) {
      return res.status(400).json({ success: false, message: "Booking can only be canceled at least 2 days before start date" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getBookedVehiclesData = async (req, res) => {
  try {
    const bookedVehicles = await Booking.find({ status: "Confirmed" }).populate('carId'); // Assuming 'carId' is the reference to the vehicle in Booking collection

    if (!bookedVehicles.length) {
      return res.status(404).json({ success: false, message: "No booked vehicles found" });
    }

    // Prepare a list of booked vehicle data
    const vehicleData = bookedVehicles.map((booking) => {
      return {
        bookingId: booking._id,
        carDetails: booking.carId, // This will return the entire car document from Vehicle model
        startDate: booking.startDate,
        endDate: booking.endDate,
        totalAmount: booking.totalAmount,
        status: booking.status,
      };
    });

    res.json({ success: true, bookedVehiclesCount: bookedVehicles.length, vehicleData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params; 

    
    const booking = await Booking.findOne({ _id: bookingId, status: "Confirmed" }).populate('carId');

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found or not confirmed" });
    }

    // Return the booking details along with the car details
    const vehicleData = {
      bookingId: booking._id,
      carDetails: booking.carId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      totalAmount: booking.totalAmount,
      status: booking.status,
    };

    res.json({ success: true, vehicleData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
