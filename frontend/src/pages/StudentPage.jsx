import { useEffect, useState } from 'react';
import { getDashboardStats, getRecords, getSessions, submitAttendance } from '../api.js';
import DashboardShell from '../components/DashboardShell.jsx';

function StudentPage({ user, onLogout, theme, onThemeToggle }) {
  const [stats, setStats] = useState({});
  const [sessions, setSessions] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [status, setStatus] = useState('present');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadData() {
      const dashboard = await getDashboardStats('student', user.name);
      setStats(dashboard);
      const sessionResult = await getSessions('student');
      setSessions(sessionResult.sessions);
      if (sessionResult.sessions.length > 0) {
        setSelectedSession(sessionResult.sessions[0].id.toString());
      }
      const recordResult = await getRecords(user.name);
      setRecords(recordResult.records);
    }
    loadData();

    // Auto-refresh sessions every 30 seconds to show newly created sessions
    const interval = setInterval(async () => {
      try {
        const sessionResult = await getSessions('student');
        setSessions(sessionResult.sessions);
        if (sessionResult.sessions.length > 0 && !sessionResult.sessions.find(s => s.id.toString() === selectedSession)) {
          setSelectedSession(sessionResult.sessions[0].id.toString());
        }
      } catch (err) {
        console.error('Failed to refresh sessions:', err);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [user.name]);


  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (sessions.length === 0) {
      setMessage('Tidak ada sesi absensi tersedia saat ini.');
      return;
    }

    try {
      await submitAttendance({
        sessionId: selectedSession,
        studentName: user.name,
        studentId: `STD-${user.id.toString().padStart(3, '0')}`,
        status
      });
      setMessage('Absensi berhasil dikirim.');
      const recordResult = await getRecords(user.name);
      setRecords(recordResult.records);
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <DashboardShell
      eyebrow="Siswa Dashboard"
      title="Catat Kehadiran dengan Cepat"
      subtitle={`Halo, ${user.name}. Pilih sesi yang tersedia dan kirimkan kehadiran dengan antarmuka modern.`}
      theme={theme}
      onThemeToggle={onThemeToggle}
      action={<button className="btn btn-secondary" onClick={onLogout}>Keluar</button>}
    >
      <div className="stats-grid">
        <div className="metric-card">
          <span>Sesi Tersedia</span>
          <strong>{sessions.length}</strong>
        </div>
        <div className="metric-card">
          <span>Riwayat Absensi</span>
          <strong>{records.length}</strong>
        </div>
      </div>

      <section className="page-section">
        <div className="section-title">
          <h2>Isi Absensi</h2>
        </div>
        <div className="panel-grid">
          <div className="panel">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Pilih Sesi</label>
                <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)} disabled={sessions.length === 0}>
                  {sessions.length === 0 ? (
                    <option value="">Tidak ada sesi tersedia</option>
                  ) : (
                    sessions.map((session) => (
                      <option key={session.id} value={session.id}>{`${session.className} - ${session.subject}`}</option>
                    ))
                  )}
                </select>
              </div>
              <div className="input-group">
                <label>Status Kehadiran</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={sessions.length === 0}>
                  <option value="present">Hadir</option>
                  <option value="late">Telat</option>
                  <option value="absent">Tidak Hadir</option>
                  <option value="sick">Sakit</option>
                </select>
              </div>
              <button className="btn btn-primary" type="submit" disabled={sessions.length === 0}>
                {sessions.length === 0 ? 'Tidak ada sesi tersedia' : 'Kirim Absensi'}
              </button>
            </form>
            {message && <div className="alert">{message}</div>}
          </div>

          <div className="panel highlight-panel">
            <h3>Status Terakhir</h3>
            {records.length > 0 ? (
              <div className="records-list">
                {records.slice(0, 4).map((record) => (
                  <div key={record.id} className="record-row">
                    <div>
                      <p className="label">{record.studentName}</p>
                      <p className="muted-note">{record.time} · {record.studentId}</p>
                    </div>
                    <span className={`status-pill status-${record.status}`}>{record.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted-note">Belum ada riwayat absensi. Setelah mengirim, riwayat akan tampil di sini.</p>
            )}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-title">
          <h2>Daftar Sesi Tersedia</h2>
        </div>
        <div className="panel table-card">
          <table>
            <thead>
              <tr>
                <th>Kelas</th>
                <th>Mata Pelajaran</th>
                <th>Tanggal</th>
                <th>Kode Sesi</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 && (
                <tr><td colSpan="4">Belum ada sesi tersedia</td></tr>
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

export default StudentPage;
