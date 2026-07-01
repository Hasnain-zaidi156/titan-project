import React, { useState } from 'react';
import { Search, Plus, UserPlus, Mail, Phone, MapPin, XCircle } from 'lucide-react';

export default function Trainers({ trainers, onAddTrainer, onDeleteTrainer }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('Web & Mobile App Development');
  const [city, setCity] = useState('Sukkur');
  const [campus, setCampus] = useState('Saylani TITAN Sukkur Campus');

  const filteredTrainers = trainers.filter(trainer => 
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = `T00${trainers.length + 1}`;
    onAddTrainer({
      id,
      name,
      email,
      phone,
      course,
      city,
      campus
    });
    setIsModalOpen(false);
    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div>
      <div className="page-title-section">
        <h1 className="page-title">Active Trainers</h1>
      </div>

      <div className="content-card">
        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '360px' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by name, email, course..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '38px', height: '42px' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          </div>

          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ height: '42px' }}>
            <UserPlus size={18} />
            Add Trainer
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Trainer ID</th>
                <th>Trainer Name</th>
                <th>Contact Details</th>
                <th>Course Assignment</th>
                <th>City & Campus</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainers.length > 0 ? (
                filteredTrainers.map((trainer, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: '#0066b2' }}>{trainer.id}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{trainer.name}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <Mail size={12} /> {trainer.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <Phone size={12} /> {trainer.phone}
                      </div>
                    </td>
                    <td>{trainer.course}</td>
                    <td>
                      <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{trainer.city}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{trainer.campus}</div>
                    </td>
                    <td>
                      <button 
                        className="action-icon-btn delete" 
                        title="Delete Trainer Profile"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to remove trainer ${trainer.name}?`)) {
                            onDeleteTrainer(trainer.id);
                          }
                        }}
                      >
                        <XCircle size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No trainer registrations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Trainer Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h3 className="modal-title">Register New Trainer Profile</h3>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Trainer Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Course Assigned</label>
                    <select 
                      className="form-control" 
                      value={course} 
                      onChange={(e) => setCourse(e.target.value)}
                    >
                      <option value="Web & Mobile App Development">Web & Mobile App Development</option>
                      <option value="Graphic Designing">Graphic Designing</option>
                      <option value="Python Programming">Python Programming</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Islamic Jurisprudence & IT">Islamic Jurisprudence & IT</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">City Location</label>
                    <select 
                      className="form-control" 
                      value={city} 
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="Sukkur">Sukkur</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Islamabad">Islamabad</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Campus Branch</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={campus} 
                      onChange={(e) => setCampus(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#0066b2' }}>
                  Register Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
