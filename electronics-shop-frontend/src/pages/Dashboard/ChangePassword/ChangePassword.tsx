import React, { useState } from 'react';
import './ChangePassword.css';

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain an uppercase letter';
    } else if (!/\d/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain a number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Password changed successfully!');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="password-page">
      <div className="page-header">
        <h1>Change Password</h1>
        <p>Update your password to keep your account secure</p>
      </div>

      {message && (
        <div className="success-message">
          ✓ {message}
        </div>
      )}

      <div className="password-container">
        <form className="password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`form-input ${errors.currentPassword ? 'input-error' : ''}`}
              placeholder="Enter your current password"
              disabled={isLoading}
            />
            {errors.currentPassword && (
              <span className="error-message">{errors.currentPassword}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`form-input ${errors.newPassword ? 'input-error' : ''}`}
              placeholder="Enter your new password"
              disabled={isLoading}
            />
            {errors.newPassword && (
              <span className="error-message">{errors.newPassword}</span>
            )}
            <div className="password-requirements">
              <p>Password must contain:</p>
              <ul>
                <li className={formData.newPassword.length >= 8 ? 'valid' : ''}>
                  ✓ At least 8 characters
                </li>
                <li className={/[A-Z]/.test(formData.newPassword) ? 'valid' : ''}>
                  ✓ One uppercase letter
                </li>
                <li className={/\d/.test(formData.newPassword) ? 'valid' : ''}>
                  ✓ One number
                </li>
              </ul>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="Confirm your new password"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })}
              disabled={isLoading}
            >
              Clear
            </button>
          </div>
        </form>

        <div className="password-info">
          <div className="info-card">
            <h4>Password Security Tips</h4>
            <ul>
              <li>Use a unique password that you don't use elsewhere</li>
              <li>Include uppercase letters, numbers, and symbols</li>
              <li>Avoid using personal information (name, birthdate, etc.)</li>
              <li>Change your password regularly for better security</li>
              <li>Never share your password with anyone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
