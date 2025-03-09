import { useState, useRef, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SwapPopupProps = {
  fromToken: string;
  toToken: string;
  amount: number;
  onClose: () => void;
  searchBarWidth: number;
  step?: number;
  totalSteps?: number;
};

const SwapPopup = ({ 
  fromToken, 
  toToken, 
  amount: initialAmount, 
  onClose, 
  searchBarWidth,
  step = 1,
  totalSteps = 3
}: SwapPopupProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(initialAmount);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupWidth, setPopupWidth] = useState(500); // Default width
  const [currentStep, setCurrentStep] = useState(step);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Update popup width when searchBarWidth changes
  useEffect(() => {
    console.log('SwapPopup searchBarWidth:', searchBarWidth);
    if (searchBarWidth > 0) {
      setPopupWidth(searchBarWidth);
    }
  }, [searchBarWidth]);

  useEffect(() => {
    // Add event listener to close popup when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleConfirm = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
      setShowConfirmation(true);
    }, 1000);
  };

  const handleExecute = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  const handleEdit = () => {
    setShowConfirmation(false);
    setCurrentStep(1);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    } else if (e.target.value === '') {
      setAmount(0);
    }
  };

  const handleMaxClick = () => {
    setAmount(5.8); // Set to max available amount
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close button outside the popup */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-50"
      >
        <X size={20} className="text-white" />
      </button>
      
      <AnimatePresence mode="wait">
        {!showConfirmation ? (
          <motion.div
            key="swap-form"
            ref={popupRef}
            style={{ width: `${popupWidth}px` }}
            className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: -100, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 300,
              opacity: { duration: 0.2 }
            }}
          >
            {/* Step indicators inside the popup */}
            <div className="pt-4 px-6 flex justify-center gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div 
                  key={index} 
                  className={`h-2 rounded-full transition-all ${
                    index + 1 === currentStep ? 'w-12 bg-[#AC87CF]' : 'w-3 bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            {/* Nuvolari header aligned with inner card */}
            <div className="px-6 pt-4 pb-2 flex items-center">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 rounded-full bg-[#242029] flex items-center justify-center z-10">
                    <img src="/navbar_logo.png" alt="Nuvolari" className="w-5 h-5" />
                  </div>
                </div>
                <span className="font-medium text-white">Nuvolari AI</span>
              </div>
            </div>

            <div className="px-6 py-4">
              {/* Single background card for both sections */}
              <div 
                className="rounded-xl overflow-hidden mb-6" 
                style={{ 
                  backgroundColor: '#1B191F',
                  boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* You spend section */}
                <div className="p-4 border-b border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-gray-400 text-sm">You spend</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[#6c5ce7] flex items-center justify-center">
                        <img src="/eth-logo.png" alt="ETH" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="w-full">
                      <input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        className="text-4xl font-semibold text-white bg-transparent outline-none w-full"
                      />
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-gray-400 text-sm">${(amount * 2600).toLocaleString()}</div>
                        <div className="flex items-center">
                          <div className="text-gray-400 text-sm mr-2">36 ETH</div>
                          <button
                            onClick={handleMaxClick}
                            className="px-3 py-1 rounded-full bg-[#AC87CF]/30 text-xs text-[#AC87CF] font-medium hover:bg-[#AC87CF]/40 transition-colors"
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* You get section */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-gray-400 text-sm">You get</div>
                    <div className="flex items-center bg-white/5 rounded-full px-3 py-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#f39c12] flex items-center justify-center mr-2">
                        <img src="/mog-logo.png" alt="MOG" className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-white font-medium">{toToken}</span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-4xl font-semibold text-white">18,195,766,163.51</div>
                      <div className="text-gray-400 text-sm mt-3">${(amount * 2600 * 0.999).toLocaleString()}</div>
                    </div>
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
                className="w-full py-3 rounded-xl bg-[#AEA1FF] text-white font-medium hover:bg-[#9A8FE5] transition-colors disabled:opacity-70"
              >
                {isLoading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="confirmation-popup"
            ref={popupRef}
            style={{ width: `${popupWidth}px` }}
            className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: -100, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 300,
              opacity: { duration: 0.2 }
            }}
          >
            {/* Step indicators inside the popup */}
            <div className="pt-4 px-6 flex justify-center gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div 
                  key={index} 
                  className={`h-2 rounded-full transition-all ${
                    index + 1 === currentStep ? 'w-12 bg-[#AC87CF]' : index + 1 < currentStep ? 'w-3 bg-[#AC87CF]' : 'w-3 bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            {/* Nuvolari header aligned with inner card */}
            <div className="px-6 pt-4 pb-2 flex items-center">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 rounded-full bg-[#242029] flex items-center justify-center z-10">
                    <img src="/navbar_logo.png" alt="Nuvolari" className="w-5 h-5" />
                  </div>
                </div>
                <span className="font-medium text-white">Nuvolari AI</span>
              </div>
            </div>

            <div className="px-6 py-4">
              {/* Confirmation card */}
              <div 
                className="rounded-xl overflow-hidden mb-6 p-6" 
                style={{ 
                  backgroundColor: '#1B191F',
                  boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#6c5ce7] flex items-center justify-center mr-3">
                        <img src="/eth-logo.png" alt="ETH" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-lg">5.8 ETH</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#f39c12] flex items-center justify-center mr-3">
                        <img src="/mog-logo.png" alt="MOG" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-lg">18,195,766,163.51 MOG</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex w-full justify-between gap-4">
                    <button
                      onClick={handleEdit}
                      className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/15 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleExecute}
                      disabled={isLoading}
                      className="flex-1 py-3 rounded-xl bg-[#AEA1FF] text-white font-medium hover:bg-[#9A8FE5] transition-colors disabled:opacity-70"
                    >
                      {isLoading ? 'Processing...' : 'Execute'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SwapPopup; 