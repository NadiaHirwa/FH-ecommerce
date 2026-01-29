import React from 'react';
import './AdminDashboardLayout.css';

export const AdminOverview: React.FC = () => {
  const cards = [
    { title: 'Total Products', value: '1,234' },
    { title: 'Units in Stock', value: '5,678' },
    { title: 'Inventory Value', value: '$123,456' },
    { title: 'Total Sales (Month)', value: '$45,000' },
    { title: 'Pending Orders', value: '18' },
    { title: 'Total Customers', value: '3,210' },
    { title: 'Total Employees', value: '12' },
  ];

  return (
    <div>
      <h2>Admin Overview</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16,marginTop:16}}>
        {cards.map((c) => (
          <div key={c.title} style={{background:'white',padding:16,borderRadius:8,boxShadow:'0 1px 3px rgba(0,0,0,.06)'}}>
            <div style={{color:'#6b7280',fontSize:13,fontWeight:600}}>{c.title}</div>
            <div style={{fontSize:20,fontWeight:700,marginTop:8}}>{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
