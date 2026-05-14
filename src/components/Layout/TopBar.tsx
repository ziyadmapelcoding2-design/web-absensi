import React from 'react';
import { Bell, Search, HelpCircle } from 'lucide-react';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="bg-surface px-margin-page py-6 border-b border-outline-variant flex justify-between items-center z-10 sticky top-0 backdrop-blur-md bg-opacity-80">
      <div>
        <h1 className="text-h1 text-on-surface">{title}</h1>
        {subtitle && <p className="text-body-sm text-on-surface-variant mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant w-72 focus-within:border-primary transition-all">
          <Search className="w-4 h-4 text-outline mr-2" />
          <input 
            type="text" 
            placeholder="Search classes or students..." 
            className="bg-transparent border-none outline-none text-on-surface w-full text-body-sm placeholder:text-outline focus:ring-0"
          />
        </div>
        
        <button className="p-2 rounded-full text-secondary hover:bg-surface-variant transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
        </button>
        
        <button className="hidden md:flex p-2 rounded-full text-secondary hover:bg-surface-variant transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTFtKG-cc3CbDp9LpWfwZZAbbJY9FVkGuqCgFAAVtlf_yjZaMuHjKsw2067pP-oAAPpBRaCUYFssp5Jj2DVE_-iAtsfymdfTubf_BH6t4e-FM-GagoiM3h8r683y5qE4F4Zt3vzuJ5JLs3hDrQ1Kp-Z1V1jQRW1BhmYfETfeS6mocHnCUOpHL4oPWknBUEBqVLmeZ0W_d4zJITqYDqu3-hDMuWMTsImVhwwfjAZgiEl51N8UwH8CbqDLBFuX78kt2DpkjXMGf6cH4"
          alt="User Profile" 
          className="w-10 h-10 rounded-full border border-outline-variant hover:ring-2 hover:ring-primary transition-all cursor-pointer"
        />
      </div>
    </header>
  );
}
