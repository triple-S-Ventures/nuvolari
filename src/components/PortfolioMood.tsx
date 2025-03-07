
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
      "glass-card rounded-2xl p-6 transition-all duration-700 transform h-full",
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
      
      <div className="flex items-center justify-center flex-wrap">
        <button className="py-2 px-8 rounded-full bg-primary/90 text-white text-sm font-medium hover:bg-primary transition-colors">
          Balanced
        </button>
      </div>
    </div>
  );
};

export default PortfolioMood;
