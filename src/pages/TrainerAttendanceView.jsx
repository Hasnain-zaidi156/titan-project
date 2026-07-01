import React, { useState } from 'react';
import { Calendar, Search } from 'lucide-react';

export default function TrainerAttendanceView({ trainers, attendance }) {
  const [filterDate, setFilterDate] = useState('2026-06-30');
  const [searchName, setSearchName] = useState('');

  const filteredLogs = attendance.filter(item => {
    const trainer = trainers.find(t => t.id === item.trainerId) || {};
    const matchesDate = filterDate ? item.date === filterDate : true;
    const matchesTrainer = searchName ? (
      item.trainerId.includes(searchName) ||
      trainer.name?.toLowerCase().includes(searchName.toLowerCase())
    ) : true;

    return matchesDate && matchesTrainer;
  });

  return (
    <div>
      <div className="page-title-section">
        <h1 className="page-title">Trainer Attendance logs</h1>
      </div>

      <div className="content-card">
        {/* Filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
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
            <label className="form-label">Search Trainer ID/Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Rizwan or T002"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '38px', color: 'var(--text-muted)' }} />
          </div>

          <button 
            className="btn btn-secondary"
            onClick={() => {
              setFilterDate('');
              setSearchName('');
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
                <th>Trainer ID</th>
                <th>Trainer Name</th>
                <th>Course Assignment</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((item, idx) => {
                  const trainer = trainers.find(t => t.id === item.trainerId) || {
                    name: 'Unknown Trainer',
                    course: 'N/A'
                  };
                  return (
                    <tr key={idx}>
                      <td>{item.date}</td>
                      <td style={{ fontWeight: 600, color: '#0066b2' }}>{item.trainerId}</td>
                      <td style={{ fontWeight: 600 }}>{trainer.name}</td>
                      <td>{trainer.course}</td>
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
                    No trainer attendance records found.
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
