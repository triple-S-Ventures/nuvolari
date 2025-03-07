
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type MoodType = 'balanced' | 'degen' | 'saver';

const PortfolioMood = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMood, setActiveMood] = useState<MoodType>('balanced');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleMoodChange = (mood: MoodType) => {
    setActiveMood(mood);
    // This could be expanded to store the mood in localStorage or context
    // to ensure it persists across page navigation
  };

  return (
    <div className={cn(
      "glass-card rounded-2xl p-6 transition-all duration-700 transform h-full",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="flex items-center mb-6">
        <span className="text-sm font-medium text-foreground/80">Portfolio mood</span>
      </div>
      
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button 
          className={cn(
            "py-2 px-6 rounded-full text-sm font-medium transition-colors",
            activeMood === 'balanced' ? "bg-blue-400 text-white" : "bg-blue-400/20 text-blue-400"
          )}
          onClick={() => handleMoodChange('balanced')}
        >
          Balanced
        </button>
        <button 
          className={cn(
            "py-2 px-6 rounded-full text-sm font-medium transition-colors",
            activeMood === 'degen' ? "bg-orange-400 text-white" : "bg-orange-400/20 text-orange-400"
          )}
          onClick={() => handleMoodChange('degen')}
        >
          Degen
        </button>
        <button 
          className={cn(
            "py-2 px-6 rounded-full text-sm font-medium transition-colors",
            activeMood === 'saver' ? "bg-green-400 text-white" : "bg-green-400/20 text-green-400"
          )}
          onClick={() => handleMoodChange('saver')}
        >
          Saver
        </button>
      </div>
    </div>
  );
};

export default PortfolioMood;
