import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  School, 
  LayoutDashboard, 
  Calendar, 
  ClipboardCheck, 
  Users, 
  Settings,
  BarChart3
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Teacher Home', path: '/' },
  { icon: LayoutDashboard, label: 'Student Home', path: '/student' },
  { icon: Calendar, label: 'My Schedule', path: '/schedule' },
  { icon: ClipboardCheck, label: 'Attendance', path: '/attendance' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col sticky top-0 h-screen w-64 border-r border-outline-variant bg-surface-container-low font-sans overflow-y-auto">
      <div className="p-6 border-b border-outline-variant flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
          <School className="w-6 h-6" />
        </div>
        <div>
          <div className="text-lg font-black text-primary">EduAttend Pro</div>
          <div className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Academic Management</div>
        </div>
      </div>
      
      <nav className="p-4 flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 cursor-pointer text-sm font-semibold",
              isActive 
                ? "bg-primary-fixed text-primary border-r-4 border-primary" 
                : "text-on-surface-variant hover:bg-surface-container"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
        
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 cursor-pointer text-sm font-semibold mt-auto",
            isActive 
              ? "bg-primary-fixed text-primary border-r-4 border-primary" 
              : "text-on-surface-variant hover:bg-surface-container"
          )}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}
