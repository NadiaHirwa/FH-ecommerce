import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AccountMenu.css';

interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="menu-backdrop" onClick={onClose}></div>
      
      {/* Menu */}
      <div className="account-menu">
        {user ? (
          <>
            {/* User Profile Section */}
            <div className="menu-header">
              <div className="user-avatar">👤</div>
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>

            <hr className="menu-divider" />

            {/* Menu Items */}
            <button 
              className="menu-item"
              onClick={() => handleNavigation('/account/profile')}
            >
              <span className="menu-icon">👤</span>
              My Profile
            </button>
            <button 
              className="menu-item"
              onClick={() => handleNavigation('/account/orders')}
            >
              <span className="menu-icon">📦</span>
              My Orders
            </button>
            <button 
              className="menu-item"
              onClick={() => handleNavigation('/account/wishlist')}
            >
              <span className="menu-icon">❤️</span>
              Wishlist
            </button>
            <button 
              className="menu-item"
              onClick={() => handleNavigation('/account/settings')}
            >
              <span className="menu-icon">⚙️</span>
              Settings
            </button>

            <hr className="menu-divider" />

            {/* Logout Button */}
            <button 
              className="menu-item logout-btn"
              onClick={handleLogout}
            >
              <span className="menu-icon">🚪</span>
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Not Logged In State */}
            <div className="menu-header">
              <p className="menu-title">Welcome!</p>
            </div>

            <hr className="menu-divider" />

            <button 
              className="menu-item login-btn"
              onClick={() => handleNavigation('/login')}
            >
              <span className="menu-icon">🔑</span>
              Sign In
            </button>
            <button 
              className="menu-item register-btn"
              onClick={() => handleNavigation('/register')}
            >
              <span className="menu-icon">✨</span>
              Create Account
            </button>

            <hr className="menu-divider" />

            <button 
              className="menu-item"
              onClick={() => handleNavigation('/checkout')}
            >
              <span className="menu-icon">🛍️</span>
              Continue as Guest
            </button>
          </>
        )}
      </div>
    </>
  );
};
