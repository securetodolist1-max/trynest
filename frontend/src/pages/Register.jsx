import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/Auth.css';

export default function Register() {
  const [step, setStep] = useState('register'); // 'register' or 'verify-otp'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/register', { name, email, password });
      setStep('verify-otp');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/verify-otp', { email, code: otp });
      alert('Email verified! You can now login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {step === 'register' ? (
          <>
            <h1>📝 Create Account</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </form>
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </>
        ) : (
          <>
            <h1>🔐 Verify Email</h1>
            <p style={{ textAlign: 'center', color: '#666' }}>
              We sent a 6-digit OTP to <strong>{email}</strong>
            </p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label>OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
            <p style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setStep('register')}
                className="link-button"
              >
                ← Back to Registration
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
