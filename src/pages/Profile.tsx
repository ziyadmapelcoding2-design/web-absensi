import React from 'react';
import { TopBar } from '@/web-absensi/src/components/Layout/TopBar';
import { 
  User, 
  Lock, 
  Bell, 
  Camera, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/web-absensi/src/lib/utils';

export function Profile() {
  return (
    <div className="flex-1 flex flex-col min-h-screen pb-24 md:pb-10">
      <TopBar title="Profile Settings" subtitle="Manage your account details and preferences." />
      
      <div className="flex-1 p-margin-page max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Avatar & Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 flex flex-col items-center text-center"
            >
              <div className="relative group cursor-pointer mb-4">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgv2uDGDoI6hRRVfyjo2bUZ8mi1qIjBGEXQLkgnj2fVVK_w_7px8BqXlu0XstYuW8W8h4ocnwRS6ymIC7Eg5TuokpInUfCDmCjbC2DI79GciTKAiMR__KYVG78hsxdkt6OcQXpdOYSlK-yA13cgFwYSmCpL47nLcDcphCDBk7zccgHmP9RPCMCXaY9Nnke32mKa5eIV1Zf8MrvNVhgcz_J8KvT8-tZTisNpa0NXQWrTOZfiCQ90OJ3WMFi6Glx1rGUzNI_IYGg5r8" 
                  alt="User avatar large" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-surface shadow-md group-hover:brightness-90 transition-all"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-h3 text-on-surface mb-1">Dr. Robert Chen</h3>
              <p className="text-body-sm text-on-surface-variant font-medium mb-6">Senior Administrator</p>
              
              <div className="w-full border-t border-outline-variant pt-6">
                <nav className="flex flex-col gap-2 w-full">
                  <ProfileTab icon={User} label="Personal Info" active />
                  <ProfileTab icon={Lock} label="Security" />
                  <ProfileTab icon={Bell} label="Notifications" />
                </nav>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Forms */}
          <div className="lg:col-span-8 flex flex-col gap-gutter">
            {/* Personal Info Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low/50">
                <h3 className="text-label-md text-on-surface uppercase tracking-wider font-extrabold">Personal Information</h3>
              </div>
              <div className="p-6">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-stack-md">
                  <FormField label="First Name" id="firstName" defaultValue="Robert" />
                  <FormField label="Last Name" id="lastName" defaultValue="Chen" />
                  <FormField 
                    label="Email Address" 
                    id="email" 
                    type="email" 
                    defaultValue="r.chen@eduattend.edu" 
                    icon={Mail} 
                    fullWidth 
                  />
                  <FormField 
                    label="Phone Number" 
                    id="phone" 
                    type="tel" 
                    defaultValue="+1 (555) 019-2837" 
                    icon={Phone} 
                    fullWidth 
                  />
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-label-sm text-on-surface-variant font-bold" htmlFor="address">Office Address</label>
                    <textarea 
                      id="address"
                      rows={3}
                      className="w-full px-3 py-2 bg-surface rounded-lg border border-outline-variant text-on-surface text-body-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none font-medium"
                      defaultValue="Admin Bldg, Room 402&#10;123 University Ave, Tech City, ST 12345"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end mt-4">
                    <button className="px-8 py-2.5 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary-container transition-all shadow-md active:scale-95">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Security Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low/50">
                <h3 className="text-label-md text-on-surface uppercase tracking-wider font-extrabold">Change Password</h3>
              </div>
              <div className="p-6">
                <form className="flex flex-col gap-stack-md">
                  <FormField label="Current Password" id="currentPassword" type="password" placeholder="••••••••" halfWidth />
                  <FormField label="New Password" id="newPassword" type="password" placeholder="••••••••" halfWidth />
                  <FormField label="Confirm New Password" id="confirmPassword" type="password" placeholder="••••••••" halfWidth />
                  
                  <div className="flex justify-start mt-2">
                    <button className="px-6 py-2.5 border border-outline text-on-surface rounded-lg text-label-md font-bold hover:bg-surface-container transition-all active:scale-95">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <button 
      className={cn(
        "w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all duration-200 font-bold text-label-md",
        active 
          ? "bg-surface-container-highest text-primary shadow-sm" 
          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
      )}
    >
      <Icon className={cn("w-5 h-5", active ? "text-primary" : "text-on-surface-variant")} />
      <span>{label}</span>
    </button>
  );
}

function FormField({ label, id, type = 'text', defaultValue, placeholder, icon: Icon, fullWidth, halfWidth }: any) {
  return (
    <div className={cn("flex flex-col gap-2", fullWidth && "md:col-span-2", halfWidth && "md:w-2/3")}>
      <label className="text-label-sm text-on-surface-variant font-bold" htmlFor={id}>{label}</label>
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant">
            <Icon className="w-4 h-4" />
          </span>
        )}
        <input 
          type={type} 
          id={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn(
            "w-full py-2.5 bg-surface rounded-lg border border-outline-variant text-on-surface text-body-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium",
            Icon ? "pl-10 pr-3" : "px-3"
          )}
        />
      </div>
    </div>
  );
}
