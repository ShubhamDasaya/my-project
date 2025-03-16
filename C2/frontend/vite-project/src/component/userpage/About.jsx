import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-3">About Our Car Rental System</h2>
        <p>
          Welcome to our **Car Rental System**, your one-stop solution for renting cars with ease.  
          Whether you need a vehicle for a weekend trip, a business journey, or daily travel, we provide  
          a seamless experience with affordable prices, secure payments, and a wide range of vehicles.
        </p>

        <h4 className="mt-4"> Our Services</h4>
        <ul>
          <li>Easy car booking process.</li>
          <li>Secure online payments via **Razorpay**.</li>
          <li>Wide selection of cars from trusted owners.</li>
          <li>Flexible rental periods and competitive pricing.</li>
          <li>24/7 customer support.</li>
        </ul>

        <h4 className="mt-4"> Our Policies</h4>
        <ul>
          <li>**Booking Policy**: Customers must provide valid ID proof and a driving license.</li>
          <li>**Cancellation Policy**: Free cancellation within 24 hours of booking; after that, a small fee applies.</li>
          <li>**Damage Policy**: Users are responsible for any damages during the rental period.</li>
          <li>**Refund Policy**: Automatic refunds for canceled bookings within 3-5 business days.</li>
          <li>**Safety Measures**: All cars are inspected before each rental for safety and hygiene.</li>
        </ul>

        <h4 className="mt-4"> Why Choose Us?</h4>
        <ul>
          <li>Reliable and well-maintained vehicles.</li>
          <li>Transparent pricing with no hidden charges.</li>
          <li>Hassle-free pickup and drop-off locations.</li>
          <li>Trusted by thousands of happy customers.</li>
        </ul>

       
      </div>
    </div>
  );
};

export default About;
