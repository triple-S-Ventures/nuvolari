import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type FilterButtonsProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const FilterButtons = ({ activeFilter, setActiveFilter }: FilterButtonsProps) => {
  return (
    <div className="flex gap-2 items-center pl-2 overflow-visible">
      <div className="bg-[#121212] backdrop-blur-sm rounded-full p-2 flex gap-1.5 border border-[#2A2A2A] shadow-md">
        <motion.div 
          className={cn(
            "flex items-center justify-center rounded-full cursor-pointer transition-all duration-300", 
            activeFilter === 'balanced' 
              ? "text-white px-5 py-1.5" 
              : "w-8 h-8"
          )} 
          style={{
            backgroundColor: activeFilter === 'balanced' ? '#9289D0' : '#9289D0'
          }}
          layout 
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          onClick={() => setActiveFilter('balanced')}
        >
          {activeFilter === 'balanced' && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-sm font-medium"
            >
              Balanced
            </motion.span>
          )}
        </motion.div>
        
        <motion.div 
          className={cn(
            "flex items-center justify-center rounded-full cursor-pointer transition-all duration-300", 
            activeFilter === 'degen' 
              ? "text-white px-5 py-1.5" 
              : "w-8 h-8"
          )} 
          style={{
            backgroundColor: '#A67C52'
          }}
          layout 
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          onClick={() => setActiveFilter('degen')}
        >
          {activeFilter === 'degen' && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-sm font-medium"
            >
              Degen
            </motion.span>
          )}
        </motion.div>
        
        <motion.div 
          className={cn(
            "flex items-center justify-center rounded-full cursor-pointer transition-all duration-300", 
            activeFilter === 'saver' 
              ? "text-black px-5 py-1.5" 
              : "w-8 h-8"
          )} 
          style={{
            backgroundColor: '#3EB8A5'
          }}
          layout 
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          onClick={() => setActiveFilter('saver')}
        >
          {activeFilter === 'saver' && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-sm font-medium"
            >
              Saver
            </motion.span>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FilterButtons;
