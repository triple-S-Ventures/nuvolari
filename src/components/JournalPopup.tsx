import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type JournalPopupProps = {
  onClose: () => void;
  onGetAccess: () => void;
};

const JournalPopup = ({ onClose, onGetAccess }: JournalPopupProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ top: '60px' }}
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
            <h2 className="text-2xl font-bold text-white mb-2 whitespace-nowrap">
              Manually journaling your trades?
            </h2>
            
            <p className="text-white/70 mb-6">
              Get early access to nuvolariAI's automated journaling solution
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

export default JournalPopup; 