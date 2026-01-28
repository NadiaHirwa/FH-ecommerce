import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './DashboardLayout.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { id: 'orders', label: 'My Orders', path: '/dashboard/orders', icon: '📦' },
  { id: 'wishlist', label: 'Wishlist', path: '/dashboard/wishlist', icon: '❤️' },
  { id: 'addresses', label: 'Saved Addresses', path: '/dashboard/addresses', icon: '📍' },
  { id: 'profile', label: 'Profile Settings', path: '/dashboard/profile', icon: '👤' },
  { id: 'password', label: 'Change Password', path: '/dashboard/password', icon: '🔐' },
  { id: 'support', label: 'Support', path: '/dashboard/support', icon: '💬' },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const currentPath = location.pathname;

  if (!user) {
    return (
      <div className="dashboard-unauthorized">
        <div className="unauthorized-card">
          <h1>Access Denied</h1>
          <p>Please log in to access your dashboard.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button 
            className="nav-item logout-btn"
            onClick={handleLogout}
          >
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Bar */}
        <div className="dashboard-topbar">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <div className="topbar-spacer"></div>
          <div className="topbar-user">
            <span className="user-greeting">Welcome, {user.name}!</span>
          </div>
        </div>

        {/* Content Area */}
        <main className="dashboard-content">
          {children}
        </main>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};
