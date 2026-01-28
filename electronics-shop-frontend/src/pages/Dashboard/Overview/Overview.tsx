import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SummaryCard } from '../../../components/Dashboard/SummaryCard';
import { OrdersTable } from '../../../components/Dashboard/OrdersTable';
import './Overview.css';

interface Order {
  id: string;
  orderNo: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: number;
}

const Overview: React.FC = () => {
  const navigate = useNavigate();

  // Mock data
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNo: '#ORD-2026-001',
      date: '2026-01-25',
      status: 'Delivered',
      total: 299.99,
      items: 2,
    },
    {
      id: '2',
      orderNo: '#ORD-2026-002',
      date: '2026-01-28',
      status: 'Shipped',
      total: 149.99,
      items: 1,
    },
    {
      id: '3',
      orderNo: '#ORD-2026-003',
      date: '2026-01-28',
      status: 'Processing',
      total: 499.99,
      items: 3,
    },
  ]);

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length,
    completedOrders: orders.filter(o => o.status === 'Delivered').length,
    wishlistItems: 5,
  };

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="overview-page">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your account.</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <SummaryCard
          icon="📦"
          title="Total Orders"
          value={stats.totalOrders}
          color="blue"
        />
        <SummaryCard
          icon="⏳"
          title="Pending Orders"
          value={stats.pendingOrders}
          color="orange"
        />
        <SummaryCard
          icon="✅"
          title="Completed Orders"
          value={stats.completedOrders}
          color="green"
        />
        <SummaryCard
          icon="❤️"
          title="Wishlist Items"
          value={stats.wishlistItems}
          color="purple"
        />
      </div>

      {/* Recent Orders */}
      <div className="orders-section">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/dashboard/orders')}
          >
            View All Orders
          </button>
        </div>
        <OrdersTable
          orders={recentOrders}
          onViewDetails={(id) => navigate(`/dashboard/order/${id}`)}
          onTrackOrder={(id) => navigate(`/dashboard/track/${id}`)}
        />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button
            className="action-btn"
            onClick={() => navigate('/dashboard/wishlist')}
          >
            <span className="action-icon">❤️</span>
            <span>View Wishlist</span>
          </button>
          <button
            className="action-btn"
            onClick={() => navigate('/dashboard/addresses')}
          >
            <span className="action-icon">📍</span>
            <span>Manage Addresses</span>
          </button>
          <button
            className="action-btn"
            onClick={() => navigate('/dashboard/profile')}
          >
            <span className="action-icon">👤</span>
            <span>Update Profile</span>
          </button>
          <button
            className="action-btn"
            onClick={() => navigate('/shop')}
          >
            <span className="action-icon">🛍️</span>
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
