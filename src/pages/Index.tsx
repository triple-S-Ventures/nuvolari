import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import MoodScore from '@/components/MoodScore';
import Navbar from '@/components/Navbar';
import PortfolioBalance from '@/components/PortfolioBalance';
import InsightsCarousel from '@/components/InsightCard';
import PortfolioMood from '@/components/PortfolioMood';
import Footer from '@/components/Footer';
import { Plus, Lightbulb } from 'lucide-react';
import { toast } from "sonner";
import { useWallet } from '@/contexts/WalletContext';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected, currentWallet } = useWallet();
  
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

  const insightsData = [
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
      title: "Swap 18.6 ETH to USDC to optimize portfolio",
      tokens: ['ETH', 'USDC']
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
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <main className="flex-1 pt-24 pb-16 px-6 max-w-5xl mx-auto w-full">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">Mood</h1>
            <p className="text-muted-foreground">Reality check of your portfolio in one glance</p>
          </div>
          
          <div className="mb-8">
            <MoodScore />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5">
              <PortfolioBalance />
            </div>
            
            <div className="md:col-span-7 space-y-6">
              <div className="glass-card rounded-2xl p-4" style={{ height: "calc(100% * 0.38 * 1.6)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Lightbulb size={18} className="mr-2 text-foreground/60" />
                    <span className="text-sm font-medium text-foreground/80">Suggested Insights</span>
                  </div>
                </div>
                <div className="h-[calc(100%-2rem)] overflow-hidden">
                  <InsightsCarousel 
                    insights={getPersonalizedInsights()}
                  />
                </div>
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
                      <button className="flex items-center justify-center w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                        <Plus size={28} className="mr-2 text-primary group-hover:scale-110 transition-transform" />
                        Add Widget
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      
      <Footer />
    </motion.div>
  );
};

export default Index;
