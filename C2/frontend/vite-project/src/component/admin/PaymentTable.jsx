import React, { useEffect, useState } from "react";
import axios from "axios";
import APIs from "../api/Api";
import { Table, Spinner, Alert, Badge } from "react-bootstrap"; // Import Bootstrap components

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(APIs.ADMIN_PAYMENTS_API);
      console.log("Payments Data:", response.data);
      setPayments(response.data.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Payment Records</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : payments.length === 0 ? (
        <Alert variant="info" className="text-center">
          No payments found
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="shadow-lg text-center">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Vehicle</th>
                <th>Booking Dates</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.user_id?.name || "N/A"}</td>
                  <td>{payment.vehicle_id?.vehicle_name || "N/A"}</td>
                  <td>
                    {new Date(payment.booking_id?.start_date).toLocaleDateString()} -{" "}
                    {new Date(payment.booking_id?.end_date).toLocaleDateString()}
                  </td>
                  <td className="fw-bold">₹{payment.amount.toLocaleString()}</td>
                  <td>
                    <Badge bg={payment.payment_method === "Online" ? "success" : "warning"}>
                      {payment.payment_method}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      bg={
                        payment.status === "Completed"
                          ? "success"
                          : payment.status === "Pending"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
