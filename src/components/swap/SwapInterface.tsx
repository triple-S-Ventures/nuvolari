import { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

type SwapInterfaceProps = {
  fromToken: string;
  toToken: string;
  amount: number;
  onClose: () => void;
};

const SwapInterface = ({ fromToken, toToken, amount, onClose }: SwapInterfaceProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md bg-[#1a1a1a] rounded-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-3">
              <div className="w-8 h-8 rounded-full bg-[#6c5ce7] flex items-center justify-center z-10">
                <img src="/logo_new.png" alt="Nuvolari" className="w-5 h-5" />
              </div>
            </div>
            <span className="font-medium text-white">Nuvolari AI</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="mb-6">
            <div className="text-gray-400 text-sm mb-1">You spend</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-4xl font-semibold text-white">{amount}</div>
                <div className="text-gray-400 text-sm mt-1">${(amount * 2600).toLocaleString()}</div>
              </div>
              <div className="flex items-center bg-white/5 rounded-full px-3 py-1.5">
                <div className="w-6 h-6 rounded-full bg-[#6c5ce7] flex items-center justify-center mr-2">
                  <img src="/eth-logo.png" alt="ETH" className="w-3.5 h-3.5" />
                </div>
                <span className="text-white font-medium">{fromToken}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-gray-400 text-sm mb-1">You get</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-4xl font-semibold text-white">18,195,766,163.51</div>
                <div className="text-gray-400 text-sm mt-1">${(amount * 2600 * 0.999).toLocaleString()}</div>
              </div>
              <div className="flex items-center bg-white/5 rounded-full px-3 py-1.5">
                <div className="w-6 h-6 rounded-full bg-[#f39c12] flex items-center justify-center mr-2">
                  <img src="/mog-logo.png" alt="MOG" className="w-3.5 h-3.5" />
                </div>
                <span className="text-white font-medium">{toToken}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-3 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">1 {toToken} ≈ 0.00001 {fromToken}</span>
              <span className="text-gray-400">($0.00000883)</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#a29bfe] text-white font-medium hover:bg-[#a29bfe]/90 transition-colors disabled:opacity-70"
          >
            {isLoading ? 'Processing...' : 'Confirm'}
          </button>

          <div className="mt-6 flex justify-center">
            <button className="text-gray-400 text-sm hover:text-white transition-colors">
              Follow Up
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 p-4 flex justify-between text-xs text-gray-500">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Docs</a>
          </div>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-gray-300 transition-colors">X</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Discord</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Telegram</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SwapInterface; 