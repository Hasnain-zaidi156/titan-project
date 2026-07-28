import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clipboard } from 'lucide-react';

export default function MultiAttendance({ students, onAddMultiAttendance }) {
  const [date, setDate] = useState('2026-06-05');
  const [rollNumbers, setRollNumbers] = useState('');
  const [alert, setAlert] = useState(null);
  
  // Converter helper
  const [converterOpen, setConverterOpen] = useState(false);
  const [rawText, setRawText] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!date) {
      setAlert({ type: 'error', message: 'Please select a date.' });
      return;
    }
    if (!rollNumbers.trim()) {
      setAlert({ type: 'error', message: 'Please enter at least one roll number.' });
      return;
    }

    // Split and clean roll numbers
    const rollList = rollNumbers
      .split(',')
      .map(num => num.trim())
      .filter(num => num.length > 0);

    if (rollList.length === 0) {
      setAlert({ type: 'error', message: 'No valid roll numbers found.' });
      return;
    }

    // Update global state
    const markedCount = onAddMultiAttendance(rollList, date);

    setAlert({
      type: 'success',
      message: `Successfully marked ${markedCount} out of ${rollList.length} roll number(s) as Present on ${date}.`
    });

    setRollNumbers('');
  };

  const handleConvertText = () => {
    const cleaned = rawText
      .replace(/[\n\r\s\t]+/g, ',')
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0)
      .join(',');
    
    setRollNumbers(cleaned);
    setConverterOpen(false);
    setRawText('');
  };

  return (
    <div>
      <div className="page-title-section">
        <h1 className="page-title">Multi Attendance Updation</h1>
      </div>

      {alert && (
        <div style={{
          backgroundColor: alert.type === 'error' ? '#fee2e2' : '#dcfce7',
          color: alert.type === 'error' ? '#b91c1c' : '#15803d',
          padding: '14px',
          borderRadius: '6px',
          fontSize: '0.9rem',
          marginBottom: '20px',
          border: `1px solid ${alert.type === 'error' ? '#fca5a5' : '#bbf7d0'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{alert.message}</span>
          <button 
            onClick={() => setAlert(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'inherit' }}
          >
            ×
          </button>
        </div>
      )}

      <div className="content-card">
        <form onSubmit={handleUpdate}>
          {/* Date Picker */}
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">Select Attendance Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Roll Numbers */}
          <div className="form-group">
            <label className="form-label">Roll Numbers</label>
            <textarea
              className="form-control"
              placeholder="Roll numbers example: 1122,1123,1124,1125"
              value={rollNumbers}
              onChange={(e) => setRollNumbers(e.target.value)}
              style={{ minHeight: '200px', fontFamily: 'monospace', fontSize: '1rem' }}
              required
            />
          </div>

          {/* UPDATE Button */}
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}
          >
            UPDATE
          </button>
        </form>

        {/* Link / Converter helper */}
        <div style={{ marginTop: '16px', textAlign: 'left', fontSize: '0.85rem', color: '#64748b' }}>
          Use this link for comma separated values:{' '}
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setConverterOpen(true)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#0066b2', 
              textDecoration: 'underline', 
              cursor: 'pointer', 
              padding: '0', 
              fontSize: 'inherit',
              fontWeight: 500
            }}
          >
            https://arraythis.com
          </button>
        </div>
      </div>

      {/* Converter Helper Modal */}
      {converterOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clipboard size={18} style={{ color: '#0066b2' }} />
                Convert text to comma-separated
              </h3>
              <button 
                onClick={() => setConverterOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '12px' }}>
                Paste roll numbers separated by spaces or newlines. We will clean them and format them as commas.
              </p>
              <textarea
                className="form-control"
                placeholder="e.g.&#10;1122&#10;1123&#10;1124"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                style={{ minHeight: '140px', fontFamily: 'monospace' }}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setConverterOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConvertText}>
                Convert & Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
