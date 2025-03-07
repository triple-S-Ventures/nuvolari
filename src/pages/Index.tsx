
import { useState, useEffect } from 'react';
import MoodScore from '@/components/MoodScore';
import Navbar from '@/components/Navbar';
import PortfolioBalance from '@/components/PortfolioBalance';
import InsightCard from '@/components/InsightCard';
import PortfolioMood from '@/components/PortfolioMood';
import Footer from '@/components/Footer';
import { Plus } from 'lucide-react';
import { toast } from "sonner";

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
  
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <main className="flex-1 pt-24 pb-16 px-4 max-w-4xl mx-auto w-full">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">Mood</h1>
            <p className="text-muted-foreground">Reality check of your portfolio in one glance</p>
          </div>
          
          <div className="mb-8">
            <MoodScore />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PortfolioBalance />
            </div>
            
            <div className="md:col-span-1 space-y-6">
              <InsightCard />
              
              <PortfolioMood />
              
              <div className="glass-card rounded-2xl p-6 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                <button className="flex items-center justify-center w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                  <Plus size={18} className="mr-2 text-primary group-hover:scale-110 transition-transform" />
                  Add Widget
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
      
      <Footer />
      
      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
    </div>
  );
};

export default Index;
