import { useEffect, useState } from 'react';
import { createSession, getDashboardStats, getSessions, getClasses } from '../api.js';
import DashboardShell from '../components/DashboardShell.jsx';

function TeacherPage({ user, onLogout, theme, onThemeToggle }) {
  const [stats, setStats] = useState({});
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('Matematika');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const dashboard = await getDashboardStats('teacher');
        setStats(dashboard);
        const sessionResult = await getSessions('teacher');
        setSessions(sessionResult.sessions);
        const classesResult = await getClasses();
        setClasses(classesResult.classes);
        if (classesResult.classes.length > 0) {
          setClassName(classesResult.classes[0].name);
        }
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleCreateSession(event) {
    event.preventDefault();
    setMessage('');
    try {
      const response = await createSession({ className, subject, teacher: user.name });
      setSessions((prev) => [response.session, ...prev]);
      setMessage('Sesi absensi berhasil dibuat.');
    } catch (err) {
      setMessage(err.message);
    }
  }

  const latestSession = sessions[0];

  return (
    <DashboardShell
      eyebrow="Guru Dashboard"
      title="Kelola Jadwal & Absensi"
      subtitle={`Halo, ${user.name}. Buat sesi baru, pantau kehadiran, dan kelola riwayat kelas dengan tampilan profesional.`}
      theme={theme}
      onThemeToggle={onThemeToggle}
      action={<button className="btn btn-secondary" onClick={onLogout}>Keluar</button>}
    >
      {loading && <div className="alert success">Memuat data guru...</div>}
      {message && <div className="alert">{message}</div>}

      <div className="stats-grid">
        <div className="metric-card">
          <span>Sesi Aktif</span>
          <strong>{stats.activeSessions ?? '-'}</strong>
        </div>
        <div className="metric-card">
          <span>Jumlah Siswa</span>
          <strong>{stats.totalStudents ?? '-'}</strong>
        </div>
        <div className="metric-card">
          <span>Absensi Hari Ini</span>
          <strong>{stats.attendanceToday ?? '-'}</strong>
        </div>
      </div>

      <section className="page-section">
        <div className="section-title">
          <div>
            <h2>Buat Sesi Absensi</h2>
            <p className="section-note">Tambahkan sesi mudah untuk kelas dan mata pelajaran yang Anda ajarkan.</p>
          </div>
        </div>
        <div className="panel-grid">
          <div className="panel">
            <form className="auth-form" onSubmit={handleCreateSession}>
              <div className="input-group">
                <label>Nama Kelas</label>
                {classes.length > 0 ? (
                  <select value={className} onChange={(e) => setClassName(e.target.value)} required>
                    {classes.map((kelas) => (
                      <option key={kelas.id} value={kelas.name}>{kelas.name}</option>
                    ))}
                  </select>
                ) : (
                  <input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Masukkan nama kelas" required />
                )}
              </div>
              <div className="input-group">
                <label>Mata Pelajaran</label>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Masukkan mata pelajaran" required />
              </div>
              <button className="btn btn-primary" type="submit">Buat Sesi</button>
            </form>
          </div>

          <div className="panel highlight-panel">
            <h3>Sesi Terbaru</h3>
            {latestSession ? (
              <div className="session-detail">
                <p className="label">{latestSession.className}</p>
                <h4>{latestSession.subject}</h4>
                <p className="muted-note">{latestSession.date} · Kode {latestSession.code}</p>
              </div>
            ) : (
              <p className="muted-note">Belum ada sesi aktif. Buat sesi baru untuk mulai mencatat absensi.</p>
            )}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-title">
          <h2>Daftar Sesi Aktif</h2>
        </div>
        <div className="panel table-card">
          <table>
            <thead>
              <tr>
                <th>Kelas</th>
                <th>Mata Pelajaran</th>
                <th>Tanggal</th>
                <th>Kode</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 && (
                <tr><td colSpan="4">Belum ada sesi aktif</td></tr>
              )}
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td>{session.className}</td>
                  <td>{session.subject}</td>
                  <td>{session.date}</td>
                  <td>{session.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
}

export default TeacherPage;
