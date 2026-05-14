import { useEffect, useState } from 'react';
import { deleteUser, getClasses, getDashboardStats, getUsers } from '../api.js';
import DashboardShell from '../components/DashboardShell.jsx';

function AdminPage({ user, onLogout, theme, onThemeToggle }) {
  const [stats, setStats] = useState({});
  const [classes, setClasses] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const result = await getDashboardStats('admin');
        setStats(result);
        const classResult = await getClasses();
        setClasses(classResult.classes);
        const usersResult = await getUsers();
        setUsers(usersResult.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleDeleteUser(id) {
    const userToDelete = users.find((item) => item.id === id);
    if (!userToDelete) return;
    if (!window.confirm(`Hapus pengguna ${userToDelete.name}?`)) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((item) => item.id !== id));
      setStats((prev) => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <DashboardShell
      eyebrow="Admin Dashboard"
      title="Kelola Sistem Absensi Sekolah"
      subtitle={`Halo, ${user.name}. Pantau pengguna, kelas, dan performa kehadiran dengan tampilan profesional.`}
      theme={theme}
      onThemeToggle={onThemeToggle}
      action={<button className="btn btn-secondary" onClick={onLogout}>Keluar</button>}
    >
      {error && <div className="alert">{error}</div>}
      {loading && <div className="alert success">Memuat data dashboard...</div>}

      <div className="stats-grid">
        <div className="metric-card">
          <span>Total Pengguna</span>
          <strong>{stats.totalUsers ?? '-'}</strong>
        </div>
        <div className="metric-card">
          <span>Total Kelas</span>
          <strong>{stats.totalClasses ?? '-'}</strong>
        </div>
        <div className="metric-card">
          <span>Total Sesi Absensi</span>
          <strong>{stats.totalSessions ?? '-'}</strong>
        </div>
      </div>

      <section className="page-section">
        <div className="section-title">
          <div>
            <h2>Ringkasan Anggota</h2>
            <p className="section-note">Lihat sebaran pengguna dalam setiap peran dan kualitas data absensi.</p>
          </div>
        </div>

        <div className="panel user-role-grid">
          {(stats.usersByRole || []).map((item) => (
            <div key={item.role} className="role-card">
              <p>{item.role.charAt(0).toUpperCase() + item.role.slice(1)}</p>
              <strong>{item.count}</strong>
            </div>
          ))}
          {(!stats.usersByRole || stats.usersByRole.length === 0) && (
            <p className="muted-note">Tidak ada data peran pengguna.</p>
          )}
        </div>
      </section>

      <section className="page-section">
        <div className="section-title">
          <div>
            <h2>Data Pengguna</h2>
            <p className="section-note">Kelola daftar pengguna dan hapus akun yang tidak diperlukan.</p>
          </div>
        </div>
        <div className="panel table-card">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Peran</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr><td colSpan="4">Belum ada pengguna terdaftar</td></tr>
              )}
              {users.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-secondary btn-small" onClick={() => handleDeleteUser(item.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="page-section">
        <div className="section-title">
          <div>
            <h2>Overview Kehadiran</h2>
            <p className="section-note">Distribusi status kehadiran terbaru dari data sekolah.</p>
          </div>
        </div>
        <div className="panel">
          {(stats.attendanceByStatus || []).map((item) => {
            const totalAttendance = (stats.attendanceByStatus || []).reduce((sum, row) => sum + row.count, 0);
            const ratio = totalAttendance ? Math.round((item.count / totalAttendance) * 100) : 0;
            return (
              <div key={item.status} className="overview-row">
                <div className="overview-meta">
                  <span>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                  <strong>{ratio}%</strong>
                </div>
                <div className="progress-track">
                  <div className={`progress-fill ${item.status}`} style={{ width: `${ratio}%` }} />
                </div>
              </div>
            );
          })}
          {(!stats.attendanceByStatus || stats.attendanceByStatus.length === 0) && (
            <p className="muted-note">Belum ada data absensi yang dapat ditampilkan.</p>
          )}
        </div>
      </section>

      <section className="page-section">
        <div className="section-title">
          <div>
            <h2>Daftar Kelas</h2>
            <p className="section-note">Tabel kelas dan guru yang terdaftar dalam sistem.</p>
          </div>
        </div>
        <div className="panel table-card">
          <table>
            <thead>
              <tr>
                <th>Nama Kelas</th>
                <th>Guru</th>
              </tr>
            </thead>
            <tbody>
              {classes.length === 0 && (
                <tr><td colSpan="2">Belum ada kelas</td></tr>
              )}
              {classes.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
}

export default AdminPage;
