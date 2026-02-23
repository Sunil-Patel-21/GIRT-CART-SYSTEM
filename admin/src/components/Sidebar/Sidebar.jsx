import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { FaUsers, FaChartBar, FaShoppingBag } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/" className="sidebar-option">
          <FaChartBar size={24} />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <FaShoppingBag size={24} />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/users" className="sidebar-option">
          <FaUsers size={24} />
          <p>Users</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
