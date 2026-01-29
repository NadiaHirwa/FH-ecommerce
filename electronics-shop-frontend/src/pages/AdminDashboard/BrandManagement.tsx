import React, { useEffect, useState } from 'react';
import './AdminDashboardLayout.css';
import { uploadImage } from '../../utils/imageUpload';

type Brand = {
  id: string;
  name: string;
  slug?: string;
  active: boolean;
  image?: string;
};

export const BrandManagement: React.FC = () => {
  const [items, setItems] = useState<Brand[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', image: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('admin_brands');
    if (stored) setItems(JSON.parse(stored));
    else setItems([]);
  }, []);

  useEffect(() => {
    localStorage.setItem('admin_brands', JSON.stringify(items));
  }, [items]);

  const reset = () => setForm({ name: '', slug: '', image: '' });

  const openCreate = () => { reset(); setEditing(null); setShowForm(true); };
  const openEdit = (c: Brand) => { setEditing(c); setForm({ name: c.name, slug: c.slug || '', image: c.image || ''}); setShowForm(true); };

  const save = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const payload: Brand = { id: editing ? editing.id : `b${Date.now()}`, name: form.name, slug: form.slug || undefined, active: editing ? editing.active : true, image: form.image || (editing ? editing.image : undefined) };
    if (editing) setItems(items.map(i => i.id === editing.id ? payload : i)); else setItems([payload, ...items]);
    setShowForm(false);
  };

  const remove = (id: string) => { if (!confirm('Delete brand?')) return; setItems(items.filter(i => i.id !== id)); };
  const toggle = (id: string) => setItems(items.map(i => i.id === id ? { ...i, active: !i.active } : i));

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Brand Management</h2>
        <button className="btn-primary" onClick={openCreate}>➕ Add Brand</button>
      </div>

      <div style={{marginTop:16}}>
        <table style={{width:'100%'}}>
          <thead>
            <tr style={{background:'#f3f4f6'}}>
              <th style={{padding:12,textAlign:'left'}}>Name</th>
              <th style={{padding:12,textAlign:'left'}}>Slug</th>
              <th style={{padding:12,textAlign:'center'}}>Active</th>
              <th style={{padding:12,textAlign:'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} style={{borderBottom:'1px solid #e6eef8'}}>
                <td style={{padding:12,display:'flex',alignItems:'center',gap:12}}>
                  {i.image ? <img src={i.image} alt={i.name} style={{width:48,height:48,objectFit:'cover',borderRadius:6}}/> : <div style={{width:48,height:48,background:'#f3f4f6',borderRadius:6}}/>}
                  <span>{i.name}</span>
                </td>
                <td style={{padding:12}}>{i.slug}</td>
                <td style={{padding:12,textAlign:'center'}}><input type="checkbox" checked={i.active} onChange={() => toggle(i.id)}/></td>
                <td style={{padding:12,textAlign:'center'}}>
                  <button className="btn-small" onClick={() => openEdit(i)}>Edit</button>
                  <button className="btn-remove" style={{marginLeft:8}} onClick={() => remove(i.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editing ? 'Edit Brand' : 'Add Brand'}</h3>
            <form onSubmit={save} className="form-group">
              <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Name" required/>
              <input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} placeholder="Slug (optional)" />
              <label style={{display:'block',marginTop:8,marginBottom:6}}>Image (optional, JPG/PNG, &lt;2MB)</label>
              <input type="file" accept="image/*" onChange={async (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                if (!/image\/(jpeg|png|webp|gif)/.test(file.type)) { alert('Only JPG/PNG/WebP/GIF allowed'); return; }
                if (file.size > 5 * 1024 * 1024) { alert('Image must be smaller than 5MB'); return; }
                try { setUploading(true); const url = await uploadImage(file); setForm({...form, image: url}); } catch (err: any) { alert('Upload failed: ' + (err?.message || err)); } finally { setUploading(false); }
              }} />
              {form.image && <img src={form.image} alt="preview" style={{width:80,height:80,objectFit:'cover',marginTop:8,borderRadius:6}} />}
              <div className="form-actions">
                <button className="btn-primary" type="submit" disabled={uploading}>{uploading ? 'Uploading…' : 'Save'}</button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
