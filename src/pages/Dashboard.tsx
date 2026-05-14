import React from 'react';
import { TopBar } from '../components/Layout/TopBar';
import { MapPin, BarChart3, UserCheck, Hourglass, Clock, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { ClassSession } from '../types';

const mockClasses: ClassSession[] = [
  {
    id: '1',
    subject: 'Mathematics',
    grade: '10th Grade A',
    room: 'Room 302',
    startTime: '08:00 AM',
    endTime: '09:30 AM',
    status: 'past',
    attendanceRate: 95,
    studentsCount: 24,
  },
  {
    id: '2',
    subject: 'Physics',
    grade: '11th Grade Science',
    room: 'Science Lab A',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    status: 'ongoing',
    studentsCount: 28,
  },
  {
    id: '3',
    subject: 'Computer Science',
    grade: '12th Grade IT',
    room: 'Computer Lab 1',
    startTime: '01:00 PM',
    endTime: '02:30 PM',
    status: 'upcoming',
    studentsCount: 22,
  },
];

export function Dashboard() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <TopBar 
        title="Today's Subjects" 
        subtitle="Manage attendance for your assigned classes." 
      />
      
      <div className="flex-1 p-margin-page bg-background">
        <div className="max-w-container-max mx-auto">
          {/* Date Header */}
          <div className="flex items-center justify-between mb-stack-lg">
            <h2 className="text-h2 text-on-surface">Tuesday, Oct 24</h2>
            <div className="flex items-center gap-2 text-primary text-label-md bg-primary-fixed px-3 py-1.5 rounded-full">
              <CalendarDays className="w-4 h-4" />
              <span>Term 1, Week 8</span>
            </div>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {mockClasses.map((cls) => (
              <React.Fragment key={cls.id}>
                <ClassCard cls={cls} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassCard({ cls }: { cls: ClassSession }) {
  const isPast = cls.status === 'past';
  const isOngoing = cls.status === 'ongoing';
  const isUpcoming = cls.status === 'upcoming';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={cn(
        "bg-surface border rounded-xl overflow-hidden flex flex-col relative transition-all duration-300",
        isOngoing ? "border-primary shadow-lg ring-4 ring-primary-fixed" : "border-outline-variant",
        isPast && "opacity-75"
      )}
    >
      {/* Indicator Line */}
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full",
        isPast && "bg-secondary",
        isOngoing && "bg-primary w-1.5",
        isUpcoming && "bg-outline-variant"
      )} />

      {/* Badge for Ongoing */}
      {isOngoing && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-error-container text-on-error-container px-2 py-1 rounded-full text-label-sm animate-pulse">
          <span className="w-2 h-2 rounded-full bg-error"></span>
          In Session
        </div>
      )}

      <div className={cn(
        "p-stack-md border-b border-outline-variant/50 flex justify-between items-start",
        isPast && "bg-surface-container-low",
        isOngoing && "bg-primary-fixed/20 border-primary/10 mt-2"
      )}>
        <div>
          <h3 className="text-h3 text-on-surface">{cls.subject}</h3>
          <p className="text-body-sm text-on-surface-variant font-medium">{cls.grade}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className={cn("text-label-md", isOngoing ? "text-primary" : "text-on-surface")}>
            {cls.startTime}
          </span>
          <span className="text-body-sm text-on-surface-variant">{cls.endTime}</span>
        </div>
      </div>

      <div className="p-stack-md flex-1 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
          <MapPin className="w-4 h-4" />
          <span className="text-body-sm font-medium">{cls.room}</span>
        </div>

        {isPast && cls.attendanceRate !== undefined && (
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-surface-variant h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${cls.attendanceRate}%` }}
                className="bg-tertiary-container h-full" 
              />
            </div>
            <span className="text-label-sm text-tertiary-container font-bold">{cls.attendanceRate}% Present</span>
          </div>
        )}

        {isOngoing && (
          <div className="bg-surface-container p-3 rounded-lg border border-primary/20">
            <p className="text-body-sm text-on-surface-variant text-center font-medium">
              {cls.studentsCount} students assigned
            </p>
          </div>
        )}

        {isUpcoming && (
          <div className="flex items-center justify-center gap-2 text-secondary bg-surface-container-low py-2 rounded-lg border border-outline-variant border-dashed">
            <Clock className="w-4 h-4" />
            <span className="text-label-sm font-bold">Starts in 2h 15m</span>
          </div>
        )}
      </div>

      <div className="p-stack-md pt-0 mt-auto">
        {isPast && (
          <button className="w-full py-2 px-4 rounded-lg border border-outline text-secondary text-label-md flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors font-bold">
            <BarChart3 className="w-4 h-4" />
            View Report
          </button>
        )}
        {isOngoing && (
          <button className="w-full py-3 px-4 rounded-lg bg-primary text-on-primary text-label-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm font-bold">
            <UserCheck className="w-5 h-5" />
            Start Attendance Session
          </button>
        )}
        {isUpcoming && (
          <button className="w-full py-2 px-4 rounded-lg bg-surface-container text-on-surface-variant text-label-md flex items-center justify-center gap-2 cursor-not-allowed opacity-70 font-bold">
            <Hourglass className="w-4 h-4" />
            Waiting
          </button>
        )}
      </div>
    </motion.div>
  );
}
