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
            <h1 className="auth-title">ABSENSI</h1>
            {onThemeToggle && <ThemeToggle theme={theme} onToggle={onThemeToggle} />}
          </div>
          <p className="auth-subtitle">Sistem absensi sekolah yang dirancang untuk mempermudah pengelolaan kehadiran guru dan murid.</p>
        </div>

        <div className="auth-body">
          {/* Bagian auth-hero telah dihapus dari sini */}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email sekolah</label>
              <input
                id="email"
                type="email"
                placeholder="nama@sekolah.local"
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

            {error && <div className="alert">{error}</div>}
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Memproses...' : 'MASUK'}
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