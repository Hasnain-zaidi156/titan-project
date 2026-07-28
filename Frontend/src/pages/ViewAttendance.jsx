import React, { useState } from 'react';
import { Calendar, Search, ListFilter, Users } from 'lucide-react';

export default function ViewAttendance({ students, attendance }) {
  const [filterDate, setFilterDate] = useState('2026-06-30');
  const [searchRoll, setSearchRoll] = useState('');

  // Filter logs
  const filteredAttendance = attendance.filter(item => {
    const student = students.find(s => s.rollNumber === item.rollNumber) || {};
    const matchesDate = filterDate ? item.date === filterDate : true;
    const matchesRoll = searchRoll ? (
      item.rollNumber.includes(searchRoll) || 
      student.name?.toLowerCase().includes(searchRoll.toLowerCase())
    ) : true;

    return matchesDate && matchesRoll;
  });

  // Calculate statistics for the filtered logs
  const stats = filteredAttendance.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    acc.total += 1;
    return acc;
  }, { Present: 0, Absent: 0, Leave: 0, total: 0 });

  return (
    <div>
      <div className="page-title-section">
        <h1 className="page-title">Attendance History Logs</h1>
      </div>

      {/* Date Overview Stat Cards */}
      <div className="grid-3" style={{ gap: '16px', marginBottom: '24px' }}>
        <div className="content-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderLeft: '4px solid #10b981' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Present Count</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>{stats.Present}</div>
          </div>
          <span style={{ fontSize: '0.8rem', backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
            {stats.total > 0 ? Math.round((stats.Present / stats.total) * 100) : 0}%
          </span>
        </div>

        <div className="content-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderLeft: '4px solid #ef4444' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Absent Count</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>{stats.Absent}</div>
          </div>
          <span style={{ fontSize: '0.8rem', backgroundColor: '#fee2e2', color: '#b91c1c', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
            {stats.total > 0 ? Math.round((stats.Absent / stats.total) * 100) : 0}%
          </span>
        </div>

        <div className="content-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderLeft: '4px solid #eab308' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>On Leave</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#eab308' }}>{stats.Leave}</div>
          </div>
          <span style={{ fontSize: '0.8rem', backgroundColor: '#fef9c3', color: '#a16207', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
            {stats.total > 0 ? Math.round((stats.Leave / stats.total) * 100) : 0}%
          </span>
        </div>
      </div>

      <div className="content-card">
        {/* Filters control */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
          alignItems: 'flex-end'
        }}>
          <div className="form-group" style={{ flex: '1', minWidth: '200px', marginBottom: 0 }}>
            <label className="form-label">Filter Date</label>
            <input 
              type="date" 
              className="form-control" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ flex: '1', minWidth: '200px', marginBottom: 0, position: 'relative' }}>
            <label className="form-label">Search Roll/Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Sohna Khan or 822446"
              value={searchRoll}
              onChange={(e) => setSearchRoll(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '38px', color: 'var(--text-muted)' }} />
          </div>

          <button 
            className="btn btn-secondary"
            onClick={() => {
              setFilterDate('');
              setSearchRoll('');
            }}
            style={{ height: '42px' }}
          >
            Reset Filters
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((item, idx) => {
                  const student = students.find(s => s.rollNumber === item.rollNumber) || {
                    name: 'Unknown Student',
                    course: 'N/A'
                  };
                  return (
                    <tr key={idx}>
                      <td>{item.date}</td>
                      <td>#{item.rollNumber}</td>
                      <td style={{ fontWeight: 600 }}>{student.name}</td>
                      <td>{student.course}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: 
                            item.status === 'Present' ? '#dcfce7' : 
                            item.status === 'Absent' ? '#fee2e2' : '#fef9c3',
                          color: 
                            item.status === 'Present' ? '#15803d' : 
                            item.status === 'Absent' ? '#b91c1c' : '#a16207'
                        }}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No attendance records found for the selected query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
