import React, { useEffect, useState } from 'react';
import './AdminDashboardLayout.css';

type Settings = {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  currency: string;
  timezone: string;
  taxRate: string;
  paymentMethods: { card: boolean; bank: boolean; upi: boolean };
  deliveryMethods: { standard: boolean; express: boolean; pickup: boolean };
};

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    storeName: 'FH Electronics Shop',
    storeEmail: 'support@fhshop.com',
    storePhone: '+1-800-123-4567',
    currency: 'USD',
    timezone: 'EST',
    taxRate: '5',
    paymentMethods: { card: true, bank: true, upi: false },
    deliveryMethods: { standard: true, express: true, pickup: false },
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem('admin_settings');
    if (s) setSettings(JSON.parse(s));
  }, []);

  const save = () => {
    localStorage.setItem('admin_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2>System Settings</h2>

      <div style={{maxWidth:600,marginTop:24}}>
        <h3>Store Information</h3>
        <div style={{marginBottom:16}}>
          <label style={{display:'block',marginBottom:4,fontSize:13,fontWeight:500}}>Store Name</label>
          <input type="text" value={settings.storeName} onChange={(e) => setSettings({...settings, storeName: e.target.value})} style={{width:'100%',padding:8,border:'1px solid #ccc',borderRadius:4}} />
        </div>
        <div style={{marginBottom:16}}>
          <label style={{display:'block',marginBottom:4,fontSize:13,fontWeight:500}}>Store Email</label>
          <input type="email" value={settings.storeEmail} onChange={(e) => setSettings({...settings, storeEmail: e.target.value})} style={{width:'100%',padding:8,border:'1px solid #ccc',borderRadius:4}} />
        </div>
        <div style={{marginBottom:16}}>
          <label style={{display:'block',marginBottom:4,fontSize:13,fontWeight:500}}>Store Phone</label>
          <input type="tel" value={settings.storePhone} onChange={(e) => setSettings({...settings, storePhone: e.target.value})} style={{width:'100%',padding:8,border:'1px solid #ccc',borderRadius:4}} />
        </div>

        <h3 style={{marginTop:24}}>Regional Settings</h3>
        <div style={{marginBottom:16}}>
          <label style={{display:'block',marginBottom:4,fontSize:13,fontWeight:500}}>Currency</label>
          <select value={settings.currency} onChange={(e) => setSettings({...settings, currency: e.target.value})} style={{width:'100%',padding:8,border:'1px solid #ccc',borderRadius:4}}>
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>INR</option>
          </select>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{display:'block',marginBottom:4,fontSize:13,fontWeight:500}}>Timezone</label>
          <select value={settings.timezone} onChange={(e) => setSettings({...settings, timezone: e.target.value})} style={{width:'100%',padding:8,border:'1px solid #ccc',borderRadius:4}}>
            <option>EST</option>
            <option>CST</option>
            <option>MST</option>
            <option>PST</option>
            <option>GMT</option>
          </select>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{display:'block',marginBottom:4,fontSize:13,fontWeight:500}}>Tax Rate (%)</label>
          <input type="number" value={settings.taxRate} onChange={(e) => setSettings({...settings, taxRate: e.target.value})} step="0.1" min="0" style={{width:'100%',padding:8,border:'1px solid #ccc',borderRadius:4}} />
        </div>

        <h3 style={{marginTop:24}}>Payment Methods</h3>
        <div style={{marginBottom:16}}>
          <label><input type="checkbox" checked={settings.paymentMethods.card} onChange={(e) => setSettings({...settings, paymentMethods: {...settings.paymentMethods, card: e.target.checked}})} /> Credit/Debit Card</label>
        </div>
        <div style={{marginBottom:16}}>
          <label><input type="checkbox" checked={settings.paymentMethods.bank} onChange={(e) => setSettings({...settings, paymentMethods: {...settings.paymentMethods, bank: e.target.checked}})} /> Bank Transfer</label>
        </div>
        <div style={{marginBottom:16}}>
          <label><input type="checkbox" checked={settings.paymentMethods.upi} onChange={(e) => setSettings({...settings, paymentMethods: {...settings.paymentMethods, upi: e.target.checked}})} /> UPI</label>
        </div>

        <h3 style={{marginTop:24}}>Delivery Methods</h3>
        <div style={{marginBottom:16}}>
          <label><input type="checkbox" checked={settings.deliveryMethods.standard} onChange={(e) => setSettings({...settings, deliveryMethods: {...settings.deliveryMethods, standard: e.target.checked}})} /> Standard (5-7 days)</label>
        </div>
        <div style={{marginBottom:16}}>
          <label><input type="checkbox" checked={settings.deliveryMethods.express} onChange={(e) => setSettings({...settings, deliveryMethods: {...settings.deliveryMethods, express: e.target.checked}})} /> Express (2-3 days)</label>
        </div>
        <div style={{marginBottom:24}}>
          <label><input type="checkbox" checked={settings.deliveryMethods.pickup} onChange={(e) => setSettings({...settings, deliveryMethods: {...settings.deliveryMethods, pickup: e.target.checked}})} /> Store Pickup</label>
        </div>

        <div style={{display:'flex',gap:8}}>
          <button className="btn-primary" onClick={save}>💾 Save Settings</button>
          {saved && <span style={{color:'#166534',fontSize:13}}>✓ Saved!</span>}
        </div>
      </div>
    </div>
  );
};
