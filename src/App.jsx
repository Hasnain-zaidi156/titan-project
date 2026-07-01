import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

// Data Imports
import { 
  INITIAL_STUDENTS, 
  INITIAL_TRAINERS, 
  INITIAL_ATTENDANCE, 
  INITIAL_TRAINER_ATTENDANCE 
} from './data/mockData';

// Component Imports
import Login from './components/Login';
import Sidebar from './components/Sidebar';

// Page Imports
import Dashboard from './pages/Dashboard';
import Registrations from './pages/Registrations';
import MarkAttendance from './pages/MarkAttendance';
import ViewAttendance from './pages/ViewAttendance';
import MultiAttendance from './pages/MultiAttendance';
import Trainers from './pages/Trainers';
import TrainerAttendanceMark from './pages/TrainerAttendanceMark';
import TrainerAttendanceView from './pages/TrainerAttendanceView';
import Updation from './pages/Updation';
import Profile from './pages/Profile';

export default function App() {
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
