import React, { useEffect, useState } from "react";
import "./Users.css";
import axios from "axios";
import { toast } from "react-toastify";

const Users = ({ url }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/list`);
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error("Error fetching users");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching users");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.post(`${url}/api/user/delete`, { id: userId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUsers();
      } else {
        toast.error("Error deleting user");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users add flex-col ">
      <p>All Users</p>
      <div className="users-table">
        <div className="users-table-format title">
          <b>Sr No.</b>
          <b>Name</b>
          <b>Email</b>
          <b>Delete</b>
        </div>
        {users.map((user, index) => (
          <div key={user._id} className="users-table-format">
            <p>{index + 1}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p onClick={() => deleteUser(user._id)} className="cursor">❌</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
