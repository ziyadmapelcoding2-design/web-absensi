import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api.js';
import ThemeToggle from '../components/ThemeToggle.jsx';

function RegisterPage({ onLogin, theme, onThemeToggle }) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State role dikosongkan agar placeholder "Pilih peran anda" muncul di awal
  const [role, setRole] = useState('');
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const roleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setIsRoleOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    
    // Validasi tambahan untuk memastikan peran sudah dipilih
    if (!role) {
      setError('Silakan pilih peran pengguna terlebih dahulu');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await register({ nama, email, password, role });
      onLogin(response.user, response.token);
      navigate('/');
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
              <label htmlFor="nama">Nama Lengkap</label>
              <input
                id="nama"
                type="text"
                name="full_name_absensi"
                placeholder="Nama lengkap"
                value={nama}
                autoComplete="off"
                className="focus:outline-none"
                onChange={(e) => setNama(e.target.value)}
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
                autoComplete="off"
                className="focus:outline-none"
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
                  name="new_user_password"
                  autoComplete="new-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••"
                  value={password}
                  className="focus:outline-none"
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

            <div className="input-group">
              <label htmlFor="role">Peran Pengguna</label>
              <select 
                id="role" 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="auth-select focus:outline-none"
                required
              >
                {/* Opsi default sebagai placeholder */}
                <option value="" disabled hidden>Pilih peran</option>
                <option value="siswa">Siswa</option>
                <option value="guru">Guru</option>
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
            <Link className="auth-link" to="/login">Masuk</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;