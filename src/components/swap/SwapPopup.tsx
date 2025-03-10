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
  const [currentStep, setCurrentStep] = useState(step);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isConfirmHovered, setIsConfirmHovered] = useState(false);
  const [isExecuteHovered, setIsExecuteHovered] = useState(false);
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isCheckBalanceHovered, setIsCheckBalanceHovered] = useState(false);
  const [isJournalHovered, setIsJournalHovered] = useState(false);
  
  // Use searchBarWidth directly without state to avoid any synchronization issues
  const popupWidth = searchBarWidth && searchBarWidth > 0 ? searchBarWidth : 500;
  
  // Log the width being used
  useEffect(() => {
    console.log('SwapPopup using width:', popupWidth, 'px (searchBarWidth:', searchBarWidth, 'px)');
  }, [searchBarWidth, popupWidth]);
  
  // Dynamic box-shadow values based on hover state for Confirm button - using gray colors like InsightCard
  const getConfirmBoxShadow = () => {
    const topGlow = isConfirmHovered ? 'rgba(180, 180, 180, 0.4)' : 'rgba(180, 180, 180, 0.25)';
    const sideGlow = isConfirmHovered ? 'rgba(180, 180, 180, 0.2)' : 'rgba(180, 180, 180, 0.1)';
    const border = 'rgba(0, 0, 0, 0.2)';
    
    return `
      0 -1px 1px ${topGlow},
      -1px -1px 1px ${sideGlow},
      1px -1px 1px ${sideGlow},
      0 0 0 1px ${border}
    `;
  };

  // Dynamic box-shadow values based on hover state for Execute button - using gray colors like InsightCard
  const getExecuteBoxShadow = () => {
    const topGlow = isExecuteHovered ? 'rgba(180, 180, 180, 0.4)' : 'rgba(180, 180, 180, 0.25)';
    const sideGlow = isExecuteHovered ? 'rgba(180, 180, 180, 0.2)' : 'rgba(180, 180, 180, 0.1)';
    const border = 'rgba(0, 0, 0, 0.2)';
    
    return `
      0 -1px 1px ${topGlow},
      -1px -1px 1px ${sideGlow},
      1px -1px 1px ${sideGlow},
      0 0 0 1px ${border}
    `;
  };

  // Dynamic box-shadow values based on hover state for Edit button - using gray colors like InsightCard
  const getEditBoxShadow = () => {
    const topGlow = isEditHovered ? 'rgba(180, 180, 180, 0.4)' : 'rgba(180, 180, 180, 0.25)';
    const sideGlow = isEditHovered ? 'rgba(180, 180, 180, 0.2)' : 'rgba(180, 180, 180, 0.1)';
    const border = 'rgba(0, 0, 0, 0.2)';
    
    return `
      0 -1px 1px ${topGlow},
      -1px -1px 1px ${sideGlow},
      1px -1px 1px ${sideGlow},
      0 0 0 1px ${border}
    `;
  };

  // Dynamic box-shadow values based on hover state for Check Balance button - using gray colors like InsightCard
  const getCheckBalanceBoxShadow = () => {
    const topGlow = isCheckBalanceHovered ? 'rgba(180, 180, 180, 0.4)' : 'rgba(180, 180, 180, 0.25)';
    const sideGlow = isCheckBalanceHovered ? 'rgba(180, 180, 180, 0.2)' : 'rgba(180, 180, 180, 0.1)';
    const border = 'rgba(0, 0, 0, 0.2)';
    
    return `
      0 -1px 1px ${topGlow},
      -1px -1px 1px ${sideGlow},
      1px -1px 1px ${sideGlow},
      0 0 0 1px ${border}
    `;
  };

  // Dynamic box-shadow values based on hover state for Journal button - using gray colors like InsightCard
  const getJournalBoxShadow = () => {
    const topGlow = isJournalHovered ? 'rgba(180, 180, 180, 0.4)' : 'rgba(180, 180, 180, 0.25)';
    const sideGlow = isJournalHovered ? 'rgba(180, 180, 180, 0.2)' : 'rgba(180, 180, 180, 0.1)';
    const border = 'rgba(0, 0, 0, 0.2)';
    
    return `
      0 -1px 1px ${topGlow},
      -1px -1px 1px ${sideGlow},
      1px -1px 1px ${sideGlow},
      0 0 0 1px ${border}
    `;
  };

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
    console.log('Execute button clicked, showing success popup...');
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3);
      setShowConfirmation(false); // Hide confirmation popup
      setShowSuccess(true);
      console.log('Success popup should now be visible. showSuccess:', true);
    }, 2000);
  };

  const handleEdit = () => {
    setShowConfirmation(false);
    setCurrentStep(1);
  };

  const handleCheckBalance = () => {
    // Handle check balance action
    onClose();
  };

  const handleGoToJournal = () => {
    // Handle go to journal action
    onClose();
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
      
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* First popup - always rendered but positioned and styled based on state */}
        <motion.div
          key="swap-form"
          ref={!showConfirmation && !showSuccess ? popupRef : null}
          style={{ width: `${popupWidth}px` }}
          className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl absolute"
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ 
            y: showConfirmation || showSuccess ? -180 : 0, 
            opacity: showConfirmation || showSuccess ? 0.6 : 1,
            scale: showConfirmation || showSuccess ? 0.85 : 1,
            filter: showConfirmation || showSuccess ? 'blur(2px)' : 'blur(0px)',
            zIndex: showConfirmation || showSuccess ? 5 : 20
          }}
          transition={{ 
            type: 'spring', 
            damping: 25, 
            stiffness: 300,
            opacity: { duration: 0.3 }
          }}
        >
          {/* Step indicators inside the popup */}
          <div className="pt-4 px-6 flex justify-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div 
                key={index} 
                className={`h-2 rounded-full transition-all ${
                  index + 1 === 1 ? 'w-12 bg-[#AC87CF]' : 'w-3 bg-white/30'
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
                      disabled={showConfirmation || showSuccess}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-gray-400 text-sm">${(amount * 2600).toLocaleString()}</div>
                      <div className="flex items-center">
                        <div className="text-gray-400 text-sm mr-2">36 ETH</div>
                        <button
                          onClick={handleMaxClick}
                          className="px-3 py-1 rounded-full bg-[#AC87CF]/30 text-xs text-[#AC87CF] font-medium hover:bg-[#AC87CF]/40 transition-colors"
                          disabled={showConfirmation || showSuccess}
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
              disabled={isLoading || showConfirmation || showSuccess}
              onMouseEnter={() => setIsConfirmHovered(true)}
              onMouseLeave={() => setIsConfirmHovered(false)}
              className="w-full py-3 rounded-xl bg-[#AEA1FF] text-white font-medium hover:bg-[#9A8FE5] transition-colors disabled:opacity-70"
              style={{ boxShadow: getConfirmBoxShadow() }}
            >
              {isLoading ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </motion.div>

        {/* Second popup - confirmation */}
        <motion.div
          key="confirmation-popup"
          ref={showConfirmation ? popupRef : null}
          style={{ width: `${popupWidth}px` }}
          className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl absolute"
          initial={{ y: 400, opacity: 0, scale: 0.9 }}
          animate={{ 
            y: showConfirmation ? 0 : 400, 
            opacity: showConfirmation ? 1 : 0,
            scale: showConfirmation ? 1 : 0.9,
            filter: showSuccess ? 'blur(2px)' : 'blur(0px)',
            zIndex: showConfirmation ? 20 : 10
          }}
          transition={{ 
            type: 'spring', 
            damping: 25, 
            stiffness: 300,
            opacity: { duration: 0.3 },
            delay: showConfirmation ? 0.1 : 0
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
            {/* Cards side by side */}
            <div className="flex gap-4 mb-6">
              {/* You spend card */}
              <div 
                className="flex-1 rounded-xl overflow-hidden p-4" 
                style={{ 
                  backgroundColor: '#1B191F',
                  boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="flex items-center">
                  <div className="text-gray-400 text-sm mr-auto">You spend</div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="w-10 h-10 rounded-full bg-[#6c5ce7] flex items-center justify-center mr-3">
                    <img src="/eth-logo.png" alt="ETH" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-lg">{amount} ETH</div>
                  </div>
                </div>
              </div>

              {/* You get card */}
              <div 
                className="flex-1 rounded-xl overflow-hidden p-4" 
                style={{ 
                  backgroundColor: '#1B191F',
                  boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="flex items-center">
                  <div className="text-gray-400 text-sm mr-auto">You get</div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="w-10 h-10 rounded-full bg-[#f39c12] flex items-center justify-center mr-3">
                    <img src="/mog-logo.png" alt="MOG" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-lg">18,195,766,163.51 MOG</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Buttons outside the cards */}
            <div className="flex w-full justify-between gap-4">
              <button
                onClick={handleEdit}
                onMouseEnter={() => setIsEditHovered(true)}
                onMouseLeave={() => setIsEditHovered(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/15 transition-colors"
                style={{ boxShadow: getEditBoxShadow() }}
                disabled={showSuccess}
              >
                Edit
              </button>
              <button
                onClick={handleExecute}
                disabled={isLoading || showSuccess}
                onMouseEnter={() => setIsExecuteHovered(true)}
                onMouseLeave={() => setIsExecuteHovered(false)}
                className="flex-1 py-3 rounded-xl bg-[#AEA1FF] text-white font-medium hover:bg-[#9A8FE5] transition-colors disabled:opacity-70"
                style={{ boxShadow: getExecuteBoxShadow() }}
              >
                {isLoading ? 'Processing...' : 'Execute'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Third popup - success */}
        <motion.div
          key="success-popup"
          ref={showSuccess ? popupRef : null}
          style={{ width: `${popupWidth}px` }}
          className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl absolute"
          initial={{ y: 400, opacity: 0, scale: 0.9 }}
          animate={{ 
            y: showSuccess ? 0 : 400, 
            opacity: showSuccess ? 1 : 0,
            scale: showSuccess ? 1 : 0.9,
            zIndex: showSuccess ? 30 : 10
          }}
          transition={{ 
            type: 'spring', 
            damping: 25, 
            stiffness: 300,
            opacity: { duration: 0.3 },
            delay: showSuccess ? 0.1 : 0
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
            {/* Success message */}
            <div className="flex flex-col items-center justify-center mb-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <Check className="text-green-500" size={24} />
              </div>
              <h3 className="text-white text-xl font-medium mb-1">Success!</h3>
              <p className="text-gray-400">
                You successfully swapped {amount} {fromToken} to {toToken === 'MOG' ? '18,195,766,163.51' : amount * 2600} {toToken}
              </p>
            </div>
            
            {/* Inner card for success details */}
            <div 
              className="rounded-xl overflow-hidden mb-6" 
              style={{ 
                backgroundColor: '#1B191F',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 8px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#6c5ce7] flex items-center justify-center mr-3">
                      <img src="/eth-logo.png" alt="ETH" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-lg">{amount} {fromToken}</div>
                    </div>
                  </div>
                  <div className="text-gray-400">to</div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#f39c12] flex items-center justify-center mr-3">
                      <img src="/mog-logo.png" alt="MOG" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-lg">{toToken === 'MOG' ? '18,195,766,163.51' : amount * 2600} {toToken}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex w-full justify-between gap-4">
              <button
                onClick={handleCheckBalance}
                onMouseEnter={() => setIsCheckBalanceHovered(true)}
                onMouseLeave={() => setIsCheckBalanceHovered(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/15 transition-colors"
                style={{ boxShadow: getCheckBalanceBoxShadow() }}
              >
                Check my balance
              </button>
              <button
                onClick={handleGoToJournal}
                onMouseEnter={() => setIsJournalHovered(true)}
                onMouseLeave={() => setIsJournalHovered(false)}
                className="flex-1 py-3 rounded-xl bg-[#AEA1FF] text-white font-medium hover:bg-[#9A8FE5] transition-colors"
                style={{ boxShadow: getJournalBoxShadow() }}
              >
                Go to Journal
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SwapPopup; 