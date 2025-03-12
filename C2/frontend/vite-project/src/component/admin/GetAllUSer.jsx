import React, { useEffect, useState } from "react";
import axios from "axios";
import APIs from "../api/Api";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const headers = getAuthHeaders();
      const response = await axios.get(APIs.ALL_USERS_API, { headers });
      setUsers(response.data.users);
      setError("");
    } catch (error) {
      console.error("Error fetching users:", error?.response?.data || error.message);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuspendUser = async (id) => {
    try {
      const headers = getAuthHeaders();
      await axios.put(`${APIs.SUSPEND_USER_API}/${id}`, {}, { headers });
      await fetchUsers();
    } catch (error) {
      console.error("Error suspending user:", error?.response?.data || error.message);
    }
  };

  const handleUnsuspendUser = async (id) => {
    try {
      const headers = getAuthHeaders();
      await axios.put(`${APIs.UNSUSPEND_USER_API}/${id}`, {}, { headers });
      await fetchUsers();
    } catch (error) {
      console.error("Error unsuspending user:", error?.response?.data || error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const headers = getAuthHeaders();
      await axios.delete(`${APIs.DELETE_USER_API}/${id}`, { headers });
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error?.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary">Manage Users</h3>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-warning">No users found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={user.suspended ? "text-danger" : "text-success"}>
                    {user.suspended ? "Suspended" : "Active"}
                  </span>
                </td>
                <td>
                  {user.suspended ? (
                    <button className="btn btn-success me-2" onClick={() => handleUnsuspendUser(user._id)}>
                      Unsuspend
                    </button>
                  ) : (
                    <button className="btn btn-warning me-2" onClick={() => handleSuspendUser(user._id)}>
                      Suspend
                    </button>
                  )}
                  <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetAllUsers;
