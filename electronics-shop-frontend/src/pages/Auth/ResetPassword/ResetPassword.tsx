import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormInput } from '../../components/FormInput/FormInput';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuth();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const token = searchParams.get('token') || '';

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await resetPassword(token, formData.password);
      setSubmitted(true);
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to reset password' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="form-error">Invalid or expired reset link</div>
            <button
              onClick={() => navigate('/forgot-password')}
              className="btn-primary btn-auth"
            >
              Request New Reset Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create New Password 🔑</h1>
            <p>Enter your new password below</p>
          </div>

          {submitted ? (
            <>
              <div className="success-message">
                ✅ Password updated successfully!
              </div>
              <div className="info-text">
                Your password has been reset. You can now login with your new password.
              </div>
              <button
                onClick={() => navigate('/login')}
                className="btn-primary btn-auth"
              >
                Go to Login
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              {errors.submit && <div className="form-error">{errors.submit}</div>}

              <FormInput
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.password}
                icon="🔒"
                required
                autoComplete="new-password"
              />

              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.confirmPassword}
                icon="🔒"
                required
                autoComplete="new-password"
              />

              <div className="info-text">
                Password must be at least 8 characters and contain an uppercase letter and a number.
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary btn-auth"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
