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
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} style={{borderBottom:'1px solid #e6eef8'}}>
              <td style={{padding:12}}>{new Date(t.date).toLocaleString()}</td>
              <td style={{padding:12}}>{t.id}</td>
              <td style={{padding:12,textAlign:'right'}}>${t.total.toFixed(2)}</td>
              <td style={{padding:12}}>{t.method}</td>
              <td style={{padding:12}}>{t.source}</td>
              <td style={{padding:12}}>{t.employeeName || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
