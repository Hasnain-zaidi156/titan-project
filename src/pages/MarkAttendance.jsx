import React, { useState, useEffect } from 'react';
import { Calendar, Save, Check, X, AlertTriangle } from 'lucide-react';

export default function MarkAttendance({ students, attendance, onSaveAttendance }) {
  const [date, setDate] = useState('2026-06-30');
  const [dailySheet, setDailySheet] = useState([]);
  const [alert, setAlert] = useState(null);

  // Load attendance if already marked for this date, otherwise default to Present
  useEffect(() => {
    const existing = attendance.filter(a => a.date === date);
    const sheet = students.map(student => {
      const recorded = existing.find(a => a.rollNumber === student.rollNumber);
      return {
        rollNumber: student.rollNumber,
        name: student.name,
        course: student.course,
        status: recorded ? recorded.status : 'Present' // Default to Present
      };
    });
    setDailySheet(sheet);
  }, [date, students, attendance]);

  const handleStatusChange = (rollNumber, newStatus) => {
    setDailySheet(prev => prev.map(row => 
      row.rollNumber === rollNumber ? { ...row, status: newStatus } : row
    ));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveAttendance(date, dailySheet);
    setAlert({ type: 'success', message: `Attendance for ${date} has been saved successfully.` });
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <div>
      <div className="page-title-section">
        <h1 className="page-title">Mark Daily Attendance</h1>
      </div>

      {alert && (
        <div style={{
          backgroundColor: '#dcfce7',
          color: '#15803d',
          padding: '14px',
          borderRadius: '6px',
          fontSize: '0.9rem',
          marginBottom: '20px',
          border: '1px solid #bbf7d0'
        }}>
          {alert.message}
        </div>
      )}

      <div className="content-card">
        <form onSubmit={handleSave}>
          <div className="form-group" style={{ maxWidth: '300px', marginBottom: '24px' }}>
            <label className="form-label">Attendance Date</label>
            <input 
              type="date" 
              className="form-control" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th style={{ textAlign: 'center' }}>Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                {dailySheet.map((student, idx) => (
                  <tr key={idx}>
                    <td>#{student.rollNumber}</td>
                    <td style={{ fontWeight: 600 }}>{student.name}</td>
                    <td>{student.course}</td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                        <label style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '6px', 
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          backgroundColor: student.status === 'Present' ? '#dcfce7' : '#f1f5f9',
                          color: student.status === 'Present' ? '#15803d' : '#475569',
                          border: `1px solid ${student.status === 'Present' ? '#bbf7d0' : '#cbd5e1'}`,
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}>
                          <input 
                            type="radio" 
                            name={`status-${student.rollNumber}`} 
                            checked={student.status === 'Present'}
                            onChange={() => handleStatusChange(student.rollNumber, 'Present')}
                            style={{ display: 'none' }}
                          />
                          Present
                        </label>

                        <label style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '6px', 
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          backgroundColor: student.status === 'Absent' ? '#fee2e2' : '#f1f5f9',
                          color: student.status === 'Absent' ? '#b91c1c' : '#475569',
                          border: `1px solid ${student.status === 'Absent' ? '#fca5a5' : '#cbd5e1'}`,
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}>
                          <input 
                            type="radio" 
                            name={`status-${student.rollNumber}`} 
                            checked={student.status === 'Absent'}
                            onChange={() => handleStatusChange(student.rollNumber, 'Absent')}
                            style={{ display: 'none' }}
                          />
                          Absent
                        </label>

                        <label style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '6px', 
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          backgroundColor: student.status === 'Leave' ? '#fef9c3' : '#f1f5f9',
                          color: student.status === 'Leave' ? '#a16207' : '#475569',
                          border: `1px solid ${student.status === 'Leave' ? '#fef08a' : '#cbd5e1'}`,
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}>
                          <input 
                            type="radio" 
                            name={`status-${student.rollNumber}`} 
                            checked={student.status === 'Leave'}
                            onChange={() => handleStatusChange(student.rollNumber, 'Leave')}
                            style={{ display: 'none' }}
                          />
                          Leave
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px', fontWeight: 600 }}>
              <Save size={18} />
              Save Attendance Sheet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
