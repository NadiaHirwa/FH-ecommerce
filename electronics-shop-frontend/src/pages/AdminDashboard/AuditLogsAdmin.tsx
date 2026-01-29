import React, { useEffect, useState } from 'react';
import './AdminDashboardLayout.css';
import { getAuditLog, type AuditEntry } from '../../utils/auditLog';

export const AuditLogsAdmin: React.FC = () => {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [filter, setFilter] = useState({ action: 'all', from: '', to: '' });

  useEffect(() => {
    const auditLog = getAuditLog();
    setLogs(auditLog);
  }, []);

  const filtered = logs.filter((l) => {
    if (filter.action !== 'all' && l.action !== filter.action) return false;
    if (filter.from && new Date(l.timestamp) < new Date(filter.from)) return false;
    if (filter.to && new Date(l.timestamp) > new Date(filter.to)) return false;
    return true;
  });

  const actionLabel = (action: string): string => {
    const labels: Record<string, string> = {
      'transaction_created': 'Created',
      'transaction_edited': 'Edited',
      'transaction_refunded': 'Refunded',
      'transaction_cancelled': 'Cancelled',
    };
    return labels[action] || action;
  };

  const exportCSV = () => {
    const rows = [['Timestamp', 'Action', 'User', 'Target ID', 'Type', 'Notes']];
    filtered.forEach((l) => rows.push([
      l.timestamp,
      actionLabel(l.action),
      l.userName || '—',
      l.targetId,
      l.targetType,
      l.notes || '—',
    ]));
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Audit Logs</h2>
        <button className="btn-primary" onClick={exportCSV}>Export CSV</button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 12, alignItems: 'center' }}>
        <label>Action:
          <select value={filter.action} onChange={(e) => setFilter({ ...filter, action: e.target.value })} style={{ marginLeft: 8 }}>
            <option value="all">All</option>
            <option value="transaction_created">Created</option>
            <option value="transaction_edited">Edited</option>
            <option value="transaction_refunded">Refunded</option>
            <option value="transaction_cancelled">Cancelled</option>
          </select>
        </label>
        <label>From:
          <input type="date" value={filter.from} onChange={(e) => setFilter({ ...filter, from: e.target.value })} style={{ marginLeft: 8 }} />
        </label>
        <label>To:
          <input type="date" value={filter.to} onChange={(e) => setFilter({ ...filter, to: e.target.value })} style={{ marginLeft: 8 }} />
        </label>
      </div>

      <table style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 12, textAlign: 'left' }}>Timestamp</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Action</th>
            <th style={{ padding: 12, textAlign: 'left' }}>User</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Target ID</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Type</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((l) => (
            <tr key={l.id} style={{ borderBottom: '1px solid #e6eef8' }}>
              <td style={{ padding: 12, fontSize: 13 }}>{new Date(l.timestamp).toLocaleString()}</td>
              <td style={{ padding: 12 }}><span style={{ fontSize: 12, background: '#dbeafe', color: '#0369a1', padding: '4px 8px', borderRadius: 4 }}>{actionLabel(l.action)}</span></td>
              <td style={{ padding: 12 }}>{l.userName || '—'}</td>
              <td style={{ padding: 12, fontSize: 13 }}>{l.targetId}</td>
              <td style={{ padding: 12 }}>{l.targetType}</td>
              <td style={{ padding: 12, fontSize: 13 }}>{l.notes || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && <p style={{ marginTop: 12, color: '#6b7280' }}>No audit logs found</p>}
    </div>
  );
};

export default AuditLogsAdmin;
