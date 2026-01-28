import React, { useState } from 'react';
import './EmployeeDashboard.css';

export const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const [showing, setShowing] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const validatePassword = (password: string) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.current || !formData.new || !formData.confirm) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return;
    }

    if (!validatePassword(formData.new)) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters with uppercase letter and number',
      });
      return;
    }

    if (formData.new !== formData.confirm) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (formData.current === formData.new) {
      setMessage({ type: 'error', text: 'New password must be different from current' });
      return;
    }

    // Simulate API call
    setMessage({ type: 'success', text: '✅ Password changed successfully!' });
    setFormData({ current: '', new: '', confirm: '' });

    setTimeout(() => setMessage(null), 3000);
  };

  const PasswordField = ({
    label,
    field,
    value,
  }: {
    label: string;
    field: 'current' | 'new' | 'confirm';
    value: string;
  }) => (
    <div className="form-field">
      <label>{label}</label>
      <div className="password-input">
        <input
          type={showing[field] ? 'text' : 'password'}
          value={value}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          placeholder={label}
        />
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setShowing({ ...showing, [field]: !showing[field] })}
        >
          {showing[field] ? '🙈' : '👁️'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="employee-page">
      <h1>Change Password</h1>

      <div className="password-form-container">
        <form onSubmit={handleSubmit} className="password-form">
          <PasswordField
            label="Current Password"
            field="current"
            value={formData.current}
          />

          <div className="divider"></div>

          <PasswordField label="New Password" field="new" value={formData.new} />

          {formData.new && (
            <div className="password-strength">
              <p className={validatePassword(formData.new) ? 'strong' : 'weak'}>
                {validatePassword(formData.new)
                  ? '✅ Strong password'
                  : '⚠️ Weak password (min 8 chars, 1 uppercase, 1 number)'}
              </p>
            </div>
          )}

          <PasswordField
            label="Confirm New Password"
            field="confirm"
            value={formData.confirm}
          />

          {formData.new && formData.confirm && (
            <div className="password-match">
              <p className={formData.new === formData.confirm ? 'match' : 'nomatch'}>
                {formData.new === formData.confirm ? '✅ Passwords match' : '❌ Passwords do not match'}
              </p>
            </div>
          )}

          {message && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              🔐 Update Password
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setFormData({ current: '', new: '', confirm: '' });
                setMessage(null);
              }}
            >
              Reset
            </button>
          </div>
        </form>

        <div className="password-tips">
          <h3>Password Requirements</h3>
          <ul>
            <li>At least 8 characters long</li>
            <li>At least one uppercase letter (A-Z)</li>
            <li>At least one number (0-9)</li>
            <li>Different from current password</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
