import React, { useState } from 'react';
import '../EmployeeDashboard.css';

export const Inventory: React.FC = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Wireless Mouse',
      category: 'Accessories',
      quantity: 45,
      status: 'In Stock',
      dateAdded: '2025-01-20',
    },
    {
      id: 2,
      name: 'USB-C Cable',
      category: 'Accessories',
      quantity: 8,
      status: 'Low Stock',
      dateAdded: '2025-01-15',
    },
    {
      id: 3,
      name: 'Keyboard Mechanical',
      category: 'Accessories',
      quantity: 32,
      status: 'In Stock',
      dateAdded: '2025-01-10',
    },
    {
      id: 4,
      name: 'Monitor Stand',
      category: 'Accessories',
      quantity: 0,
      status: 'Out of Stock',
      dateAdded: '2025-01-05',
    },
    {
      id: 5,
      name: 'Laptop Bag',
      category: 'Accessories',
      quantity: 15,
      status: 'In Stock',
      dateAdded: '2024-12-28',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: '', quantity: '' });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.quantity) {
      const newItem = {
        id: items.length + 1,
        name: formData.name,
        category: formData.category,
        quantity: parseInt(formData.quantity),
        status: parseInt(formData.quantity) > 0 ? 'In Stock' : 'Out of Stock',
        dateAdded: new Date().toISOString().split('T')[0],
      };
      setItems([...items, newItem]);
      setFormData({ name: '', category: '', quantity: '' });
      setShowForm(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'badge-in-stock';
      case 'Low Stock':
        return 'badge-low-stock';
      case 'Out of Stock':
        return 'badge-out-of-stock';
      default:
        return '';
    }
  };

  return (
    <div className="employee-page">
      <div className="page-header">
        <h1>Inventory Management</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          ➕ {showForm ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      {showForm && (
        <div className="form-box">
          <form onSubmit={handleAddItem} className="form-group">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save Item</button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="content-box">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td className="quantity">{item.quantity}</td>
                <td>
                  <span className={`badge ${getStatusClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.dateAdded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="page-info">
        <p>📌 <strong>Permissions:</strong> You can add new items to inventory. Editing and deletion are restricted.</p>
      </div>
    </div>
  );
};
