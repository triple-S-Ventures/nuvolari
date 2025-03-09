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
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className={cn(
          "transition-all duration-700 transform h-full flex items-center",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        )}>
          <div className="bg-[#D6BCFA]/40 backdrop-blur-sm rounded-xl p-4 border border-white/10 h-full w-full flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 mr-2 text-primary">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor" />
                  <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor" />
                  <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-sm font-medium text-foreground/90">Nuvolari Score</span>
              
              <div className="ml-auto">
                <button className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 backdrop-blur-md text-foreground/90 hover:bg-white/30 transition-all">
                  Week
                </button>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <h1 className={cn(
                  "text-6xl font-bold tracking-tight text-foreground transition-all duration-1000 delay-300",
                  isVisible ? "opacity-100" : "opacity-0"
                )}>
                  468
                </h1>
                <span className="ml-2 text-lg text-white/80">pts</span>
              </div>
              
              <p className="mt-2 text-sm text-white/80">
                Based on your chain history
              </p>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "relative h-[200px] transition-all duration-700 transform",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        )}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 animate-pulse-subtle shadow-glow-sm" />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Triangle chart */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white z-10" />
              <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-white z-10" />
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-white z-10" />
              
              {/* Chart lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <path d="M50,10 L10,90 L90,90 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <path d="M50,50 L50,10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <path d="M50,50 L10,90" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <path d="M50,50 L90,90" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                
                {/* Active chart */}
                <path 
                  d="M50,30 L30,75 L70,75 Z" 
                  fill="rgba(255, 255, 255, 0.15)" 
                  stroke="rgba(255, 255, 255, 0.7)" 
                  strokeWidth="2" 
                  className={cn(
                    "transition-all duration-1000 delay-500",
                    isVisible ? "opacity-100" : "opacity-0"
                  )}
                />
              </svg>
              
              {/* Labels */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-xs font-medium">
                <span className="text-white/90">Balanced</span>
                <span className="ml-1 text-white/90">(79.3)</span>
              </div>
              <div className="absolute bottom-0 left-0 -translate-x-4 text-xs font-medium">
                <span className="text-white/90">Degen</span>
                <span className="ml-1 text-white/90">(36.8)</span>
              </div>
              <div className="absolute bottom-0 right-0 translate-x-2 text-xs font-medium">
                <span className="text-white/90">Saver</span>
                <span className="ml-1 text-white/90">(61.1)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodScore;
