import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type FilterButtonsProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const FilterButtons = ({ activeFilter, setActiveFilter }: FilterButtonsProps) => {
  return (
    <div className="flex gap-2 items-center pl-2 overflow-visible">
      <motion.div 
        className={cn(
          "flex items-center justify-center rounded-full cursor-pointer transition-all duration-300", 
          activeFilter === 'balanced' 
            ? "bg-blue-400 text-white px-3 py-1" 
            : "bg-blue-400 w-6 h-6"
        )} 
        layout 
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        onClick={() => setActiveFilter('balanced')}
      >
        {activeFilter === 'balanced' && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-xs font-medium"
          >
            Balanced
          </motion.span>
        )}
      </motion.div>
      
      <motion.div 
        className={cn(
          "flex items-center justify-center rounded-full cursor-pointer transition-all duration-300", 
          activeFilter === 'degen' 
            ? "bg-orange-400 text-white px-3 py-1" 
            : "bg-orange-400 w-6 h-6"
        )} 
        layout 
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        onClick={() => setActiveFilter('degen')}
      >
        {activeFilter === 'degen' && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-xs font-medium"
          >
            Degen
          </motion.span>
        )}
      </motion.div>
      
      <motion.div 
        className={cn(
          "flex items-center justify-center rounded-full cursor-pointer transition-all duration-300", 
          activeFilter === 'saver' 
            ? "bg-green-400 text-white px-3 py-1" 
            : "bg-green-400 w-6 h-6"
        )} 
        layout 
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        onClick={() => setActiveFilter('saver')}
      >
        {activeFilter === 'saver' && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-xs font-medium"
          >
            Saver
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};

export default FilterButtons;
