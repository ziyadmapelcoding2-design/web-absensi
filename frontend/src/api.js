const API_BASES = [
  import.meta.env.VITE_API_BASE || 'http://localhost:4000/api',
  'http://localhost:4001/api',
  'http://localhost:4002/api',
  'http://localhost:4003/api'
];

async function request(path, options = {}) {
  let lastError = null;
  for (const base of API_BASES) {
    try {
      const response = await fetch(`${base}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Terjadi kesalahan API');
      }
      return response.json();
    } catch (err) {
      lastError = err;
      const message = err?.message || '';
      if (message.includes('Failed to fetch') || message.includes('NetworkError') || message.includes('NetworkError when attempting to fetch resource') || err.name === 'TypeError') {
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

export function login(credentials) {
  return request('/login', { method: 'POST', body: JSON.stringify(credentials) });
}

export function register(credentials) {
  return request('/register', { method: 'POST', body: JSON.stringify(credentials) });
}

export function getDashboardStats(role, studentName = '') {
  const query = studentName ? `&studentName=${encodeURIComponent(studentName)}` : '';
  return request(`/dashboard/stats?role=${role}${query}`);
}

export function getUsers() {
  return request('/users');
}

export function deleteUser(id) {
  return request(`/users/${id}`, { method: 'DELETE' });
}

export function getClasses() {
  return request('/classes');
}

export function createSession(payload) {
  return request('/attendance/session', { method: 'POST', body: JSON.stringify(payload) });
}

export function getSessions(role = '') {
  const query = role ? `?role=${role}` : '';
  return request(`/sessions${query}`);
}

export function submitAttendance(payload) {
  return request('/attendance/submit', { method: 'POST', body: JSON.stringify(payload) });
}

export function getRecords(studentName = '') {
  const query = studentName ? `?studentName=${encodeURIComponent(studentName)}` : '';
  return request(`/attendance/records${query}`);
}
