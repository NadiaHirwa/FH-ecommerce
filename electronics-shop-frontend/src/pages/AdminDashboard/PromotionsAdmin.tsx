import React, { useEffect, useState } from 'react';
import './AdminDashboardLayout.css';
import { uploadImage } from '../../utils/imageUpload';

type DiscountCode = {
  id: string;
  code: string;
  discountPercent: number;
  maxUses?: number;
  usedCount: number;
  expiryDate?: string;
  active: boolean;
};

type Banner = {
  id: string;
  title: string;
  image?: string;
  link?: string;
  position: number;
  active: boolean;
};

export const PromotionsAdmin: React.FC = () => {
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeTab, setActiveTab] = useState<'discounts' | 'banners'>('discounts');
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [editingCode, setEditingCode] = useState<DiscountCode | null>(null);
  const [codeForm, setCodeForm] = useState({ code: '', discountPercent: '', maxUses: '', expiryDate: '' });
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [bannerForm, setBannerForm] = useState({ title: '', image: '', link: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const d = localStorage.getItem('admin_discounts');
    setDiscounts(d ? JSON.parse(d) : [
      { id: 'dc1', code: 'SAVE10', discountPercent: 10, maxUses: 100, usedCount: 25, expiryDate: '2026-02-28', active: true },
      { id: 'dc2', code: 'WELCOME20', discountPercent: 20, maxUses: 50, usedCount: 8, expiryDate: '2026-03-15', active: true },
    ]);
    const b = localStorage.getItem('admin_banners');
    setBanners(b ? JSON.parse(b) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('admin_discounts', JSON.stringify(discounts));
  }, [discounts]);

  useEffect(() => {
    localStorage.setItem('admin_banners', JSON.stringify(banners));
  }, [banners]);

  // Discount Code handlers
  const resetCodeForm = () => setCodeForm({ code: '', discountPercent: '', maxUses: '', expiryDate: '' });
  const openCodeCreate = () => { resetCodeForm(); setEditingCode(null); setShowCodeForm(true); };
  const openCodeEdit = (d: DiscountCode) => { setEditingCode(d); setCodeForm({ code: d.code, discountPercent: String(d.discountPercent), maxUses: d.maxUses ? String(d.maxUses) : '', expiryDate: d.expiryDate || '' }); setShowCodeForm(true); };

  const saveCode = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!codeForm.code.trim()) { alert('Enter code'); return; }
    const pct = parseInt(codeForm.discountPercent) || 0;
    if (pct <= 0 || pct > 100) { alert('Enter valid discount %'); return; }

    const payload: DiscountCode = {
      id: editingCode ? editingCode.id : `dc${Date.now()}`,
      code: codeForm.code.toUpperCase(),
      discountPercent: pct,
      maxUses: codeForm.maxUses ? parseInt(codeForm.maxUses) : undefined,
      usedCount: editingCode ? editingCode.usedCount : 0,
      expiryDate: codeForm.expiryDate || undefined,
      active: editingCode ? editingCode.active : true,
    };

    if (editingCode) setDiscounts(discounts.map(d => d.id === editingCode.id ? payload : d));
    else setDiscounts([payload, ...discounts]);
    setShowCodeForm(false);
  };

  const removeCode = (id: string) => { if (!confirm('Delete code?')) return; setDiscounts(discounts.filter(d => d.id !== id)); };
  const toggleCode = (id: string) => setDiscounts(discounts.map(d => d.id === id ? { ...d, active: !d.active } : d));

  // Banner handlers
  const resetBannerForm = () => setBannerForm({ title: '', image: '', link: '' });
  const openBannerCreate = () => { resetBannerForm(); setEditingBanner(null); setShowBannerForm(true); };
  const openBannerEdit = (b: Banner) => { setEditingBanner(b); setBannerForm({ title: b.title, image: b.image || '', link: b.link || '' }); setShowBannerForm(true); };

  const saveBanner = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!bannerForm.title.trim()) { alert('Enter title'); return; }

    const payload: Banner = {
      id: editingBanner ? editingBanner.id : `bn${Date.now()}`,
      title: bannerForm.title,
      image: bannerForm.image || undefined,
      link: bannerForm.link || undefined,
      position: editingBanner ? editingBanner.position : banners.length,
      active: editingBanner ? editingBanner.active : true,
    };

    if (editingBanner) setBanners(banners.map(b => b.id === editingBanner.id ? payload : b));
    else setBanners([payload, ...banners]);
    setShowBannerForm(false);
  };

  const removeBanner = (id: string) => { if (!confirm('Delete banner?')) return; setBanners(banners.filter(b => b.id !== id)); };
  const toggleBanner = (id: string) => setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b));

  const moveBanner = (id: string, direction: 'up' | 'down') => {
    const idx = banners.findIndex(b => b.id === id);
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === banners.length - 1)) return;
    const newBanners = [...banners];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    [newBanners[idx].position, newBanners[swapIdx].position] = [newBanners[swapIdx].position, newBanners[idx].position];
    newBanners.sort((a, b) => a.position - b.position);
    setBanners(newBanners);
  };

  return (
    <div>
      <h2>Promotions & Banners</h2>
      <div style={{display:'flex',gap:8,marginBottom:16}}>
        <button onClick={() => setActiveTab('discounts')} className={activeTab === 'discounts' ? 'btn-primary' : 'btn-secondary'} style={{marginTop:16}}>💳 Discount Codes</button>
        <button onClick={() => setActiveTab('banners')} className={activeTab === 'banners' ? 'btn-primary' : 'btn-secondary'} style={{marginTop:16}}>🎨 Banners</button>
      </div>

      {activeTab === 'discounts' && (
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h3>Discount Codes</h3>
            <button className="btn-primary" onClick={openCodeCreate}>➕ New Code</button>
          </div>

          <table style={{width:'100%'}}>
            <thead>
              <tr style={{background:'#f3f4f6'}}>
                <th style={{padding:12,textAlign:'left'}}>Code</th>
                <th style={{padding:12,textAlign:'right'}}>Discount</th>
                <th style={{padding:12,textAlign:'center'}}>Uses</th>
                <th style={{padding:12,textAlign:'left'}}>Expires</th>
                <th style={{padding:12,textAlign:'center'}}>Active</th>
                <th style={{padding:12,textAlign:'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map(d => (
                <tr key={d.id} style={{borderBottom:'1px solid #e6eef8'}}>
                  <td style={{padding:12}}><strong>{d.code}</strong></td>
                  <td style={{padding:12,textAlign:'right'}}>{d.discountPercent}%</td>
                  <td style={{padding:12,textAlign:'center'}}>{d.usedCount}{d.maxUses ? `/${d.maxUses}` : ''}</td>
                  <td style={{padding:12,fontSize:13}}>{d.expiryDate || '—'}</td>
                  <td style={{padding:12,textAlign:'center'}}><input type="checkbox" checked={d.active} onChange={() => toggleCode(d.id)} /></td>
                  <td style={{padding:12,textAlign:'center'}}>
                    <button className="btn-small" onClick={() => openCodeEdit(d)}>Edit</button>
                    <button className="btn-remove" style={{marginLeft:8}} onClick={() => removeCode(d.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showCodeForm && (
            <div className="modal-overlay" onClick={() => setShowCodeForm(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>{editingCode ? 'Edit Code' : 'New Discount Code'}</h3>
                <form onSubmit={saveCode} className="form-group">
                  <input value={codeForm.code} onChange={(e) => setCodeForm({...codeForm, code: e.target.value})} placeholder="CODE (e.g., SAVE10)" required />
                  <input type="number" value={codeForm.discountPercent} onChange={(e) => setCodeForm({...codeForm, discountPercent: e.target.value})} placeholder="Discount %" min="1" max="100" required />
                  <input type="number" value={codeForm.maxUses} onChange={(e) => setCodeForm({...codeForm, maxUses: e.target.value})} placeholder="Max uses (optional)" min="1" />
                  <input type="date" value={codeForm.expiryDate} onChange={(e) => setCodeForm({...codeForm, expiryDate: e.target.value})} placeholder="Expiry date (optional)" />
                  <div className="form-actions">
                    <button className="btn-primary" type="submit">Save</button>
                    <button type="button" className="btn-secondary" onClick={() => setShowCodeForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'banners' && (
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h3>Homepage Banners</h3>
            <button className="btn-primary" onClick={openBannerCreate}>➕ New Banner</button>
          </div>

          <table style={{width:'100%'}}>
            <thead>
              <tr style={{background:'#f3f4f6'}}>
                <th style={{padding:12,textAlign:'left'}}>Title</th>
                <th style={{padding:12,textAlign:'center'}}>Image</th>
                <th style={{padding:12,textAlign:'left'}}>Link</th>
                <th style={{padding:12,textAlign:'center'}}>Position</th>
                <th style={{padding:12,textAlign:'center'}}>Active</th>
                <th style={{padding:12,textAlign:'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.sort((a, b) => a.position - b.position).map(b => (
                <tr key={b.id} style={{borderBottom:'1px solid #e6eef8'}}>
                  <td style={{padding:12}}>{b.title}</td>
                  <td style={{padding:12,textAlign:'center'}}>{b.image ? '✓' : '—'}</td>
                  <td style={{padding:12,fontSize:13,color:'#0369a1'}}>{b.link || '—'}</td>
                  <td style={{padding:12,textAlign:'center'}}>{b.position + 1}</td>
                  <td style={{padding:12,textAlign:'center'}}><input type="checkbox" checked={b.active} onChange={() => toggleBanner(b.id)} /></td>
                  <td style={{padding:12,textAlign:'center'}}>
                    <button className="btn-small" onClick={() => moveBanner(b.id, 'up')} disabled={b.position === 0} style={{opacity:b.position === 0 ? 0.5 : 1}}>↑</button>
                    <button className="btn-small" onClick={() => moveBanner(b.id, 'down')} disabled={b.position === banners.length - 1} style={{margin:'0 4px',opacity:b.position === banners.length - 1 ? 0.5 : 1}}>↓</button>
                    <button className="btn-small" onClick={() => openBannerEdit(b)}>Edit</button>
                    <button className="btn-remove" style={{marginLeft:8}} onClick={() => removeBanner(b.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showBannerForm && (
            <div className="modal-overlay" onClick={() => setShowBannerForm(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>{editingBanner ? 'Edit Banner' : 'New Banner'}</h3>
                <form onSubmit={saveBanner} className="form-group">
                  <input value={bannerForm.title} onChange={(e) => setBannerForm({...bannerForm, title: e.target.value})} placeholder="Banner title" required />
                  <input value={bannerForm.link} onChange={(e) => setBannerForm({...bannerForm, link: e.target.value})} placeholder="Link URL (optional)" />
                  <label style={{display:'block',marginTop:8,marginBottom:6}}>Banner Image (optional, JPG/PNG, &lt;5MB)</label>
                  <input type="file" accept="image/*" onChange={async (e) => {
                    const file = e.target.files && e.target.files[0];
                    if (!file) return;
                    if (!/image\/(jpeg|png|webp|gif)/.test(file.type)) { alert('Only JPG/PNG/WebP/GIF allowed'); return; }
                    if (file.size > 5 * 1024 * 1024) { alert('Image must be smaller than 5MB'); return; }
                    try {
                      setUploading(true);
                      const url = await uploadImage(file);
                      setBannerForm({...bannerForm, image: url});
                    } catch (err: any) {
                      alert('Upload failed: ' + (err?.message || err));
                    } finally { setUploading(false); }
                  }} />
                  {bannerForm.image && <img src={bannerForm.image} alt="preview" style={{width:120,height:60,objectFit:'cover',marginTop:8,borderRadius:6}} />}
                  <div className="form-actions">
                    <button className="btn-primary" type="submit" disabled={uploading}>{uploading ? 'Uploading…' : 'Save'}</button>
                    <button type="button" className="btn-secondary" onClick={() => setShowBannerForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
