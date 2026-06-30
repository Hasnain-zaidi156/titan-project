import { useState } from "react";

import "./SuperAdmin.css";

const TITAN_LOGO = "https://i.ibb.co/q3c3CkLS/titan-logo.jpg";

// Same email, password decides role (note the capital H for Sub Admin)
const ADMIN_USERS = [
  { email: "drzaidi156@gmail.com", password: "2008hasnain", role: "Super Admin" },
  { email: "drzaidi156@gmail.com", password: "2008Hasnain", role: "Sub Admin" },
];

/* ---------------------------- Icon set ---------------------------- */
const Icon = ({ path, size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {path}
  </svg>
);

const ICONS = {
  mail: (
    <>
      <path d="M3 6.5h18v11H3z" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a15.6 15.6 0 0 1-3.4 4.3M6.6 6.6C4 8.3 2 12 2 12s3.5 7 10 7c1.3 0 2.5-.2 3.5-.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6" />
      <circle cx="17.5" cy="9" r="2.4" />
      <path d="M16 14.3c2.6.4 4.5 2.3 4.5 5.7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M8.5 14.5l2 2 4-4.5" />
    </>
  ),
  shield: <path d="M12 3l8 3.5v5.5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6.5L12 3Z" />,
  cap: (
    <>
      <path d="M12 4 2 9l10 5 10-5-10-5Z" />
      <path d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
    </>
  ),
  refresh: (
    <>
      <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" />
      <path d="M21 4v4h-4" />
      <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" />
      <path d="M3 20v-4h4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0v4.5l1.5 3H4.5L6 13.5Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l5-5 4 4 8-9" />
      <path d="M16 6h4v4" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5C4 3.7 4.7 3 5.5 3H12v17H5.5A1.5 1.5 0 0 1 4 18.5Z" />
      <path d="M20 4.5C20 3.7 19.3 3 18.5 3H12v17h6.5a1.5 1.5 0 0 0 1.5-1.5Z" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V6l8-3 8 3v15" />
      <path d="M9 21v-5h6v5M9 10h.01M14 10h.01M9 14h.01M14 14h.01" />
    </>
  ),
  filter: (
    <>
      <path d="M4 5h16" />
      <path d="M7 12h10" />
      <path d="M10 19h4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  inbox: (
    <>
      <path d="M3 9.5 6 4h12l3 5.5" />
      <path d="M3 9.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9.5" />
      <path d="M3 9.5h5.2a1 1 0 0 1 .95.68L9.7 12.5h4.6l.55-2.32a1 1 0 0 1 .95-.68H21" />
    </>
  ),
  sliders: (
    <>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </>
  ),
  chevronDown: <polyline points="6 9 12 15 18 9" />,
};

/* ---------------------------- Admin Login ---------------------------- */
export function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const matchedUser = ADMIN_USERS.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (matchedUser) {
      onLoginSuccess(matchedUser);
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="ta-root">
      <div className="ta-login-page">
        <form className="ta-login-card" onSubmit={handleLogin}>
          <div className="ta-logo-wrap">
            <div className="ta-logo-ring">
              <img src={TITAN_LOGO} alt="TITAN" />
            </div>
            <p className="ta-portal-label">Titan Institute</p>
            <h1 className="ta-portal-title">Admin Portal</h1>
            <p className="ta-portal-sub">Sign in to manage your campus</p>
          </div>

          <div className="ta-field">
            <label>Email Address</label>
            <div className="ta-input-wrap">
              <Icon path={ICONS.mail} />
              <input
                type="email"
                placeholder="you@titan.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="ta-field">
            <label>Password</label>
            <div className="ta-input-wrap">
              <Icon path={ICONS.lock} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="ta-eye-btn"
                onClick={() => setShowPassword((p) => !p)}
              >
                <Icon path={showPassword ? ICONS.eyeOff : ICONS.eye} size={16} />
              </button>
            </div>
          </div>

          <div className="ta-row-between">
            <label className="ta-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a className="ta-forgot" href="#">Forgot password?</a>
          </div>

          {error && <div className="ta-error">{error}</div>}

          <button type="submit" className="ta-submit">
            SIGN IN
          </button>

          <p className="ta-login-footer">TITAN Institute &copy; 2026 — Secure Admin Access</p>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------- Students / Registrations Page ---------------------------- */
const STATUS_OPTIONS = [
  "pending",
  "approved",
  "rejected",
  "passed",
  "failed",
  "enrolled",
  "completed",
  "eliminated",
  "dropout",
  "cancelled",
  "certified",
  "blacklisted",
];

const FILTER_FIELDS = [
  { key: "dateRange", label: "Start date  →  End date", type: "date-range" },
  { key: "country", label: "Country", type: "select", options: [] },
  { key: "city", label: "City", type: "select", options: [] },
  { key: "campus", label: "Campus", type: "select", options: [] },
  { key: "course", label: "Course", type: "select", options: [] },
  { key: "batch", label: "Batch", type: "select", options: [] },
  { key: "slot", label: "Slot", type: "select", options: [] },
  { key: "status", label: "Status", type: "select", options: STATUS_OPTIONS },
  { key: "laptop", label: "Laptop", type: "select", options: ["Yes", "No"] },
  { key: "sponsorship", label: "Sponsorship Status", type: "select", options: [] },
  { key: "year", label: "Year", type: "select", options: ["2026", "2025", "2024"] },
  { key: "paymentMonth", label: "Payment Month", type: "select", options: [] },
  { key: "paymentStatus", label: "Payment Status", type: "select", options: ["Paid", "Unpaid", "Partial"] },
  { key: "gender", label: "Gender", type: "select", options: ["Male", "Female"] },
];

const TABLE_COLUMNS = [
  "Student name",
  "Father name",
  "CNIC",
  "Phone",
  "Course",
  "Status",
  "Payment Status",
  "Action",
];

function FilterSelect({ field, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ta-filter-field">
      <label>{field.label}</label>
      <div className="ta-select-wrap" onClick={() => setOpen((p) => !p)}>
        <span className={value ? "" : "ta-select-placeholder"}>
          {value || field.label}
        </span>
        <Icon path={ICONS.chevronDown} size={15} />
        {open && (
          <>
            <div className="ta-select-backdrop" onClick={(e) => { e.stopPropagation(); setOpen(false); }} />
            <div className="ta-select-menu">
              {field.options.length === 0 && (
                <div className="ta-select-empty">No options</div>
              )}
              {field.options.map((opt) => (
                <div
                  key={opt}
                  className="ta-select-option"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FiltersModal({ onClose, onApply }) {
  const [values, setValues] = useState({});

  const setField = (key, val) => setValues((v) => ({ ...v, [key]: val }));

  return (
    <div className="ta-modal-overlay" onClick={onClose}>
      <div className="ta-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ta-modal-header">
          <h3>Filters</h3>
          <button className="ta-modal-close" onClick={onClose}>
            <Icon path={ICONS.close} size={18} />
          </button>
        </div>

        <div className="ta-modal-body">
          <div className="ta-filter-field">
            <label>{FILTER_FIELDS[0].label}</label>
            <div className="ta-date-range-wrap">
              <input type="date" />
              <Icon path={ICONS.calendar} size={15} />
            </div>
          </div>

          {FILTER_FIELDS.slice(1).map((field) => (
            <FilterSelect
              key={field.key}
              field={field}
              value={values[field.key]}
              onChange={(val) => setField(field.key, val)}
            />
          ))}
        </div>

        <div className="ta-modal-footer">
          <button className="ta-btn-outline" onClick={onClose}>Cancel</button>
          <button
            className="ta-btn-primary"
            onClick={() => {
              onApply(values);
              onClose();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

function StudentsPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [rows] = useState([]); // no data by default, matches reference screenshots

  return (
    <div className="ta-students-page">
      <div className="ta-students-toolbar">
        <button className="ta-icon-only-btn" title="View options">
          <Icon path={ICONS.sliders} size={16} />
        </button>

        <button className="ta-btn-outline ta-filters-btn" onClick={() => setFiltersOpen(true)}>
          <Icon path={ICONS.filter} size={15} />
          Filters
        </button>

        <input
          className="ta-search-input"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button className="ta-btn-primary">Search</button>
        <button className="ta-btn-primary">Export</button>
        <button className="ta-btn-primary ta-add-new-btn">
          <Icon path={ICONS.plus} size={15} />
          Add new
        </button>
      </div>

      <div className="ta-table-wrap">
        <table className="ta-table">
          <thead>
            <tr>
              {TABLE_COLUMNS.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={TABLE_COLUMNS.length}>
                  <div className="ta-empty-state">
                    <Icon path={ICONS.inbox} size={42} />
                    <p>No data</p>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i}>
                  {TABLE_COLUMNS.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtersOpen && (
        <FiltersModal onClose={() => setFiltersOpen(false)} onApply={() => {}} />
      )}
    </div>
  );
}

/* ---------------------------- Admin Dashboard ---------------------------- */
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: ICONS.grid },
  { key: "students", label: "Students", icon: ICONS.users },
  { key: "attendance", label: "Attendance", icon: ICONS.calendar },
  { key: "administration", label: "Administration", icon: ICONS.shield },
  { key: "trainers", label: "Trainers", icon: ICONS.cap },
  { key: "updation", label: "Updation", icon: ICONS.refresh },
  { key: "profile", label: "Profile", icon: ICONS.user },
];

const STAT_CARDS = [
  { label: "Total Students", value: "592,986", icon: ICONS.users },
  { label: "Enrolled Students", value: "21,110", icon: ICONS.trend },
  { label: "Courses", value: "132", icon: ICONS.book },
  { label: "Campuses", value: "49", icon: ICONS.building },
];

export function AdminDashboard({ user, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // desktop: expanded/collapsed
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile: slide in/out
  const [activePage, setActivePage] = useState("dashboard");

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);
  const toggleMobileSidebar = () => setIsMobileOpen((p) => !p);

  const activeNavLabel =
    NAV_ITEMS.find((n) => n.key === activePage)?.label ?? "Dashboard";

  return (
    <div className="ta-root">
      <div className="ta-dash">
        {/* Mobile top bar */}
        <div className="ta-mobile-bar">
          <button className="ta-mobile-hamburger" onClick={toggleMobileSidebar} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <img src={TITAN_LOGO} alt="TITAN" className="ta-mobile-logo" />
        </div>

        {isMobileOpen && (
          <div className="ta-mobile-overlay" onClick={() => setIsMobileOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={`ta-sidebar ${isSidebarOpen ? "expanded" : "collapsed"} ${
            isMobileOpen ? "mobile-open" : ""
          }`}
        >
          <div className="ta-sidebar-toggle" onClick={toggleSidebar}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              {isSidebarOpen ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
            </svg>
          </div>

          <div className="ta-sidebar-brand">
            <img src={TITAN_LOGO} alt="TITAN" />
            {(isSidebarOpen || isMobileOpen) && (
              <div className="ta-sidebar-brand-text">
                <strong>TITAN</strong>
                <span>ADMIN PORTAL</span>
              </div>
            )}
          </div>

          <nav className="ta-nav">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.key}
                className={`ta-nav-item ${activePage === item.key ? "active" : ""}`}
                onClick={() => {
                  setActivePage(item.key);
                  setIsMobileOpen(false);
                }}
              >
                <Icon path={item.icon} />
                {(isSidebarOpen || isMobileOpen) && <span>{item.label}</span>}
              </div>
            ))}
          </nav>

          <button className="ta-sidebar-logout" onClick={onLogout}>
            <Icon path={ICONS.logout} size={16} />
            {(isSidebarOpen || isMobileOpen) && <span>Logout</span>}
          </button>
        </aside>

        <main
          className={`ta-main ${
            isSidebarOpen ? "offset-expanded" : "offset-collapsed"
          }`}
        >
          {activePage === "dashboard" && (
            <>
              <div className="ta-topbar">
                <div>
                  <p className="ta-welcome-eyebrow">Welcome back</p>
                  <h1 className="ta-welcome-title">{user?.role ?? "Admin"}</h1>
                  <p className="ta-welcome-sub">{user?.email}</p>
                </div>
                <span className="ta-role-badge">
                  <Icon path={ICONS.shield} size={14} />
                  {user?.role}
                </span>
              </div>

              <div className="ta-stat-grid">
                {STAT_CARDS.map((card) => (
                  <div className="ta-stat-card" key={card.label}>
                    <div className="ta-stat-icon">
                      <Icon path={card.icon} size={20} />
                    </div>
                    <p className="ta-stat-value">{card.value}</p>
                    <p className="ta-stat-label">{card.label}</p>
                  </div>
                ))}
              </div>

              <div className="ta-panel">
                <h3>Shared Dashboard Access</h3>
                <p>
                  Super Admin and Sub Admin currently share the same dashboard view.
                  Role-based permissions and feature restrictions will be configured
                  separately for each role in a future update.
                </p>
                <div className="ta-panel-divider" />
                <p>
                  You're signed in as <strong style={{ color: "var(--ta-royal-blue)" }}>{user?.role}</strong>.
                  Use the navigation on the left to explore portal sections.
                </p>
              </div>
            </>
          )}

          {activePage === "students" && <StudentsPage />}

          {activePage !== "dashboard" && activePage !== "students" && (
            <div className="ta-panel ta-coming-soon">
              <h3>{activeNavLabel}</h3>
              <p>This section is coming soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------------------------- Default combo export ---------------------------- */
export default function SuperAdmin() {
  const [currentUser, setCurrentUser] = useState(null);

  if (!currentUser) {
    return <AdminLogin onLoginSuccess={setCurrentUser} />;
  }

  return (
    <AdminDashboard user={currentUser} onLogout={() => setCurrentUser(null)} />
  );
}