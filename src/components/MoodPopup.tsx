import { X } from 'lucide-react';
import { motion } from 'framer-motion';

type MoodPopupProps = {
  onClose: () => void;
  onGetAccess: () => void;
};

const MoodPopup = ({ onClose, onGetAccess }: MoodPopupProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="w-[40%] min-w-[400px]"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-[#1a1a1a] rounded-2xl shadow-xl border border-[#2A2A2A] overflow-hidden">
          <div className="p-6 relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-2 whitespace-nowrap">
              Believe in AI based custom UI?
            </h2>
            
            <p className="text-white/70 mb-6">
              NuvolariAI is working on it, reach out to the team for early access
            </p>
            
            <button
              onClick={onGetAccess}
              className="w-full py-3 rounded-xl bg-[#AC87CF] text-white font-medium hover:bg-[#9A78BA] transition-colors"
            >
              Get Access
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MoodPopup; 