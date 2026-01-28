import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const { verifyEmail, resendOTP, user } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer, canResend]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Clear error when user types
    if (error) setError('');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpString = otp.join('');

    if (!otpString || otpString.length !== 6) {
      setError('Please enter a 6-digit verification code');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(otpString);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setResendTimer(60);
    try {
      await resendOTP();
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Verify Email 📧</h1>
            <p>Enter the 6-digit code we sent to your email</p>
          </div>

          {submitted ? (
            <>
              <div className="success-message">
                ✅ Email verified successfully!
              </div>
              <div className="info-text">
                Your email has been verified. You can now access your account.
              </div>
              <button
                onClick={() => navigate('/')}
                className="btn-primary btn-auth"
              >
                Go to Home
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="form-error">{error}</div>}

              <div className="info-text">
                {user?.email && (
                  <>
                    Verification code sent to <strong>{user.email}</strong>
                  </>
                )}
              </div>

              <div className="otp-input-group">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`otp-input ${error ? 'error' : ''}`}
                    placeholder={'-'}
                    aria-label={`Digit ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary btn-auth"
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </button>
            </form>
          )}

          <div className="resend-section">
            <p className="resend-text">Didn't receive the code?</p>
            <button
              onClick={handleResend}
              disabled={!canResend || isLoading}
              className="resend-link"
            >
              {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
