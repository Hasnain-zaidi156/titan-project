import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  LayoutDashboard,
  Users,
  CheckSquare,
  Shield,
  UserSquare2,
  RefreshCw,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LogOut,
  UserCheck,
  Clock,
  Award,
  Search,
  Plus,
  Download,
  Edit,
  Printer,
  SlidersHorizontal,
  CreditCard,
  XCircle,
  Save,
  Clipboard,
  UserPlus,
  Phone,
  Globe,
  MapPin,
  School,
  ShieldAlert,
  Building2,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

/* ============================================================
   MOCK DATA
   ============================================================ */

export const INITIAL_STUDENTS = [
  {
    rollNumber: "822446",
    name: "Sohna Khan",
    fatherName: "Bagan Khan",
    cnic: "5320292472197",
    phone: "03063737485",
    course: "Domestic Electrician",
    status: "PENDING",
    paymentStatus: "NOT GENERATED"
  },
  {
    rollNumber: "822447",
    name: "Ali Ahmed",
    fatherName: "Ahmed Shah",
    cnic: "4210192348573",
    phone: "03124567890",
    course: "Web & Mobile App Development",
    status: "APPROVED",
    paymentStatus: "GENERATED"
  },
  {
    rollNumber: "822448",
    name: "Ayesha Bibi",
    fatherName: "Muhammad Khan",
    cnic: "3410183748592",
    phone: "03338573920",
    course: "Graphic Designing",
    status: "ENROLLED",
    paymentStatus: "GENERATED"
  },
  {
    rollNumber: "822449",
    name: "Bilal Raza",
    fatherName: "Raza Ali",
    cnic: "4220194857361",
    phone: "03451122334",
    course: "Python Programming",
    status: "COMPLETED",
    paymentStatus: "GENERATED"
  },
  {
    rollNumber: "822450",
    name: "Fatima Noor",
    fatherName: "Noor Alam",
    cnic: "3740591283746",
    phone: "03219876543",
    course: "Video Editing",
    status: "REJECTED",
    paymentStatus: "NOT GENERATED"
  }
];

export const INITIAL_TRAINERS = [
  {
    id: "T001",
    name: "Ishaq Bhojani",
    email: "ishaq@saylani.org",
    phone: "03214567890",
    course: "Web & Mobile App Development",
    city: "Karachi",
    campus: "Saylani Gulshan Campus"
  },
  {
    id: "T002",
    name: "Mufti Bashir Ahmed",
    email: "mufti.bashir@saylani.org",
    phone: "03334567890",
    course: "Islamic Jurisprudence & IT",
    city: "Sukkur",
    campus: "Saylani TITAN Sukkur Campus"
  },
  {
    id: "T003",
    name: "Rizwan Khan",
    email: "rizwan@saylani.org",
    phone: "03454567890",
    course: "Graphic Designing",
    city: "Sukkur",
    campus: "Saylani TITAN Sukkur Campus"
  }
];

export const ROLE_PERMISSIONS = {
  RECEPTIONIST: {
    email: "suk.smit@gmail.com",
    country: "Pakistan",
    city: "Sukkur",
    campus: "Saylani TITAN Sukkur Campus",
    permissions: [
      { name: "ATTENDANCE_VIEW", actions: ["READ", "WRITE"] },
      { name: "ATTENDANCE_MARK", actions: ["READ", "UPDATE", "WRITE"] },
      { name: "ATTENDANCE_ADD_MULTI", actions: ["READ", "WRITE", "UPDATE"] },
      { name: "STUDENT", actions: ["READ", "WRITE", "UPDATE"] },
      { name: "TRAINER", actions: ["READ"] },
      { name: "TRAINER_ATTENDANCE_MARK", actions: ["READ", "WRITE", "UPDATE"] },
      { name: "TRAINER_ATTENDANCE_VIEW", actions: ["READ", "WRITE"] }
    ]
  },
  ADMIN: {
    email: "admin@smit.com",
    country: "Pakistan",
    city: "Karachi",
    campus: "Saylani Head Office",
    permissions: [
      { name: "DASHBOARD", actions: ["READ", "WRITE", "UPDATE", "DELETE"] },
      { name: "ATTENDANCE_VIEW", actions: ["READ", "WRITE", "UPDATE", "DELETE"] },
      { name: "ATTENDANCE_MARK", actions: ["READ", "UPDATE", "WRITE", "DELETE"] },
      { name: "ATTENDANCE_ADD_MULTI", actions: ["READ", "WRITE", "UPDATE", "DELETE"] },
      { name: "STUDENT", actions: ["READ", "WRITE", "UPDATE", "DELETE"] },
      { name: "TRAINER", actions: ["READ", "WRITE", "UPDATE", "DELETE"] },
      { name: "TRAINER_ATTENDANCE_MARK", actions: ["READ", "WRITE", "UPDATE", "DELETE"] },
      { name: "TRAINER_ATTENDANCE_VIEW", actions: ["READ", "WRITE", "UPDATE", "DELETE"] }
    ]
  },
  TRAINER: {
    email: "trainer@smit.com",
    country: "Pakistan",
    city: "Sukkur",
    campus: "Saylani TITAN Sukkur Campus",
    permissions: [
      { name: "ATTENDANCE_VIEW", actions: ["READ"] },
      { name: "ATTENDANCE_MARK", actions: ["READ", "WRITE"] },
      { name: "STUDENT", actions: ["READ"] }
    ]
  },
  STUDENT: {
    email: "student@smit.com",
    country: "Pakistan",
    city: "Sukkur",
    campus: "Saylani TITAN Sukkur Campus",
    permissions: [
      { name: "ATTENDANCE_VIEW", actions: ["READ"] }
    ]
  }
};

export const INITIAL_ATTENDANCE = [
  {
    date: "2026-06-30",
    rollNumber: "822446",
    status: "Present"
  },
  {
    date: "2026-06-30",
    rollNumber: "822447",
    status: "Present"
  },
  {
    date: "2026-06-30",
    rollNumber: "822448",
    status: "Leave"
  },
  {
    date: "2026-06-30",
    rollNumber: "822449",
    status: "Present"
  },
  {
    date: "2026-06-30",
    rollNumber: "822450",
    status: "Absent"
  }
];

export const INITIAL_TRAINER_ATTENDANCE = [
  {
    date: "2026-06-30",
    trainerId: "T001",
    status: "Present"
  },
  {
    date: "2026-06-30",
    trainerId: "T002",
    status: "Present"
  },
  {
    date: "2026-06-30",
    trainerId: "T003",
    status: "Absent"
  }
];

/* ============================================================
   LOGIN COMPONENT
   ============================================================ */

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN'); // Default to ADMIN to match Super Admin mockup
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const demoAccounts = [
    { email: 'drzaidi156@gmail.com', role: 'ADMIN', label: 'Super Admin' },
    { email: 'suk.smit@gmail.com', role: 'RECEPTIONIST', label: 'Receptionist' },
    { email: 'trainer@smit.com', role: 'TRAINER', label: 'Trainer' },
    { email: 'student@smit.com', role: 'STUDENT', label: 'Student' }
  ];

  const handleDemoClick = (acc) => {
    setEmail(acc.email);
    setPassword('smit1234');
    setRole(acc.role);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Determine login role from selected role or default
    onLogin({ email, role });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Redesigned Logo Section */}
        <div className="login-logo">
          <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Gold Medallion */}
            <circle cx="50" cy="50" r="42" stroke="#d4af37" strokeWidth="4" fill="#ffffff" />
            <circle cx="50" cy="50" r="37" stroke="#d4af37" strokeWidth="1" />

            {/* Inner Navy Shield */}
            <path d="M50 22 L66 28 V46 C66 58 50 68 50 68 C50 68 34 58 34 46 V28 L50 22 Z" fill="#122f6d" stroke="#d4af37" strokeWidth="1.5" />

            {/* Crown/Castle symbol representing institutional excellence */}
            <path d="M42 34 H58 V39 H54 V37 H46 V39 H42 V34 Z" fill="#d4af37" />
            <path d="M44 42 H56 V48 L50 53 L44 48 V42 Z" fill="#ffffff" />
            <rect x="49" y="44" width="2" height="5" fill="#122f6d" />

            {/* Small Stars */}
            <circle cx="50" cy="60" r="1.5" fill="#d4af37" />
            <circle cx="45" cy="59" r="1.2" fill="#d4af37" />
            <circle cx="55" cy="59" r="1.2" fill="#d4af37" />
          </svg>
          <div className="login-title-top" style={{ marginTop: '16px' }}>
            TITAN INSTITUTE
          </div>
          <h2 className="login-title">Admin Portal</h2>
          <p className="login-subtitle">Sign in to manage your campus</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '20px',
            border: '1.5px solid #fca5a5',
            fontWeight: 500
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field with Icon */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b' }}>Email Address</label>
            <div className="input-with-icon-wrapper">
              <span className="input-icon">
                <Mail size={18} />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="drzaidi156@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field with Icon and Toggle */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700, color: '#1e293b' }}>Password</label>
            <div className="input-with-icon-wrapper">
              <span className="input-icon">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="login-form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#/forgot-password" className="forgot-password-link" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="btn-signin">
            SIGN IN
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          TITAN Institute © 2026 — Secure Admin Access
        </div>
      </div>

      {/* Styled Quick Demo Logins outside the main card */}
      <div style={{ marginTop: '24px', width: '100%', maxWidth: '450px' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1.5px dashed var(--accent)',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--primary)',
            marginBottom: '12px',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={14} color="var(--accent)" /> Quick Demo Logins
          </div>
          <div className="demo-btn-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {demoAccounts.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                className="demo-account-btn"
                onClick={() => handleDemoClick(acc)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <strong style={{ fontSize: '0.8rem', color: '#1e293b' }}>{acc.label}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
                  {acc.email}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SIDEBAR COMPONENT
   ============================================================ */

function Sidebar({ user, onLogout, collapsed, toggleCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Track open menus for dropdown lists
  const [openMenus, setOpenMenus] = useState({
    attendance: false,
    trainers: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path) => location.pathname === path;

  // Reusable sub-menu item checker
  const isSubActive = (paths) => paths.some(path => location.pathname === path);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{ position: 'relative' }}>

      {/* Sidebar Toggle Collapser button on the right border */}
      <button
        className="sidebar-toggle-badge"
        onClick={toggleCollapsed}
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo Container */}
      <div className="sidebar-logo-container">
        {/* Custom inline-SVG logo for TITAN inside sidebar */}
        <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          {/* Outer Gold Ring */}
          <circle cx="50" cy="50" r="42" stroke="#d4af37" strokeWidth="4" fill="none" />
          <circle cx="50" cy="50" r="37" stroke="#d4af37" strokeWidth="1" />

          {/* Shield Outline in Gold */}
          <path d="M50 22 L66 28 V46 C66 58 50 68 50 68 C50 68 34 58 34 46 V28 L50 22 Z" fill="#d4af37" />

          {/* Inner details in White/Navy */}
          <path d="M44 42 H56 V48 L50 53 L44 48 V42 Z" fill="#122f6d" />
          <rect x="49" y="44" width="2" height="5" fill="#d4af37" />
          <circle cx="50" cy="60" r="1.5" fill="#122f6d" />
        </svg>
        {!collapsed && (
          <div className="logo-text-img" style={{ marginTop: '8px' }}>
            TITAN
            <span>ADMIN PORTAL</span>
          </div>
        )}
      </div>

      <ul className="sidebar-menu">
        {/* Dashboard */}
        <li className="menu-item-wrapper">
          <div
            className={`menu-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => handleNavigate('/dashboard')}
          >
            <LayoutDashboard size={18} />
            {!collapsed && <span>Dashboard</span>}
          </div>
        </li>

        {/* Students */}
        <li className="menu-item-wrapper">
          <div
            className={`menu-link ${isActive('/registrations') ? 'active' : ''}`}
            onClick={() => handleNavigate('/registrations')}
          >
            <Users size={18} />
            {!collapsed && <span>Students</span>}
          </div>
        </li>

        {/* Attendance (Dropdown or Link) */}
        <li className="menu-item-wrapper">
          <div
            className={`menu-link ${isSubActive(['/attendance/mark', '/attendance/view', '/attendance/multi']) ? 'active' : ''}`}
            onClick={() => {
              if (collapsed) {
                handleNavigate('/attendance/mark');
              } else {
                toggleMenu('attendance');
              }
            }}
          >
            <CheckSquare size={18} />
            {!collapsed && (
              <>
                <span>Attendance</span>
                <ChevronDown
                  size={14}
                  className={`menu-link-chevron ${openMenus.attendance ? 'open' : ''}`}
                  style={{ marginLeft: 'auto' }}
                />
              </>
            )}
          </div>
          {openMenus.attendance && (!collapsed) && (
            <ul className="submenu-list" style={{ marginTop: '4px', borderRadius: '6px', overflow: 'hidden' }}>
              <li
                className={`submenu-link ${isActive('/attendance/mark') ? 'active' : ''}`}
                onClick={() => handleNavigate('/attendance/mark')}
              >
                Mark Attendance
              </li>
              <li
                className={`submenu-link ${isActive('/attendance/view') ? 'active' : ''}`}
                onClick={() => handleNavigate('/attendance/view')}
              >
                View Attendance
              </li>
              <li
                className={`submenu-link ${isActive('/attendance/multi') ? 'active' : ''}`}
                onClick={() => handleNavigate('/attendance/multi')}
              >
                Multi Attendance
              </li>
            </ul>
          )}
        </li>

        {/* Administration */}
        <li className="menu-item-wrapper">
          <div
            className={`menu-link ${isActive('/administration') ? 'active' : ''}`}
            onClick={() => handleNavigate('/administration')}
          >
            <Shield size={18} />
            {!collapsed && <span>Administration</span>}
          </div>
        </li>

        {/* Trainers (Dropdown or Link) */}
        <li className="menu-item-wrapper">
          <div
            className={`menu-link ${isSubActive(['/trainers', '/trainers/attendance/mark', '/trainers/attendance/view']) ? 'active' : ''}`}
            onClick={() => {
              if (collapsed) {
                handleNavigate('/trainers');
              } else {
                toggleMenu('trainers');
              }
            }}
          >
            <UserSquare2 size={18} />
            {!collapsed && (
              <>
                <span>Trainers</span>
                <ChevronDown
                  size={14}
                  className={`menu-link-chevron ${openMenus.trainers ? 'open' : ''}`}
                  style={{ marginLeft: 'auto' }}
                />
              </>
            )}
          </div>
          {openMenus.trainers && (!collapsed) && (
            <ul className="submenu-list" style={{ marginTop: '4px', borderRadius: '6px', overflow: 'hidden' }}>
              <li
                className={`submenu-link ${isActive('/trainers') ? 'active' : ''}`}
                onClick={() => handleNavigate('/trainers')}
              >
                Trainers
              </li>
              <li
                className={`submenu-link ${isActive('/trainers/attendance/mark') ? 'active' : ''}`}
                onClick={() => handleNavigate('/trainers/attendance/mark')}
              >
                Mark Attendance
              </li>
              <li
                className={`submenu-link ${isActive('/trainers/attendance/view') ? 'active' : ''}`}
                onClick={() => handleNavigate('/trainers/attendance/view')}
              >
                View Attendance
              </li>
            </ul>
          )}
        </li>

        {/* Updation */}
        <li className="menu-item-wrapper">
          <div
            className={`menu-link ${isActive('/updation') ? 'active' : ''}`}
            onClick={() => handleNavigate('/updation')}
          >
            <RefreshCw size={18} />
            {!collapsed && <span>Updation</span>}
          </div>
        </li>

        {/* Profile */}
        <li className="menu-item-wrapper">
          <div
            className={`menu-link ${isActive('/profile') ? 'active' : ''}`}
            onClick={() => handleNavigate('/profile')}
          >
            <User size={18} />
            {!collapsed && <span>Profile</span>}
          </div>
        </li>
      </ul>

      {/* Logout button at bottom - styled to match Screenshot 2 */}
      <div style={{ marginTop: 'auto', padding: '20px 12px' }}>
        <button
          onClick={onLogout}
          className="btn-sidebar-logout"
          title="Logout from Portal"
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD PAGE
   ============================================================ */

function Dashboard({ students, trainers, attendance }) {
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

/* ============================================================
   REGISTRATIONS PAGE
   ============================================================ */

function Registrations({ students, onAddStudent, onEditStudent, onDeleteStudent }) {
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

/* ============================================================
   MARK ATTENDANCE PAGE
   ============================================================ */

function MarkAttendance({ students, attendance, onSaveAttendance }) {
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

/* ============================================================
   VIEW ATTENDANCE PAGE
   ============================================================ */

function ViewAttendance({ students, attendance }) {
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

/* ============================================================
   MULTI ATTENDANCE PAGE
   ============================================================ */

function MultiAttendance({ students, onAddMultiAttendance }) {
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

/* ============================================================
   TRAINERS PAGE
   ============================================================ */

function Trainers({ trainers, onAddTrainer, onDeleteTrainer }) {
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

/* ============================================================
   TRAINER ATTENDANCE MARK PAGE
   ============================================================ */

function TrainerAttendanceMark({ trainers, attendance, onSaveTrainerAttendance }) {
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

/* ============================================================
   TRAINER ATTENDANCE VIEW PAGE
   ============================================================ */

function TrainerAttendanceView({ trainers, attendance }) {
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

/* ============================================================
   UPDATION PAGE
   ============================================================ */

function Updation({ onUpdateStudentStatus }) {
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

/* ============================================================
   PROFILE PAGE
   ============================================================ */

function Profile({ user, onLogout }) {
  const profileDetails = ROLE_PERMISSIONS[user.role] || {
    email: user.email,
    country: 'Pakistan',
    city: 'Sukkur',
    campus: 'Saylani TITAN Sukkur Campus',
    permissions: []
  };

  return (
    <div>
      <div className="content-card" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontWeight: 600 }}>
            <User size={22} style={{ color: '#0066b2' }} />
            Profile Information
          </h2>
          <button
            className="btn btn-primary"
            onClick={onLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="profile-meta-grid">
          <div className="profile-meta-item">
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Email</span>
            <span style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>{profileDetails.email}</span>
          </div>

          <div className="profile-meta-item">
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Role</span>
            <div>
              <span className="badge-role">{user.role}</span>
            </div>
          </div>
        </div>

        <div className="profile-meta-grid" style={{ marginTop: '0', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
          <div className="profile-meta-item">
            <span className="profile-meta-label">
              <Globe size={14} /> Country
            </span>
            <span className="profile-meta-value">{profileDetails.country}</span>
          </div>

          <div className="profile-meta-item">
            <span className="profile-meta-label">
              <MapPin size={14} /> City
            </span>
            <span className="profile-meta-value">{profileDetails.city}</span>
          </div>

          <div className="profile-meta-item">
            <span className="profile-meta-label">
              <School size={14} /> Campus
            </span>
            <span className="profile-meta-value">{profileDetails.campus}</span>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h3 className="permission-section-title">
            <ShieldAlert size={20} style={{ color: '#a855f7' }} />
            Permissions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {profileDetails.permissions.length > 0 ? (
              profileDetails.permissions.map((perm, idx) => (
                <div className="permission-row" key={idx}>
                  <span className="permission-name">{perm.name}</span>
                  <div className="permission-badges">
                    {perm.actions.map((act, aIdx) => (
                      <span className="badge-purple" key={aIdx}>{act}</span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '16px', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                No custom permission privileges assigned.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ADMINISTRATION PAGE
   ============================================================ */

function Administration() {
  const [campuses] = useState([
    { id: 1, name: 'Sukkur Campus', code: 'SUK', status: 'Active', departments: 4 },
    { id: 2, name: 'Karachi Bahadurabad Campus', code: 'KHI-BHD', status: 'Active', departments: 8 },
    { id: 3, name: 'Lahore Gulberg Campus', code: 'LHR-GLB', status: 'Active', departments: 5 },
    { id: 4, name: 'Islamabad Campus', code: 'ISB', status: 'Maintenance', departments: 3 }
  ]);

  const [courses] = useState([
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

/* ============================================================
   MAIN APP (SUB-ADMIN)
   ============================================================ */

export default function SubAdmin() {
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Global Mock States
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [trainers, setTrainers] = useState(INITIAL_TRAINERS);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [trainerAttendance, setTrainerAttendance] = useState(INITIAL_TRAINER_ATTENDANCE);

  // Authentication handlers
  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Student State handlers
  const handleAddStudent = (newStudent) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleEditStudent = (rollNumber, updatedFields) => {
    setStudents(prev => prev.map(s =>
      s.rollNumber === rollNumber ? { ...s, ...updatedFields } : s
    ));
  };

  const handleDeleteStudent = (rollNumber) => {
    setStudents(prev => prev.filter(s => s.rollNumber !== rollNumber));
  };

  const handleUpdateStudentStatus = (rollList, newStatus) => {
    let count = 0;
    setStudents(prev => prev.map(s => {
      if (rollList.includes(s.rollNumber)) {
        count++;
        return { ...s, status: newStatus.toUpperCase() };
      }
      return s;
    }));
    return count;
  };

  // Attendance State handlers
  const handleSaveAttendance = (date, sheet) => {
    setAttendance(prev => {
      // Filter out existing logs for this date
      const filtered = prev.filter(a => a.date !== date);
      // Map sheet items into logs format
      const newLogs = sheet.map(s => ({
        date,
        rollNumber: s.rollNumber,
        status: s.status
      }));
      return [...filtered, ...newLogs];
    });
  };

  const handleAddMultiAttendance = (rollList, date) => {
    let count = 0;
    setAttendance(prev => {
      // Filter out existing records for these rolls on this date
      const cleaned = prev.filter(a => !(a.date === date && rollList.includes(a.rollNumber)));

      const newRecords = [];
      rollList.forEach(roll => {
        const studentExists = students.some(s => s.rollNumber === roll);
        if (studentExists) {
          count++;
          newRecords.push({
            date,
            rollNumber: roll,
            status: 'Present'
          });
        }
      });

      return [...cleaned, ...newRecords];
    });
    return count;
  };

  // Trainer State handlers
  const handleAddTrainer = (newTrainer) => {
    setTrainers(prev => [newTrainer, ...prev]);
  };

  const handleDeleteTrainer = (id) => {
    setTrainers(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveTrainerAttendance = (date, sheet) => {
    setTrainerAttendance(prev => {
      const filtered = prev.filter(a => a.date !== date);
      const newLogs = sheet.map(t => ({
        date,
        trainerId: t.id,
        status: t.status
      }));
      return [...filtered, ...newLogs];
    });
  };

  // If not logged in, render Login page
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app-wrapper">
        <Sidebar
          user={user}
          onLogout={handleLogout}
          collapsed={sidebarCollapsed}
          toggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="main-content">
          <header className="top-header">
            <button
              className="menu-toggle-btn"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title="Toggle Sidebar"
            >
              <Menu size={22} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', fontWeight: 600 }}>Active Workspace</span>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>
                  {user.role === 'ADMIN' ? 'All Campuses Administration' : 'Sukkur Campus Office'}
                </div>
              </div>
            </div>
          </header>

          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard students={students} trainers={trainers} attendance={attendance} />}
            />
            <Route
              path="/registrations"
              element={
                <Registrations
                  students={students}
                  onAddStudent={handleAddStudent}
                  onEditStudent={handleEditStudent}
                  onDeleteStudent={handleDeleteStudent}
                />
              }
            />
            <Route
              path="/attendance/mark"
              element={
                <MarkAttendance
                  students={students}
                  attendance={attendance}
                  onSaveAttendance={handleSaveAttendance}
                />
              }
            />
            <Route
              path="/attendance/view"
              element={<ViewAttendance students={students} attendance={attendance} />}
            />
            <Route
              path="/attendance/multi"
              element={
                <MultiAttendance
                  students={students}
                  onAddMultiAttendance={handleAddMultiAttendance}
                />
              }
            />
            <Route
              path="/administration"
              element={<Administration />}
            />
            <Route
              path="/trainers"
              element={
                <Trainers
                  trainers={trainers}
                  onAddTrainer={handleAddTrainer}
                  onDeleteTrainer={handleDeleteTrainer}
                />
              }
            />
            <Route
              path="/trainers/attendance/mark"
              element={
                <TrainerAttendanceMark
                  trainers={trainers}
                  attendance={trainerAttendance}
                  onSaveTrainerAttendance={handleSaveTrainerAttendance}
                />
              }
            />
            <Route
              path="/trainers/attendance/view"
              element={<TrainerAttendanceView trainers={trainers} attendance={trainerAttendance} />}
            />
            <Route
              path="/updation"
              element={<Updation onUpdateStudentStatus={handleUpdateStudentStatus} />}
            />
            <Route
              path="/profile"
              element={<Profile user={user} onLogout={handleLogout} />}
            />
            {/* Fallback routing */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
