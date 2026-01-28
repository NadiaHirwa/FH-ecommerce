import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './EmployeeDashboardLayout.css';

interface EmployeeDashboardLayoutProps {
  children: React.ReactNode;
}

export const EmployeeDashboardLayout: React.FC<EmployeeDashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect if not employee or admin
  if (!user || (user.role !== 'employee' && user.role !== 'admin')) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Overview', path: '/employee-dashboard', icon: '📊' },
    { label: 'Assigned Orders', path: '/employee-dashboard/orders', icon: '📦' },
    { label: 'Inventory', path: '/employee-dashboard/inventory', icon: '📋' },
    { label: 'Sales / POS', path: '/employee-dashboard/sales', icon: '🧾' },
    { label: 'Transactions', path: '/employee-dashboard/transactions', icon: '💳' },
    { label: 'Messages', path: '/employee-dashboard/messages', icon: '💬' },
    { label: 'Profile', path: '/employee-dashboard/profile', icon: '👤' },
    { label: 'Change Password', path: '/employee-dashboard/password', icon: '🔐' },
  ];

  return (
    <div className="employee-dashboard-container">
      {/* Sidebar */}
      <aside className={`employee-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Employee Portal</h2>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="employee-content">
        {/* Top Bar */}
        <header className="employee-topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <div className="topbar-title">
            <h1>Employee Dashboard</h1>
          </div>
          <div className="topbar-user">
            <span className="user-info">
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role === 'admin' ? 'Admin' : 'Employee'}</div>
            </span>
            <div className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="employee-main">
          {children}
        </main>
      </div>
    </div>
  );
};
