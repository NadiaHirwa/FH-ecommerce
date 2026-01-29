import React, { useEffect, useMemo, useState } from 'react';
import './AdminDashboardLayout.css';

type Tx = {
  id: string;
  date: string;
  total: number;
  method?: string;
  source?: 'order' | 'offline' | 'refund';
  employeeId?: string;
  employeeName?: string;
  details?: any;
};

export const TransactionsAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Tx[]>([]);
  const [transactions, setTransactions] = useState<Tx[]>([]);
  const [filter, setFilter] = useState({ method: 'all', from: '', to: '' });

  useEffect(() => {
    const o = localStorage.getItem('admin_orders');
    const t = localStorage.getItem('admin_transactions');
    setOrders(o ? JSON.parse(o) : []);
    setTransactions(t ? JSON.parse(t) : []);
  }, []);

  const combined = useMemo(() => {
    const mappedOrders = (orders || []).map((o: any) => ({
      id: o.id || o.orderNumber || `ord-${Date.now()}`,
      date: o.date || o.createdAt || new Date().toISOString(),
      total: o.total || o.amount || 0,
      method: o.paymentMethod || 'online',
      source: 'order' as const,
      details: o,
    }));

    const mappedTx = (transactions || []).map((t: any) => ({
      id: t.id,
      date: t.date,
      total: t.total,
      method: t.paymentMethod || t.method || 'cash',
      source: t.source || 'offline',
      employeeId: t.employeeId,
      employeeName: t.employeeName,
      details: t,
    }));

    return [...mappedOrders, ...mappedTx].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [orders, transactions]);

  const filtered = combined.filter((c) => {
    if (filter.method !== 'all' && c.method !== filter.method) return false;
    if (filter.from && new Date(c.date) < new Date(filter.from)) return false;
    if (filter.to && new Date(c.date) > new Date(filter.to)) return false;
    return true;
  });

  const exportCSV = () => {
    const rows = [['ID', 'Date', 'Total', 'Method', 'Source', 'Employee']];
    filtered.forEach((r) => rows.push([r.id, r.date, r.total.toString(), r.method || '', r.source || '', r.employeeName || '']));
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // UI state for details/edit
  const [showDetails, setShowDetails] = useState<Tx | null>(null);
  const [showEdit, setShowEdit] = useState<Tx | null>(null);
  const [editForm, setEditForm] = useState({ amount: 0, notes: '' });

  const openDetails = (t: Tx) => setShowDetails(t);
  const openEdit = (t: Tx) => {
    setShowEdit(t);
    setEditForm({ amount: t.total, notes: t.details?.notes || '' });
  };

  const saveEdit = () => {
    if (!showEdit) return;
    // update transactions array
    const prev = localStorage.getItem('admin_transactions');
    const arr = prev ? JSON.parse(prev) : [];
    const idx = arr.findIndex((x:any) => x.id === showEdit.id);
    if (idx >= 0) {
      arr[idx] = { ...arr[idx], total: editForm.amount, notes: editForm.notes };
      localStorage.setItem('admin_transactions', JSON.stringify(arr));
    }
    // also update admin_orders if this tx corresponds to an order
    const prevO = localStorage.getItem('admin_orders');
    if (prevO) {
      const oarr = JSON.parse(prevO);
      const oi = oarr.findIndex((o:any) => o.id === showEdit.id || (`ord-${showEdit.id}`) === o.id);
      if (oi >= 0) {
        oarr[oi] = { ...oarr[oi], total: editForm.amount };
        localStorage.setItem('admin_orders', JSON.stringify(oarr));
      }
    }
    setShowEdit(null);
    window.location.reload();
  };

  const handleRefund = (t: Tx) => {
    if (!confirm('Are you sure you want to refund this transaction?')) return;
    try {
      const refundTx = {
        id: `refund-${Date.now()}`,
        date: new Date().toISOString(),
        total: -Math.abs(t.total),
        paymentMethod: t.method,
        method: t.method,
        source: 'refund',
        employeeName: 'System',
        details: { refundedFrom: t.id }
      } as any;

      const prev = localStorage.getItem('admin_transactions');
      const arr = prev ? JSON.parse(prev) : [];
      arr.unshift(refundTx);
      localStorage.setItem('admin_transactions', JSON.stringify(arr));

      // mark order refunded if exists
      const prevO = localStorage.getItem('admin_orders');
      if (prevO) {
        const oarr = JSON.parse(prevO);
        const oi = oarr.findIndex((o:any) => o.id === t.id || o.orderNumber === t.id || o.id === (`ord-${t.id}`));
        if (oi >= 0) {
          oarr[oi] = { ...oarr[oi], status: 'refunded' };
          localStorage.setItem('admin_orders', JSON.stringify(oarr));
        }
      }

      alert('Refund recorded');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Refund failed');
    }
  };

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Transactions (Unified)</h2>
        <div>
          <button className="btn-primary" onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      <div style={{display:'flex',gap:12,marginTop:12,alignItems:'center'}}>
        <label>Method:
          <select value={filter.method} onChange={(e) => setFilter({...filter, method: e.target.value})} style={{marginLeft:8}}>
            <option value="all">All</option>
            <option value="cash">Cash</option>
            <option value="mobile">Mobile</option>
            <option value="bank">Bank</option>
            <option value="online">Online</option>
          </select>
        </label>
        <label>From:
          <input type="date" value={filter.from} onChange={(e) => setFilter({...filter, from: e.target.value})} style={{marginLeft:8}} />
        </label>
        <label>To:
          <input type="date" value={filter.to} onChange={(e) => setFilter({...filter, to: e.target.value})} style={{marginLeft:8}} />
        </label>
      </div>

      <table style={{width:'100%',marginTop:16}}>
        <thead>
          <tr style={{background:'#f3f4f6'}}>
            <th style={{padding:12,textAlign:'left'}}>Date</th>
            <th style={{padding:12,textAlign:'left'}}>ID</th>
            <th style={{padding:12,textAlign:'right'}}>Amount</th>
            <th style={{padding:12,textAlign:'left'}}>Method</th>
            <th style={{padding:12,textAlign:'left'}}>Source</th>
            <th style={{padding:12,textAlign:'left'}}>Recorded By</th>
            <th style={{padding:12,textAlign:'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} style={{borderBottom:'1px solid #e6eef8'}}>
              <td style={{padding:12}}>{new Date(t.date).toLocaleString()}</td>
              <td style={{padding:12}}>{t.id}</td>
              <td style={{padding:12,textAlign:'right'}}>{t.total < 0 ? `- $${Math.abs(t.total).toFixed(2)}` : `$${t.total.toFixed(2)}`}</td>
              <td style={{padding:12}}>{t.method}</td>
              <td style={{padding:12}}>{t.source}</td>
              <td style={{padding:12}}>{t.employeeName || '—'}</td>
              <td style={{padding:12,textAlign:'center'}}>
                <button className="btn-small" onClick={() => openDetails(t)}>Details</button>
                <button className="btn-small" style={{marginLeft:8}} onClick={() => openEdit(t)}>Edit</button>
                {t.source !== 'refund' && (
                  <button className="btn-remove" style={{marginLeft:8}} onClick={() => handleRefund(t)}>Refund</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {showDetails && (
        <div className="modal-overlay" onClick={() => setShowDetails(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{maxWidth:700}}>
            <h3>Transaction Details</h3>
            <div style={{marginTop:8}}>
              <div><strong>ID:</strong> {showDetails.id}</div>
              <div><strong>Date:</strong> {new Date(showDetails.date).toLocaleString()}</div>
              <div><strong>Amount:</strong> ${showDetails.total.toFixed(2)}</div>
              <div><strong>Method:</strong> {showDetails.method}</div>
              <div style={{marginTop:8}}><strong>Items:</strong></div>
              <ul>
                {(showDetails.details?.items || showDetails.details?.items || []).map((it:any, idx:number) => (
                  <li key={idx}>{it.name || it.title || it.sku || `Item ${idx+1}`} — {it.quantity || it.qty || 1} × ${(it.price||it.unitPrice||0).toFixed(2)}</li>
                ))}
              </ul>
            </div>
            <div style={{marginTop:12}}>
              <button className="btn-secondary" onClick={() => setShowDetails(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="modal-overlay" onClick={() => setShowEdit(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{maxWidth:520}}>
            <h3>Edit Transaction</h3>
            <form onSubmit={(e) => { e.preventDefault(); saveEdit(); }} className="form-group">
              <label>Amount</label>
              <input type="number" step="0.01" value={editForm.amount} onChange={(e) => setEditForm({...editForm, amount: parseFloat(e.target.value)||0})} />
              <label>Notes</label>
              <textarea value={editForm.notes} onChange={(e) => setEditForm({...editForm, notes: e.target.value})} />
              <div className="form-actions">
                <button className="btn-primary" type="submit">Save</button>
                <button type="button" className="btn-secondary" onClick={() => setShowEdit(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
