import React from 'react';
import { Users, UserCheck, Clock, Award } from 'lucide-react';

export default function Dashboard({ students, trainers, attendance }) {
  const totalStudents = students.length;
  const totalTrainers = trainers.length;
  
  // Calculate attendance rate
  const today = "2026-06-30";
  const todayAttendance = attendance.filter(a => a.date === today);
  const presentToday = todayAttendance.filter(a => a.status === 'Present').length;
  const attendanceRate = todayAttendance.length > 0 
    ? Math.round((presentToday / todayAttendance.length) * 100) 
    : 0;

  const pendingApprovals = students.filter(s => s.status === 'PENDING').length;

  return (
    <div>
      <div className="page-title-section">
        <h1 className="page-title">Dashboard Overview</h1>
        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
          System Date: <strong>June 30, 2026</strong>
        </div>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div className="content-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
          <div style={{ backgroundColor: 'rgba(0, 102, 178, 0.1)', color: '#0066b2', padding: '12px', borderRadius: '10px' }}>
            <Users size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Total Students</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{totalStudents}</div>
          </div>
        </div>

        <div className="content-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
          <div style={{ backgroundColor: 'rgba(139, 197, 63, 0.15)', color: '#7ab332', padding: '12px', borderRadius: '10px' }}>
            <UserCheck size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Active Trainers</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{totalTrainers}</div>
          </div>
        </div>

        <div className="content-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
          <div style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '12px', borderRadius: '10px' }}>
            <Clock size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Today's Attendance Rate</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{attendanceRate}%</div>
          </div>
        </div>

        <div className="content-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
          <div style={{ backgroundColor: 'rgba(234, 88, 12, 0.1)', color: '#ea580c', padding: '12px', borderRadius: '10px' }}>
            <Award size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Pending Approvals</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{pendingApprovals}</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="content-card">
          <h3 style={{ marginBottom: '16px', fontWeight: 600, color: '#1e293b' }}>Quick System Links</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <a href="/registrations" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>View Registrations</a>
            <a href="/attendance/mark" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>Mark Attendance</a>
            <a href="/updation" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>Update Results/Status</a>
            <a href="/profile" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>View Profile Permissions</a>
          </div>
        </div>

        <div className="content-card">
          <h3 style={{ marginBottom: '16px', fontWeight: 600, color: '#1e293b' }}>Recent Students Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {students.slice(0, 3).map((student, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#334155' }}>{student.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{student.course} • Roll: #{student.rollNumber}</div>
                </div>
                <div>
                  <span className={`status-badge ${student.status.toLowerCase()}`}>{student.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
