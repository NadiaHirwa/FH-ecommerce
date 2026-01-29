import React, { useEffect, useMemo, useState } from 'react';
import './AdminDashboardLayout.css';

const toCurrency = (n: number) => `$${n.toFixed(2)}`;

export const ReportsAdmin: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [movements, setMovements] = useState<any[]>([]);

  useEffect(() => {
    const o = localStorage.getItem('admin_orders');
    const p = localStorage.getItem('admin_products');
    const m = localStorage.getItem('admin_movements');
    setOrders(o ? JSON.parse(o) : []);
    setProducts(p ? JSON.parse(p) : []);
    setMovements(m ? JSON.parse(m) : []);
  }, []);

  const totals = useMemo(() => {
    const totalSales = orders.reduce((s, o) => s + (o.total || 0), 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const stockValue = products.reduce((s, p) => s + ((p.price || 0) * (p.stock || 0)), 0);
    const recent = orders.slice(0,10);
    return { totalSales, totalOrders, totalProducts, stockValue, recent };
  }, [orders, products]);

  const exportCSV = (type: 'orders'|'products'|'movements') => {
    let rows: string[][] = [];
    if (type === 'orders') {
      rows = [['Order ID','Date','Customer','Total','Status']];
      orders.forEach((o:any) => rows.push([o.id || o.orderNumber || '', o.date || '', o.customer || o.customerName || '', String(o.total || 0), o.status || '']));
    } else if (type === 'products') {
      rows = [['Product ID','Name','Price','Stock']];
      products.forEach((p:any) => rows.push([p.id || '', p.name || '', String(p.price || 0), String(p.stock || 0)]));
    } else {
      rows = [['Date','SKU','Change','Note']];
      movements.forEach((m:any) => rows.push([m.date || '', m.sku || m.productId || '', String(m.change || 0), m.note || '']));
    }

    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>Reports & Exports</h2>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:12}}>
        <div className="card-small">
          <div className="card-title">Total Sales</div>
          <div className="card-value">{toCurrency(totals.totalSales)}</div>
        </div>
        <div className="card-small">
          <div className="card-title">Orders</div>
          <div className="card-value">{totals.totalOrders}</div>
        </div>
        <div className="card-small">
          <div className="card-title">Products</div>
          <div className="card-value">{totals.totalProducts}</div>
        </div>
        <div className="card-small">
          <div className="card-title">Inventory Value</div>
          <div className="card-value">{toCurrency(totals.stockValue)}</div>
        </div>
      </div>

      <div style={{marginTop:18}}>
        <h3>Quick Exports</h3>
        <div style={{display:'flex',gap:8}}>
          <button className="btn-primary" onClick={() => exportCSV('orders')}>Export Orders CSV</button>
          <button className="btn-primary" onClick={() => exportCSV('products')}>Export Products CSV</button>
          <button className="btn-primary" onClick={() => exportCSV('movements')}>Export Inventory Movements</button>
        </div>
      </div>

      <div style={{marginTop:18}}>
        <h3>Recent Orders</h3>
        {totals.recent.length === 0 ? <p style={{color:'#6b7280'}}>No recent orders</p> : (
          <table style={{width:'100%'}}>
            <thead>
              <tr style={{background:'#f3f4f6'}}>
                <th style={{padding:12,textAlign:'left'}}>Order</th>
                <th style={{padding:12,textAlign:'left'}}>Date</th>
                <th style={{padding:12,textAlign:'right'}}>Total</th>
                <th style={{padding:12,textAlign:'left'}}>Customer</th>
              </tr>
            </thead>
            <tbody>
              {totals.recent.map((o:any) => (
                <tr key={o.id || o.orderNumber} style={{borderBottom:'1px solid #e6eef8'}}>
                  <td style={{padding:12}}>{o.orderNumber || o.id}</td>
                  <td style={{padding:12}}>{o.date}</td>
                  <td style={{padding:12,textAlign:'right'}}>${(o.total||0).toFixed(2)}</td>
                  <td style={{padding:12}}>{o.customer || o.customerName || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReportsAdmin;
