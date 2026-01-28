import React from 'react';

interface OrderItem {
  id: string;
  orderNo: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: number;
}

interface OrdersTableProps {
  orders: OrderItem[];
  onViewDetails: (orderId: string) => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onViewDetails,
  onTrackOrder,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'status-delivered';
      case 'Shipped':
        return 'status-shipped';
      case 'Processing':
        return 'status-processing';
      case 'Pending':
        return 'status-pending';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">📭</p>
        <h3>No Orders Yet</h3>
        <p>You haven't placed any orders. Start shopping now!</p>
      </div>
    );
  }

  return (
    <div className="orders-table-wrapper">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Items</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td data-label="Order ID">
                <span className="order-id">{order.orderNo}</span>
              </td>
              <td data-label="Date">{new Date(order.date).toLocaleDateString()}</td>
              <td data-label="Items">{order.items} item(s)</td>
              <td data-label="Status">
                <span className={`status-badge ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td data-label="Total" className="total-amount">
                ${order.total.toFixed(2)}
              </td>
              <td data-label="Actions" className="action-buttons">
                <button
                  className="btn-small btn-secondary"
                  onClick={() => onViewDetails(order.id)}
                  title="View details"
                >
                  View
                </button>
                <button
                  className="btn-small btn-primary"
                  onClick={() => onTrackOrder(order.id)}
                  title="Track order"
                >
                  Track
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
