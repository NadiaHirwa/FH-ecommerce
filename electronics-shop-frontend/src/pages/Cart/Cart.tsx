import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Laptop Pro Max 15"',
      price: 999,
      quantity: 2,
      image: 'https://via.placeholder.com/100x100?text=Laptop',
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      price: 45,
      quantity: 1,
      image: 'https://via.placeholder.com/100x100?text=Mouse',
    },
  ]);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round((subtotal + shipping) * 0.1);
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>🛒 Your Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <Link to={`/product/${item.id}`} className="item-name">
                      {item.name}
                    </Link>
                    <p className="item-price">${item.price}</p>
                  </div>
                  <div className="quantity-selector">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="item-subtotal">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                  <button
                    className="btn-remove"
                    onClick={() => removeItem(item.id)}
                    title="Remove from cart"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="order-summary">
              <h3>📋 Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE ✓' : `$${shipping}`}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>${tax}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-total">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>

              {shipping > 0 && (
                <p className="free-shipping-info">
                  🎉 Free shipping on orders over $500!
                </p>
              )}

              <Link to="/checkout" className="btn btn-primary btn-full">
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="btn btn-secondary btn-full">
                Continue Shopping
              </Link>
              <button className="btn btn-text btn-full">
                Save for Later
              </button>
            </aside>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Shop now and find amazing electronics!</p>
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
            <Link to="/" className="btn btn-secondary">
              Browse Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
