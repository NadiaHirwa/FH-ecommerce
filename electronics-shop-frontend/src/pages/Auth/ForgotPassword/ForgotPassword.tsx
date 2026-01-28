import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormInput } from '../../../components/FormInput/FormInput';
import { useAuth } from '../../../context/AuthContext';
import '../Auth.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { sendResetLink } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      await sendResetLink(email);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Reset Password 🔐</h1>
            <p>We'll help you recover your account</p>
          </div>

          {submitted ? (
            <>
              <div className="success-message">
                ✅ Check your email for reset instructions!
              </div>
              <div className="info-text">
                We've sent a password reset link to <strong>{email}</strong>. 
                The link will expire in 1 hour. If you don't see the email, check your spam folder.
              </div>
              <button
                onClick={() => navigate('/login')}
                className="btn-primary btn-auth"
              >
                Back to Login
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="form-error">{error}</div>}

              <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="you@example.com"
                error={error}
                icon="📧"
                required
                autoComplete="email"
              />

              <div className="info-text">
                Enter the email address associated with your account, and we'll send you instructions to reset your password.
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary btn-auth"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <div className="auth-footer">
            <p>
              Remember your password?{' '}
              <Link to="/login" className="auth-link">
                Login instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
