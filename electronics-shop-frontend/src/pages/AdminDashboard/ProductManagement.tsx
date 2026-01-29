import React, { useState, useEffect } from 'react';
import './AdminDashboardLayout.css';
import { uploadImage } from '../../utils/imageUpload';

type Product = {
  id: string;
  name: string;
  category: string;
  brand?: string;
  price: number;
  stock: number;
  active: boolean;
  image?: string;
};

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Wireless Mouse', category: 'Accessories', brand: 'Logi', price: 25.99, stock: 45, active: true },
  { id: 'p2', name: 'Mechanical Keyboard', category: 'Accessories', brand: 'KeyPro', price: 79.99, stock: 32, active: true },
  { id: 'p3', name: 'USB-C Cable', category: 'Cables', brand: 'CableCo', price: 9.99, stock: 120, active: true },
];

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', category: '', brand: '', price: '', stock: '', image: '', customCategory: '', customBrand: '' });
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('admin_products');
    if (stored) setProducts(JSON.parse(stored));
    else setProducts(MOCK_PRODUCTS);
  }, []);

  useEffect(() => {
    const cRaw = localStorage.getItem('admin_categories');
    const bRaw = localStorage.getItem('admin_brands');
    try {
      const cs = cRaw ? JSON.parse(cRaw) : [];
      const bs = bRaw ? JSON.parse(bRaw) : [];
      setCategories(cs.map((x: any) => x.name).filter(Boolean));
      setBrands(bs.map((x: any) => x.name).filter(Boolean));
    } catch (e) {
      setCategories([]);
      setBrands([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);

  const resetForm = () => setForm({ name: '', category: '', brand: '', price: '', stock: '', image: '', customCategory: '', customBrand: '' });

  const openCreate = () => {
    resetForm();
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, category: p.category, brand: p.brand || '', price: String(p.price), stock: String(p.stock), image: p.image || '', customCategory: '', customBrand: '' });
    setShowForm(true);
  };

  const save = (e?: React.FormEvent) => {
    e?.preventDefault();
    const payload: Product = {
      id: editing ? editing.id : `p${Date.now()}`,
      name: form.name,
      category: form.category,
      brand: form.brand || undefined,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock) || 0,
      active: editing ? editing.active : true,
      image: form.image || (editing ? editing.image : undefined),
    };

    if (editing) {
      setProducts(products.map((p) => (p.id === editing.id ? payload : p)));
    } else {
      setProducts([payload, ...products]);
    }

    setShowForm(false);
  };

  const remove = (id: string) => {
    if (!confirm('Delete product? This action cannot be undone.')) return;
    setProducts(products.filter((p) => p.id !== id));
  };

  const toggleActive = (id: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Product Management</h2>
        <div>
          <button className="btn-primary" onClick={openCreate}>➕ Add Product</button>
        </div>
      </div>

      <div style={{marginTop:16}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'#f3f4f6'}}>
              <th style={{padding:12,textAlign:'left'}}>Name</th>
              <th style={{padding:12,textAlign:'left'}}>Category</th>
              <th style={{padding:12,textAlign:'left'}}>Brand</th>
              <th style={{padding:12,textAlign:'right'}}>Price</th>
              <th style={{padding:12,textAlign:'right'}}>Stock</th>
              <th style={{padding:12,textAlign:'center'}}>Active</th>
              <th style={{padding:12,textAlign:'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{borderBottom:'1px solid #e6eef8'}}>
                <td style={{padding:12, display: 'flex', alignItems: 'center', gap: 12}}>
                  {p.image ? <img src={p.image} alt={p.name} style={{width:48,height:48,objectFit:'cover',borderRadius:6}} /> : <div style={{width:48,height:48,background:'#f3f4f6',borderRadius:6}} />}
                  <span>{p.name}</span>
                </td>
                <td style={{padding:12}}>{p.category}</td>
                <td style={{padding:12}}>{p.brand}</td>
                <td style={{padding:12,textAlign:'right'}}>${p.price.toFixed(2)}</td>
                <td style={{padding:12,textAlign:'right'}}>{p.stock}</td>
                <td style={{padding:12,textAlign:'center'}}>
                  <input type="checkbox" checked={p.active} onChange={() => toggleActive(p.id)} />
                </td>
                <td style={{padding:12,textAlign:'center'}}>
                  <button className="btn-small" onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn-remove" style={{marginLeft:8}} onClick={() => remove(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={save} className="form-group">
              <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Product name" required />

              <label style={{display:'block',marginTop:6}}>Category</label>
              <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                <option value="">-- Select category --</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                <option value="__other">Other / New</option>
              </select>
              <input value={form.customCategory} onChange={(e) => setForm({...form, customCategory: e.target.value})} placeholder="Or enter new category (optional)" />

              <label style={{display:'block',marginTop:6}}>Brand (optional)</label>
              <select value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})}>
                <option value="">-- Select brand --</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                <option value="__other">Other / New</option>
              </select>
              <input value={form.customBrand} onChange={(e) => setForm({...form, customBrand: e.target.value})} placeholder="Or enter new brand (optional)" />
              <input value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} placeholder="Price" type="number" step="0.01" required />
              <input value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} placeholder="Stock quantity" type="number" required />
              <label style={{display:'block',marginTop:8,marginBottom:6}}>Image (optional, JPG/PNG, &lt;2MB)</label>
              <input type="file" accept="image/*" onChange={async (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                if (!/image\/(jpeg|png|webp|gif)/.test(file.type)) { alert('Only JPG/PNG/WebP/GIF allowed'); return; }
                if (file.size > 5 * 1024 * 1024) { alert('Image must be smaller than 5MB'); return; }
                try {
                  setUploading(true);
                  const url = await uploadImage(file);
                  setForm({...form, image: url});
                } catch (err: any) {
                  alert('Image upload failed: ' + (err?.message || err));
                } finally { setUploading(false); }
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
