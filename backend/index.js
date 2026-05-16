const express = require('express');
const cors = require('cors');
const {
  init,
  getUserByEmailAndPassword,
  getUserByEmail,
  getAdminStats,
  getTeacherStats,
  getStudentStats,
  getClasses,
  createSession,
  getSessions,
  getActiveSessions,
  submitAttendance,
  getAttendanceRecords,
  getAttendanceRecordsByStudent,
  createUser,
  deleteUser,
  getAllUsers
} = require('./db');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Kunci rahasia untuk token
const SECRET_KEY = 'secret_key';

// --- ROUTE LOGIN ---
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailAndPassword(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }
    // Membuat token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1d' });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// --- ROUTE REGISTER (Sudah Diperbaiki agar langsung kasih Token) ---
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    }
    
    // Simpan user ke database
    const user = await createUser(name, email, password, role);

    // LANGKAH PENTING: Langsung buat token setelah daftar
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1d' });

    // Kirim user DAN token ke frontend
    return res.status(201).json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// ... (Sisa kode API lainnya tetap sama seperti milik Anda) ...

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const role = req.query.role;
    if (role === 'admin') {
      const stats = await getAdminStats();
      return res.json(stats);
    }
    if (role === 'teacher') {
      const stats = await getTeacherStats();
      return res.json(stats);
    }
    if (role === 'student') {
      const stats = await getStudentStats(req.query.studentName || 'Sinta Siswa');
      return res.json(stats);
    }
    return res.json({ message: 'Role tidak diketahui' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/api/classes', async (req, res) => {
  try {
    const classes = await getClasses();
    return res.json({ classes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.post('/api/attendance/session', async (req, res) => {
  try {
    const { className, subject, teacher } = req.body;
    const session = await createSession(className, subject, teacher);
    return res.json({ session });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.post('/api/attendance/submit', async (req, res) => {
  try {
    const { sessionId, studentName, studentId, status } = req.body;
    const record = await submitAttendance({ sessionId, studentName, studentId, status });
    return res.json({ record });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/api/profile', async (req, res) => {
  try {
    const email = req.query.email;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/api/sessions', async (req, res) => {
  try {
    const { role } = req.query;
    const sessions = role === 'student' ? await getActiveSessions() : await getSessions();
    return res.json({ sessions });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/api/attendance/records', async (req, res) => {
  try {
    const { studentName } = req.query;
    const records = studentName
      ? await getAttendanceRecordsByStudent(studentName)
      : await getAttendanceRecords();
    return res.json({ records });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    return res.json({ message: 'User berhasil dihapus', user: deletedUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// --- FUNGSI START SERVER ---
async function startServer(portToTry) {
  return new Promise((resolve, reject) => {
    const server = app.listen(portToTry, () => {
      console.log(`Backend berjalan di http://localhost:${portToTry}`);
      resolve(server);
    });
    server.on('error', (err) => reject(err));
  });
}

async function initServer(portToTry) {
  try {
    await startServer(portToTry);
  } catch (err) {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${portToTry} sudah digunakan, mencoba port ${portToTry + 1}...`);
      await initServer(portToTry + 1);
      return;
    }
    throw err;
  }
}

init().then(() => {
  initServer(port).catch((err) => {
    console.error('Gagal memulai server backend:', err);
    process.exit(1);
  });
}).catch((err) => {
  console.error('Gagal inisialisasi database:', err);
});
