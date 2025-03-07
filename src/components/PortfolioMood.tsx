
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const PortfolioMood = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "glass-card rounded-2xl p-6 transition-all duration-700 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="flex items-center mb-6">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mr-2 text-foreground/60"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
        <span className="text-sm font-medium text-foreground/80">Portfolio mood</span>
      </div>
      
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-wrap">
          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-2 sm:mb-0">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-400">
              <rect width="24" height="24" rx="12" fill="currentColor" fillOpacity="0.08"/>
              <path d="M9 11L12 8L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 15L12 12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="ml-6 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 mb-2 sm:mb-0">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-400">
              <rect width="24" height="24" rx="12" fill="currentColor" fillOpacity="0.08"/>
              <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 16L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          
          <div className="ml-6 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-2 sm:mb-0">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400">
              <rect width="24" height="24" rx="12" fill="currentColor" fillOpacity="0.08"/>
              <path d="M10 8L14 12L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <button className="py-1 px-4 rounded-full bg-primary/90 text-white text-sm font-medium hover:bg-primary transition-colors mt-2 sm:mt-0">
          Balanced
        </button>
      </div>
    </div>
  );
};

export default PortfolioMood;
