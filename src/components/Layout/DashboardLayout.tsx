import React from 'react';
import { Sidebar } from './Sidebar';
import { Calendar, QrCode, History, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </div>
        
        {/* Mobile Navbar */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 pb-safe md:hidden bg-surface-container-lowest border-t border-outline-variant backdrop-blur-md bg-opacity-90">
          <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'}`}>
            <Calendar className="w-5 h-5 mb-1" />
            <span className="text-[10px]">Schedule</span>
          </NavLink>
          <NavLink to="/attendance" className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'}`}>
            <QrCode className="w-5 h-5 mb-1" />
            <span className="text-[10px]">Scan</span>
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'}`}>
            <History className="w-5 h-5 mb-1" />
            <span className="text-[10px]">History</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'}`}>
            <User className="w-5 h-5 mb-1" />
            <span className="text-[10px]">Profile</span>
          </NavLink>
        </nav>
      </main>
    </div>
  );
}
