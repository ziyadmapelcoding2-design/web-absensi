import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../api.js';
import ThemeToggle from '../components/ThemeToggle.jsx';

function LoginPage({ onLogin, theme, onThemeToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login({ email, password });
      onLogin(response.user, response.token);
    } catch (err) {
      setError(err.message || 'Email atau password salah');
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
          <p className="auth-subtitle">
            Sistem absensi sekolah yang dirancang untuk mempermudah pengelolaan kehadiran guru dan murid.
          </p>
        </div>

        <div className="auth-body">
          {/* Menambahkan autoComplete="off" pada form sebagai pertahanan pertama */}
          <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
            
            <div className="input-group">
              <label htmlFor="email">Email Sekolah</label>
              <input
                id="email"
                type="email"
                name="email_absensi_new" // Menggunakan nama yang unik agar tidak dikenali browser sebagai form login lama
                placeholder="nama@sekolah.local"
                value={email}
                autoComplete="off" // Mematikan saran email
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Kata Sandi</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  name="password_absensi_new"
                  // 'new-password' adalah cara paling ampuh memaksa browser mengosongkan field password
                  autoComplete="new-password" 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {error && <div className="alert alert-login-error">{error}</div>}

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