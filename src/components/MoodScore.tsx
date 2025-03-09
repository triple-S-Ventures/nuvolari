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
          <div className="bg-[#666666]/80 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full w-full flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 mr-2">
                <img 
                  src="/navbar_logo.png" 
                  alt="Nuvolari Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-white">Nuvolari Score</span>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="flex items-baseline justify-center">
                <h1 className={cn(
                  "text-7xl font-bold tracking-tight text-white transition-all duration-1000 delay-300",
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
