const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function request(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        throw new Error(data?.error || `${response.status} ${response.statusText}`);
    }

    return data;
}

export async function fetchStudents() {
    return request('/api/students');
}

export async function fetchStudent(rollNumber) {
    return request(`/api/students/${encodeURIComponent(rollNumber)}`);
}

export async function addStudent(student) {
    return request('/api/students', {
        method: 'POST',
        body: JSON.stringify(student)
    });
}

export async function updateStudent(rollNumber, updates) {
    return request(`/api/students/${encodeURIComponent(rollNumber)}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
    });
}

export async function deleteStudent(rollNumber) {
    return request(`/api/students/${encodeURIComponent(rollNumber)}`, {
        method: 'DELETE'
    });
}

export async function fetchTrainers() {
    return request('/api/trainers');
}

export async function addTrainer(trainer) {
    return request('/api/trainers', {
        method: 'POST',
        body: JSON.stringify(trainer)
    });
}

export async function updateTrainer(id, updates) {
    return request(`/api/trainers/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
    });
}

export async function deleteTrainer(id) {
    return request(`/api/trainers/${encodeURIComponent(id)}`, {
        method: 'DELETE'
    });
}

export async function fetchAttendance(date) {
    const query = date ? `?date=${encodeURIComponent(date)}` : '';
    return request(`/api/attendance${query}`);
}

export async function saveAttendance(date, records) {
    return request('/api/attendance', {
        method: 'POST',
        body: JSON.stringify({ date, records })
    });
}

export async function saveMultiAttendance(date, rollNumbers) {
    return request('/api/attendance/multi', {
        method: 'POST',
        body: JSON.stringify({ date, rollNumbers })
    });
}

export async function fetchTrainerAttendance(date) {
    const query = date ? `?date=${encodeURIComponent(date)}` : '';
    return request(`/api/trainer-attendance${query}`);
}

export async function saveTrainerAttendance(date, records) {
    return request('/api/trainer-attendance', {
        method: 'POST',
        body: JSON.stringify({ date, records })
    });
}
