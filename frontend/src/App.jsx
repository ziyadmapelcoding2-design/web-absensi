import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import TeacherPage from './pages/TeacherPage.jsx';
import StudentPage from './pages/StudentPage.jsx';

function ProtectedRoute({ user, role, children }) {
  if (!user) return <Navigate to="/" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [isInitializing, setIsInitializing] = useState(true); // Untuk mencegah kedipan layar
  const navigate = useNavigate();

  // 1. Jalankan pengecekan saat aplikasi pertama kali dimuat
  useEffect(() => {
    // Ambil data user dan token dari localStorage (Kantong permanen)
    const storedUser = localStorage.getItem('web-absensi-user');
    const token = localStorage.getItem('userToken');

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Jika user sudah login dan sedang di halaman depan (/ atau /register), 
      // langsung lempar ke dashboard masing-masing
      const currentPath = window.location.pathname;
      if (currentPath === '/' || currentPath === '/register') {
        navigate(`/${parsedUser.role}`);
      }
    }
    
    // Load Tema
    const storedTheme = localStorage.getItem('edu-attend-theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }

    setIsInitializing(false);
  }, [navigate]);

  // 2. Efek untuk ganti tema
  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('edu-attend-theme', theme);
  }, [theme]);

  // 3. Fungsi saat Login Berhasil
  function handleLogin(loggedUser, token) {
    // Simpan permanen agar tidak perlu login ulang
    localStorage.setItem('web-absensi-user', JSON.stringify(loggedUser));
    localStorage.setItem('userToken', token);
    
    setUser(loggedUser);
    // Langsung arahkan ke halaman sesuai role (admin/teacher/student)
    navigate(`/${loggedUser.role}`);
  }

  // 4. Fungsi Logout
  function handleLogout() {
    localStorage.removeItem('web-absensi-user');
    localStorage.removeItem('userToken');
    setUser(null);
    navigate('/');
  }

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }

  // Jika sedang mengecek token, tampilkan loading sebentar
  if (isInitializing) return null;

  return (
    <div className="app-shell">
      <Routes> 
        {/* Halaman Login & Register */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/register" element={<RegisterPage onLogin={handleLogin} theme={theme} onThemeToggle={toggleTheme} />} />
        
        {/* Halaman yang diproteksi */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin">
              <AdminPage user={user} onLogout={handleLogout} theme={theme} onThemeToggle={toggleTheme} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute user={user} role="teacher">
              <TeacherPage user={user} onLogout={handleLogout} theme={theme} onThemeToggle={toggleTheme} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute user={user} role="student">
              <StudentPage user={user} onLogout={handleLogout} theme={theme} onThemeToggle={toggleTheme} />
            </ProtectedRoute>
          }
        />

        {/* Jika nyasar, balikkan ke awal */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;