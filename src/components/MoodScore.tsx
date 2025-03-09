import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const MoodScore = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl glass-card p-0 animate-scale-in"
      style={{
        backgroundImage: `url('/mood_BG.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
      <div className="relative z-10 p-6">
        <div className={cn(
          "transition-all duration-700 transform h-full flex items-center",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        )}>
          <div className="bg-[#D6BCFA]/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full w-full flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 mr-2 text-primary">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor" />
                  <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor" />
                  <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-sm font-medium text-foreground/90">Nuvolari Score</span>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="flex items-baseline justify-center">
                <h1 className={cn(
                  "text-7xl font-bold tracking-tight text-foreground transition-all duration-1000 delay-300",
                  isVisible ? "opacity-100" : "opacity-0"
                )}>
                  468
                </h1>
                <span className="ml-2 text-xl text-white/80">pts</span>
              </div>
              
              <p className="mt-3 text-sm text-white/80">
                Based on your chain history
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodScore;
