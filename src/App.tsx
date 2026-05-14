import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { StudentDashboard } from './pages/StudentDashboard';
import { AttendanceSession } from './pages/AttendanceSession';
import { Profile } from './pages/Profile';
import { Reports } from './pages/Reports';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/student" element={<DashboardLayout><StudentDashboard /></DashboardLayout>} />
        <Route path="/attendance" element={<DashboardLayout><AttendanceSession /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
        <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
