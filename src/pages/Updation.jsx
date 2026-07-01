import React, { useState } from 'react';
import { Sparkles, Clipboard, Code } from 'lucide-react';

export default function Updation({ onUpdateStudentStatus }) {
  const [category, setCategory] = useState('results');
  const [rollNumbers, setRollNumbers] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [alert, setAlert] = useState(null);
  
  // Array Converter Helper State
  const [converterOpen, setConverterOpen] = useState(false);
  const [rawText, setRawText] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!rollNumbers.trim()) {
      setAlert({ type: 'error', message: 'Please enter at least one roll number.' });
      return;
    }
    if (!status) {
      setAlert({ type: 'error', message: 'Please select a status.' });
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

    // Call the parent update callback
    const updatedCount = onUpdateStudentStatus(rollList, status);
    
    setAlert({ 
      type: 'success', 
      message: `Successfully updated ${updatedCount} out of ${rollList.length} roll number(s) to "${status}".` 
    });

    // Clear form
    setRollNumbers('');
    setMessage('');
    setStatus('');
  };

  const handleConvertText = () => {
    // Convert newlines/spaces/tabs into comma separated values
    const cleaned = rawText
      .replace(/[\n\r\s\t]+/g, ',') // replace all whitespace with commas
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
        <h1 className="page-title">Updation Portal</h1>
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
          {/* Category Selector */}
          <div className="form-group">
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ fontWeight: 500 }}
            >
              <option value="results">results</option>
              <option value="registrations">registrations</option>
              <option value="admissions">admissions</option>
            </select>
          </div>

          {/* Roll Numbers */}
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Roll numbers example: 1122,1123,1124,1125"
              value={rollNumbers}
              onChange={(e) => setRollNumbers(e.target.value)}
              style={{ minHeight: '180px', fontFamily: 'monospace', fontSize: '1rem' }}
            />
          </div>

          {/* Message Textbox */}
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ minHeight: '80px' }}
            />
          </div>

          {/* Select Status */}
          <div className="form-group">
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select status</option>
              <option value="pending">pending</option>
              <option value="approved">approved</option>
              <option value="rejected">rejected</option>
              <option value="passed">passed</option>
              <option value="failed">failed</option>
              <option value="enrolled">enrolled</option>
              <option value="completed">completed</option>
            </select>
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

        {/* Link / Converter Button */}
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
            Text to Array Converter
          </button>
        </div>
      </div>

      {/* Converter Modal */}
      {converterOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clipboard size={18} style={{ color: '#0066b2' }} />
                Text to Array Converter
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
                Paste roll numbers separated by spaces, tabs, or newlines. We will format them as a comma-separated string for you.
              </p>
              <textarea
                className="form-control"
                placeholder="Paste here e.g.&#10;1122&#10;1123 1124&#10;1125"
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
