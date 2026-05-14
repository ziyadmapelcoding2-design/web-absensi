import React from 'react';
import { TopBar } from '@/src/components/Layout/TopBar';
import { 
  UserCheck, 
  Smile, 
  BadgeCheck, 
  TrendingUp, 
  LogIn, 
  QrCode, 
  AlertCircle, 
  UserPlus 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const data = [
  { name: 'Mon', value: 82 },
  { name: 'Tue', value: 88 },
  { name: 'Wed', value: 92 },
  { name: 'Thu', value: 96 },
  { name: 'Fri', value: 94 },
  { name: 'Sat', value: 0 },
  { name: 'Sun', value: 0 },
];

export function Reports() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <TopBar 
        title="Dashboard Overview" 
        subtitle="Today's snapshot and recent institutional activity." 
      />
      
      <div className="flex-1 p-margin-page overflow-y-auto bg-background">
        <div className="max-w-container-max mx-auto space-y-8">
          
          {/* Summary Cards Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              label="Today's Attendance Rate"
              value="94.2%"
              trend="+2.4%"
              icon={UserCheck}
              target="Target: 95.0%"
              color="primary"
            />
            <StatCard 
              label="Total Enrolled Students"
              value="1,248"
              status="Active"
              icon={Smile}
              breakdown={{ present: 1180, absent: 68 }}
              color="secondary"
            />
            <StatCard 
              label="Active Staff & Teachers"
              value="86"
              icon={BadgeCheck}
              note="3 Pending leave requests"
              color="primary"
            />
          </div>

          {/* Charts & Activity Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart Area */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 flex flex-col shadow-sm"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-h3 text-on-surface">Attendance Trends</h3>
                  <p className="text-body-sm text-on-surface-variant font-medium">Last 7 Days</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-outline-variant rounded-lg text-label-sm text-on-surface-variant hover:bg-surface-variant transition-colors font-bold">Week</button>
                  <button className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-label-sm text-primary transition-colors font-bold">Month</button>
                </div>
              </div>
              
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#777587', fontSize: 12, fontWeight: 500 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-inverse-surface text-inverse-on-surface px-3 py-1.5 rounded shadow-lg text-label-sm font-bold">
                              {`${payload[0].value}%`}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.value > 90 ? '#3525cd' : '#3525cd' + (Math.floor(entry.value * 2.55).toString(16).padStart(2, '0'))} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Activity List */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant flex flex-col overflow-hidden shadow-sm"
            >
              <div className="p-6 border-b border-outline-variant bg-surface-container-low/30">
                <h3 className="text-h3 text-on-surface">Recent Activity</h3>
                <p className="text-body-sm text-on-surface-variant font-medium">Live system updates</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ul className="divide-y divide-outline-variant/30 font-medium">
                  <ActivityItem 
                    icon={LogIn} 
                    title="Dr. Sarah Jenkins logged in." 
                    time="2 mins ago • Web Portal" 
                    color="primary"
                  />
                  <ActivityItem 
                    icon={QrCode} 
                    title="10th Grade Biology attendance completed." 
                    time="15 mins ago • Mobile Scanner" 
                    color="tertiary"
                  />
                  <ActivityItem 
                    icon={AlertCircle} 
                    title="System Alert: High absence rate in Block C." 
                    time="1 hour ago • Auto-generated" 
                    color="error"
                  />
                  <ActivityItem 
                    icon={UserPlus} 
                    title="Admin User added 5 new student profiles." 
                    time="3 hours ago • Bulk Import" 
                    color="primary"
                  />
                </ul>
              </div>
              <div className="p-4 border-t border-outline-variant bg-surface text-center">
                <button className="text-label-md text-primary hover:underline font-bold">View All Logs</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, status, icon: Icon, target, breakdown, note, color }: any) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 flex flex-col relative overflow-hidden group shadow-sm transition-all"
    >
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110",
        color === 'primary' ? 'bg-primary/5' : 'bg-secondary/5'
      )} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
          color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
        )}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="inline-flex items-center gap-1 text-label-sm text-tertiary bg-tertiary-container/10 px-2.5 py-1 rounded-md font-bold">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
        {status && (
          <span className="inline-flex items-center gap-1 text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-md font-bold">
            {status}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-label-md text-on-surface-variant mb-1 font-bold">{label}</p>
        <h3 className="text-h1 text-on-surface font-black">{value}</h3>
      </div>
      
      {target && <p className="text-body-sm text-outline mt-2 font-bold">{target}</p>}
      {note && <p className="text-body-sm text-outline mt-2 font-bold">{note}</p>}
      
      {breakdown && (
        <div className="flex items-center gap-4 mt-3">
          <span className="text-[11px] font-bold text-outline uppercase flex items-center gap-1.5 letters">
            <span className="w-2 h-2 rounded-full bg-tertiary-container"></span> 
            {breakdown.present} Present
          </span>
          <span className="text-[11px] font-bold text-outline uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-error"></span> 
            {breakdown.absent} Absent
          </span>
        </div>
      )}
    </motion.div>
  );
}

function ActivityItem({ icon: Icon, title, time, color }: any) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    tertiary: 'bg-tertiary-container/10 text-tertiary-container',
    error: 'bg-error/10 text-error',
  };

  return (
    <li className="p-4 hover:bg-surface-container-low transition-colors flex gap-4 items-start">
      <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5", (colorClasses as any)[color])}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-body-sm text-on-surface leading-tight">{title}</p>
        <p className="text-label-sm text-outline mt-1 font-bold opacity-70">{time}</p>
      </div>
    </li>
  );
}
