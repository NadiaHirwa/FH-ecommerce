import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrdersTable } from '../../../components/Dashboard/OrdersTable';
import './MyOrders.css';

interface Order {
  id: string;
  orderNo: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: number;
}

const MyOrders: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data
  const [allOrders] = useState<Order[]>([
    { id: '1', orderNo: '#ORD-2026-001', date: '2026-01-25', status: 'Delivered', total: 299.99, items: 2 },
    { id: '2', orderNo: '#ORD-2026-002', date: '2026-01-28', status: 'Shipped', total: 149.99, items: 1 },
    { id: '3', orderNo: '#ORD-2026-003', date: '2026-01-28', status: 'Processing', total: 499.99, items: 3 },
    { id: '4', orderNo: '#ORD-2026-004', date: '2026-01-20', status: 'Delivered', total: 89.99, items: 1 },
    { id: '5', orderNo: '#ORD-2026-005', date: '2026-01-15', status: 'Delivered', total: 599.99, items: 5 },
  ]);

  const filteredOrders = statusFilter === 'all'
    ? allOrders
    : allOrders.filter(o => o.status === statusFilter);

  return (
    <div className="my-orders-page">
      <div className="page-header">
        <h1>My Orders</h1>
        <p>View and manage all your orders</p>
      </div>

      <div className="orders-controls">
        <div className="filter-group">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="orders-count">
          {filteredOrders.length} order(s) found
        </div>
      </div>

      <div className="orders-content">
        <OrdersTable
          orders={filteredOrders}
          onViewDetails={(id) => navigate(`/dashboard/order/${id}`)}
          onTrackOrder={(id) => navigate(`/dashboard/track/${id}`)}
        />
      </div>
    </div>
  );
};

export default MyOrders;
