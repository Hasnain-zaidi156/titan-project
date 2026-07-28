import React, { useState, useEffect } from 'react';
import { Calendar, Save, Check } from 'lucide-react';

export default function TrainerAttendanceMark({ trainers, attendance, onSaveTrainerAttendance }) {
  const [date, setDate] = useState('2026-06-30');
  const [dailySheet, setDailySheet] = useState([]);
  const [alert, setAlert] = useState(null);

  // Sync state with selected date
  useEffect(() => {
    const existing = attendance.filter(a => a.date === date);
    const sheet = trainers.map(trainer => {
      const recorded = existing.find(a => a.trainerId === trainer.id);
      return {
        id: trainer.id,
        name: trainer.name,
        course: trainer.course,
        status: recorded ? recorded.status : 'Present' // Default to Present
      };
    });
    setDailySheet(sheet);
  }, [date, trainers, attendance]);

  const handleStatusChange = (id, newStatus) => {
    setDailySheet(prev => prev.map(row => 
      row.id === id ? { ...row, status: newStatus } : row
    ));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveTrainerAttendance(date, dailySheet);
    setAlert({ type: 'success', message: `Trainer attendance for ${date} saved successfully.` });
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <div>
      <div className="page-title-section">
        <h1 className="page-title">Mark Trainer Attendance</h1>
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
                  <th>Trainer ID</th>
                  <th>Trainer Name</th>
                  <th>Course Assigned</th>
                  <th style={{ textAlign: 'center' }}>Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                {dailySheet.map((trainer, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: '#0066b2' }}>{trainer.id}</td>
                    <td style={{ fontWeight: 600 }}>{trainer.name}</td>
                    <td>{trainer.course}</td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                        <label style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '6px', 
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          backgroundColor: trainer.status === 'Present' ? '#dcfce7' : '#f1f5f9',
                          color: trainer.status === 'Present' ? '#15803d' : '#475569',
                          border: `1px solid ${trainer.status === 'Present' ? '#bbf7d0' : '#cbd5e1'}`,
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}>
                          <input 
                            type="radio" 
                            name={`trainer-status-${trainer.id}`} 
                            checked={trainer.status === 'Present'}
                            onChange={() => handleStatusChange(trainer.id, 'Present')}
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
                          backgroundColor: trainer.status === 'Absent' ? '#fee2e2' : '#f1f5f9',
                          color: trainer.status === 'Absent' ? '#b91c1c' : '#475569',
                          border: `1px solid ${trainer.status === 'Absent' ? '#fca5a5' : '#cbd5e1'}`,
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}>
                          <input 
                            type="radio" 
                            name={`trainer-status-${trainer.id}`} 
                            checked={trainer.status === 'Absent'}
                            onChange={() => handleStatusChange(trainer.id, 'Absent')}
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
                          backgroundColor: trainer.status === 'Leave' ? '#fef9c3' : '#f1f5f9',
                          color: trainer.status === 'Leave' ? '#a16207' : '#475569',
                          border: `1px solid ${trainer.status === 'Leave' ? '#fef08a' : '#cbd5e1'}`,
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}>
                          <input 
                            type="radio" 
                            name={`trainer-status-${trainer.id}`} 
                            checked={trainer.status === 'Leave'}
                            onChange={() => handleStatusChange(trainer.id, 'Leave')}
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
              Save Trainer Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
