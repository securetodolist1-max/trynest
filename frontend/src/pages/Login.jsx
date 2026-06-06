import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [requiresOtp, setRequiresOtp] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      
      // Check if response indicates admin (direct login)
      if (res.data.access_token && res.data.user && res.data.user.role === 'ADMIN') {
        // Admin direct login - no OTP needed
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        alert(`Welcome back, Admin ${res.data.user.name}!`);
        navigate('/dashboard');
      } else if (res.data.requiresLoginOTP) {
        // Regular user - OTP required
        setRequiresOtp(true);
        setIsAdmin(false);
        setError('');
      } else if (res.data.access_token) {
        // Fallback: if access token is present, user is authenticated
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        alert(`Welcome back, ${res.data.user.name}!`);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setRequiresOtp(false);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/verify-login-otp', { email, code: otp });
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert(`Welcome back, ${res.data.user.name}!`);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {!requiresOtp ? (
          <>
            <h1>🔐 Login</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  disabled={loading}
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <p>
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </>
        ) : (
          <>
            <h1>🔐 Verify OTP</h1>
            <p>An OTP code has been sent to <strong>{email}</strong></p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleOtpVerify}>
              <div className="form-group">
                <label>Enter OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength="6"
                  required
                  disabled={loading}
                  className="otp-input"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setRequiresOtp(false);
                  setOtp('');
                  setError('');
                }}
                className="btn-secondary"
              >
                Back to Login
              </button>
            </form>
            <p style={{ fontSize: '0.9em', color: '#999' }}>
              Check your email for the OTP code
            </p>
          </>
        )}
      </div>
    </div>
  );
}
