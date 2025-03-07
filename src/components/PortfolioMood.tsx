
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

  // Get mood score values for the visualization
  const getMoodValues = () => {
    switch (activeMood) {
      case 'balanced':
        return { score: 79.3, position: 'top' };
      case 'degen':
        return { score: 36.8, position: 'left' };
      case 'saver':
        return { score: 64.1, position: 'right' };
    }
  };

  const moodValues = getMoodValues();

  return (
    <div className={cn(
      "glass-card rounded-2xl p-6 transition-all duration-700 transform h-full",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="flex items-center mb-4">
        <span className="text-sm font-medium text-foreground/80">Portfolio mood</span>
      </div>
      
      {/* Graph with concentric circles and triangle */}
      <div className="relative w-full h-48 mb-6 flex items-center justify-center">
        <div className="relative w-40 h-40">
          {/* Concentric circles */}
          <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-pulse-subtle" />
          <div className="absolute inset-[10%] rounded-full border border-purple-500/30" />
          <div className="absolute inset-[20%] rounded-full border border-purple-500/40" />
          <div className="absolute inset-[30%] rounded-full border border-purple-500/50" />
          <div className="absolute inset-[40%] rounded-full border border-purple-500/60" />
          
          {/* Triangle overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Main triangle */}
            <div 
              className="w-32 h-32 triangle-path"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.7)'
              }}
            />
            
            {/* Inner triangle */}
            <div 
              className="absolute w-24 h-24 triangle-path"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            />
            
            {/* Triangle vertices with labels and scores */}
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full ${activeMood === 'balanced' ? 'bg-white' : 'bg-purple-500/60'}`} />
              {activeMood === 'balanced' && (
                <div className="mt-1 text-xs text-white">
                  Balanced ({moodValues.score})
                </div>
              )}
            </div>
            
            <div className="absolute bottom-0 left-[calc(50%-55px)] flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full ${activeMood === 'degen' ? 'bg-white' : 'bg-purple-500/60'}`} />
              {activeMood === 'degen' && (
                <div className="mt-1 text-xs text-white">
                  Degen ({moodValues.score})
                </div>
              )}
            </div>
            
            <div className="absolute bottom-0 right-[calc(50%-55px)] flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full ${activeMood === 'saver' ? 'bg-white' : 'bg-purple-500/60'}`} />
              {activeMood === 'saver' && (
                <div className="mt-1 text-xs text-white">
                  Saver ({moodValues.score})
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2">
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 1.05 }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
