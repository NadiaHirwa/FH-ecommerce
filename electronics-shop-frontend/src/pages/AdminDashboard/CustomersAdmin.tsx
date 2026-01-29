import React, { useEffect, useState } from 'react';
import './AdminDashboardLayout.css';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  active: boolean;
  dateJoined: string;
};

export const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showOrders, setShowOrders] = useState<Customer | null>(null);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '' });

  useEffect(() => {
    const c = localStorage.getItem('admin_customers');
    setCustomers(c ? JSON.parse(c) : [
      { id: 'cust1', name: 'John Doe', email: 'john@example.com', phone: '555-1234', city: 'New York', active: true, dateJoined: '2025-11-15' },
      { id: 'cust2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', city: 'Los Angeles', active: true, dateJoined: '2025-12-01' },
    ]);
    const o = localStorage.getItem('admin_orders');
    setOrders(o ? JSON.parse(o) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('admin_customers', JSON.stringify(customers));
  }, [customers]);

  const reset = () => setForm({ name: '', email: '', phone: '', city: '' });
  const openCreate = () => { reset(); setEditing(null); setShowForm(true); };
  const openEdit = (c: Customer) => { setEditing(c); setForm({ name: c.name, email: c.email, phone: c.phone || '', city: c.city || '' }); setShowForm(true); };

  const save = (e?: React.FormEvent) => {
    e?.preventDefault();
    const payload: Customer = { id: editing ? editing.id : `cust${Date.now()}`, name: form.name, email: form.email, phone: form.phone || undefined, city: form.city || undefined, active: editing ? editing.active : true, dateJoined: editing ? editing.dateJoined : new Date().toISOString().slice(0,10) };
    if (editing) setCustomers(customers.map(x => x.id === editing.id ? payload : x)); else setCustomers([payload, ...customers]);
    setShowForm(false);
  };

  const remove = (id: string) => { if (!confirm('Remove customer?')) return; setCustomers(customers.filter(c => c.id !== id)); };
  const toggle = (id: string) => setCustomers(customers.map(c => c.id === id ? { ...c, active: !c.active } : c));

  const viewOrders = (cust: Customer) => {
    setShowOrders(cust);
  };

  const custOrders = showOrders ? orders.filter(o => o.customerId === showOrders.id || o.customer === showOrders.name) : [];

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Customer Management</h2>
        <button className="btn-primary" onClick={openCreate}>➕ Add Customer</button>
      </div>

      <table style={{width:'100%',marginTop:16}}>
        <thead>
          <tr style={{background:'#f3f4f6'}}>
            <th style={{padding:12,textAlign:'left'}}>Name</th>
            <th style={{padding:12,textAlign:'left'}}>Email</th>
            <th style={{padding:12,textAlign:'left'}}>Phone</th>
            <th style={{padding:12,textAlign:'left'}}>City</th>
            <th style={{padding:12,textAlign:'center'}}>Orders</th>
            <th style={{padding:12,textAlign:'center'}}>Status</th>
            <th style={{padding:12,textAlign:'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => {
            const cOrders = orders.filter(o => o.customerId === c.id || o.customer === c.name);
            return (
              <tr key={c.id} style={{borderBottom:'1px solid #e6eef8',opacity:c.active?1:0.6}}>
                <td style={{padding:12}}>{c.name}</td>
                <td style={{padding:12,fontSize:13}}>{c.email}</td>
                <td style={{padding:12,fontSize:13}}>{c.phone || '—'}</td>
                <td style={{padding:12,fontSize:13}}>{c.city || '—'}</td>
                <td style={{padding:12,textAlign:'center'}}>
                  <button className="btn-small" onClick={() => viewOrders(c)} style={{background:'#dbeafe',color:'#0369a1',border:'none'}}>{cOrders.length}</button>
                </td>
                <td style={{padding:12,textAlign:'center'}}>
                  <input type="checkbox" checked={c.active} onChange={() => toggle(c.id)} />
                </td>
                <td style={{padding:12,textAlign:'center'}}>
                  <button className="btn-small" onClick={() => openEdit(c)}>Edit</button>
                  <button className="btn-remove" style={{marginLeft:8}} onClick={() => remove(c.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editing ? 'Edit Customer' : 'Add Customer'}</h3>
            <form onSubmit={save} className="form-group">
              <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Full name" required />
              <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="Email" required />
              <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="Phone (optional)" />
              <input value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} placeholder="City (optional)" />
              <div className="form-actions">
                <button className="btn-primary" type="submit">Save</button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showOrders && (
        <div className="modal-overlay" onClick={() => setShowOrders(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{maxWidth:600}}>
            <h3>Orders for {showOrders.name}</h3>
            {custOrders.length === 0 ? (
              <p style={{color:'#6b7280'}}>No orders yet</p>
            ) : (
              <table style={{width:'100%'}}>
                <thead>
                  <tr style={{background:'#f3f4f6'}}>
                    <th style={{padding:12,textAlign:'left'}}>Order #</th>
                    <th style={{padding:12,textAlign:'right'}}>Amount</th>
                    <th style={{padding:12,textAlign:'left'}}>Status</th>
                    <th style={{padding:12,textAlign:'left'}}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {custOrders.map(o => (
                    <tr key={o.id} style={{borderBottom:'1px solid #e6eef8'}}>
                      <td style={{padding:12}}>{o.orderNumber || o.id}</td>
                      <td style={{padding:12,textAlign:'right'}}>${o.total?.toFixed(2) || '0.00'}</td>
                      <td style={{padding:12}}><span style={{fontSize:12,background:'#dbeafe',color:'#0369a1',padding:'4px 8px',borderRadius:4}}>{o.status}</span></td>
                      <td style={{padding:12,fontSize:13}}>{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button className="btn-secondary" onClick={() => setShowOrders(null)} style={{marginTop:16}}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
