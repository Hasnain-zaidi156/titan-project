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
  pencil: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </>
  ),
  send: (
    <>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 2h12v20l-3-2-3 2-3-2-3 2Z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="13" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </>
  ),
  chevronLeft: <polyline points="15 18 9 12 15 6" />,
  chevronRight: <polyline points="9 18 15 12 9 6" />,
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

const PAYMENT_STATUS_OPTIONS = ["Paid", "Pending", "Not Generated"];
const COUNTRIES = ["Pakistan"];
const CITIES = ["Sukkur", "Karachi", "Lahore", "Islamabad"];
const CAMPUSES = ["TITAN Sukkur Campus", "TITAN Karachi Campus", "TITAN Lahore Campus"];
const COURSES = ["Graphic Designing", "Mobile App Development", "Web Development", "Digital Marketing", "Spoken English"];
const BATCHES = ["Batch 1", "Batch 2", "Batch 3"];
const SLOTS = ["Morning", "Evening"];
const GENDERS = ["Male", "Female"];
const LAPTOP_OPTIONS = ["Yes", "No"];

const FILTER_FIELDS = [
  { key: "dateRange", label: "Start date  →  End date", type: "date-range" },
  { key: "country", label: "Country", type: "select", options: COUNTRIES },
  { key: "city", label: "City", type: "select", options: CITIES },
  { key: "campus", label: "Campus", type: "select", options: CAMPUSES },
  { key: "course", label: "Course", type: "select", options: COURSES },
  { key: "batch", label: "Batch", type: "select", options: BATCHES },
  { key: "slot", label: "Slot", type: "select", options: SLOTS },
  { key: "status", label: "Status", type: "select", options: STATUS_OPTIONS },
  { key: "laptop", label: "Laptop", type: "select", options: LAPTOP_OPTIONS },
  { key: "sponsorship", label: "Sponsorship Status", type: "select", options: ["Sponsored", "Self Paid"] },
  { key: "year", label: "Year", type: "select", options: ["2026", "2025", "2024"] },
  { key: "paymentMonth", label: "Payment Month", type: "select", options: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
  { key: "paymentStatus", label: "Payment Status", type: "select", options: PAYMENT_STATUS_OPTIONS },
  { key: "gender", label: "Gender", type: "select", options: GENDERS },
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

let nextStudentId = 4;
let nextInvoiceSeq = 844227;

const SEED_STUDENTS = [
  {
    id: 1,
    admissionNo: "ADM844226",
    studentName: "Muhammad Hassan",
    fatherName: "Muhammad Afzal",
    cnic: "4550408050073",
    phone: "03103589178",
    course: "Mobile App Development",
    status: "enrolled",
    paymentStatus: "Not Generated",
    country: "Pakistan",
    city: "Sukkur",
    campus: "TITAN Sukkur Campus",
    batch: "Batch 1",
    slot: "Morning",
    gender: "Male",
    laptop: "No",
    invoices: [
      {
        invoiceNumber: "ADM844226",
        jazzCashId: "",
        type: "Registration",
        month: "May-2026",
        dueDate: "10-May-2026",
        amount: 1000,
        status: "PENDING",
      },
    ],
  },
  {
    id: 2,
    admissionNo: "ADM844227",
    studentName: "Ayesha Khan",
    fatherName: "Imran Khan",
    cnic: "4520112345678",
    phone: "03001234567",
    course: "Graphic Designing",
    status: "pending",
    paymentStatus: "Pending",
    country: "Pakistan",
    city: "Karachi",
    campus: "TITAN Karachi Campus",
    batch: "Batch 2",
    slot: "Evening",
    gender: "Female",
    laptop: "Yes",
    invoices: [],
  },
  {
    id: 3,
    admissionNo: "ADM844228",
    studentName: "Bilal Ahmed",
    fatherName: "Tariq Ahmed",
    cnic: "4510098765432",
    phone: "03211234567",
    course: "Web Development",
    status: "completed",
    paymentStatus: "Paid",
    country: "Pakistan",
    city: "Lahore",
    campus: "TITAN Lahore Campus",
    batch: "Batch 1",
    slot: "Morning",
    gender: "Male",
    laptop: "No",
    invoices: [
      {
        invoiceNumber: "ADM844228",
        jazzCashId: "JC998877",
        type: "Registration",
        month: "April-2026",
        dueDate: "10-Apr-2026",
        amount: 1000,
        status: "PAID",
      },
    ],
  },
];

const EMPTY_FORM = {
  studentName: "",
  fatherName: "",
  cnic: "",
  phone: "",
  country: "Pakistan",
  city: CITIES[0],
  campus: CAMPUSES[0],
  course: COURSES[0],
  batch: BATCHES[0],
  slot: SLOTS[0],
  status: "pending",
  paymentStatus: "Not Generated",
  gender: GENDERS[0],
  laptop: "No",
};

function statusBadgeClass(status) {
  const s = (status || "").toLowerCase();
  if (["enrolled", "approved", "passed"].includes(s)) return "ta-badge-blue";
  if (["completed", "certified"].includes(s)) return "ta-badge-green";
  if (["rejected", "failed", "eliminated", "cancelled", "blacklisted"].includes(s)) return "ta-badge-red";
  return "ta-badge-gray";
}

function paymentBadgeClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "paid") return "ta-badge-green";
  if (s === "pending") return "ta-badge-orange";
  return "ta-badge-red";
}

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
              <div
                className="ta-select-option ta-select-option-clear"
                onClick={(e) => { e.stopPropagation(); onChange(""); setOpen(false); }}
              >
                {field.label}
              </div>
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

function FiltersModal({ onClose, onApply, initialValues }) {
  const [values, setValues] = useState(initialValues || {});

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
              <input
                type="date"
                value={values.startDate || ""}
                onChange={(e) => setField("startDate", e.target.value)}
              />
              <span style={{ color: "var(--ta-text-muted)", fontSize: "11px" }}>to</span>
              <input
                type="date"
                value={values.endDate || ""}
                onChange={(e) => setField("endDate", e.target.value)}
              />
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
          <button
            className="ta-btn-outline"
            onClick={() => {
              setValues({});
              onApply({});
            }}
          >
            Reset
          </button>
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

function StudentFormModal({ title, initialValues, onClose, onSave }) {
  const [form, setForm] = useState(initialValues || EMPTY_FORM);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.studentName.trim() || !form.fatherName.trim() || !form.cnic.trim() || !form.phone.trim()) {
      return;
    }
    onSave(form);
  };

  return (
    <div className="ta-modal-overlay" onClick={onClose}>
      <form className="ta-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="ta-modal-header">
          <h3>{title}</h3>
          <button type="button" className="ta-modal-close" onClick={onClose}>
            <Icon path={ICONS.close} size={18} />
          </button>
        </div>

        <div className="ta-modal-body">
          <div className="ta-filter-field">
            <label>Student name *</label>
            <input className="ta-form-input" required value={form.studentName} onChange={(e) => set("studentName", e.target.value)} />
          </div>
          <div className="ta-filter-field">
            <label>Father name *</label>
            <input className="ta-form-input" required value={form.fatherName} onChange={(e) => set("fatherName", e.target.value)} />
          </div>
          <div className="ta-filter-field">
            <label>CNIC *</label>
            <input className="ta-form-input" required value={form.cnic} onChange={(e) => set("cnic", e.target.value)} placeholder="00000-0000000-0" />
          </div>
          <div className="ta-filter-field">
            <label>Phone *</label>
            <input className="ta-form-input" required value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="03XXXXXXXXX" />
          </div>
          <div className="ta-filter-field">
            <label>Country</label>
            <select className="ta-form-select" value={form.country} onChange={(e) => set("country", e.target.value)}>
              {COUNTRIES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="ta-filter-field">
            <label>City</label>
            <select className="ta-form-select" value={form.city} onChange={(e) => set("city", e.target.value)}>
              {CITIES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="ta-filter-field">
            <label>Campus</label>
            <select className="ta-form-select" value={form.campus} onChange={(e) => set("campus", e.target.value)}>
              {CAMPUSES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="ta-filter-field">
            <label>Course</label>
            <select className="ta-form-select" value={form.course} onChange={(e) => set("course", e.target.value)}>
              {COURSES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="ta-filter-field">
            <label>Batch</label>
            <select className="ta-form-select" value={form.batch} onChange={(e) => set("batch", e.target.value)}>
              {BATCHES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="ta-filter-field">
            <label>Slot</label>
            <select className="ta-form-select" value={form.slot} onChange={(e) => set("slot", e.target.value)}>
              {SLOTS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="ta-filter-field">
            <label>Status</label>
            <select className="ta-form-select" value={form.status} onChange={(e) => set("status", e.target.value)}>
              {STATUS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="ta-filter-field">
            <label>Payment Status</label>
            <select className="ta-form-select" value={form.paymentStatus} onChange={(e) => set("paymentStatus", e.target.value)}>
              {PAYMENT_STATUS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="ta-filter-field">
            <label>Gender</label>
            <select className="ta-form-select" value={form.gender} onChange={(e) => set("gender", e.target.value)}>
              {GENDERS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="ta-filter-field">
            <label>Laptop</label>
            <select className="ta-form-select" value={form.laptop} onChange={(e) => set("laptop", e.target.value)}>
              {LAPTOP_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="ta-modal-footer">
          <button type="button" className="ta-btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="ta-btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}

function ViewStudentModal({ student, onClose }) {
  const FIELDS = [
    ["Admission No", student.admissionNo],
    ["Student name", student.studentName],
    ["Father name", student.fatherName],
    ["CNIC", student.cnic],
    ["Phone", student.phone],
    ["Country", student.country],
    ["City", student.city],
    ["Campus", student.campus],
    ["Course", student.course],
    ["Batch", student.batch],
    ["Slot", student.slot],
    ["Status", student.status],
    ["Payment Status", student.paymentStatus],
    ["Gender", student.gender],
    ["Laptop", student.laptop],
  ];

  return (
    <div className="ta-modal-overlay" onClick={onClose}>
      <div className="ta-modal ta-view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ta-modal-header">
          <h3>Student Details</h3>
          <button className="ta-modal-close" onClick={onClose}>
            <Icon path={ICONS.close} size={18} />
          </button>
        </div>
        <div className="ta-view-grid">
          {FIELDS.map(([label, val]) => (
            <div className="ta-view-row" key={label}>
              <span className="ta-view-label">{label}</span>
              <span className="ta-view-value">{val || "—"}</span>
            </div>
          ))}
        </div>
        <div className="ta-modal-footer">
          <button className="ta-btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function PaymentsModal({ student, onClose, onGenerate, onMarkPaid }) {
  const [month, setMonth] = useState("");

  return (
    <div className="ta-modal-overlay" onClick={onClose}>
      <div className="ta-modal ta-payments-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ta-modal-header">
          <h3>Payments — {student.studentName}</h3>
          <button className="ta-modal-close" onClick={onClose}>
            <Icon path={ICONS.close} size={18} />
          </button>
        </div>

        <div className="ta-table-wrap ta-payments-table-wrap">
          <table className="ta-table">
            <thead>
              <tr>
                <th>Invoice number</th>
                <th>JazzCash ID</th>
                <th>Type</th>
                <th>Month</th>
                <th>Due date</th>
                <th>Amount (Rs)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {student.invoices.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="ta-empty-state">
                      <Icon path={ICONS.inbox} size={36} />
                      <p>No invoices yet</p>
                    </div>
                  </td>
                </tr>
              ) : (
                student.invoices.map((inv, i) => (
                  <tr key={i}>
                    <td>{inv.invoiceNumber}</td>
                    <td>{inv.jazzCashId || "—"}</td>
                    <td>{inv.type}</td>
                    <td>{inv.month}</td>
                    <td>{inv.dueDate}</td>
                    <td>{inv.amount}</td>
                    <td>
                      <span className={`ta-badge ${inv.status === "PAID" ? "ta-badge-green" : "ta-badge-orange"}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      {inv.status !== "PAID" && (
                        <button
                          type="button"
                          className="ta-icon-action"
                          title="Mark as paid"
                          onClick={() => onMarkPaid(i)}
                        >
                          <Icon path={ICONS.check} size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="ta-modal-body ta-payments-generate-row">
          <div className="ta-filter-field" style={{ flex: 1 }}>
            <label>Select month</label>
            <div className="ta-date-range-wrap">
              <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
              <Icon path={ICONS.calendar} size={15} />
            </div>
          </div>
        </div>

        <div className="ta-modal-footer ta-payments-footer">
          <button
            type="button"
            className="ta-btn-primary ta-generate-btn"
            onClick={() => {
              if (!month) return;
              onGenerate(month);
              setMonth("");
            }}
          >
            GENERATE
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmPopover({ message, onCancel, onConfirm }) {
  return (
    <div className="ta-confirm-popover" onClick={(e) => e.stopPropagation()}>
      <div className="ta-confirm-popover-msg">
        <Icon path={ICONS.alert} size={15} />
        <span>{message}</span>
      </div>
      <div className="ta-confirm-popover-actions">
        <button className="ta-btn-outline ta-confirm-btn-sm" onClick={onCancel}>Cancel</button>
        <button className="ta-btn-primary ta-confirm-btn-sm" onClick={onConfirm}>OK</button>
      </div>
    </div>
  );
}

function StudentsPage() {
  const [students, setStudents] = useState(SEED_STUDENTS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [toast, setToast] = useState("");

  const [formModal, setFormModal] = useState(null); // { mode: "add" | "edit", student? }
  const [viewStudent, setViewStudent] = useState(null);
  const [paymentsStudent, setPaymentsStudent] = useState(null);
  const [confirmFor, setConfirmFor] = useState(null); // { id, action: "send" | "delete" }

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const matchesFilters = (s) => {
    const f = appliedFilters;
    if (f.country && s.country !== f.country) return false;
    if (f.city && s.city !== f.city) return false;
    if (f.campus && s.campus !== f.campus) return false;
    if (f.course && s.course !== f.course) return false;
    if (f.batch && s.batch !== f.batch) return false;
    if (f.slot && s.slot !== f.slot) return false;
    if (f.status && s.status !== f.status) return false;
    if (f.laptop && s.laptop !== f.laptop) return false;
    if (f.paymentStatus && s.paymentStatus !== f.paymentStatus) return false;
    if (f.gender && s.gender !== f.gender) return false;
    return true;
  };

  const matchesSearch = (s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    return [s.admissionNo, s.studentName, s.fatherName, s.cnic, s.phone, s.course]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(q));
  };

  const filteredRows = students.filter((s) => matchesFilters(s) && matchesSearch(s));
  const totalItems = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIdx = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endIdx = Math.min(safePage * pageSize, totalItems);
  const pageRows = filteredRows.slice((safePage - 1) * pageSize, safePage * pageSize);

  const runSearch = () => {
    setSearchQuery(searchInput);
    setPage(1);
  };

  const handleExport = () => {
    const header = TABLE_COLUMNS.filter((c) => c !== "Action").join(",");
    const lines = filteredRows.map((s) =>
      [s.studentName, s.fatherName, s.cnic, s.phone, s.course, s.status, s.paymentStatus]
        .map((v) => `"${(v || "").toString().replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header, ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Export downloaded");
  };

  const handleAddStudent = (form) => {
    const admissionNo = `ADM${nextInvoiceSeq++}`;
    const newStudent = {
      id: nextStudentId++,
      admissionNo,
      ...form,
      invoices: [],
    };
    setStudents((prev) => [newStudent, ...prev]);
    setFormModal(null);
    showToast("Student added");
  };

  const handleEditStudent = (form) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === formModal.student.id ? { ...s, ...form } : s))
    );
    setFormModal(null);
    showToast("Student updated");
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setConfirmFor(null);
    showToast("Student deleted");
  };

  const handleSendEmail = (id) => {
    setConfirmFor(null);
    showToast("Email sent");
  };

  const handleDownloadRow = (s) => {
    showToast(`Downloaded record for ${s.studentName}`);
  };

  const handleGenerateInvoice = (month) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== paymentsStudent.id) return s;
        const newInvoice = {
          invoiceNumber: s.admissionNo,
          jazzCashId: "",
          type: "Registration",
          month,
          dueDate: "10-" + month,
          amount: 1000,
          status: "PENDING",
        };
        const updated = { ...s, invoices: [...s.invoices, newInvoice], paymentStatus: "Pending" };
        setPaymentsStudent(updated);
        return updated;
      })
    );
    showToast("Invoice generated");
  };

  const handleMarkPaid = (invIdx) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== paymentsStudent.id) return s;
        const invoices = s.invoices.map((inv, i) => (i === invIdx ? { ...inv, status: "PAID" } : inv));
        const updated = { ...s, invoices, paymentStatus: "Paid" };
        setPaymentsStudent(updated);
        return updated;
      })
    );
    showToast("Marked as paid");
  };

  return (
    <div className="ta-students-page">
      <div className="ta-students-toolbar">
        <button className="ta-icon-only-btn" title="View options">
          <Icon path={ICONS.sliders} size={16} />
        </button>

        <button className="ta-btn-outline ta-filters-btn" onClick={() => setFiltersOpen(true)}>
          <Icon path={ICONS.filter} size={15} />
          Filters
          {Object.values(appliedFilters).some(Boolean) && <span className="ta-filter-dot" />}
        </button>

        <input
          className="ta-search-input"
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runSearch()}
        />

        <button className="ta-btn-primary" onClick={runSearch}>Search</button>
        <button className="ta-btn-primary" onClick={handleExport}>Export</button>
        <button
          className="ta-btn-primary ta-add-new-btn"
          onClick={() => setFormModal({ mode: "add" })}
        >
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
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={TABLE_COLUMNS.length}>
                  <div className="ta-empty-state">
                    <Icon path={ICONS.inbox} size={42} />
                    <p>No data</p>
                  </div>
                </td>
              </tr>
            ) : (
              pageRows.map((s) => (
                <tr key={s.id}>
                  <td><span className="ta-link-text">{s.studentName}</span></td>
                  <td>{s.fatherName}</td>
                  <td>{s.cnic}</td>
                  <td>{s.phone}</td>
                  <td>{s.course}</td>
                  <td>
                    <span className={`ta-badge ${statusBadgeClass(s.status)}`}>
                      {s.status?.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <span className={`ta-badge ${paymentBadgeClass(s.paymentStatus)}`}>
                      {s.paymentStatus?.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="ta-action-row">
                      <button className="ta-icon-action" title="View" onClick={() => setViewStudent(s)}>
                        <Icon path={ICONS.eye} size={15} />
                      </button>
                      <button className="ta-icon-action" title="Payments" onClick={() => setPaymentsStudent(s)}>
                        <Icon path={ICONS.receipt} size={15} />
                      </button>
                      <button
                        className="ta-icon-action"
                        title="Edit"
                        onClick={() => setFormModal({ mode: "edit", student: s })}
                      >
                        <Icon path={ICONS.pencil} size={15} />
                      </button>
                      <div className="ta-action-popover-anchor">
                        <button
                          className="ta-icon-action"
                          title="Send email"
                          onClick={() => setConfirmFor({ id: s.id, action: "send" })}
                        >
                          <Icon path={ICONS.send} size={15} />
                        </button>
                        {confirmFor?.id === s.id && confirmFor.action === "send" && (
                          <ConfirmPopover
                            message="Sure to send email again?"
                            onCancel={() => setConfirmFor(null)}
                            onConfirm={() => handleSendEmail(s.id)}
                          />
                        )}
                      </div>
                      <button className="ta-icon-action" title="Download" onClick={() => handleDownloadRow(s)}>
                        <Icon path={ICONS.download} size={15} />
                      </button>
                      <div className="ta-action-popover-anchor">
                        <button
                          className="ta-icon-action ta-icon-action-danger"
                          title="Delete"
                          onClick={() => setConfirmFor({ id: s.id, action: "delete" })}
                        >
                          <Icon path={ICONS.trash} size={15} />
                        </button>
                        {confirmFor?.id === s.id && confirmFor.action === "delete" && (
                          <ConfirmPopover
                            message="Delete this student?"
                            onCancel={() => setConfirmFor(null)}
                            onConfirm={() => handleDelete(s.id)}
                          />
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalItems > 0 && (
        <div className="ta-pagination">
          <span className="ta-pagination-info">
            {startIdx}-{endIdx} of {totalItems} items
          </span>
          <div className="ta-pagination-controls">
            <button
              className="ta-page-btn"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <Icon path={ICONS.chevronLeft} size={14} />
            </button>
            <span className="ta-page-current">{safePage}</span>
            <button
              className="ta-page-btn"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <Icon path={ICONS.chevronRight} size={14} />
            </button>
            <select
              className="ta-page-size-select"
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            >
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>
      )}

      {filtersOpen && (
        <FiltersModal
          initialValues={appliedFilters}
          onClose={() => setFiltersOpen(false)}
          onApply={(vals) => { setAppliedFilters(vals); setPage(1); }}
        />
      )}

      {formModal?.mode === "add" && (
        <StudentFormModal
          title="Add New Student"
          initialValues={EMPTY_FORM}
          onClose={() => setFormModal(null)}
          onSave={handleAddStudent}
        />
      )}

      {formModal?.mode === "edit" && (
        <StudentFormModal
          title="Edit Student"
          initialValues={formModal.student}
          onClose={() => setFormModal(null)}
          onSave={handleEditStudent}
        />
      )}

      {viewStudent && (
        <ViewStudentModal student={viewStudent} onClose={() => setViewStudent(null)} />
      )}

      {paymentsStudent && (
        <PaymentsModal
          student={paymentsStudent}
          onClose={() => setPaymentsStudent(null)}
          onGenerate={handleGenerateInvoice}
          onMarkPaid={handleMarkPaid}
        />
      )}

      {toast && <div className="ta-toast">{toast}</div>}
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