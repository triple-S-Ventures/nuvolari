
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const InsightCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 900);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-muted-foreground">Suggested Insights</span>
        </div>
        
        <div className="text-sm text-muted-foreground">
          2/4
        </div>
      </div>
      
      <div className={cn(
        "glass-card rounded-2xl overflow-hidden transition-all duration-700 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center mr-2">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-crypto-eth">
                <g fill="currentColor">
                  <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM16.498 27.3l7.496-4.354L16.498 20l-7.498 2.946 7.498 4.354z" />
                  <path opacity=".5" d="M16.498 20v7.3l7.496-4.353L16.498 20zm0-15.991v9.802l7.496-4.353-7.496-5.45z" />
                  <path opacity=".2" d="M9 16.22l7.498-4.353v-7.869L9 16.22z" />
                  <path opacity=".6" d="M9 16.22l7.498 2.946v-7.3L9 16.221z" />
                </g>
              </svg>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">
            Swap 18.6 ETH to USDC to optimize portfolio
          </h3>
          
          <div className="flex items-center mt-4">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/20"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
