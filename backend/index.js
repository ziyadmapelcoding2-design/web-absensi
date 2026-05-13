const express = require('express');
const cors = require('cors');
const { init, getUserByEmailAndPassword, getUserByEmail, getAdminStats, getTeacherStats, getStudentStats, getClasses, createSession, getSessions, submitAttendance, getAttendanceRecords, getAttendanceRecordsByStudent, createUser } = require('./db');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailAndPassword(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }
    return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

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
    const user = await createUser(name, email, password, role);
    return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

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
    const sessions = await getSessions();
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
