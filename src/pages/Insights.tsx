
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import { Search, TrendingUp, Activity, Zap, LineChart, DollarSign, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const InsightCard = ({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon: Icon, 
  iconColor, 
  delay 
}: { 
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: any;
  iconColor: string;
  delay: number;
}) => {
  return (
    <motion.div 
      className="glass-card rounded-2xl p-6 transition-all duration-700 hover:shadow-lg hover:bg-card/80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className={cn(
          "flex items-center text-sm font-medium",
          isPositive ? "text-green-500" : "text-red-500"
        )}>
          {change}
          <ArrowUpRight className={cn(
            "h-3 w-3 ml-1",
            !isPositive && "transform rotate-90"
          )} />
        </span>
      </div>
      
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
};

const Insights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Insights loaded successfully");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-background overflow-x-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <Navbar />
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <main className="flex-1 pt-24 pb-16 px-4 max-w-4xl mx-auto w-full">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">Insights</h1>
            <p className="text-muted-foreground">Analytics and visualization of your portfolio performance</p>
          </div>
          
          {/* Search bar */}
          <div className="relative mb-8">
            <div className="glass-card rounded-full overflow-hidden flex items-center px-4 py-2 animate-fade-in focus-within:ring-2 focus-within:ring-primary/50">
              <Search className="h-5 w-5 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search insights..."
                className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Insights grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            <InsightCard 
              title="Market Trend"
              value="Bullish"
              change="+2.4%"
              isPositive={true}
              icon={TrendingUp}
              iconColor="bg-primary"
              delay={0.1}
            />
            
            <InsightCard 
              title="Portfolio Health"
              value="Excellent"
              change="+12%"
              isPositive={true}
              icon={Activity}
              iconColor="bg-green-500"
              delay={0.2}
            />
            
            <InsightCard 
              title="Risk Level"
              value="Medium"
              change="-4.1%"
              isPositive={false}
              icon={Zap}
              iconColor="bg-yellow-500"
              delay={0.3}
            />
            
            <InsightCard 
              title="Volatility"
              value="18.2%"
              change="+1.7%"
              isPositive={false}
              icon={LineChart}
              iconColor="bg-blue-500"
              delay={0.4}
            />
            
            <InsightCard 
              title="Yield Average"
              value="6.8% APY"
              change="+0.3%"
              isPositive={true}
              icon={DollarSign}
              iconColor="bg-purple-500"
              delay={0.5}
            />
            
            <InsightCard 
              title="Next Harvest"
              value="2.4 ETH"
              change="+5.4%"
              isPositive={true}
              icon={TrendingUp}
              iconColor="bg-indigo-500"
              delay={0.6}
            />
          </div>
        </main>
      )}
      
      <Footer />
      
      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
    </motion.div>
  );
};

export default Insights;
