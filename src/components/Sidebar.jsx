import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
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
