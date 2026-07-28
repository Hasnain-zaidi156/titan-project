import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

import * as api from './api';

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
import Profile from './pages/Profile';

export default function App() {
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Global backend-backed states
  const [students, setStudents] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [trainerAttendance, setTrainerAttendance] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [studentsData, trainersData, attendanceData, trainerAttendanceData] = await Promise.all([
          api.fetchStudents(),
          api.fetchTrainers(),
          api.fetchAttendance(),
          api.fetchTrainerAttendance()
        ]);

        setStudents(studentsData);
        setTrainers(trainersData);
        setAttendance(attendanceData);
        setTrainerAttendance(trainerAttendanceData);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Authentication handlers
  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Student State handlers
  const handleAddStudent = async (newStudent) => {
    try {
      const savedStudent = await api.addStudent(newStudent);
      setStudents(prev => [savedStudent, ...prev]);
    } catch (error) {
      console.error('Failed to add student:', error);
      alert(error.message);
    }
  };

  const handleEditStudent = async (rollNumber, updatedFields) => {
    try {
      const updatedStudent = await api.updateStudent(rollNumber, updatedFields);
      setStudents(prev => prev.map(s => s.rollNumber === rollNumber ? updatedStudent : s));
    } catch (error) {
      console.error('Failed to update student:', error);
      alert(error.message);
    }
  };

  const handleDeleteStudent = async (rollNumber) => {
    try {
      await api.deleteStudent(rollNumber);
      setStudents(prev => prev.filter(s => s.rollNumber !== rollNumber));
    } catch (error) {
      console.error('Failed to delete student:', error);
      alert(error.message);
    }
  };

  // Attendance State handlers
  const handleSaveAttendance = async (date, sheet) => {
    const records = sheet.map(s => ({ rollNumber: s.rollNumber, status: s.status }));
    try {
      const saved = await api.saveAttendance(date, records);
      setAttendance(prev => {
        const filtered = prev.filter(a => a.date !== date);
        return [...filtered, ...saved];
      });
    } catch (error) {
      console.error('Failed to save attendance:', error);
      alert(error.message);
    }
  };

  const handleAddMultiAttendance = async (rollList, date) => {
    try {
      const saved = await api.saveMultiAttendance(date, rollList);
      setAttendance(prev => {
        const cleaned = prev.filter(a => !(a.date === date && rollList.includes(a.rollNumber)));
        return [...cleaned, ...saved];
      });
      return saved.length;
    } catch (error) {
      console.error('Failed to mark multi attendance:', error);
      alert(error.message);
      return 0;
    }
  };

  // Trainer State handlers
  const handleAddTrainer = async (newTrainer) => {
    try {
      const savedTrainer = await api.addTrainer(newTrainer);
      setTrainers(prev => [savedTrainer, ...prev]);
    } catch (error) {
      console.error('Failed to add trainer:', error);
      alert(error.message);
    }
  };

  const handleDeleteTrainer = async (id) => {
    try {
      await api.deleteTrainer(id);
      setTrainers(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete trainer:', error);
      alert(error.message);
    }
  };

  const handleSaveTrainerAttendance = async (date, sheet) => {
    const records = sheet.map(t => ({ trainerId: t.id, status: t.status }));
    try {
      const saved = await api.saveTrainerAttendance(date, records);
      setTrainerAttendance(prev => {
        const filtered = prev.filter(a => a.date !== date);
        return [...filtered, ...saved];
      });
    } catch (error) {
      console.error('Failed to save trainer attendance:', error);
      alert(error.message);
    }
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
