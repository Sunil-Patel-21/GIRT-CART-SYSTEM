import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = ({ url }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGifts: 0,
    totalOrders: 0,
    categoryData: [],
    recentOrders: []
  });

  const fetchStats = async () => {
    try {
      const [usersRes, giftsRes, ordersRes] = await Promise.all([
        axios.get(`${url}/api/user/list`),
        axios.get(`${url}/api/gift/list`),
        axios.get(`${url}/api/order/list`)
      ]);

      const gifts = giftsRes.data.data || [];
      const categoryCount = {};
      gifts.forEach(gift => {
        categoryCount[gift.category] = (categoryCount[gift.category] || 0) + 1;
      });

      const categoryData = Object.keys(categoryCount).map(key => ({
        name: key,
        value: categoryCount[key]
      }));

      setStats({
        totalUsers: usersRes.data.data?.length || 0,
        totalGifts: gifts.length,
        totalOrders: ordersRes.data.data?.length || 0,
        categoryData,
        recentOrders: ordersRes.data.data?.slice(0, 5) || []
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalGifts}</h3>
          <p>Total Gifts</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalOrders}</h3>
          <p>Total Orders</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Gifts by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={stats.categoryData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                {stats.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
