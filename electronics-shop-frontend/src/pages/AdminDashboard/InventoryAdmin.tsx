import React, { useEffect, useState } from 'react';
import './AdminDashboardLayout.css';

type StockMovement = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  type: 'in' | 'out' | 'adjustment';
  reason?: string;
  date: string;
};

export const InventoryAdmin: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ productId: '', quantity: '', type: 'in' as 'in'|'out'|'adjustment', reason: '' });

  useEffect(() => {
    const p = localStorage.getItem('admin_products');
    setProducts(p ? JSON.parse(p) : []);
    const m = localStorage.getItem('admin_movements');
    setMovements(m ? JSON.parse(m) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('admin_movements', JSON.stringify(movements));
  }, [movements]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const prod = products.find(p => p.id === form.productId);
    if (!prod) { alert('Select product'); return; }

    const qty = parseInt(form.quantity);
    if (!qty || qty <= 0) { alert('Enter valid quantity'); return; }

    const updated = products.map(p => {
      if (p.id === form.productId) {
        const delta = form.type === 'out' ? -qty : qty;
        return { ...p, stock: Math.max(0, p.stock + delta) };
      }
      return p;
    });
    setProducts(updated);
    localStorage.setItem('admin_products', JSON.stringify(updated));

    setMovements([{ id: `m${Date.now()}`, productId: form.productId, productName: prod.name, quantity: qty, type: form.type, reason: form.reason, date: new Date().toISOString().slice(0,10) }, ...movements]);
    setShowForm(false);
    setForm({ productId: '', quantity: '', type: 'in', reason: '' });
  };

  const lowStock = products.filter(p => p.stock < 10);

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <h2>Inventory Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>📦 Stock In/Out</button>
      </div>

      {lowStock.length > 0 && (
        <div style={{background:'#fee2e2',border:'1px solid #fecaca',padding:12,borderRadius:6,marginBottom:16}}>
          <strong>⚠ Low Stock Alert:</strong> {lowStock.length} product(s) below 10 units
          <ul style={{margin:'8px 0 0 16px'}}>
            {lowStock.map(p => <li key={p.id}>{p.name}: {p.stock}</li>)}
          </ul>
        </div>
      )}

      <h3>Current Stock</h3>
      <table style={{width:'100%',marginBottom:32}}>
        <thead>
          <tr style={{background:'#f3f4f6'}}>
            <th style={{padding:12,textAlign:'left'}}>Product</th>
            <th style={{padding:12,textAlign:'right'}}>Stock</th>
            <th style={{padding:12,textAlign:'right'}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{borderBottom:'1px solid #e6eef8'}}>
              <td style={{padding:12}}>{p.name}</td>
              <td style={{padding:12,textAlign:'right'}}>{p.stock}</td>
              <td style={{padding:12,textAlign:'right'}}>
                <span style={{padding:'4px 8px',borderRadius:4,fontSize:12,background:p.stock < 10 ? '#fee2e2' : '#dcfce7',color:p.stock < 10 ? '#7f1d1d' : '#166534'}}>
                  {p.stock < 10 ? 'Low' : p.stock < 50 ? 'Medium' : 'High'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Stock Movement History</h3>
      <table style={{width:'100%'}}>
        <thead>
          <tr style={{background:'#f3f4f6'}}>
            <th style={{padding:12,textAlign:'left'}}>Date</th>
            <th style={{padding:12,textAlign:'left'}}>Product</th>
            <th style={{padding:12,textAlign:'center'}}>Type</th>
            <th style={{padding:12,textAlign:'right'}}>Qty</th>
            <th style={{padding:12,textAlign:'left'}}>Reason</th>
          </tr>
        </thead>
        <tbody>
          {movements.slice(0, 50).map(m => (
            <tr key={m.id} style={{borderBottom:'1px solid #e6eef8'}}>
              <td style={{padding:12}}>{m.date}</td>
              <td style={{padding:12}}>{m.productName}</td>
              <td style={{padding:12,textAlign:'center'}}>
                <span style={{fontSize:12,fontWeight:500,color:m.type==='in'?'#166534':m.type==='out'?'#7f1d1d':'#1f2937'}}>
                  {m.type==='in'?'📥 In':m.type==='out'?'📤 Out':'🔧 Adj'}
                </span>
              </td>
              <td style={{padding:12,textAlign:'right'}}>{m.quantity}</td>
              <td style={{padding:12,fontSize:13,color:'#6b7280'}}>{m.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Stock In/Out</h3>
            <form onSubmit={submit} className="form-group">
              <select value={form.productId} onChange={(e) => setForm({...form, productId: e.target.value})} required>
                <option value="">-- Select product --</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name} (stock: {p.stock})</option>)}
              </select>
              <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value as any})}>
                <option value="in">Stock In</option>
                <option value="out">Stock Out</option>
                <option value="adjustment">Manual Adjustment</option>
              </select>
              <input type="number" value={form.quantity} onChange={(e) => setForm({...form, quantity: e.target.value})} placeholder="Quantity" required />
              <input value={form.reason} onChange={(e) => setForm({...form, reason: e.target.value})} placeholder="Reason (optional)" />
              <div className="form-actions">
                <button className="btn-primary" type="submit">Record</button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
