import React, { useState } from 'react';
import { Building2, BookOpen, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Administration() {
  const [campuses, setCampuses] = useState([
    { id: 1, name: 'Sukkur Campus', code: 'SUK', status: 'Active', departments: 4 },
    { id: 2, name: 'Karachi Bahadurabad Campus', code: 'KHI-BHD', status: 'Active', departments: 8 },
    { id: 3, name: 'Lahore Gulberg Campus', code: 'LHR-GLB', status: 'Active', departments: 5 },
    { id: 4, name: 'Islamabad Campus', code: 'ISB', status: 'Maintenance', departments: 3 }
  ]);

  const [courses, setCourses] = useState([
    { id: 1, name: 'Web & Mobile App Development', duration: '1 Year', status: 'Active' },
    { id: 2, name: 'Graphic Design & Video Editing', duration: '6 Months', status: 'Active' },
    { id: 3, name: 'Python & Artificial Intelligence', duration: '1 Year', status: 'Active' },
    { id: 4, name: 'Cyber Security Essentials', duration: '6 Months', status: 'Active' }
  ]);

  return (
    <div>
      <div className="page-title-section">
        <h1 className="page-title">Administration Console</h1>
        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Portal Settings & Campus Directory
        </div>
      </div>

      <div className="grid-2">
        {/* Campus Management */}
        <div className="content-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '8px', borderRadius: '8px' }}>
              <Building2 size={22} />
            </div>
            <h3 style={{ fontWeight: 600, color: 'var(--primary)' }}>Campus Configurations</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {campuses.map(campus => (
              <div key={campus.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#334155' }}>{campus.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Code: {campus.code} • {campus.departments} Departments</div>
                </div>
                <div>
                  <span className={`status-badge ${campus.status === 'Active' ? 'approved' : 'pending'}`}>{campus.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Directory */}
        <div className="content-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'var(--accent-light)', color: '#bda032', padding: '8px', borderRadius: '8px' }}>
              <BookOpen size={22} />
            </div>
            <h3 style={{ fontWeight: 600, color: 'var(--primary)' }}>Academic Courses</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {courses.map(course => (
              <div key={course.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#334155' }}>{course.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Duration: {course.duration}</div>
                </div>
                <div>
                  <span className="status-badge approved">{course.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Settings Overview */}
      <div className="content-card" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <ShieldCheck size={22} color="var(--primary)" />
          <h3 style={{ fontWeight: 600, color: 'var(--primary)' }}>System Role Management & Permissions</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
          Role-based administration controls are active. Access levels are strictly monitored for compliance. You are currently logged in as a Super Admin and have read/write access to all campus data, enrollment lists, and attendance worksheets.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary btn-sm">Manage Admin Roles</button>
          <button className="btn btn-secondary btn-sm">Audit System Logs</button>
        </div>
      </div>
    </div>
  );
}
