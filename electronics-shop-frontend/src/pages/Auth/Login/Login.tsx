import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormInput } from '../../components/FormInput/FormInput';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setRememberMe(checked);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      if (rememberMe) {
        localStorage.setItem('rememberEmail', formData.email);
      }
      navigate('/');
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'Login failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back! 👋</h1>
            <p>Login to your ElectroShop account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errors.submit && <div className="form-error">{errors.submit}</div>}

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email}
              icon="📧"
              required
              autoComplete="email"
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              icon="🔒"
              required
              autoComplete="current-password"
            />

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary btn-auth"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Create one now
              </Link>
            </p>
          </div>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-buttons">
            <button className="social-btn google-btn" disabled={isLoading}>
              <span>🔵</span> Google
            </button>
            <button className="social-btn facebook-btn" disabled={isLoading}>
              <span>📘</span> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
