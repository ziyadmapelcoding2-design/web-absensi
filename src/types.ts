export type Student = {
  id: string;
  name: string;
  status: 'present' | 'absent' | 'late' | 'unmarked';
  time?: string;
  avatar?: string;
};

export type ClassSession = {
  id: string;
  subject: string;
  grade: string;
  room: string;
  startTime: string;
  endTime: string;
  status: 'past' | 'ongoing' | 'upcoming';
  attendanceRate?: number;
  studentsCount: number;
};

export type ActivityLog = {
  id: string;
  user: string;
  action: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  icon: string;
};
