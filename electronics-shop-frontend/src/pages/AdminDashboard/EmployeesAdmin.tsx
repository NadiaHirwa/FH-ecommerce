import React, { useEffect, useState } from 'react';
import './AdminDashboardLayout.css';

type Employee = {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'manager' | 'supervisor';
  active: boolean;
  dateJoined: string;
};

export const EmployeesAdmin: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'employee' as 'employee' | 'manager' | 'supervisor' });

  useEffect(() => {
    const e = localStorage.getItem('admin_employees');
    setEmployees(e ? JSON.parse(e) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('admin_employees', JSON.stringify(employees));
  }, [employees]);

  const reset = () => setForm({ name: '', email: '', role: 'employee' });
  const openCreate = () => { reset(); setEditing(null); setShowForm(true); };
  const openEdit = (e: Employee) => { setEditing(e); setForm({ name: e.name, email: e.email, role: e.role as 'employee' | 'manager' | 'supervisor' }); setShowForm(true); };

  const save = (e?: React.FormEvent) => {
    e?.preventDefault();
    const payload: Employee = { id: editing ? editing.id : `emp${Date.now()}`, name: form.name, email: form.email, role: form.role as any, active: editing ? editing.active : true, dateJoined: editing ? editing.dateJoined : new Date().toISOString().slice(0,10) };
    if (editing) setEmployees(employees.map(x => x.id === editing.id ? payload : x)); else setEmployees([payload, ...employees]);
    setShowForm(false);
  };

  const remove = (id: string) => { if (!confirm('Remove employee?')) return; setEmployees(employees.filter(e => e.id !== id)); };
  const toggle = (id: string) => setEmployees(employees.map(e => e.id === id ? { ...e, active: !e.active } : e));

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Employee Management</h2>
        <button className="btn-primary" onClick={openCreate}>➕ Add Employee</button>
      </div>

      <table style={{width:'100%',marginTop:16}}>
        <thead>
          <tr style={{background:'#f3f4f6'}}>
            <th style={{padding:12,textAlign:'left'}}>Name</th>
            <th style={{padding:12,textAlign:'left'}}>Email</th>
            <th style={{padding:12,textAlign:'left'}}>Role</th>
            <th style={{padding:12,textAlign:'center'}}>Status</th>
            <th style={{padding:12,textAlign:'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.id} style={{borderBottom:'1px solid #e6eef8'}}>
              <td style={{padding:12}}>{e.name}</td>
              <td style={{padding:12,fontSize:13}}>{e.email}</td>
              <td style={{padding:12}}>
                <span style={{padding:'4px 8px',borderRadius:4,fontSize:12,background:'#dbeafe'}}>
                  {e.role.charAt(0).toUpperCase() + e.role.slice(1)}
                </span>
              </td>
              <td style={{padding:12,textAlign:'center'}}>
                <input type="checkbox" checked={e.active} onChange={() => toggle(e.id)} />
              </td>
              <td style={{padding:12,textAlign:'center'}}>
                <button className="btn-small" onClick={() => openEdit(e)}>Edit</button>
                <button className="btn-remove" style={{marginLeft:8}} onClick={() => remove(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editing ? 'Edit Employee' : 'Add Employee'}</h3>
            <form onSubmit={save} className="form-group">
              <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Full name" required />
              <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="Email" required />
              <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value as any})}>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="supervisor">Supervisor</option>
              </select>
              <div className="form-actions">
                <button className="btn-primary" type="submit">Save</button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
