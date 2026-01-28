import React, { useState } from 'react';
import '../EmployeeDashboard.css';

export const AssignedOrders: React.FC = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customer: 'John Smith',
      status: 'Pending',
      date: '2025-01-28',
      items: 3,
      total: '$150.00',
    },
    {
      id: 'ORD002',
      customer: 'Jane Doe',
      status: 'Processing',
      date: '2025-01-27',
      items: 2,
      total: '$89.50',
    },
    {
      id: 'ORD003',
      customer: 'Bob Wilson',
      status: 'Ready for Delivery',
      date: '2025-01-26',
      items: 5,
      total: '$250.00',
    },
    {
      id: 'ORD004',
      customer: 'Alice Brown',
      status: 'Delivered',
      date: '2025-01-25',
      items: 1,
      total: '$45.99',
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const statusOptions = ['Pending', 'Processing', 'Ready for Delivery', 'Delivered'];

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
    setSelectedOrder(null);
  };

  return (
    <div className="employee-page">
      <h1>Assigned Orders</h1>

      <div className="content-box">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.items}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`badge badge-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <button
                    className="btn-small"
                    onClick={() => setSelectedOrder(order.id === selectedOrder ? null : order.id)}
                  >
                    {selectedOrder === order.id ? '✕' : 'Update'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Status Update Dropdown */}
        {selectedOrder && (
          <div className="status-update-box">
            <h3>Update Order Status</h3>
            <div className="status-options">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  className={`status-option ${
                    orders.find((o) => o.id === selectedOrder)?.status === status ? 'active' : ''
                  }`}
                  onClick={() => updateStatus(selectedOrder, status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="page-info">
        <p>💡 <strong>Note:</strong> You can only update order status. Modification and deletion are not allowed.</p>
      </div>
    </div>
  );
};
