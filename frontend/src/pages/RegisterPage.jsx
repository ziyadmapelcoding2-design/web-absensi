import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../api.js';
import ThemeToggle from '../components/ThemeToggle.jsx';

function RegisterPage({ onLogin, theme, onThemeToggle }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function clearError() {
    if (error) setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!role) {
      setError('Silakan pilih peran pengguna terlebih dahulu');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await register({ name, email, password, role });
      onLogin(response.user, response.token);
    } catch (err) {
      setError(err.message || 'Gagal melakukan pendaftaran');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-header">
          <div className="auth-header-top">
            <h1 className="auth-title">PENDAFTARAN</h1>
            {onThemeToggle && <ThemeToggle theme={theme} onToggle={onThemeToggle} />}
          </div>
          <p className="auth-subtitle">
            Buat akun terlebih dahulu sebelum memasuki sistem absensi sekolah.
          </p>
        </div>

        <div className="auth-body">
          <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="input-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                id="name"
                type="text"
                name="full_name_absensi"
                placeholder="Nama lengkap"
                value={name}
                autoComplete="name"
                className="focus:outline-none"
                onChange={(event) => {
                  setName(event.target.value);
                  clearError();
                }}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Sekolah</label>
              <input
                id="email"
                type="email"
                name="new_user_email"
                placeholder="nama@sekolah.id"
                value={email}
                autoComplete="email"
                className="focus:outline-none"
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearError();
                }}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Kata Sandi</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  name="new_user_password"
                  autoComplete="new-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••"
                  value={password}
                  className="focus:outline-none"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    clearError();
                  }}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="role">Peran Pengguna</label>
              <select
                id="role"
                value={role}
                onChange={(event) => {
                  setRole(event.target.value);
                  clearError();
                }}
                className="auth-select focus:outline-none"
                required
              >
                <option value="" disabled hidden>Pilih peran</option>
                <option value="student">Siswa</option>
                <option value="teacher">Guru</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {error && <div className="alert alert-login-error">{error}</div>}

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="auth-footer">
            <span>Sudah punya akun?</span>
            <Link className="auth-link" to="/">Masuk</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
