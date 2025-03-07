
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MoodScore from '@/components/MoodScore';
import Navbar from '@/components/Navbar';
import PortfolioBalance from '@/components/PortfolioBalance';
import InsightsCarousel from '@/components/InsightCard';
import PortfolioMood from '@/components/PortfolioMood';
import Footer from '@/components/Footer';
import { Plus, Lightbulb } from 'lucide-react';
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Portfolio data loaded successfully");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sample insights data
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
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-background overflow-x-hidden"
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <Navbar />
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <main className="flex-1 pt-24 pb-16 px-6 max-w-5xl mx-auto w-full"> {/* Changed px-4 to px-6 */}
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">Mood</h1>
            <p className="text-muted-foreground">Reality check of your portfolio in one glance</p>
          </div>
          
          <div className="mb-8">
            <MoodScore />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Portfolio Balance */}
            <div className="md:col-span-5">
              <PortfolioBalance />
            </div>
            
            <div className="md:col-span-7 space-y-6">
              {/* Suggested Insights - Increased height by 60% */}
              <div className="glass-card rounded-2xl p-4" style={{ height: "calc(100% * 0.6)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Lightbulb size={18} className="mr-2 text-foreground/60" />
                    <span className="text-sm font-medium text-foreground/80">Suggested Insights</span>
                  </div>
                  <span className="text-sm text-muted-foreground">2/4</span>
                </div>
                <div className="h-full overflow-hidden">
                  <InsightsCarousel insights={insightsData} />
                </div>
              </div>
              
              {/* Portfolio Mood and Add Widget side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <PortfolioMood />
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="glass-card rounded-2xl p-6 flex items-center justify-center h-full animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                        <button className="flex items-center justify-center w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                          <Plus size={28} className="mr-2 text-primary group-hover:scale-110 transition-transform" />
                          Add Widget
                        </button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Coming soon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </main>
      )}
      
      <Footer />
      
      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
    </motion.div>
  );
};

export default Index;
