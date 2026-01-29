import React, { useEffect, useState } from 'react';
import './AdminDashboardLayout.css';

type Order = {
  id: string;
  orderNumber: string;
  customer: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  date: string;
  assignedTo?: string;
};

export const OrdersAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [showEdit, setShowEdit] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [newAssignee, setNewAssignee] = useState('');

  useEffect(() => {
    const o = localStorage.getItem('admin_orders');
    setOrders(o ? JSON.parse(o) : [
      { id: 'o1', orderNumber: 'ORD-001', customer: 'John Doe', total: 299.99, status: 'pending' as const, items: 3, date: '2026-01-28', assignedTo: undefined },
      { id: 'o2', orderNumber: 'ORD-002', customer: 'Jane Smith', total: 159.50, status: 'processing' as const, items: 2, date: '2026-01-27', assignedTo: 'emp1' },
    ]);
    const e = localStorage.getItem('admin_employees');
    setEmployees(e ? JSON.parse(e) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('admin_orders', JSON.stringify(orders));
  }, [orders]);

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(orders.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const cancelOrder = (id: string) => {
    if (!confirm('Cancel this order?')) return;
    updateOrder(id, { status: 'cancelled' });
    setShowEdit(null);
  };

  return (
    <div>
      <h2>Order Management</h2>
      <table style={{width:'100%',marginTop:16}}>
        <thead>
          <tr style={{background:'#f3f4f6'}}>
            <th style={{padding:12,textAlign:'left'}}>Order #</th>
            <th style={{padding:12,textAlign:'left'}}>Customer</th>
            <th style={{padding:12,textAlign:'center'}}>Items</th>
            <th style={{padding:12,textAlign:'right'}}>Total</th>
            <th style={{padding:12,textAlign:'left'}}>Status</th>
            <th style={{padding:12,textAlign:'left'}}>Assigned</th>
            <th style={{padding:12,textAlign:'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} style={{borderBottom:'1px solid #e6eef8'}}>
              <td style={{padding:12}}><strong>{o.orderNumber}</strong></td>
              <td style={{padding:12}}>{o.customer}</td>
              <td style={{padding:12,textAlign:'center'}}>{o.items}</td>
              <td style={{padding:12,textAlign:'right'}}>${o.total.toFixed(2)}</td>
              <td style={{padding:12}}>
                <span style={{padding:'4px 8px',borderRadius:4,fontSize:12,background:o.status==='pending'?'#fef3c7':o.status==='processing'?'#dbeafe':o.status==='delivered'?'#dcfce7':'#f3f4f6'}}>
                  {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                </span>
              </td>
              <td style={{padding:12,fontSize:13}}>{o.assignedTo ? `EMP-${o.assignedTo}` : '—'}</td>
              <td style={{padding:12,textAlign:'center'}}>
                <button className="btn-small" onClick={() => { setShowEdit(o); setNewStatus(o.status); setNewAssignee(o.assignedTo || ''); }}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEdit && (
        <div className="modal-overlay" onClick={() => setShowEdit(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{showEdit.orderNumber}</h3>
            <form onSubmit={(e) => { e.preventDefault(); updateOrder(showEdit.id, { status: newStatus as any, assignedTo: newAssignee || undefined }); setShowEdit(null); }} className="form-group">
              <label style={{display:'block',marginBottom:6}}>Status</label>
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
              <label style={{display:'block',marginTop:12,marginBottom:6}}>Assign Employee</label>
              <select value={newAssignee} onChange={(e) => setNewAssignee(e.target.value)}>
                <option value="">— Unassigned —</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
              <div className="form-actions" style={{marginTop:16}}>
                <button className="btn-primary" type="submit">Update</button>
                <button type="button" className="btn-secondary" onClick={() => setShowEdit(null)}>Close</button>
                <button type="button" className="btn-remove" onClick={() => cancelOrder(showEdit.id)}>Cancel Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
