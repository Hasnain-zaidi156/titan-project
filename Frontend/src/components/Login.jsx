import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN'); // Default to ADMIN to match Super Admin mockup
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const demoAccounts = [
    { email: 'drzaidi156@gmail.com', role: 'ADMIN', label: 'Super Admin' },
    { email: 'suk.smit@gmail.com', role: 'RECEPTIONIST', label: 'Receptionist' },
    { email: 'trainer@smit.com', role: 'TRAINER', label: 'Trainer' },
    { email: 'student@smit.com', role: 'STUDENT', label: 'Student' }
  ];

  const handleDemoClick = (acc) => {
    setEmail(acc.email);
    setPassword('smit1234');
    setRole(acc.role);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Determine login role from selected role or default
    onLogin({ email, role });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Redesigned Logo Section */}
        <div className="login-logo">
          <img src="/titan-logo.jpg" alt="Titan Logo" style={{ width: '84px', height: '84px', objectFit: 'contain' }} />
          <div className="login-title-top" style={{ marginTop: '16px' }}>
            TITAN ADMIN
          </div>
          <h2 className="login-title">Admin Portal</h2>
          <p className="login-subtitle">Sign in to manage your campus</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '20px',
            border: '1.5px solid #fca5a5',
            fontWeight: 500
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field with Icon */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b' }}>Email Address</label>
            <div className="input-with-icon-wrapper">
              <span className="input-icon">
                <Mail size={18} />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="drzaidi156@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field with Icon and Toggle */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b' }}>Password</label>
            <div className="input-with-icon-wrapper">
              <span className="input-icon">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="login-form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#/forgot-password" className="forgot-password-link" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="btn-signin">
            SIGN IN
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          TITAN Institute © 2026 — Secure Admin Access
        </div>
      </div>

      {/* Styled Quick Demo Logins outside the main card */}
      <div style={{ marginTop: '24px', width: '100%', maxWidth: '450px' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1.5px dashed var(--accent)',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--primary)',
            marginBottom: '12px',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={14} color="var(--accent)" /> Quick Demo Logins
          </div>
          <div className="demo-btn-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {demoAccounts.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                className="demo-account-btn"
                onClick={() => handleDemoClick(acc)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <strong style={{ fontSize: '0.8rem', color: '#1e293b' }}>{acc.label}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
                  {acc.email}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
