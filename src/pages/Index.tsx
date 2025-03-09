import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import MoodScore from '@/components/MoodScore';
import Navbar from '@/components/Navbar';
import PortfolioBalance from '@/components/PortfolioBalance';
import PortfolioMood from '@/components/PortfolioMood';
import Footer from '@/components/Footer';
import { Plus, Lightbulb } from 'lucide-react';
import { toast } from "sonner";
import { useWallet } from '@/contexts/WalletContext';
import CryptoCarousel from '@/components/CryptoCarousel';
import MoodPopup from '@/components/MoodPopup';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const { isConnected, currentWallet } = useWallet();
  const [showPopup, setShowPopup] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (isConnected && currentWallet) {
        toast.success(`Welcome ${currentWallet.label} user!`);
      } else {
        toast.success("Portfolio data loaded successfully");
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isConnected, currentWallet]);

  const handleGetAccess = () => {
    toast.success("Request sent! We'll be in touch soon.");
    setShowPopup(false);
    setIsBlurred(false);
  };

  const insightsData = [
    {
      title: "Swap 18.6 ETH to USDC to optimize portfolio",
      tokens: ['ETH', 'USDC']
    },
    {
      title: "Add $6.8K to the SOL/FART LP",
      tokens: ['SOL', 'FART']
    },
    {
      title: "Consider taking profits on ETH",
      tokens: ['ETH']
    },
    {
      title: "Review LINK staking rewards",
      tokens: ['LINK']
    },
    {
      title: "Reposition 25% of your BTC to SOL",
      tokens: ['BTC', 'SOL']
    }
  ];

  // Get personalized insights based on wallet assets
  const getPersonalizedInsights = () => {
    if (!isConnected || !currentWallet) return insightsData;
    
    // Filter insights based on tokens in the wallet
    const walletTokens = currentWallet.assets.map(asset => asset.symbol);
    const relevantInsights = insightsData.filter(insight => 
      insight.tokens.some(token => walletTokens.includes(token))
    );
    
    return relevantInsights.length > 0 ? relevantInsights : insightsData;
  };
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      
      <AnimatePresence>
        {showPopup && (
          <MoodPopup 
            onClose={() => {
              setShowPopup(false);
              setIsBlurred(false);
            }}
            onGetAccess={handleGetAccess}
          />
        )}
      </AnimatePresence>
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          <div 
            className={cn(
              "fixed inset-0 z-10 bg-black/60 backdrop-blur-md transition-opacity duration-500",
              isBlurred ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          />
          <main className={cn(
            "flex-1 pt-24 pb-16 px-4 md:px-6 max-w-5xl mx-auto w-full transition-all duration-500 relative z-20",
            isBlurred && "blur-sm pointer-events-none"
          )}>
            <div className="mb-6 text-center animate-fade-in">
              <h1 className="text-4xl font-bold mb-2">Mood</h1>
              <p className="text-muted-foreground">Reality check of your portfolio in one glance</p>
            </div>
            
            <div className="mb-6">
              <MoodScore />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              <div className="md:col-span-5">
                <PortfolioBalance />
              </div>
              
              <div className="md:col-span-7 space-y-4 md:space-y-6">
                <div className="glass-card rounded-2xl p-0 overflow-hidden">
                  <CryptoCarousel 
                    insights={getPersonalizedInsights()}
                    onChangeIndex={setCurrentInsightIndex}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-1">
                    <PortfolioMood />
                  </div>
                  
                  <div 
                    className="glass-card rounded-2xl p-6 flex items-center justify-center h-full animate-fade-in-up"
                    style={{ 
                      animationDelay: '1.2s',
                      transformOrigin: 'center',
                      width: '100%'
                    }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div>
                        <button 
                          className="flex flex-col items-center justify-center w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                          onClick={() => {
                            setShowPopup(true);
                            setIsBlurred(true);
                          }}
                        >
                          <Plus size={36} className="mb-2 text-muted-foreground group-hover:scale-110 transition-transform" />
                          Add Widget
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
      
      <Footer className={cn(
        "transition-all duration-500 relative z-20",
        isBlurred && "blur-sm pointer-events-none"
      )} />
    </motion.div>
  );
};

export default Index;
