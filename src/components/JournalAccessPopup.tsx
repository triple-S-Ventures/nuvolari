import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface JournalAccessPopupProps {
  onClose: () => void;
}

const JournalAccessPopup = ({ onClose }: JournalAccessPopupProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-6 max-w-xl w-full shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex justify-end mb-2">
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3 whitespace-nowrap">manually journaling your trades?</h2>
          <p className="text-gray-300 mb-8">
            Get early access to nuvolariAI's automated journaling solution
          </p>
          
          <a 
            href="https://t.me/freddyeth0x" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium py-3 px-4 rounded-lg text-center transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            Get Access
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JournalAccessPopup; 