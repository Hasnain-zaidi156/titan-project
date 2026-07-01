import React from 'react';
import { ROLE_PERMISSIONS } from '../data/mockData';
import { User, Globe, MapPin, School, ShieldAlert, LogOut } from 'lucide-react';

export default function Profile({ user, onLogout }) {
  const profileDetails = ROLE_PERMISSIONS[user.role] || {
    email: user.email,
    country: 'Pakistan',
    city: 'Sukkur',
    campus: 'Saylani TITAN Sukkur Campus',
    permissions: []
  };

  return (
    <div>
      <div className="content-card" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontWeight: 600 }}>
            <User size={22} style={{ color: '#0066b2' }} />
            Profile Information
          </h2>
          <button 
            className="btn btn-primary" 
            onClick={onLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="profile-meta-grid">
          <div className="profile-meta-item">
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Email</span>
            <span style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>{profileDetails.email}</span>
          </div>

          <div className="profile-meta-item">
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Role</span>
            <div>
              <span className="badge-role">{user.role}</span>
            </div>
          </div>
        </div>

        <div className="profile-meta-grid" style={{ marginTop: '0', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
          <div className="profile-meta-item">
            <span className="profile-meta-label">
              <Globe size={14} /> Country
            </span>
            <span className="profile-meta-value">{profileDetails.country}</span>
          </div>

          <div className="profile-meta-item">
            <span className="profile-meta-label">
              <MapPin size={14} /> City
            </span>
            <span className="profile-meta-value">{profileDetails.city}</span>
          </div>

          <div className="profile-meta-item">
            <span className="profile-meta-label">
              <School size={14} /> Campus
            </span>
            <span className="profile-meta-value">{profileDetails.campus}</span>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h3 className="permission-section-title">
            <ShieldAlert size={20} style={{ color: '#a855f7' }} />
            Permissions
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {profileDetails.permissions.length > 0 ? (
              profileDetails.permissions.map((perm, idx) => (
                <div className="permission-row" key={idx}>
                  <span className="permission-name">{perm.name}</span>
                  <div className="permission-badges">
                    {perm.actions.map((act, aIdx) => (
                      <span className="badge-purple" key={aIdx}>{act}</span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '16px', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                No custom permission privileges assigned.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
