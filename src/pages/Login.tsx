import React from 'react';
import { Link } from 'react-router-dom';
import { School, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="bg-surface min-h-screen flex flex-col font-sans text-on-surface">
      <main className="flex-grow flex items-center justify-center p-gutter">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-container-lowest w-full max-w-md rounded-2xl border border-outline-variant shadow-xl overflow-hidden flex flex-col"
        >
          <div className="p-stack-lg border-b border-outline-variant flex flex-col items-center justify-center bg-surface-container-low/50">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <School className="w-12 h-12" />
            </div>
            <h1 className="text-h2 text-on-surface text-center font-black">Sign In to EduAttend</h1>
            <p className="text-body-sm text-on-surface-variant text-center mt-2 font-medium">Welcome back! Please enter your details.</p>
          </div>
          
          <div className="p-stack-lg flex-grow">
            <form className="flex flex-col gap-stack-md" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-label-md text-on-surface font-bold" htmlFor="email">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <input 
                    className="w-full rounded-lg border border-outline-variant bg-white pl-10 pr-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all font-medium" 
                    id="email" 
                    placeholder="name@school.edu" 
                    type="email" 
                    required 
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-label-md text-on-surface font-bold" htmlFor="password">Password</label>
                  <a className="text-label-sm text-primary hover:underline font-bold" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <input 
                    className="w-full rounded-lg border border-outline-variant bg-white pl-10 pr-12 py-3 text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all font-medium" 
                    id="password" 
                    placeholder="••••••••" 
                    required 
                    type={showPassword ? "text" : "password"} 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-on-surface-variant hover:text-on-surface focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-1">
                <input 
                  className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" 
                  id="remember" 
                  type="checkbox" 
                />
                <label className="text-body-sm text-on-surface-variant cursor-pointer font-medium" htmlFor="remember">Remember me for 30 days</label>
              </div>
              
              <Link
                to="/"
                className="mt-4 w-full bg-primary hover:bg-primary-container text-on-primary font-bold text-label-md py-3 rounded-lg transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
              >
                Sign In
              </Link>
            </form>
          </div>
          
          <div className="p-stack-md bg-surface-container-low border-t border-outline-variant text-center">
            <p className="text-body-sm text-on-surface-variant font-medium">
              Don't have an account? <Link className="text-label-md text-primary hover:underline font-bold" to="/register">Register</Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
