import React from 'react';
import { Link } from 'react-router-dom';
import { School, User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Register() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-sans antialiased">
      <header className="w-full py-6 px-8 flex justify-center lg:justify-start">
        <Link to="/" className="flex items-center gap-2 text-primary group">
          <School className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="text-h3 text-on-surface tracking-tight font-black">EduTrack Academy</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-xl overflow-hidden flex flex-col"
        >
          <div className="px-8 pt-8 pb-6 text-center border-b border-outline-variant bg-surface-container-low/30">
            <h1 className="text-h2 text-on-surface mb-2 font-black">Create Your Account</h1>
            <p className="text-body-sm text-on-surface-variant font-medium">Join the modern scholarly system.</p>
          </div>

          <div className="p-8">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-label-md text-on-surface font-bold" htmlFor="role">Select Role</label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-white border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow cursor-pointer font-medium" 
                    id="role"
                  >
                    <option value="" disabled selected>Choose your role...</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Administrator</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              <RegisterField icon={User} label="Full Name" id="fullName" placeholder="Jane Doe" />
              <RegisterField icon={Mail} label="Email Address" id="email" type="email" placeholder="jane@institution.edu" />
              <RegisterField icon={Phone} label="Phone Number" id="phone" type="tel" placeholder="(555) 123-4567" />
              <RegisterField icon={Lock} label="Password" id="password" type="password" placeholder="••••••••" helperText="Must be at least 8 characters long." />

              <button 
                type="submit"
                className="mt-4 w-full bg-primary text-on-primary py-3 px-6 rounded-lg font-bold text-label-md hover:bg-primary-container transition-all flex justify-center items-center gap-2 group shadow-lg shadow-primary/20 active:scale-95"
              >
                <span>Register</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="px-8 py-6 bg-surface-container-low/50 border-t border-outline-variant text-center">
            <p className="text-body-sm text-on-surface-variant font-medium">
              Already have an account? <Link className="text-label-md text-primary hover:underline font-bold" to="/login">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center gap-2 text-primary">
          <School className="w-5 h-5" />
          <span className="text-lg font-black text-on-surface">EduTrack Academy</span>
        </div>
        <div className="flex gap-6">
          <a className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Privacy Policy</a>
          <a className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Terms of Service</a>
          <a className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Help Center</a>
        </div>
        <div className="text-xs text-on-surface-variant font-medium">
          © 2024 EduTrack Systems. Institutional Grade Precision.
        </div>
      </footer>
    </div>
  );
}

function RegisterField({ icon: Icon, label, id, type = 'text', placeholder, helperText }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-label-md text-on-surface font-bold" htmlFor={id}>{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
        <input 
          id={id}
          type={type}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow font-medium"
        />
      </div>
      {helperText && <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">{helperText}</p>}
    </div>
  );
}
