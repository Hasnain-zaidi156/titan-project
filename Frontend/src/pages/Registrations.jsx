import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Eye, 
  Edit, 
  Printer, 
  SlidersHorizontal, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight,
  UserCheck,
  CheckCircle,
  XCircle,
  DollarSign
} from 'lucide-react';

export default function Registrations({ students, onAddStudent, onEditStudent, onDeleteStudent }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [courseFilter, setCourseFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Add/Edit Student modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStudentRoll, setSelectedStudentRoll] = useState(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('Domestic Electrician');
  const [status, setStatus] = useState('PENDING');
  const [paymentStatus, setPaymentStatus] = useState('NOT GENERATED');

  // Detailed view modal state
  const [viewStudent, setViewStudent] = useState(null);

  // Filter and search logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.includes(searchQuery) ||
      student.cnic.includes(searchQuery) ||
      student.fatherName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse = courseFilter ? student.course === courseFilter : true;
    const matchesStatus = statusFilter ? student.status === statusFilter.toUpperCase() : true;
    const matchesPayment = paymentFilter ? student.paymentStatus === paymentFilter.toUpperCase() : true;

    return matchesSearch && matchesCourse && matchesStatus && matchesPayment;
  });

  // Pagination math
  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + pageSize);

  const resetForm = () => {
    setName('');
    setFatherName('');
    setCnic('');
    setPhone('');
    setCourse('Domestic Electrician');
    setStatus('PENDING');
    setPaymentStatus('NOT GENERATED');
  };

  const handleOpenAddModal = () => {
    resetForm();
    isEditMode && setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setSelectedStudentRoll(student.rollNumber);
    setName(student.name);
    setFatherName(student.fatherName);
    setCnic(student.cnic);
    setPhone(student.phone);
    setCourse(student.course);
    setStatus(student.status);
    setPaymentStatus(student.paymentStatus);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      onEditStudent(selectedStudentRoll, {
        name,
        fatherName,
        cnic,
        phone,
        course,
        status,
        paymentStatus
      });
    } else {
      // Auto-generate roll number
      const rollNumber = String(Math.floor(100000 + Math.random() * 900000));
      onAddStudent({
        rollNumber,
        name,
        fatherName,
        cnic,
        phone,
        course,
        status,
        paymentStatus
      });
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleExport = () => {
    // Generate CSV data from filtered students list
    const headers = 'Roll Number,Student Name,Father Name,CNIC,Phone,Course,Status,Payment Status\n';
    const rows = filteredStudents.map(s => 
      `"${s.rollNumber}","${s.name}","${s.fatherName}","${s.cnic}","${s.phone}","${s.course}","${s.status}","${s.paymentStatus}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePaymentStatus = (rollNumber) => {
    const student = students.find(s => s.rollNumber === rollNumber);
    if (student) {
      const nextPay = student.paymentStatus === 'GENERATED' ? 'NOT GENERATED' : 'GENERATED';
      onEditStudent(rollNumber, { paymentStatus: nextPay });
    }
  };

  // List of courses for filters & select fields
  const coursesList = [
    'Domestic Electrician',
    'Web & Mobile App Development',
    'Graphic Designing',
    'Python Programming',
    'Video Editing'
  ];

  return (
    <div>
      <div className="page-title-section">
        <h1 className="page-title">Student Registrations</h1>
      </div>

      <div className="content-card">
        {/* Controls row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '20px'
        }}>
          {/* Print/Download helper */}
          <button 
            className="action-icon-btn" 
            style={{ border: '1px solid var(--border)', padding: '10px', borderRadius: '6px' }}
            onClick={window.print}
            title="Print List"
          >
            <Printer size={18} />
          </button>

          {/* Expand Filters toggle */}
          <button 
            className={`btn ${showFilters ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setShowFilters(!showFilters)}
            style={{ height: '42px' }}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          {/* Search box */}
          <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '300px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search roll/name/CNIC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '38px', height: '42px' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          </div>

          <button className="btn btn-primary" onClick={handleExport} style={{ height: '42px' }}>
            <Download size={18} />
            Export
          </button>

          <button className="btn btn-primary" onClick={handleOpenAddModal} style={{ height: '42px', backgroundColor: '#0066b2' }}>
            <Plus size={18} />
            Add new
          </button>
        </div>

        {/* Collapsible filter options */}
        {showFilters && (
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div className="grid-3" style={{ gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Course</label>
                <select className="form-control" value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
                  <option value="">All Courses</option>
                  {coursesList.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Status</label>
                <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="">All Statuses</option>
                  <option value="pending">PENDING</option>
                  <option value="approved">APPROVED</option>
                  <option value="rejected">REJECTED</option>
                  <option value="enrolled">ENROLLED</option>
                  <option value="completed">COMPLETED</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Payment Status</label>
                <select className="form-control" value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
                  <option value="">All Payments</option>
                  <option value="generated">GENERATED</option>
                  <option value="not generated">NOT GENERATED</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setCourseFilter('');
                  setStatusFilter('');
                  setPaymentFilter('');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Table View */}
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student name</th>
                <th>Father name</th>
                <th>CNIC</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Status</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{student.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Roll: {student.rollNumber}</div>
                    </td>
                    <td>{student.fatherName}</td>
                    <td>{student.cnic}</td>
                    <td>{student.phone}</td>
                    <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={student.course}>
                      {student.course}
                    </td>
                    <td>
                      <span className={`status-badge ${student.status.toLowerCase()}`}>
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${student.paymentStatus.toLowerCase().replace(' ', '-')}`}>
                        {student.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <div className="action-btn-group">
                        <button 
                          className="action-icon-btn" 
                          title="View student details"
                          onClick={() => setViewStudent(student)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="action-icon-btn" 
                          title="Edit student"
                          onClick={() => handleOpenEditModal(student)}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="action-icon-btn" 
                          title="Toggle Payment Status"
                          onClick={() => togglePaymentStatus(student.rollNumber)}
                        >
                          <CreditCard size={16} />
                        </button>
                        <button 
                          className="action-icon-btn delete" 
                          title="Delete Registration"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${student.name}'s registration?`)) {
                              onDeleteStudent(student.rollNumber);
                            }
                          }}
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No registrations found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
        <div className="pagination-container">
          <span>
            {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} of {totalItems} items
          </span>
          
          <button 
            className="page-btn" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button 
            className="page-btn" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>

          <select 
            className="form-control" 
            value={pageSize} 
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{ width: '100px', height: '32px', padding: '2px 8px', fontSize: '0.85rem' }}
          >
            <option value="5">5 / page</option>
            <option value="10">10 / page</option>
            <option value="20">20 / page</option>
            <option value="50">50 / page</option>
          </select>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h3 className="modal-title">
                  {isEditMode ? `Edit Registration (#${selectedStudentRoll})` : 'Add New Student Registration'}
                </h3>
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
                    <label className="form-label">Student Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Father Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={fatherName} 
                      onChange={(e) => setFatherName(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">CNIC Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. 4210112345678"
                      value={cnic} 
                      onChange={(e) => setCnic(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. 03001234567"
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Course Program</label>
                  <select className="form-control" value={course} onChange={(e) => setCourse(e.target.value)}>
                    {coursesList.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Registration Status</label>
                    <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="REJECTED">REJECTED</option>
                      <option value="ENROLLED">ENROLLED</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Payment Status</label>
                    <select className="form-control" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                      <option value="NOT GENERATED">NOT GENERATED</option>
                      <option value="GENERATED">GENERATED</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#0066b2' }}>
                  {isEditMode ? 'Save Changes' : 'Register Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewStudent && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Registration Details</h3>
              <button 
                onClick={() => setViewStudent(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <div className="modal-body" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Roll Number</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0066b2' }}>#{viewStudent.rollNumber}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Student Name</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>{viewStudent.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Father Name</div>
                  <div style={{ fontSize: '1rem' }}>{viewStudent.fatherName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>CNIC Number</div>
                  <div style={{ fontSize: '1rem', fontFamily: 'monospace' }}>{viewStudent.cnic}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Phone Number</div>
                  <div style={{ fontSize: '1rem' }}>{viewStudent.phone}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Course Program</div>
                  <div style={{ fontSize: '1rem', fontWeight: 500, color: '#475569' }}>{viewStudent.course}</div>
                </div>
                <div className="grid-2">
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '4px' }}>Status</div>
                    <span className={`status-badge ${viewStudent.status.toLowerCase()}`}>{viewStudent.status}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '4px' }}>Payment Status</div>
                    <span className={`status-badge ${viewStudent.paymentStatus.toLowerCase().replace(' ', '-')}`}>{viewStudent.paymentStatus}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setViewStudent(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
