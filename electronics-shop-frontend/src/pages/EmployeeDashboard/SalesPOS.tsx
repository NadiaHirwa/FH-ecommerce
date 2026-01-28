import React, { useState } from 'react';
import './EmployeeDashboard.css';

export const SalesPOS: React.FC = () => {
  const [cartItems, setCartItems] = useState<
    Array<{ id: number; name: string; price: number; quantity: number }>
  >([]);
  const [products] = useState([
    { id: 1, name: 'Wireless Mouse', price: 25.99 },
    { id: 2, name: 'USB-C Cable', price: 12.99 },
    { id: 3, name: 'Keyboard Mechanical', price: 79.99 },
    { id: 4, name: 'Laptop Stand', price: 35.00 },
    { id: 5, name: 'Webcam HD', price: 49.99 },
  ]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [notes, setNotes] = useState('');

  const addToCart = (product: typeof products[0]) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSave = () => {
    if (cartItems.length === 0) {
      alert('Add items to cart first!');
      return;
    }
    alert(
      `✅ Offline sale recorded!\nTotal: $${total.toFixed(2)}\nPayment: ${paymentMethod}`
    );
    setCartItems([]);
    setPaymentMethod('cash');
    setNotes('');
  };

  return (
    <div className="employee-page">
      <h1>Sales / POS (Offline Sales)</h1>

      <div className="pos-container">
        {/* Left: Product Selection */}
        <div className="pos-section">
          <h2>Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
                </div>
                <button className="btn-small" onClick={() => addToCart(product)}>
                  ➕ Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cart & Payment */}
        <div className="pos-section">
          <h2>Cart</h2>

          {cartItems.length === 0 ? (
            <div className="empty-cart">No items in cart</div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                    />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                  <button
                    className="btn-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-section">
            <h3>Payment Method</h3>
            <div className="payment-options">
              {['cash', 'mobile', 'bank'].map((method) => (
                <label key={method} className="radio-option">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>
                    {method === 'cash'
                      ? '💵 Cash'
                      : method === 'mobile'
                        ? '📱 Mobile Money'
                        : '🏦 Bank Transfer'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <textarea
            className="notes-field"
            placeholder="Transaction notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />

          {/* Actions */}
          <div className="form-actions">
            <button className="btn-primary" onClick={handleSave}>
              ✅ Save Transaction
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                setCartItems([]);
                setPaymentMethod('cash');
                setNotes('');
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
