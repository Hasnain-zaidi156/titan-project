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
