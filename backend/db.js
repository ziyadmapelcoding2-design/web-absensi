const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;
const dbFile = path.join(__dirname, 'data.db');
const exists = fs.existsSync(dbFile);
const db = new sqlite3.Database(dbFile);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function init() {
  await run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    teacher TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    className TEXT,
    subject TEXT,
    teacher TEXT,
    date TEXT,
    isActive INTEGER,
    code TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS attendance_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sessionId INTEGER,
    studentName TEXT,
    studentId TEXT,
    status TEXT,
    time TEXT,
    createdAt TEXT
  )`);

  const currentColumns = await all("PRAGMA table_info(attendance_records)");
  if (!currentColumns.some((column) => column.name === 'createdAt')) {
    await run('ALTER TABLE attendance_records ADD COLUMN createdAt TEXT');
  }

  const userCount = await get('SELECT COUNT(*) as count FROM users');
  if (userCount.count === 0) {
    const adminPassword = await bcrypt.hash('admin123', SALT_ROUNDS);
    const teacherPassword = await bcrypt.hash('guru123', SALT_ROUNDS);
    const studentPassword = await bcrypt.hash('siswa123', SALT_ROUNDS);

    await run(`INSERT INTO users (name, email, password, role) VALUES
      ('Admin Sekolah', 'admin@sekolah.local', ?, 'admin'),
      ('Pak Budi', 'teacher@sekolah.local', ?, 'teacher'),
      ('Sinta Siswa', 'student@sekolah.local', ?, 'student')
    `, [adminPassword, teacherPassword, studentPassword]);
  }

  const classCount = await get('SELECT COUNT(*) as count FROM classes');
  if (classCount.count === 0) {
    await run(`INSERT INTO classes (name, teacher) VALUES
      ('Kelas 10 IPA', 'Pak Budi'),
      ('Kelas 11 IPS', 'Bu Ani')
    `);
  }

  const sessionCount = await get('SELECT COUNT(*) as count FROM sessions');
  if (sessionCount.count === 0) {
    await run(`INSERT INTO sessions (className, subject, teacher, date, isActive, code) VALUES
      ('Kelas 10 IPA', 'Matematika', 'Pak Budi', date('now'), 1, 'A7X-9B2')
    `);
  }

  const recordCount = await get('SELECT COUNT(*) as count FROM attendance_records');
  if (recordCount.count === 0) {
    await run(`INSERT INTO attendance_records (sessionId, studentName, studentId, status, time) VALUES
      (1, 'Sinta Siswa', 'STD001', 'present', time('now', 'localtime'))
    `);
  }
}

async function getUserByEmailAndPassword(email, password) {
  const user = await get('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  return valid ? user : null;
}

async function getUserByEmail(email) {
  return get('SELECT * FROM users WHERE email = ?', [email]);
}

async function createUser(name, email, password, role) {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashed, role]);
  return get('SELECT * FROM users WHERE id = ?', [result.lastID]);
}

async function getAttendanceRecordsByStudent(studentName) {
  return all('SELECT * FROM attendance_records WHERE studentName = ? ORDER BY id DESC LIMIT 50', [studentName]);
}

async function getAdminStats() {
  const users = await get('SELECT COUNT(*) as totalUsers FROM users');
  const classes = await get('SELECT COUNT(*) as totalClasses FROM classes');
  const sessions = await get('SELECT COUNT(*) as totalSessions FROM sessions');
  const attendanceByStatus = await all(`SELECT status, COUNT(*) as count FROM attendance_records GROUP BY status`);
  const usersByRole = await all(`SELECT role, COUNT(*) as count FROM users GROUP BY role`);
  return {
    ...users,
    ...classes,
    ...sessions,
    attendanceByStatus,
    usersByRole
  };
}

async function getTeacherStats() {
  const activeSessions = await get('SELECT COUNT(*) as activeSessions FROM sessions WHERE isActive = 1');
  const totalStudents = await get('SELECT COUNT(DISTINCT studentId) as totalStudents FROM attendance_records');
  const attendanceToday = await get(`SELECT COUNT(*) as attendanceToday FROM attendance_records WHERE date(createdAt) = date('now', 'localtime')`);
  return {
    activeSessions: activeSessions.activeSessions,
    totalStudents: totalStudents.totalStudents,
    attendanceToday: attendanceToday.attendanceToday
  };
}

async function getStudentStats(studentName) {
  const attendedToday = await get(`SELECT COUNT(*) as attendedToday FROM attendance_records WHERE studentName = ? AND date(createdAt) = date('now', 'localtime')`, [studentName]);
  const nextSession = await get("SELECT * FROM sessions WHERE date >= date('now', 'localtime') ORDER BY date ASC LIMIT 1");
  return { attendedToday: attendedToday.attendedToday, nextSession };
}

async function getClasses() {
  return all('SELECT * FROM classes');
}

async function createSession(className, subject, teacher) {
  const date = new Date().toISOString().split('T')[0];
  const code = `S-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  const result = await run('INSERT INTO sessions (className, subject, teacher, date, isActive, code) VALUES (?, ?, ?, ?, ?, ?)', [className, subject, teacher, date, 1, code]);
  const session = await get('SELECT * FROM sessions WHERE id = ?', [result.lastID]);
  return session;
}

async function getSessions() {
  return all('SELECT * FROM sessions ORDER BY date DESC');
}

async function submitAttendance({ sessionId, studentName, studentId, status }) {
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const createdAt = new Date().toISOString();
  const result = await run('INSERT INTO attendance_records (sessionId, studentName, studentId, status, time, createdAt) VALUES (?, ?, ?, ?, ?, ?)', [sessionId, studentName, studentId, status, time, createdAt]);
  return get('SELECT * FROM attendance_records WHERE id = ?', [result.lastID]);
}

async function getAttendanceRecords() {
  return all('SELECT * FROM attendance_records ORDER BY id DESC LIMIT 50');
}

async function deleteUser(id) {
  const user = await get('SELECT * FROM users WHERE id = ?', [id]);
  if (!user) return null;
  await run('DELETE FROM users WHERE id = ?', [id]);
  return user;
}

async function getAllUsers() {
  return all('SELECT id, name, email, role FROM users ORDER BY id');
}

module.exports = {
  db,
  init,
  getUserByEmailAndPassword,
  getUserByEmail,
  getAdminStats,
  getTeacherStats,
  getStudentStats,
  getClasses,
  createSession,
  getSessions,
  submitAttendance,
  getAttendanceRecords,
  getAttendanceRecordsByStudent,
  createUser,
  deleteUser,
  getAllUsers
};
