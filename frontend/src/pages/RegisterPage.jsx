import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api.js';
import ThemeToggle from '../components/ThemeToggle.jsx';

function RegisterPage({ theme, onThemeToggle }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // 1. Kirim data ke backend
      const response = await register({ name, email, password, role });
      
      // 2. LOGIKA BARU: Simpan token (gelang) yang dikirim server ke localStorage
      if (response && response.token) {
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        
        setSuccess('Registrasi berhasil! Mengalihkan ke dashboard...');
        
        // 3. Langsung pindah ke halaman utama/dashboard
        setTimeout(() => {
          navigate('/dashboard'); // Ganti '/dashboard' sesuai rute utama Anda
        }, 1200);
      } else {
        // Jika server hanya kirim sukses tanpa login otomatis (opsional)
        setSuccess('Akun berhasil dibuat. Silakan masuk.');
        setTimeout(() => navigate('/'), 2000);
      }
      
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat mendaftar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-header">
          <div className="auth-header-top">
            <h1 className="auth-title">Daftar di EduAttend</h1>
            {onThemeToggle && <ThemeToggle theme={theme} onToggle={onThemeToggle} />}
          </div>
          <p className="auth-subtitle">Buat akun untuk mengelola absensi sekolah dengan tampilan dashboard profesional.</p>
        </div>

        <div className="auth-body">
          <div className="auth-hero">
            Pilih peran pengguna, isi data sekolah, dan mulai gunakan sistem absensi yang terintegrasi.
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Nama lengkap</label>
              <input
                id="name"
                type="text"
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div className="input-group">
              <label htmlFor="role">Peran pengguna</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="teacher">Guru</option>
                <option value="student">Siswa</option>
              </select>
            </div>

            {error && <div className="alert">{error}</div>}
            {success && <div className="alert success">{success}</div>}

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Membuat akun...' : 'Daftar Sekarang'}
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