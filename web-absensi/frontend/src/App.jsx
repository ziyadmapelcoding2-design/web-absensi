import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

  useEffect(() => {
    const stored = sessionStorage.getItem('web-absensi-user');
    if (stored) {
      setUser(JSON.parse(stored));
    }

    const storedTheme = localStorage.getItem('edu-attend-theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('edu-attend-theme', theme);
  }, [theme]);

  function handleLogin(loggedUser) {
    sessionStorage.setItem('web-absensi-user', JSON.stringify(loggedUser));
    setUser(loggedUser);
  }

  function handleLogout() {
    sessionStorage.removeItem('web-absensi-user');
    setUser(null);
  }

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/register" element={<RegisterPage theme={theme} onThemeToggle={toggleTheme} />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
