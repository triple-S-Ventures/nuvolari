
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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

  const getChipColorClass = (mood: MoodType, isActive: boolean) => {
    switch (mood) {
      case 'balanced':
        return isActive ? "bg-blue-400 text-white" : "bg-blue-400/20 text-blue-400";
      case 'degen':
        return isActive ? "bg-orange-400 text-white" : "bg-orange-400/20 text-orange-400";
      case 'saver':
        return isActive ? "bg-green-400 text-white" : "bg-green-400/20 text-green-400";
    }
  };

  return (
    <div className={cn(
      "glass-card rounded-2xl p-6 transition-all duration-700 transform h-full w-[90%]", // Reduced width to 90% (30% less than 130%)
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="flex items-center mb-6">
        <span className="text-sm font-medium text-foreground/80">Portfolio mood</span>
      </div>
      
      <div className="flex items-center justify-center gap-2 overflow-visible">
        {/* Left small chip (if not active) */}
        <AnimatePresence mode="wait">
          {activeMood !== 'degen' && (
            <motion.button 
              key="degen-small"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "py-1 px-3 rounded-full text-xs font-medium",
                "bg-orange-400/20 text-orange-400 hover:bg-orange-400/30"
              )}
              onClick={() => handleMoodChange('degen')}
            >
              Degen
            </motion.button>
          )}
          
          {activeMood !== 'balanced' && activeMood === 'degen' && (
            <motion.button 
              key="balanced-small-left"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "py-1 px-3 rounded-full text-xs font-medium",
                "bg-blue-400/20 text-blue-400 hover:bg-blue-400/30"
              )}
              onClick={() => handleMoodChange('balanced')}
            >
              Balanced
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Center active mood chip */}
        <AnimatePresence mode="wait">
          <motion.button 
            key={`active-${activeMood}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1.1 }}
            exit={{ scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            className={cn(
              "py-2 px-8 rounded-full text-sm font-medium",
              getChipColorClass(activeMood, true)
            )}
            onClick={() => handleMoodChange(activeMood)}
          >
            {activeMood === 'balanced' && "Balanced"}
            {activeMood === 'degen' && "Degen"}
            {activeMood === 'saver' && "Saver"}
          </motion.button>
        </AnimatePresence>
        
        {/* Right small chip (if not active) */}
        <AnimatePresence mode="wait">
          {activeMood !== 'balanced' && activeMood === 'saver' && (
            <motion.button 
              key="balanced-small-right"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "py-1 px-3 rounded-full text-xs font-medium",
                "bg-blue-400/20 text-blue-400 hover:bg-blue-400/30"
              )}
              onClick={() => handleMoodChange('balanced')}
            >
              Balanced
            </motion.button>
          )}
          
          {activeMood !== 'saver' && (
            <motion.button 
              key="saver-small"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "py-1 px-3 rounded-full text-xs font-medium",
                "bg-green-400/20 text-green-400 hover:bg-green-400/30"
              )}
              onClick={() => handleMoodChange('saver')}
            >
              Saver
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PortfolioMood;
