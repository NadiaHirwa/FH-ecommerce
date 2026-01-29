import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { logAuditEntry } from '../../utils/auditLog';
import './EmployeeDashboard.css';

export const SalesPOS: React.FC = () => {
  const auth = useAuth();
  const [cartItems, setCartItems] = useState<
    Array<{ id: number; name: string; price: number; quantity: number }>
  >([]);
  const [recordedTxs, setRecordedTxs] = useState<any[]>([]);
  const [showTxHistory, setShowTxHistory] = useState(false);
  const [editingTx, setEditingTx] = useState<any | null>(null);
  const [editAmount, setEditAmount] = useState(0);
  const [products] = useState([
    { id: 1, name: 'Wireless Mouse', price: 25.99 },
    { id: 2, name: 'USB-C Cable', price: 12.99 },
    { id: 3, name: 'Keyboard Mechanical', price: 79.99 },
    { id: 4, name: 'Laptop Stand', price: 35.00 },
    { id: 5, name: 'Webcam HD', price: 49.99 },
  ]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [notes, setNotes] = useState('');

  // Load recorded transactions on mount
  React.useEffect(() => {
    const prev = localStorage.getItem('admin_transactions');
    const txs = prev ? JSON.parse(prev) : [];
    // filter to this employee's transactions
    const mine = txs.filter((t:any) => t.employeeId === auth.user?.id);
    setRecordedTxs(mine);
  }, [auth.user?.id]);

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
    // Persist transaction to localStorage as admin_transactions and admin_orders
    const tx = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString(),
      total,
      paymentMethod,
      items: cartItems,
      notes,
      source: 'offline',
    } as any;

    try {
      const prev = localStorage.getItem('admin_transactions');
      const arr = prev ? JSON.parse(prev) : [];
      // attach employee info if available
      const { user } = auth;
      if (user) {
        tx.employeeId = user.id;
        tx.employeeName = user.name;
      }
      arr.unshift(tx);
      localStorage.setItem('admin_transactions', JSON.stringify(arr));

      // also add a lightweight order record so reports/customers see it
      const order = {
        id: `ord-${Date.now()}`,
        date: tx.date,
        total: tx.total,
        paymentMethod: tx.paymentMethod,
        status: 'completed',
        items: tx.items,
        customer: 'Walk-in',
      };
      const prevO = localStorage.getItem('admin_orders');
      const oarr = prevO ? JSON.parse(prevO) : [];
      oarr.unshift(order);
      localStorage.setItem('admin_orders', JSON.stringify(oarr));

      alert(`✅ Offline sale recorded! Total: $${total.toFixed(2)} (${paymentMethod})`);
    } catch (err) {
      console.error('Save transaction failed', err);
      alert('Failed to save transaction');
    }

    // Log audit entry
    logAuditEntry('transaction_created', tx.id, 'transaction', {
      userId: auth.user?.id,
      userName: auth.user?.name,
      changes: { total: tx.total, paymentMethod: tx.paymentMethod },
      notes: tx.notes,
    });

    setCartItems([]);
    setPaymentMethod('cash');
    setNotes('');
    // Reload to show new transaction in history
    setTimeout(() => window.location.reload(), 500);
  };

  const handleEditTx = (tx: any) => {
    setEditingTx(tx);
    setEditAmount(tx.total);
  };

  const saveTxEdit = () => {
    if (!editingTx) return;
    try {
      const prev = localStorage.getItem('admin_transactions');
      const arr = prev ? JSON.parse(prev) : [];
      const idx = arr.findIndex((x:any) => x.id === editingTx.id);
      if (idx >= 0) {
        arr[idx] = { ...arr[idx], total: editAmount };
        localStorage.setItem('admin_transactions', JSON.stringify(arr));
      }
      logAuditEntry('transaction_edited', editingTx.id, 'transaction', {
        userId: auth.user?.id,
        userName: auth.user?.name,
        changes: { totalOld: editingTx.total, totalNew: editAmount },
      });
      alert('Transaction updated');
      setEditingTx(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  const handleCancelTx = (tx: any) => {
    if (!confirm('Cancel this transaction? A refund will be recorded.')) return;
    try {
      // Create refund
      const refund = {
        id: `refund-${Date.now()}`,
        date: new Date().toISOString(),
        total: -Math.abs(tx.total),
        method: tx.paymentMethod,
        source: 'refund',
        employeeId: auth.user?.id,
        employeeName: auth.user?.name,
        details: { refundedFrom: tx.id }
      };
      const prev = localStorage.getItem('admin_transactions');
      const arr = prev ? JSON.parse(prev) : [];
      arr.unshift(refund);
      localStorage.setItem('admin_transactions', JSON.stringify(arr));

      logAuditEntry('transaction_cancelled', tx.id, 'transaction', {
        userId: auth.user?.id,
        userName: auth.user?.name,
        notes: `Cancelled with refund: ${refund.id}`,
      });
      alert('Transaction cancelled and refund recorded');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Cancel failed');
    }
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
            <button
              className="btn-secondary"
              onClick={() => setShowTxHistory(!showTxHistory)}
              style={{marginTop: 8}}
            >
              {showTxHistory ? '▼' : '▶'} My Transaction History ({recordedTxs.length})
            </button>
          </div>

          {/* Transaction History */}
          {showTxHistory && recordedTxs.length > 0 && (
            <div style={{marginTop: 16, borderTop: '1px solid #e6eef8', paddingTop: 12}}>
              <h3>Recent Transactions</h3>
              <table style={{width: '100%', fontSize: 13}}>
                <thead>
                  <tr style={{background: '#f3f4f6'}}>
                    <th style={{padding: 8, textAlign: 'left'}}>Date</th>
                    <th style={{padding: 8, textAlign: 'right'}}>Amount</th>
                    <th style={{padding: 8, textAlign: 'left'}}>Method</th>
                    <th style={{padding: 8, textAlign: 'center'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recordedTxs.map((tx) => (
                    <tr key={tx.id} style={{borderBottom: '1px solid #e6eef8'}}>
                      <td style={{padding: 8}}>{new Date(tx.date).toLocaleString()}</td>
                      <td style={{padding: 8, textAlign: 'right'}}>${tx.total.toFixed(2)}</td>
                      <td style={{padding: 8}}>{tx.paymentMethod}</td>
                      <td style={{padding: 8, textAlign: 'center'}}>
                        <button className="btn-small" onClick={() => handleEditTx(tx)} style={{fontSize: 11}}>Edit</button>
                        <button className="btn-remove" onClick={() => handleCancelTx(tx)} style={{fontSize: 11, marginLeft: 4}}>Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {showTxHistory && recordedTxs.length === 0 && (
            <p style={{marginTop: 12, color: '#6b7280'}}>No transactions recorded yet</p>
          )}
        </div>
      </div>

      {/* Edit Transaction Modal */}
      {editingTx && (
        <div className="modal-overlay" onClick={() => setEditingTx(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{maxWidth: 400}}>
            <h3>Edit Transaction</h3>
            <form onSubmit={(e) => { e.preventDefault(); saveTxEdit(); }} className="form-group">
              <label>New Amount</label>
              <input type="number" step="0.01" value={editAmount} onChange={(e) => setEditAmount(parseFloat(e.target.value) || 0)} required />
              <div className="form-actions" style={{marginTop: 12}}>
                <button className="btn-primary" type="submit">Save</button>
                <button type="button" className="btn-secondary" onClick={() => setEditingTx(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
