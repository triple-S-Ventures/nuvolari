
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type FilterButtonsProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const FilterButtons = ({ activeFilter, setActiveFilter }: FilterButtonsProps) => {
  return (
    <div className="flex gap-3 items-center pl-0 overflow-visible">
      <motion.div 
        className={cn(
          "flex items-center px-3 py-1 rounded-full text-xs font-medium border", 
          activeFilter === 'balanced' ? "bg-blue-400 text-white border-transparent" : "border-blue-400/20 text-blue-400"
        )} 
        layout 
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        onClick={() => setActiveFilter('balanced')}
      >
        {activeFilter === 'balanced' && "Balanced"}
      </motion.div>
      
      <motion.div 
        className={cn(
          "flex items-center rounded-full cursor-pointer transition-all duration-300 border", 
          activeFilter === 'degen' 
            ? "bg-orange-400 text-white px-3 py-1 border-transparent" 
            : "border-orange-400/20 bg-transparent w-6 h-6"
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
          "flex items-center rounded-full cursor-pointer transition-all duration-300 border", 
          activeFilter === 'saver' 
            ? "bg-green-400 text-white px-3 py-1 border-transparent" 
            : "border-green-400/20 bg-transparent w-6 h-6"
        )} 
        layout 
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        onClick={() => setActiveFilter('saver')}
      >
        {activeFilter === 'saver' && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-xs font-medium px-1"
          >
            Saver
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};

export default FilterButtons;
