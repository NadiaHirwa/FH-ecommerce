import React from 'react';
import './Header.css';

interface HeaderProps {
  cartItemsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartItemsCount = 0 }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>ElectroShop</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <input type="text" placeholder="Search products..." className="search-input" />
          <button className="cart-button">
            🛒 Cart ({cartItemsCount})
          </button>
          <button className="user-button">👤 Account</button>
        </div>
      </div>
    </header>
  );
};
