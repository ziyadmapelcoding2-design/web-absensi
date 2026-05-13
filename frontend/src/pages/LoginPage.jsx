import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api.js';
import ThemeToggle from '../components/ThemeToggle.jsx';

function LoginPage({ onLogin, theme, onThemeToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login({ email, password });
      onLogin(response.user);
      if (response.user.role === 'admin') navigate('/admin');
      if (response.user.role === 'teacher') navigate('/teacher');
      if (response.user.role === 'student') navigate('/student');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-header">
          <div className="auth-header-top">
            <h1 className="auth-title">EduAttend</h1>
            {onThemeToggle && <ThemeToggle theme={theme} onToggle={onThemeToggle} />}
          </div>
          <p className="auth-subtitle">Sistem absensi sekolah cerdas yang dirancang untuk admin, guru, dan siswa.</p>
        </div>

        <div className="auth-body">
          <div className="auth-hero">
            Masuk untuk melihat statistik real-time, buat sesi absensi, dan catat kehadiran dengan cepat.
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email sekolah</label>
              <input
                id="email"
                type="email"
                placeholder="name@school.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Kata sandi</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="demo-credentials">
              <p>Gunakan akun demo untuk mencoba aplikasi:</p>
              <ul>
                <li><strong>Admin</strong>: admin@sekolah.local / admin123</li>
                <li><strong>Guru</strong>: teacher@sekolah.local / guru123</li>
                <li><strong>Siswa</strong>: student@sekolah.local / siswa123</li>
              </ul>
            </div>

            {error && <div className="alert">{error}</div>}
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk ke EduAttend'}
            </button>
          </form>

          <div className="auth-footer">
            <span>Belum punya akun?</span>
            <Link className="auth-link" to="/register">Daftar sekarang</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
