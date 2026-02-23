import React, { useEffect, useState } from 'react';
import "./Orders.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBox } from 'react-icons/fa';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, { orderId, status });
      if (response.data.success) {
        toast.success("Status updated");
        fetchOrders();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders add flex-col">
      <h2>Order Management</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <FaBox size={24} />
              <div>
                <p className="order-id">Order #{order._id.slice(-6)}</p>
                <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="order-items">
              {order.items.map((item, index) => (
                <p key={index}>{item.name} x {item.quantity}</p>
              ))}
            </div>
            <div className="order-details">
              <p><strong>Amount:</strong> Rs.{order.amount}</p>
              <p><strong>Address:</strong> {order.address.street}, {order.address.city}</p>
              <p><strong>Phone:</strong> {order.address.phone}</p>
            </div>
            <div className="order-status">
              <select 
                value={order.status} 
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="status-select"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
