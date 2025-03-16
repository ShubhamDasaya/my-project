import React, { useEffect, useState } from "react";
import axios from "axios";
import APIs from "../api/Api";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
    
      const response = await axios.get(APIs.ALL_USERS_API);
      setUsers(response.data.users);
      setError("");
    } catch (error) {
      console.error("Error fetching users:", error?.response?.data || error.message);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
  
    try {
      
      await axios.delete(APIs.DELETE_USER_API(id));
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
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(user=>user.role === "User").map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role === "Admin" ? "" : user.role}</td>
                <td>
                  
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
