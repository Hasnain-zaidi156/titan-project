// Basic Express server for student, trainer, and attendance CRUD
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory demo storage. Replace with a real database later.
let students = [
    {
        rollNumber: '822446',
        name: 'Sohna Khan',
        fatherName: 'Bagan Khan',
        cnic: '5320292472197',
        phone: '03063737485',
        course: 'Domestic Electrician',
        status: 'PENDING',
        paymentStatus: 'NOT GENERATED'
    },
    {
        rollNumber: '822447',
        name: 'Ali Ahmed',
        fatherName: 'Ahmed Shah',
        cnic: '4210192348573',
        phone: '03124567890',
        course: 'Web & Mobile App Development',
        status: 'APPROVED',
        paymentStatus: 'GENERATED'
    },
    {
        rollNumber: '822448',
        name: 'Ayesha Bibi',
        fatherName: 'Muhammad Khan',
        cnic: '3410183748592',
        phone: '03338573920',
        course: 'Graphic Designing',
        status: 'ENROLLED',
        paymentStatus: 'GENERATED'
    },
    {
        rollNumber: '822449',
        name: 'Bilal Raza',
        fatherName: 'Raza Ali',
        cnic: '4220194857361',
        phone: '03451122334',
        course: 'Python Programming',
        status: 'COMPLETED',
        paymentStatus: 'GENERATED'
    },
    {
        rollNumber: '822450',
        name: 'Fatima Noor',
        fatherName: 'Noor Alam',
        cnic: '3740591283746',
        phone: '03219876543',
        course: 'Video Editing',
        status: 'REJECTED',
        paymentStatus: 'NOT GENERATED'
    }
];

let trainers = [
    {
        id: 'T001',
        name: 'Ishaq Bhojani',
        email: 'ishaq@saylani.org',
        phone: '03214567890',
        course: 'Web & Mobile App Development',
        city: 'Karachi',
        campus: 'Saylani Gulshan Campus'
    },
    {
        id: 'T002',
        name: 'Mufti Bashir Ahmed',
        email: 'mufti.bashir@saylani.org',
        phone: '03334567890',
        course: 'Islamic Jurisprudence & IT',
        city: 'Sukkur',
        campus: 'Saylani TITAN Sukkur Campus'
    },
    {
        id: 'T003',
        name: 'Rizwan Khan',
        email: 'rizwan@saylani.org',
        phone: '03454567890',
        course: 'Graphic Designing',
        city: 'Sukkur',
        campus: 'Saylani TITAN Sukkur Campus'
    }
];

let attendance = [
    { date: '2026-06-30', rollNumber: '822446', status: 'Present' },
    { date: '2026-06-30', rollNumber: '822447', status: 'Present' },
    { date: '2026-06-30', rollNumber: '822448', status: 'Leave' },
    { date: '2026-06-30', rollNumber: '822449', status: 'Present' },
    { date: '2026-06-30', rollNumber: '822450', status: 'Absent' }
];

let trainerAttendance = [
    { date: '2026-06-30', trainerId: 'T001', status: 'Present' },
    { date: '2026-06-30', trainerId: 'T002', status: 'Present' },
    { date: '2026-06-30', trainerId: 'T003', status: 'Absent' }
];

function normalizeRoll(rollNumber) {
    return String(rollNumber).trim();
}

function getNextTrainerId() {
    const lastId = trainers
        .map(t => parseInt(t.id.replace(/^T0*/, ''), 10))
        .filter(Number.isFinite)
        .sort((a, b) => b - a)[0] || 0;
    return `T00${lastId + 1}`;
}

// Students CRUD
app.get('/api/students', (req, res) => {
    res.json(students);
});

app.get('/api/students/:rollNumber', (req, res) => {
    const rollNumber = normalizeRoll(req.params.rollNumber);
    const student = students.find(s => normalizeRoll(s.rollNumber) === rollNumber);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
});

app.post('/api/students', (req, res) => {
    const { rollNumber, name, fatherName, cnic, phone, course, status, paymentStatus } = req.body;

    if (!name || !fatherName || !cnic || !phone || !course) {
        return res.status(400).json({ error: 'Missing student fields' });
    }

    const normalizedRoll = normalizeRoll(rollNumber || Math.floor(100000 + Math.random() * 900000));
    if (students.some(s => normalizeRoll(s.rollNumber) === normalizedRoll)) {
        return res.status(400).json({ error: 'Roll number already exists' });
    }

    const newStudent = {
        rollNumber: normalizedRoll,
        name,
        fatherName,
        cnic,
        phone,
        course,
        status: status || 'PENDING',
        paymentStatus: paymentStatus || 'NOT GENERATED'
    };

    students.unshift(newStudent);
    res.status(201).json(newStudent);
});

app.put('/api/students/:rollNumber', (req, res) => {
    const rollNumber = normalizeRoll(req.params.rollNumber);
    const studentIndex = students.findIndex(s => normalizeRoll(s.rollNumber) === rollNumber);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }

    const updated = {
        ...students[studentIndex],
        ...req.body,
        rollNumber: students[studentIndex].rollNumber
    };
    students[studentIndex] = updated;
    res.json(updated);
});

app.delete('/api/students/:rollNumber', (req, res) => {
    const rollNumber = normalizeRoll(req.params.rollNumber);
    const studentIndex = students.findIndex(s => normalizeRoll(s.rollNumber) === rollNumber);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }
    const deleted = students.splice(studentIndex, 1);
    res.json({ message: 'Student deleted', student: deleted[0] });
});

// Trainers CRUD
app.get('/api/trainers', (req, res) => {
    res.json(trainers);
});

app.get('/api/trainers/:id', (req, res) => {
    const trainer = trainers.find(t => t.id === req.params.id);
    if (!trainer) {
        return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json(trainer);
});

app.post('/api/trainers', (req, res) => {
    const { id, name, email, phone, course, city, campus } = req.body;
    if (!name || !email || !phone || !course || !city || !campus) {
        return res.status(400).json({ error: 'Missing trainer fields' });
    }

    const trainerId = id || getNextTrainerId();
    if (trainers.some(t => t.id === trainerId)) {
        return res.status(400).json({ error: 'Trainer ID already exists' });
    }

    const newTrainer = { id: trainerId, name, email, phone, course, city, campus };
    trainers.unshift(newTrainer);
    res.status(201).json(newTrainer);
});

app.put('/api/trainers/:id', (req, res) => {
    const trainerIndex = trainers.findIndex(t => t.id === req.params.id);
    if (trainerIndex === -1) {
        return res.status(404).json({ error: 'Trainer not found' });
    }

    trainers[trainerIndex] = { ...trainers[trainerIndex], ...req.body, id: trainers[trainerIndex].id };
    res.json(trainers[trainerIndex]);
});

app.delete('/api/trainers/:id', (req, res) => {
    const trainerIndex = trainers.findIndex(t => t.id === req.params.id);
    if (trainerIndex === -1) {
        return res.status(404).json({ error: 'Trainer not found' });
    }
    const deleted = trainers.splice(trainerIndex, 1);
    res.json({ message: 'Trainer deleted', trainer: deleted[0] });
});

// Attendance routes
app.get('/api/attendance', (req, res) => {
    const { date } = req.query;
    const result = date ? attendance.filter(item => item.date === date) : attendance;
    res.json(result);
});

app.post('/api/attendance', (req, res) => {
    const { date, records } = req.body;
    if (!date || !Array.isArray(records)) {
        return res.status(400).json({ error: 'date and records are required' });
    }

    attendance = attendance.filter(item => item.date !== date);
    const newRecords = records.map(record => ({ date, rollNumber: normalizeRoll(record.rollNumber), status: record.status }));
    attendance.push(...newRecords);
    res.status(201).json(newRecords);
});

app.post('/api/attendance/multi', (req, res) => {
    const { date, rollNumbers } = req.body;
    if (!date || !Array.isArray(rollNumbers)) {
        return res.status(400).json({ error: 'date and rollNumbers are required' });
    }

    attendance = attendance.filter(item => !(item.date === date && rollNumbers.includes(item.rollNumber)));
    const newRecords = rollNumbers
        .map(normalizeRoll)
        .filter(roll => students.some(s => normalizeRoll(s.rollNumber) === roll))
        .map(roll => ({ date, rollNumber: roll, status: 'Present' }));

    attendance.push(...newRecords);
    res.status(201).json(newRecords);
});

// Trainer attendance routes
app.get('/api/trainer-attendance', (req, res) => {
    const { date } = req.query;
    const result = date ? trainerAttendance.filter(item => item.date === date) : trainerAttendance;
    res.json(result);
});

app.post('/api/trainer-attendance', (req, res) => {
    const { date, records } = req.body;
    if (!date || !Array.isArray(records)) {
        return res.status(400).json({ error: 'date and records are required' });
    }

    trainerAttendance = trainerAttendance.filter(item => item.date !== date);
    const newRecords = records.map(record => ({ date, trainerId: record.trainerId, status: record.status }));
    trainerAttendance.push(...newRecords);
    res.status(201).json(newRecords);
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
