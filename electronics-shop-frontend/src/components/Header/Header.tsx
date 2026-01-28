import React, { useState } from 'react';
import logo from '../../assets/logo.jpg';
import './Header.css';

interface HeaderProps {
  cartItemsCount?: number;
  onSearchChange?: (query: string) => void;
  onCartClick?: () => void;
  onAccountClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemsCount = 0,
  onSearchChange,
  onCartClick,
  onAccountClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange?.(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search submission logic
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo - Top Left */}
        <div className="logo">
          <a href="/" title="Go to homepage">
            <img src={logo} alt="ElectroShop" className="logo-img" />
          </a>
        </div>

        {/* Primary Navigation - Center */}
        <nav className="nav" aria-label="Main navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>

        {/* Search Bar - Center-Right */}
        <form className="search-container" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="Search products..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search products"
          />
          <button 
            type="submit" 
            className="search-button" 
            title="Search"
            aria-label="Submit search"
          >
            🔍
          </button>
        </form>

        {/* Action Buttons - Top Right */}
        <div className="header-actions">
          {/* Cart Button with Badge */}
          <button 
            className="cart-button" 
            onClick={onCartClick}
            title="Shopping Cart"
            aria-label={`Shopping cart with ${cartItemsCount} items`}
          >
            <span className="cart-icon">🛒</span>
            {cartItemsCount > 0 && (
              <span className="cart-badge" aria-label={`${cartItemsCount} items`}>
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Account Button */}
          <button 
            className="account-button" 
            onClick={onAccountClick}
            title="Account & Login"
            aria-label="Go to account"
          >
            👤
          </button>
        </div>
      </div>
    </header>
  );
};
