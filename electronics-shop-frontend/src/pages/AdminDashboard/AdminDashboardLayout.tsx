import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboardLayout.css';

interface Props {
  children: React.ReactNode;
}

export const AdminDashboardLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Only allow admin
  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const sections = [
    { label: 'Overview', path: '/admin', icon: '📊' },
    { label: 'Products', path: '/admin/products', icon: '🛍️' },
    { label: 'Inventory', path: '/admin/inventory', icon: '📦' },
    { label: 'Orders', path: '/admin/orders', icon: '🧾' },
    { label: 'Transactions', path: '/admin/transactions', icon: '💳' },
    { label: 'Customers', path: '/admin/customers', icon: '👥' },
    { label: 'Employees', path: '/admin/employees', icon: '👷' },
    { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard-container">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        <nav className="sidebar-nav">
          {sections.map((s) => (
            <button
              key={s.path}
              className={`nav-item ${location.pathname === s.path ? 'active' : ''}`}
              onClick={() => {
                navigate(s.path);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
            >
              <span className="icon">{s.icon}</span>
              <span className="label">{s.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <div className="topbar-title"><h1>Admin Dashboard</h1></div>
          <div className="topbar-right">
            <div className="notifications">🔔</div>
            <div className="admin-user">{user?.name}</div>
          </div>
        </header>

        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
};
