import React, { useState } from 'react';
import '../EmployeeDashboard.css';

export const Transactions: React.FC = () => {
  const [transactions] = useState([
    {
      id: 'TXN001',
      type: 'Online',
      amount: 150.0,
      method: 'Credit Card',
      date: '2025-01-28',
      status: 'Completed',
    },
    {
      id: 'TXN002',
      type: 'Offline',
      amount: 45.99,
      method: 'Cash',
      date: '2025-01-28',
      status: 'Completed',
    },
    {
      id: 'TXN003',
      type: 'Online',
      amount: 89.5,
      method: 'PayPal',
      date: '2025-01-27',
      status: 'Completed',
    },
    {
      id: 'TXN004',
      type: 'Offline',
      amount: 250.0,
      method: 'Mobile Money',
      date: '2025-01-27',
      status: 'Completed',
    },
    {
      id: 'TXN005',
      type: 'Online',
      amount: 75.25,
      method: 'Debit Card',
      date: '2025-01-26',
      status: 'Completed',
    },
  ]);

  const [filters, setFilters] = useState({
    type: 'all',
    method: 'all',
    startDate: '',
    endDate: '',
  });

  const filteredTransactions = transactions.filter((txn) => {
    if (filters.type !== 'all' && txn.type !== filters.type) return false;
    if (filters.method !== 'all' && txn.method !== filters.method) return false;
    if (filters.startDate && txn.date < filters.startDate) return false;
    if (filters.endDate && txn.date > filters.endDate) return false;
    return true;
  });

  const total = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="employee-page">
      <h1>Transactions (Read-Only)</h1>

      {/* Filters */}
      <div className="filters-box">
        <div className="filter-group">
          <label>Type:</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="all">All</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Payment Method:</label>
          <select
            value={filters.method}
            onChange={(e) => setFilters({ ...filters, method: e.target.value })}
          >
            <option value="all">All Methods</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Mobile Money">Mobile Money</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>End Date:</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>

        <button
          className="btn-secondary"
          onClick={() =>
            setFilters({ type: 'all', method: 'all', startDate: '', endDate: '' })
          }
        >
          Reset Filters
        </button>
      </div>

      {/* Summary */}
      <div className="summary-info">
        <p>
          <strong>Showing {filteredTransactions.length}</strong> transaction(s) | <strong>Total: ${total.toFixed(2)}</strong>
        </p>
      </div>

      {/* Transactions Table */}
      <div className="content-box">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr key={txn.id}>
                <td className="txn-id">{txn.id}</td>
                <td>
                  <span className={`badge ${txn.type === 'Online' ? 'badge-online' : 'badge-offline'}`}>
                    {txn.type}
                  </span>
                </td>
                <td className="amount">${txn.amount.toFixed(2)}</td>
                <td>{txn.method}</td>
                <td>{txn.date}</td>
                <td>
                  <span className="badge badge-completed">{txn.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="page-info">
        <p>🔒 <strong>Note:</strong> This section is read-only. You cannot edit or delete transactions.</p>
      </div>
    </div>
  );
};
