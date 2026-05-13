import React, { useState } from 'react';
import { TopBar } from '@/web-absensi/src/components/Layout/TopBar';
import { 
  MapPin, 
  Camera, 
  Maximize, 
  Keyboard, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/web-absensi/src/lib/utils';

export function AttendanceSession() {
  const [sessionCode, setSessionCode] = useState('');

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <TopBar title="Attendance" />
      
      <div className="flex-1 p-margin-page max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Scanner & Status */}
        <div className="lg:col-span-8 flex flex-col gap-gutter">
          {/* Status Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container rounded-xl p-4 flex items-center gap-4 border border-outline-variant shadow-sm"
          >
            <div className="bg-tertiary-container text-on-tertiary-container p-3 rounded-full flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Current Class Detected</p>
              <h2 className="text-h3 text-on-surface mt-1">Physics II - Room 302</h2>
              <p className="text-body-sm text-secondary mt-1 font-medium">Prof. J. Smith • 10:00 AM - 11:30 AM</p>
            </div>
          </motion.div>

          {/* Scanner Card */}
          <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col relative h-[500px]">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest z-10 relative">
              <h3 className="text-h3 text-on-surface">Scan QR Code</h3>
              <button className="text-primary hover:text-primary-container transition-colors">
                <Camera className="w-6 h-6" />
              </button>
            </div>
            
            {/* Simulated Camera View */}
            <div className="flex-1 relative bg-inverse-surface flex items-center justify-center overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeFv8c3STBjgQcr0NiXISJGqAY8lfBsW8IBj7pyq5dUHKmeCi6FrKZ5p1aOlgc1B3Ieoq4AxLSiEdxH6-AeIRy4iAyDBb1WolZiQoOzU6zU0sVzXtaOeo4mIh0rkZ1rOPtzUA70meM_VLlkdmHcytPqSseSRDllMvF0i-F8b99_nTIDri_nHsm_lmkwaHzdxKQ3nwAFC2mc_QSJqawe7SLOjyT1gonJGyAbkvSaPjcK5M2pCJTXd6NtYC4I9lHf85UrlIzZphEUJM"
                alt="Student scanning QR code" 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              
              {/* Overlay/Scanner Frame */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-64 h-64 border-4 border-primary rounded-lg relative">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-tertiary-container -mt-1.5 -ml-1.5 rounded-tl-sm"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-tertiary-container -mt-1.5 -mr-1.5 rounded-tr-sm"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-tertiary-container -mb-1.5 -ml-1.5 rounded-bl-sm"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-tertiary-container -mb-1.5 -mr-1.5 rounded-br-sm"></div>
                  
                  {/* Scanning line animation */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-full h-1 bg-tertiary-container absolute left-0 shadow-[0_0_8px_rgba(0,110,75,0.8)] opacity-75" 
                  />
                </div>
              </div>
              
              <p className="absolute bottom-6 text-white text-body-md text-center px-4 w-full drop-shadow-lg font-medium">
                Align QR code within the frame to check in automatically.
              </p>
              
              <button className="absolute bottom-16 right-6 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Manual Entry & History */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          {/* Manual Entry Card */}
          <div className="bg-surface rounded-xl border border-outline-variant p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Keyboard className="w-6 h-6 text-primary" />
              <h3 className="text-h3 text-on-surface">Manual Entry</h3>
            </div>
            <p className="text-body-sm text-on-surface-variant mb-6 font-medium">
              If you cannot scan the QR code, enter the 6-digit session code provided by your instructor.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-label-md text-on-surface mb-2 font-bold" htmlFor="session-code">Session Code</label>
                <input 
                  type="text" 
                  id="session-code"
                  maxLength={7}
                  placeholder="e.g. 842 109"
                  value={sessionCode}
                  onChange={(e) => setSessionCode(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-h3 text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline text-center tracking-widest font-mono"
                />
              </div>
              <button className="w-full bg-primary hover:bg-primary-container text-on-primary text-label-md py-3 rounded-lg transition-colors font-bold flex items-center justify-center gap-2 group">
                <span>Submit Code</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* History Card */}
          <div className="bg-surface rounded-xl border border-outline-variant shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-outline-variant bg-surface-container-lowest">
              <h3 className="text-h3 text-on-surface">Recent Check-ins</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-outline-variant/30">
                <HistoryItem title="Calculus I" time="Yesterday, 9:00 AM" status="present" />
                <HistoryItem title="Intro to CS" time="Oct 24, 2:00 PM" status="present" />
                <HistoryItem title="English Lit" time="Oct 23, 11:00 AM" status="absent" />
                <HistoryItem title="Physics II" time="Oct 22, 10:00 AM" status="present" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryItem({ title, time, status }: { title: string, time: string, status: 'present' | 'absent' }) {
  const isPresent = status === 'present';
  
  return (
    <li className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
      <div className="flex items-center gap-3">
        <div className={cn("w-2 h-2 rounded-full", isPresent ? "bg-tertiary-container" : "bg-error")} />
        <div>
          <p className="text-label-md text-on-surface group-hover:text-primary transition-colors">{title}</p>
          <p className="text-body-sm text-on-surface-variant font-medium">{time}</p>
        </div>
      </div>
      {isPresent ? (
        <CheckCircle2 className="w-5 h-5 text-tertiary-container" />
      ) : (
        <span className="text-label-sm text-error font-bold italic">Absent</span>
      )}
    </li>
  );
}
