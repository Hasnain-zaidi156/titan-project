import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  UserSquare2,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LogOut
} from 'lucide-react';

export default function Sidebar({ user, onLogout, collapsed, toggleCollapsed }) {
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
        {/* Titan Logo */}
        <img src="/titan-logo.jpg" alt="Titan Logo" style={{ width: '48px', height: '48px', objectFit: 'contain', flexShrink: 0 }} />
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
