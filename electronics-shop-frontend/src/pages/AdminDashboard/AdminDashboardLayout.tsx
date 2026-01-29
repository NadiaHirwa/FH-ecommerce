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

  // Debug: log current user state
  React.useEffect(() => {
    console.log('AdminDashboardLayout - Current user:', user);
    console.log('User role:', user?.role);
  }, [user]);

  // TEMPORARY: Allow access for testing - remove after auth is fixed
  if (!user) {
    console.warn('No user logged in. Showing test panel...');
    return (
      <div style={{padding: 20, textAlign: 'center'}}>
        <h2>Admin Dashboard</h2>
        <p style={{color: '#666', marginBottom: 20}}>You are not logged in.</p>
        <button 
          onClick={() => navigate('/login')}
          style={{padding: '10px 20px', background: '#0066cc', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}
        >
          Go to Login Page
        </button>
        <div style={{marginTop: 30, color: '#999', fontSize: 12}}>
          <p>Debug: User state = {JSON.stringify(user)}</p>
        </div>
      </div>
    );
  }

  // Check role
  if (user.role !== 'admin') {
    console.warn('User is not admin. Role:', user.role);
    return (
      <div style={{padding: 20, textAlign: 'center'}}>
        <h2>Access Denied</h2>
        <p style={{color: 'red'}}>You need admin role to access this page.</p>
        <p style={{color: '#666'}}>Your current role: <strong>{user.role}</strong></p>
        <button 
          onClick={() => { logout(); navigate('/login'); }}
          style={{padding: '10px 20px', background: '#cc0000', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}
        >
          Logout & Login Again with Admin Email
        </button>
      </div>
    );
  }

  const sections = [
    { label: 'Overview', path: '/admin', icon: '📊' },
    { label: 'Products', path: '/admin/products', icon: '🛍️' },
    { label: 'Inventory', path: '/admin/inventory', icon: '📦' },
    { label: 'Orders', path: '/admin/orders', icon: '🧾' },
    { label: 'Transactions', path: '/admin/transactions', icon: '💳' },
    { label: 'Reports', path: '/admin/reports', icon: '📈' },
    { label: 'Customers', path: '/admin/customers', icon: '👥' },
    { label: 'Employees', path: '/admin/employees', icon: '👷' },
    { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: '📝' },
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
