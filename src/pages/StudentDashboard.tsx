import React from 'react';
import { TopBar } from '@/src/components/Layout/TopBar';
import { 
  QrCode, 
  CheckCircle2, 
  Clock, 
  History, 
  ListFilter,
  XCircle,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function StudentDashboard() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <TopBar title="Dashboard" />
      
      <main className="flex-1 p-margin-page max-w-container-max mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
        >
          <div>
            <h2 className="text-h2 text-on-surface font-black">Welcome back, Alex</h2>
            <p className="text-body-md text-on-surface-variant font-medium">Here is your attendance overview for the Fall Semester.</p>
          </div>
          <button className="bg-primary text-on-primary px-6 py-4 rounded-xl text-label-md font-bold flex items-center gap-3 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 duration-150 w-full lg:w-auto justify-center">
            <QrCode className="w-5 h-5" />
            Scan QR to Attend
          </button>
        </motion.div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Attendance Overview (Circular Progress) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant p-8 shadow-sm flex flex-col items-center justify-center min-h-[350px]"
          >
            <h3 className="text-h3 text-on-surface mb-8 w-full text-left font-black">Overall Attendance</h3>
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* SVG Circular Progress */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path 
                  className="text-surface-container-high stroke-current" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  strokeWidth="3.5" 
                />
                <motion.path 
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: "85, 100" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-primary stroke-current" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[48px] leading-none font-black text-on-surface">85%</span>
                <span className="text-label-md text-on-surface-variant font-bold uppercase tracking-widest mt-1">Present</span>
              </div>
            </div>
            <div className="mt-8 flex justify-between w-full text-label-sm font-bold px-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-on-surface-variant">Present: 34</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <span className="text-on-surface-variant">Absent: 6</span>
              </div>
            </div>
          </motion.div>

          {/* Today's Schedule */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant p-8 shadow-sm flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <h3 className="text-h3 text-on-surface font-black">Today's Schedule</h3>
                <span className="bg-primary-fixed text-primary px-2 py-0.5 rounded text-[10px] font-black uppercase">Active</span>
              </div>
              <button className="text-label-sm text-primary font-bold hover:underline flex items-center gap-1.5 transition-all">
                <Calendar className="w-4 h-4" />
                View Full Calendar
              </button>
            </div>
            
            <div className="flex-1 flex flex-col gap-5">
              <ScheduleItem 
                time="09:00" 
                period="AM" 
                title="Advanced Mathematics" 
                info="Room 302 • Prof. Davis" 
                status="attended" 
              />
              <ScheduleItem 
                time="11:30" 
                period="AM" 
                title="Computer Science 101" 
                info="Lab 4 • Dr. Smith" 
                current 
              />
              <ScheduleItem 
                time="02:00" 
                period="PM" 
                title="Physics II" 
                info="Hall B • Prof. Johnson" 
                status="upcoming" 
              />
            </div>
          </motion.div>

          {/* Attendance History Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-12 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden mt-2"
          >
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-h3 text-on-surface font-black">Recent History</h3>
              </div>
              <button className="text-on-surface-variant hover:text-primary flex items-center gap-2 text-label-sm font-bold transition-colors">
                <ListFilter className="w-4 h-4" /> 
                Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50 border-b border-outline-variant">
                    <th className="p-5 text-label-sm text-on-surface-variant uppercase tracking-widest font-black">Date</th>
                    <th className="p-5 text-label-sm text-on-surface-variant uppercase tracking-widest font-black">Subject</th>
                    <th className="p-5 text-label-sm text-on-surface-variant uppercase tracking-widest font-black">Status</th>
                    <th className="p-5 text-label-sm text-on-surface-variant uppercase tracking-widest font-black">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 font-medium">
                  <HistoryRow date="Oct 12, 2023" subject="Advanced Mathematics" status="present" />
                  <HistoryRow date="Oct 11, 2023" subject="Computer Science 101" status="present" />
                  <HistoryRow date="Oct 10, 2023" subject="Physics II" status="absent" note="Medical appointment" />
                  <HistoryRow date="Oct 09, 2023" subject="Literature" status="late" note="10 mins late due to transit" />
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function ScheduleItem({ time, period, title, info, status, current }: any) {
  return (
    <div className={cn(
      "flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300",
      current 
        ? "bg-primary-fixed/20 border-primary shadow-sm border-l-8" 
        : "bg-surface-container-lowest border-outline-variant",
      status === 'upcoming' && "opacity-60"
    )}>
      <div className="flex flex-col items-center justify-center min-w-[70px] border-r border-outline-variant pr-5">
        <span className={cn("text-h3 leading-none", current ? "text-primary" : "text-on-surface")}>{time}</span>
        <span className={cn("text-label-sm font-bold uppercase tracking-widest mt-1", current ? "text-primary" : "text-on-surface-variant")}>
          {period}
        </span>
      </div>
      <div className="flex-1">
        <h4 className={cn("text-label-md font-black", current ? "text-on-surface" : "text-on-surface")}>{title}</h4>
        <p className="text-body-sm text-on-surface-variant font-medium mt-1">{info}</p>
      </div>
      <div className="flex items-center gap-3">
        {status === 'attended' && (
          <span className="px-4 py-1.5 bg-tertiary-container/10 text-tertiary-container rounded-full text-label-sm font-black flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Attended
          </span>
        )}
        {current && (
          <button className="p-3 bg-primary text-on-primary rounded-xl hover:bg-primary-container transition-all active:scale-90 shadow-md shadow-primary/20">
            <QrCode className="w-6 h-6" />
          </button>
        )}
        {status === 'upcoming' && (
          <span className="text-label-sm text-on-surface-variant font-black flex items-center gap-2 uppercase tracking-widest">
            <Clock className="w-4 h-4" /> Upcoming
          </span>
        )}
      </div>
    </div>
  );
}

function HistoryRow({ date, subject, status, note = '-' }: any) {
  const statusConfig = {
    present: { label: 'Present', color: 'bg-tertiary-container/10 text-tertiary-container', icon: CheckCircle2 },
    absent: { label: 'Absent', color: 'bg-error-container text-on-error-container', icon: XCircle },
    late: { label: 'Late', color: 'bg-surface-dim text-on-surface-variant', icon: Clock },
  };

  const config = (statusConfig as any)[status];
  const Icon = config.icon;

  return (
    <tr className="hover:bg-surface-container-low transition-colors group">
      <td className="p-5 text-body-sm text-on-surface font-semibold">{date}</td>
      <td className="p-5 text-body-sm text-on-surface font-semibold group-hover:text-primary transition-colors">{subject}</td>
      <td className="p-5">
        <span className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-label-sm font-bold", config.color)}>
          <Icon className="w-4 h-4" />
          {config.label}
        </span>
      </td>
      <td className="p-5 text-body-sm text-on-surface-variant font-medium italic">{note}</td>
    </tr>
  );
}
