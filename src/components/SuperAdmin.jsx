import { useState } from "react";

import "./SuperAdmin.css";

const TITAN_LOGO = "https://i.ibb.co/q3c3CkLS/titan-logo.jpg";

// Same email, password decides role (note the capital H for Sub Admin)
const ADMIN_USERS = [
  { email: "drzaidi156@gmail.com", password: "2008hasnain", role: "Super Admin" },
  { email: "drzaidi156@gmail.com", password: "2008Hasnain", role: "Sub Admin" },
];


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

  const [formModal, setFormModal] = useState(null); 
  const [viewStudent, setViewStudent] = useState(null);
  const [paymentsStudent, setPaymentsStudent] = useState(null);
  const [confirmFor, setConfirmFor] = useState(null); 

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


const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const CLASS_WEEKDAYS = [2, 4]; // Tuesday & Thursday are scheduled class days
const TODAY_REF = new Date(2026, 5, 14); // reference "today" used to decide past/future days

function pad2(n) { return String(n).padStart(2, "0"); }
function toYMD(y, m, d) { return `${y}-${pad2(m + 1)}-${pad2(d)}`; }
function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function firstWeekdayOfMonth(y, m) { return new Date(y, m, 1).getDay(); }

const ATTENDANCE_STUDENTS = [
  {
    rollNumber: "827544",
    studentName: "Rehman Ali",
    fatherName: "Nazeer Ahmed",
    course: "Web Development",
    campus: "TITAN Sukkur Campus",
    totalClasses: 17,
    presentDates: ["2026-05-05", "2026-05-07", "2026-05-12", "2026-05-14", "2026-05-19", "2026-05-21", "2026-05-26", "2026-05-28", "2026-06-09", "2026-06-11"],
    leaveDates: [],
  },
  {
    rollNumber: "827545",
    studentName: "Ayesha Khan",
    fatherName: "Imran Khan",
    course: "Graphic Designing",
    campus: "TITAN Karachi Campus",
    totalClasses: 15,
    presentDates: ["2026-05-05", "2026-05-07", "2026-05-12", "2026-05-14", "2026-05-19", "2026-05-21", "2026-05-26", "2026-05-28", "2026-06-02", "2026-06-04", "2026-06-09"],
    leaveDates: ["2026-05-08"],
  },
  {
    rollNumber: "827546",
    studentName: "Bilal Ahmed",
    fatherName: "Tariq Ahmed",
    course: "Web Development",
    campus: "TITAN Lahore Campus",
    totalClasses: 17,
    presentDates: ["2026-05-05", "2026-05-07", "2026-05-12", "2026-05-14", "2026-05-19", "2026-05-21", "2026-05-26", "2026-05-28", "2026-06-02", "2026-06-04", "2026-06-09", "2026-06-11"],
    leaveDates: [],
  },
];

const TRAINERS_LIST = [
  { id: 1, name: "Waqas Ahmed", subject: "Web Development", campus: "TITAN Sukkur Campus" },
  { id: 2, name: "Sana Malik", subject: "Graphic Designing", campus: "TITAN Karachi Campus" },
  { id: 3, name: "Faisal Raza", subject: "Digital Marketing", campus: "TITAN Lahore Campus" },
];

function attendanceStats(record) {
  const present = record.presentDates.length;
  const leave = record.leaveDates.length;
  const absent = Math.max(0, record.totalClasses - present - leave);
  const percentage = record.totalClasses > 0 ? ((present + leave) / record.totalClasses) * 100 : 0;
  return { present, leave, absent, percentage };
}

function dayStatus(record, dateStr, dateObj) {
  if (record.presentDates.includes(dateStr)) return "present";
  if (record.leaveDates.includes(dateStr)) return "leave";
  const weekday = dateObj.getDay();
  if (CLASS_WEEKDAYS.includes(weekday) && dateObj <= TODAY_REF) return "absent";
  return "none";
}

const DAY_STATUS_STYLE = {
  present: { background: "#e3f5e9", color: "#1e7a44" },
  leave: { background: "#fbeed9", color: "#95661b" },
  absent: { background: "#fbdee0", color: "#a3273a" },
  none: { background: "transparent", color: "var(--ta-text-muted)" },
};


function LeaveReasonModal({ onCancel, onConfirm }) {
  const [reason, setReason] = useState("");

  return (
    <div className="ta-modal-overlay" onClick={onCancel}>
      <div className="ta-modal" style={{ maxWidth: 380 }} onClick={(e) => e.stopPropagation()}>
        <div className="ta-modal-header">
          <h3>Reason for leave</h3>
          <button className="ta-modal-close" onClick={onCancel}>
            <Icon path={ICONS.close} size={18} />
          </button>
        </div>
        <div className="ta-modal-body">
          <input
            className="ta-form-input"
            autoFocus
            placeholder="Enter reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div className="ta-modal-footer">
          <button className="ta-btn-outline" onClick={onCancel}>Cancel</button>
          <button className="ta-btn-primary" onClick={() => onConfirm(reason)}>Ok</button>
        </div>
      </div>
    </div>
  );
}

function AttendanceDetailsModal({ record, onClose, onMarkLeave }) {
  const [viewMode, setViewMode] = useState("Month");
  const [year, setYear] = useState(TODAY_REF.getFullYear());
  const [month, setMonth] = useState(TODAY_REF.getMonth());
  const [pendingDate, setPendingDate] = useState(null);

  const stats = attendanceStats(record);

  const cells = [];
  const firstWeekday = firstWeekdayOfMonth(year, month);
  const totalDays = daysInMonth(year, month);
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const changeMonth = (delta) => {
    let m = month + delta;
    let y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setMonth(m);
    setYear(y);
  };

  return (
    <div className="ta-modal-overlay" onClick={onClose}>
      <div className="ta-modal" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        <div className="ta-modal-header">
          <h3>Attendance Details</h3>
          <button className="ta-modal-close" onClick={onClose}>
            <Icon path={ICONS.close} size={18} />
          </button>
        </div>

        <div className="ta-modal-body">
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
            <span><strong>Student Name :</strong> {record.studentName}</span>
            <span><strong>Roll Number :</strong> {record.rollNumber}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            <span><strong>Total Classes :</strong> {record.totalClasses}</span>
            <span><strong>Present - Leave - Absent :</strong> {stats.present}/{stats.leave}/{stats.absent}</span>
            <span><strong>Attendance Percentage :</strong> {stats.percentage.toFixed(2)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <button className="ta-icon-action" onClick={() => changeMonth(-1)}>
                <Icon path={ICONS.chevronLeft} size={14} />
              </button>
              <select className="ta-form-select" value={year} onChange={(e) => setYear(Number(e.target.value))}>
                {[2024, 2025, 2026].map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <select className="ta-form-select" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                {MONTH_NAMES.map((m, i) => <option key={m} value={i}>{m.slice(0, 3)}</option>)}
              </select>
              <button className="ta-icon-action" onClick={() => changeMonth(1)}>
                <Icon path={ICONS.chevronRight} size={14} />
              </button>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                className={viewMode === "Month" ? "ta-btn-primary" : "ta-btn-outline"}
                style={{ padding: "4px 12px", fontSize: 12 }}
                onClick={() => setViewMode("Month")}
              >
                Month
              </button>
              <button
                className={viewMode === "Year" ? "ta-btn-primary" : "ta-btn-outline"}
                style={{ padding: "4px 12px", fontSize: 12 }}
                onClick={() => setViewMode("Year")}
              >
                Year
              </button>
            </div>
          </div>

          {viewMode === "Month" ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                {WEEKDAY_LABELS.map((w) => (
                  <div key={w} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: "var(--ta-text-muted)", padding: "4px 0" }}>
                    {w}
                  </div>
                ))}
                {cells.map((d, idx) => {
                  if (!d) return <div key={idx} />;
                  const dateStr = toYMD(year, month, d);
                  const dateObj = new Date(year, month, d);
                  const status = dayStatus(record, dateStr, dateObj);
                  const clickable = status === "absent";
                  return (
                    <div
                      key={idx}
                      onClick={() => clickable && setPendingDate(dateStr)}
                      style={{
                        textAlign: "center",
                        padding: "10px 0",
                        borderRadius: 6,
                        fontSize: 13,
                        cursor: clickable ? "pointer" : "default",
                        ...DAY_STATUS_STYLE[status],
                      }}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: 11, color: "var(--ta-text-muted)", marginTop: 10 }}>
                Click a red (absent) day to mark it as leave.
              </p>
            </>
          ) : (
            <div className="ta-table-wrap">
              <table className="ta-table">
                <thead>
                  <tr><th>Month</th><th>Present</th><th>Leave</th></tr>
                </thead>
                <tbody>
                  {MONTH_NAMES.map((m, i) => {
                    const monthPresent = record.presentDates.filter((ds) => Number(ds.split("-")[0]) === year && Number(ds.split("-")[1]) - 1 === i).length;
                    const monthLeave = record.leaveDates.filter((ds) => Number(ds.split("-")[0]) === year && Number(ds.split("-")[1]) - 1 === i).length;
                    if (monthPresent === 0 && monthLeave === 0) return null;
                    return (
                      <tr key={m}>
                        <td>{m}</td>
                        <td>{monthPresent}</td>
                        <td>{monthLeave}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {pendingDate && (
        <LeaveReasonModal
          onCancel={() => setPendingDate(null)}
          onConfirm={(reason) => {
            onMarkLeave(record.rollNumber, pendingDate, reason);
            setPendingDate(null);
          }}
        />
      )}
    </div>
  );
}


function MarkAttendancePage() {
  const [date, setDate] = useState(toYMD(TODAY_REF.getFullYear(), TODAY_REF.getMonth(), TODAY_REF.getDate()));
  const [statusMap, setStatusMap] = useState(() => {
    const init = {};
    ATTENDANCE_STUDENTS.forEach((s) => { init[s.rollNumber] = "present"; });
    return init;
  });
  const [toast, setToast] = useState("");

  const setStatus = (rollNumber, value) => setStatusMap((prev) => ({ ...prev, [rollNumber]: value }));

  const handleSave = () => {
    setToast(`Attendance saved for ${date}`);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="ta-students-page">
      <div className="ta-students-toolbar">
        <div className="ta-filter-field" style={{ minWidth: 200 }}>
          <label>Date</label>
          <div className="ta-date-range-wrap">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Icon path={ICONS.calendar} size={15} />
          </div>
        </div>
      </div>

      <div className="ta-table-wrap">
        <table className="ta-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ATTENDANCE_STUDENTS.map((s) => (
              <tr key={s.rollNumber}>
                <td>{s.rollNumber}</td>
                <td>{s.studentName}</td>
                <td>{s.course}</td>
                <td>
                  <div style={{ display: "flex", gap: 14 }}>
                    {["present", "leave", "absent"].map((opt) => (
                      <label key={opt} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, textTransform: "capitalize", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name={`status-${s.rollNumber}`}
                          checked={statusMap[s.rollNumber] === opt}
                          onChange={() => setStatus(s.rollNumber, opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 16 }}>
        <button className="ta-btn-primary" onClick={handleSave}>Save Attendance</button>
      </div>

      {toast && <div className="ta-toast">{toast}</div>}
    </div>
  );
}


function ViewAttendancePage() {
  const [records, setRecords] = useState(ATTENDANCE_STUDENTS);
  const [rollInput, setRollInput] = useState("");
  const [query, setQuery] = useState("");
  const [detailsFor, setDetailsFor] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const filtered = records.filter(
    (r) =>
      !query.trim() ||
      r.rollNumber.includes(query.trim()) ||
      r.studentName.toLowerCase().includes(query.trim().toLowerCase())
  );

  const runSearch = () => setQuery(rollInput);

  const handleMarkLeave = (rollNumber, dateStr) => {
    setRecords((prev) =>
      prev.map((r) => (r.rollNumber === rollNumber ? { ...r, leaveDates: [...r.leaveDates, dateStr] } : r))
    );
    setDetailsFor((prev) =>
      prev && prev.rollNumber === rollNumber ? { ...prev, leaveDates: [...prev.leaveDates, dateStr] } : prev
    );
    showToast("Marked as leave");
  };

  return (
    <div className="ta-students-page">
      <div className="ta-students-toolbar">
        <input
          className="ta-search-input"
          type="text"
          placeholder="Search by roll number or name"
          value={rollInput}
          onChange={(e) => setRollInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runSearch()}
        />
        <button className="ta-btn-primary" onClick={runSearch}>Search</button>
      </div>

      <div className="ta-table-wrap">
        <table className="ta-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Total Classes</th>
              <th>Present</th>
              <th>Leave</th>
              <th>Absent</th>
              <th>Percentage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9}>
                  <div className="ta-empty-state">
                    <Icon path={ICONS.inbox} size={42} />
                    <p>No data</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const stats = attendanceStats(r);
                return (
                  <tr key={r.rollNumber}>
                    <td>{r.rollNumber}</td>
                    <td><span className="ta-link-text">{r.studentName}</span></td>
                    <td>{r.course}</td>
                    <td>{r.totalClasses}</td>
                    <td>{stats.present}</td>
                    <td>{stats.leave}</td>
                    <td>{stats.absent}</td>
                    <td>{stats.percentage.toFixed(2)}%</td>
                    <td>
                      <button className="ta-icon-action" title="View" onClick={() => setDetailsFor(r)}>
                        <Icon path={ICONS.eye} size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {detailsFor && (
        <AttendanceDetailsModal
          record={detailsFor}
          onClose={() => setDetailsFor(null)}
          onMarkLeave={handleMarkLeave}
        />
      )}

      {toast && <div className="ta-toast">{toast}</div>}
    </div>
  );
}


function TrainerAttendancePage() {
  const [date, setDate] = useState(toYMD(TODAY_REF.getFullYear(), TODAY_REF.getMonth(), TODAY_REF.getDate()));
  const [statusMap, setStatusMap] = useState(() => {
    const init = {};
    TRAINERS_LIST.forEach((t) => { init[t.id] = "present"; });
    return init;
  });
  const [toast, setToast] = useState("");

  const setStatus = (id, value) => setStatusMap((prev) => ({ ...prev, [id]: value }));

  const handleSave = () => {
    setToast(`Trainer attendance saved for ${date}`);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="ta-students-page">
      <div className="ta-students-toolbar">
        <div className="ta-filter-field" style={{ minWidth: 200 }}>
          <label>Date</label>
          <div className="ta-date-range-wrap">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Icon path={ICONS.calendar} size={15} />
          </div>
        </div>
      </div>

      <div className="ta-table-wrap">
        <table className="ta-table">
          <thead>
            <tr>
              <th>Trainer Name</th>
              <th>Subject</th>
              <th>Campus</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {TRAINERS_LIST.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.subject}</td>
                <td>{t.campus}</td>
                <td>
                  <div style={{ display: "flex", gap: 14 }}>
                    {["present", "absent"].map((opt) => (
                      <label key={opt} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, textTransform: "capitalize", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name={`trainer-status-${t.id}`}
                          checked={statusMap[t.id] === opt}
                          onChange={() => setStatus(t.id, opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 16 }}>
        <button className="ta-btn-primary" onClick={handleSave}>Save Attendance</button>
      </div>

      {toast && <div className="ta-toast">{toast}</div>}
    </div>
  );
}


const SLOT_DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOT_TRAINERS = ["Shehzad Iqbal", "Miss Muskan", "Shumaila Shiwani", "Miss Hanifa Asad", "Waqas Ahmed", "Sana Malik", "Faisal Raza"];
const SLOT_COURSES = [
  "Modern Web Application Development | Batch (1)",
  "AI & Game Creators | Batch (1)",
  "Little Geniuses: Coding, Design & AI Fun Lab | Batch (1)",
];
const SLOT_CAMPUSES = ["Bahria College 1 Majeed...", "Bahria College Hanif...", "Bahria Subh-e-Nau Se..."];
const FACILITY_OPTIONS = ["Lab", "Non-Lab"];
const SLOT_STATUS_OPTIONS = ["ACTIVE", "INACTIVE"];
const ONLINE_OPTIONS = ["YES", "NO"];
const CERT_OPTIONS = ["FREE", "PAID"];

let nextSlotId = 7;

const SEED_SLOTS = [
  {
    id: 1,
    schedule: "Sat 11:00 PM - 01:00 AM",
    day: "Sat",
    startTime: "23:00",
    endTime: "01:00",
    trainer: "Shehzad Iqbal",
    course: "Modern Web Application Development | Batch (1)",
    city: "Sukkur",
    campus: "Bahria College 1 Majeed...",
    enrolled: 15,
    capacity: 50,
    facility: "Lab",
    classType: "Lab",
    gender: "Male",
    status: "ACTIVE",
    online: "NO",
    onlineOffline: "NO",
    startDate: "2025-08-01",
    endDate: "",
    cert: "FREE",
    hourlyRate: "",
    whatsappLink: "",
  },
  {
    id: 2,
    schedule: "Sat 09:00 AM - 11:00 AM",
    day: "Sat",
    startTime: "09:00",
    endTime: "11:00",
    trainer: "Shehzad Iqbal",
    course: "Modern Web Application Development | Batch (1)",
    city: "Sukkur",
    campus: "Bahria College 1 Majeed...",
    enrolled: 19,
    capacity: 63,
    facility: "Lab",
    classType: "Lab",
    gender: "Female",
    status: "ACTIVE",
    online: "NO",
    onlineOffline: "NO",
    startDate: "2025-08-01",
    endDate: "",
    cert: "FREE",
    hourlyRate: "",
    whatsappLink: "",
  },
  {
    id: 3,
    schedule: "Mon 09:00 AM - 11:00 AM",
    day: "Mon",
    startTime: "09:00",
    endTime: "11:00",
    trainer: "Miss Muskan",
    course: "AI & Game Creators | Batch (1)",
    city: "Karachi",
    campus: "Bahria College Hanif...",
    enrolled: 0,
    capacity: 50,
    facility: "Lab",
    classType: "Lab",
    gender: "Female",
    status: "ACTIVE",
    online: "NO",
    onlineOffline: "NO",
    startDate: "2026-06-08",
    endDate: "2026-08-01",
    cert: "FREE",
    hourlyRate: "",
    whatsappLink: "",
  },
  {
    id: 4,
    schedule: "Mon 11:00 AM - 01:00 PM",
    day: "Mon",
    startTime: "11:00",
    endTime: "13:00",
    trainer: "Miss Muskan",
    course: "Little Geniuses: Coding, Design & AI Fun Lab | Batch (1)",
    city: "Karachi",
    campus: "Bahria College Hanif...",
    enrolled: 0,
    capacity: 70,
    facility: "Lab",
    classType: "Lab",
    gender: "Female",
    status: "ACTIVE",
    online: "NO",
    onlineOffline: "NO",
    startDate: "2026-06-08",
    endDate: "2026-08-01",
    cert: "FREE",
    hourlyRate: "",
    whatsappLink: "",
  },
  {
    id: 5,
    schedule: "Mon 11:00 AM - 01:00 PM",
    day: "Mon",
    startTime: "11:00",
    endTime: "13:00",
    trainer: "Shumaila Shiwani",
    course: "Little Geniuses: Coding, Design & AI Fun Lab | Batch (1)",
    city: "Lahore",
    campus: "Bahria Subh-e-Nau Se...",
    enrolled: 0,
    capacity: 80,
    facility: "Lab",
    classType: "Lab",
    gender: "Female",
    status: "ACTIVE",
    online: "NO",
    onlineOffline: "NO",
    startDate: "2026-06-08",
    endDate: "2026-08-01",
    cert: "FREE",
    hourlyRate: "",
    whatsappLink: "",
  },
  {
    id: 6,
    schedule: "Tue 09:00 AM - 11:00 AM",
    day: "Tue",
    startTime: "09:00",
    endTime: "11:00",
    trainer: "Miss Hanifa Asad",
    course: "AI & Game Creators | Batch (1)",
    city: "Karachi",
    campus: "Bahria College Hanif...",
    enrolled: 0,
    capacity: 60,
    facility: "Lab",
    classType: "Lab",
    gender: "Female",
    status: "ACTIVE",
    online: "NO",
    onlineOffline: "NO",
    startDate: "2026-06-08",
    endDate: "2026-06-10",
    cert: "FREE",
    hourlyRate: "",
    whatsappLink: "",
  },
];

const EMPTY_SLOT_FORM = {
  schedule: "",
  city: "",
  campus: SLOT_CAMPUSES[0],
  course: SLOT_COURSES[0],
  trainer: SLOT_TRAINERS[0],
  classType: FACILITY_OPTIONS[0],
  status: "ACTIVE",
  gender: GENDERS[0],
  startDate: "",
  endDate: "",
  onlineOffline: "NO",
  hourlyRate: "",
  cert: "Paid",
  whatsappLink: "",
  enrolled: 0,
  capacity: 50,
  // legacy fields kept so existing table code / edit flow still works
  day: SLOT_DAYS[0],
  startTime: "09:00",
  endTime: "11:00",
  facility: FACILITY_OPTIONS[0],
  online: "NO",
};

function formatTime12(t) {
  if (!t) return "";
  const [hStr, m] = t.split(":");
  let h = Number(hStr);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${String(h).padStart(2, "0")}:${m} ${ampm}`;
}

function formatSlotDate(d) {
  if (!d) return "—";
  const dateObj = new Date(d + "T00:00:00");
  return `${String(dateObj.getDate()).padStart(2, "0")} ${MONTH_NAMES[dateObj.getMonth()].slice(0, 3)} ${dateObj.getFullYear()}`;
}


function SlotFormModal({ title, initialValues, onClose, onSave }) {
  const [form, setForm] = useState(initialValues || EMPTY_SLOT_FORM);
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="ta-modal-overlay" onClick={onClose}>
      <form className="ta-modal ta-slot-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="ta-modal-header">
          <h3>{title}</h3>
          <button type="button" className="ta-modal-close" onClick={onClose}>
            <Icon path={ICONS.close} size={18} />
          </button>
        </div>

        <div className="ta-modal-body">
          <div className="ta-slot-format-hint">
            Format: Mon 09:00 AM - 11:00 AM | Wed 09:00 AM - 11:00 AM | Fri 09:00 AM - 11:00 AM
          </div>

          <input
            className="ta-form-input ta-full-width"
            placeholder="schedule"
            value={form.schedule}
            onChange={(e) => set("schedule", e.target.value)}
          />

          <div className="ta-slot-form-row">
            <select className="ta-form-select" value={form.city} onChange={(e) => set("city", e.target.value)}>
              <option value="">Select city</option>
              {CITIES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <select className="ta-form-select" value={form.campus} onChange={(e) => set("campus", e.target.value)}>
              <option value="">Select campus</option>
              {SLOT_CAMPUSES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <select className="ta-form-select ta-full-width" value={form.course} onChange={(e) => set("course", e.target.value)}>
            <option value="">Select course</option>
            {SLOT_COURSES.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>

          <div className="ta-slot-form-row">
            <select className="ta-form-select" value={form.trainer} onChange={(e) => set("trainer", e.target.value)}>
              <option value="">Select trainer</option>
              {SLOT_TRAINERS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <select className="ta-form-select" value={form.classType} onChange={(e) => set("classType", e.target.value)}>
              <option value="">Class type</option>
              {FACILITY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="ta-slot-form-row">
            <select className="ta-form-select" value={form.status} onChange={(e) => set("status", e.target.value)}>
              <option value="">Select status</option>
              {SLOT_STATUS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <select className="ta-form-select" value={form.gender} onChange={(e) => set("gender", e.target.value)}>
              <option value="">Select gender</option>
              {GENDERS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="ta-slot-form-row">
            <input className="ta-form-input" type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
            <input className="ta-form-input" type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
          </div>

          <div className="ta-slot-form-row">
            <select className="ta-form-select" value={form.onlineOffline} onChange={(e) => set("onlineOffline", e.target.value)}>
              <option value="">Class Type</option>
              {ONLINE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <input
              className="ta-form-input"
              type="number"
              min="0"
              placeholder="Trainer hourly rate"
              value={form.hourlyRate}
              onChange={(e) => set("hourlyRate", e.target.value)}
            />
          </div>

          <div className="ta-slot-form-row">
            <select className="ta-form-select" value={form.cert} onChange={(e) => set("cert", e.target.value)}>
              <option value="Paid">Paid</option>
              <option value="Free">Free</option>
            </select>
            <input
              className="ta-form-input"
              placeholder="Whatsapp Group link"
              value={form.whatsappLink}
              onChange={(e) => set("whatsappLink", e.target.value)}
            />
          </div>

          <div className="ta-filter-field ta-full-width">
            <label>Capacity</label>
            <div className="ta-slot-capacity-row">
              <input
                type="range"
                min="0"
                max="200"
                value={form.capacity}
                onChange={(e) => set("capacity", Number(e.target.value))}
                className="ta-slot-capacity-slider"
              />
              <span className="ta-slot-capacity-value">{form.capacity}</span>
            </div>
          </div>
        </div>

        <div className="ta-modal-footer">
          <button type="button" className="ta-btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="ta-btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

function SlotsFiltersModal({ onClose, onApply, initialValues }) {
  const [values, setValues] = useState(initialValues || {});
  const set = (key, val) => setValues((v) => ({ ...v, [key]: val }));

  const FIELDS = [
    { key: "trainer", label: "Trainer", options: SLOT_TRAINERS },
    { key: "course", label: "Course", options: SLOT_COURSES },
    { key: "campus", label: "Campus", options: SLOT_CAMPUSES },
    { key: "facility", label: "Facility", options: FACILITY_OPTIONS },
    { key: "gender", label: "Gender", options: GENDERS },
    { key: "status", label: "Status", options: SLOT_STATUS_OPTIONS },
    { key: "online", label: "Online", options: ONLINE_OPTIONS },
    { key: "cert", label: "Certificate", options: CERT_OPTIONS },
  ];

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
          {FIELDS.map((f) => (
            <div className="ta-filter-field" key={f.key}>
              <label>{f.label}</label>
              <select className="ta-form-select" value={values[f.key] || ""} onChange={(e) => set(f.key, e.target.value)}>
                <option value="">{f.label}</option>
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div className="ta-modal-footer">
          <button className="ta-btn-outline" onClick={() => { setValues({}); onApply({}); }}>Reset</button>
          <button className="ta-btn-outline" onClick={onClose}>Cancel</button>
          <button className="ta-btn-primary" onClick={() => { onApply(values); onClose(); }}>Apply</button>
        </div>
      </div>
    </div>
  );
}

function SlotsPage() {
  const [slots, setSlots] = useState(SEED_SLOTS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [formModal, setFormModal] = useState(null); // { mode: "add" | "edit", slot? }
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const matchesFilters = (s) => {
    const f = appliedFilters;
    if (f.trainer && s.trainer !== f.trainer) return false;
    if (f.course && s.course !== f.course) return false;
    if (f.campus && s.campus !== f.campus) return false;
    if (f.facility && s.facility !== f.facility) return false;
    if (f.gender && s.gender !== f.gender) return false;
    if (f.status && s.status !== f.status) return false;
    if (f.online && s.online !== f.online) return false;
    if (f.cert && s.cert !== f.cert) return false;
    return true;
  };

  const filteredRows = slots.filter(matchesFilters);

  const handleAdd = (form) => {
    setSlots((prev) => [{ id: nextSlotId++, ...form }, ...prev]);
    setFormModal(null);
    showToast("Slot added");
  };

  const handleEdit = (form) => {
    setSlots((prev) => prev.map((s) => (s.id === formModal.slot.id ? { ...s, ...form } : s)));
    setFormModal(null);
    showToast("Slot updated");
  };

  return (
    <div className="ta-students-page">
      <div className="ta-students-toolbar">
        <button className="ta-icon-only-btn" title="Export">
          <Icon path={ICONS.download} size={16} />
        </button>

        <div style={{ flex: 1 }} />

        <button className="ta-btn-outline ta-filters-btn" onClick={() => setFiltersOpen(true)}>
          <Icon path={ICONS.filter} size={15} />
          Filters
          {Object.values(appliedFilters).some(Boolean) && <span className="ta-filter-dot" />}
        </button>

        <button className="ta-btn-primary ta-add-new-btn" onClick={() => setFormModal({ mode: "add" })}>
          <Icon path={ICONS.plus} size={15} />
          Add new
        </button>
      </div>

      <div className="ta-table-wrap">
        <table className="ta-table">
          <thead>
            <tr>
              <th>Schedule</th>
              <th>Trainer</th>
              <th>Course</th>
              <th>Campus</th>
              <th>Seats</th>
              <th>Facility</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Online</th>
              <th>Start</th>
              <th>End</th>
              <th>Cert.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={13}>
                  <div className="ta-empty-state">
                    <Icon path={ICONS.inbox} size={42} />
                    <p>No data</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredRows.map((s) => (
                <tr key={s.id}>
                  <td>{s.schedule || `${s.day} ${formatTime12(s.startTime)} - ${formatTime12(s.endTime)}`}</td>
                  <td>{s.trainer}</td>
                  <td>{s.course}</td>
                  <td>{s.campus}</td>
                  <td>{s.enrolled}/{s.capacity}</td>
                  <td>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Icon path={ICONS.building} size={13} /> {s.classType || s.facility}
                    </span>
                  </td>
                  <td>{s.gender}</td>
                  <td>
                    <span className={`ta-badge ${s.status === "ACTIVE" ? "ta-badge-blue" : "ta-badge-gray"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>{s.onlineOffline || s.online}</td>
                  <td>{formatSlotDate(s.startDate)}</td>
                  <td>{formatSlotDate(s.endDate)}</td>
                  <td>
                    <span className={`ta-badge ${(s.cert || "").toUpperCase() === "FREE" ? "ta-badge-orange" : "ta-badge-green"}`}>
                      {s.cert}
                    </span>
                  </td>
                  <td>
                    <button className="ta-icon-action" title="Edit" onClick={() => setFormModal({ mode: "edit", slot: s })}>
                      <Icon path={ICONS.pencil} size={15} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtersOpen && (
        <SlotsFiltersModal
          initialValues={appliedFilters}
          onClose={() => setFiltersOpen(false)}
          onApply={setAppliedFilters}
        />
      )}

      {formModal?.mode === "add" && (
        <SlotFormModal
          title="Add new slot"
          initialValues={EMPTY_SLOT_FORM}
          onClose={() => setFormModal(null)}
          onSave={handleAdd}
        />
      )}

      {formModal?.mode === "edit" && (
        <SlotFormModal
          title="Edit slot"
          initialValues={formModal.slot}
          onClose={() => setFormModal(null)}
          onSave={handleEdit}
        />
      )}

      {toast && <div className="ta-toast">{toast}</div>}
    </div>
  );
}


/* ---------------------------------------------------------------
   Updation page — bulk status update by comma-separated roll numbers
   (exact match of the admin.saylanimit.com/updation screenshots:
   "results" dropdown, roll numbers box, message box, status dropdown
   with its own option overlay, full-width UPDATE button, and the
   "comma seprated values" hint linking to Text to Array Converter)
------------------------------------------------------------------ */

const UPDATION_TYPES = ["results"];

function UpdationDropdown({ value, placeholder, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ta-select-wrap ta-updation-select" onClick={() => setOpen((p) => !p)}>
      <span className={value ? "" : "ta-select-placeholder"}>
        {value || placeholder}
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
              {placeholder}
            </div>
            {options.map((opt) => (
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
  );
}

function UpdationPage() {
  const [type, setType] = useState("results");
  const [rollNumbers, setRollNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const canSubmit = rollNumbers.trim().length > 0 && !!status;

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const numbers = rollNumbers
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    showToast(`Updated ${numbers.length} record(s) to "${status}"`);
    setRollNumbers("");
    setMessage("");
    setStatus("");
  };

  return (
    <div className="ta-updation-page">
      <form className="ta-updation-form" onSubmit={handleUpdate}>
        <UpdationDropdown
          value={type}
          placeholder="results"
          options={UPDATION_TYPES}
          onChange={setType}
        />

        <textarea
          className="ta-updation-textarea ta-updation-roll"
          placeholder="Roll numbers example: 1122,1123,1124,1125"
          value={rollNumbers}
          onChange={(e) => setRollNumbers(e.target.value)}
        />

        <input
          className="ta-updation-input"
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <UpdationDropdown
          value={status}
          placeholder="Select status"
          options={STATUS_OPTIONS}
          onChange={setStatus}
        />

        <button type="submit" className="ta-updation-submit" disabled={!canSubmit}>
          UPDATE
        </button>

        <p className="ta-updation-hint">
          Use this link for comma seprated values{" "}
          <a href="https://arraythis.com" target="_blank" rel="noreferrer">
            Text to Array Converter
          </a>
        </p>
      </form>

      {toast && <div className="ta-toast">{toast}</div>}
    </div>
  );
}


const PERMISSION_GROUPS = [
  { key: "DASHBOARD", perms: ["READ"] },
  { key: "STUDENT", perms: ["READ", "UPDATE", "WRITE", "EXPORT"] },
  { key: "ATTENDANCE_VIEW", perms: ["READ", "UPDATE", "WRITE", "EXPORT"] },
  { key: "ATTENDANCE_MARK", perms: ["READ", "WRITE", "UPDATE"] },
  { key: "UPDATION", perms: ["READ", "UPDATE", "WRITE"] },
  { key: "ADMINISTRATION_SLOT", perms: ["READ", "WRITE", "UPDATE"] },
  { key: "TRAINER", perms: ["READ", "WRITE", "UPDATE"] },
  { key: "TRAINER_ATTENDANCE_MARK", perms: ["READ", "WRITE", "UPDATE"] },
  { key: "TRAINER_ATTENDANCE_VIEW", perms: ["READ", "WRITE", "UPDATE"] },
  { key: "TRAINER_ATTENDANCE_REQUEST", perms: ["READ", "WRITE", "UPDATE"] },
];

function roleSlug(role) {
  return (role || "").toUpperCase().replace(/\s+/g, "_");
}

function ProfilePage({ user, onLogout }) {
  return (
    <div className="ta-profile-page">
      <div className="ta-profile-top-row">
        <h2 className="ta-profile-title">
          <Icon path={ICONS.user} size={18} />
          Profile Information
        </h2>
        <button className="ta-btn-primary ta-profile-logout-btn" onClick={onLogout}>
          <Icon path={ICONS.refresh} size={15} />
          Logout
        </button>
      </div>

      <div className="ta-profile-field-block">
        <label>Email</label>
        <p>{user?.email}</p>
      </div>

      <div className="ta-profile-field-block">
        <label>Role</label>
        <span className="ta-role-pill-outline">{roleSlug(user?.role)}</span>
      </div>

      <div className="ta-profile-grid-row">
        <div>
          <label><Icon path={ICONS.building} size={13} /> Country</label>
          <p>Pakistan</p>
        </div>
        <div>
          <label><Icon path={ICONS.building} size={13} /> City</label>
          <p>Sukkur</p>
        </div>
        <div>
          <label><Icon path={ICONS.building} size={13} /> Campus</label>
          <p>Saylani TITAN Sukkur Campus</p>
        </div>
      </div>

      <h3 className="ta-permissions-title">
        <Icon path={ICONS.shield} size={15} />
        Permissions
      </h3>

      {PERMISSION_GROUPS.map((g) => (
        <div key={g.key} className="ta-permission-row">
          <p className="ta-permission-key">{g.key}</p>
          <div className="ta-permission-badges">
            {g.perms.map((p) => (
              <span key={p} className="ta-permission-badge">{p}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}



const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: ICONS.grid, type: "link" },
  { key: "students", label: "Students", icon: ICONS.users, type: "link" },
  {
    key: "attendance-group",
    label: "Attendance",
    icon: ICONS.calendar,
    type: "group",
    children: [
      { key: "mark-attendance", label: "Mark Attendance" },
      { key: "view-attendance", label: "View Attendance" },
    ],
  },
  {
    key: "administration-group",
    label: "Administration",
    icon: ICONS.shield,
    type: "group",
    children: [{ key: "administration", label: "Slots" }],
  },
  {
    key: "trainers-group",
    label: "Trainers",
    icon: ICONS.cap,
    type: "group",
    children: [
      { key: "trainers", label: "Trainers" },
      { key: "trainer-attendance", label: "Attendance" },
    ],
  },
  { key: "updation", label: "Updation", icon: ICONS.refresh, type: "link" },
  { key: "profile", label: "Profile", icon: ICONS.user, type: "link" },
];

function findActiveNavLabel(activePage) {
  for (const item of NAV_ITEMS) {
    if (item.type === "link" && item.key === activePage) return item.label;
    if (item.type === "group") {
      const child = item.children.find((c) => c.key === activePage);
      if (child) return child.label;
    }
  }
  return "Dashboard";
}

function groupKeyForPage(activePage) {
  for (const item of NAV_ITEMS) {
    if (item.type === "group" && item.children.some((c) => c.key === activePage)) {
      return item.key;
    }
  }
  return null;
}

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
  const [openGroups, setOpenGroups] = useState(() => ({
    "attendance-group": true,
    "administration-group": true,
    "trainers-group": true,
  }));

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);
  const toggleMobileSidebar = () => setIsMobileOpen((p) => !p);
  const toggleGroup = (key) => setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  const activeNavLabel = findActiveNavLabel(activePage);

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
            {NAV_ITEMS.map((item) => {
              const showLabels = isSidebarOpen || isMobileOpen;

              if (item.type === "link") {
                return (
                  <div
                    key={item.key}
                    className={`ta-nav-item ${activePage === item.key ? "active" : ""}`}
                    onClick={() => {
                      setActivePage(item.key);
                      setIsMobileOpen(false);
                    }}
                  >
                    <Icon path={item.icon} />
                    {showLabels && <span>{item.label}</span>}
                  </div>
                );
              }

        
              const isOpen = !!openGroups[item.key];
              const groupHasActiveChild = item.children.some((c) => c.key === activePage);

              return (
                <div key={item.key} className="ta-nav-group">
                  <div
                    className={`ta-nav-item ta-nav-group-header ${groupHasActiveChild ? "active" : ""}`}
                    onClick={() => toggleGroup(item.key)}
                  >
                    <Icon path={item.icon} />
                    {showLabels && <span>{item.label}</span>}
                    {showLabels && (
                      <span
                        className="ta-nav-chevron"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <Icon path={ICONS.chevronDown} size={14} />
                      </span>
                    )}
                  </div>

                  {showLabels && isOpen && (
                    <div className="ta-nav-children">
                      {item.children.map((child) => (
                        <div
                          key={child.key}
                          className={`ta-nav-item ta-nav-child ${activePage === child.key ? "active" : ""}`}
                          onClick={() => {
                            setActivePage(child.key);
                            setIsMobileOpen(false);
                          }}
                        >
                          <span>{child.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
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
          {activePage === "mark-attendance" && <MarkAttendancePage />}
          {activePage === "view-attendance" && <ViewAttendancePage />}
          {activePage === "trainer-attendance" && <TrainerAttendancePage />}
          {activePage === "administration" && <SlotsPage />}
          {activePage === "updation" && <UpdationPage />}
          {activePage === "profile" && <ProfilePage user={user} onLogout={onLogout} />}

          {!["dashboard", "students", "mark-attendance", "view-attendance", "trainer-attendance", "administration", "updation", "profile"].includes(activePage) && (
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

export default function SuperAdmin() {
  const [currentUser, setCurrentUser] = useState(null);

  if (!currentUser) {
    return <AdminLogin onLoginSuccess={setCurrentUser} />;
  }

  return (
    <AdminDashboard user={currentUser} onLogout={() => setCurrentUser(null)} />
  );
}