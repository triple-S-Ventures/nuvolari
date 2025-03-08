
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import SearchBar from '@/components/insights/SearchBar';
import CategoryFilters from '@/components/insights/CategoryFilters';
import InsightsList from '@/components/insights/InsightsList';
import { getActiveFilterColor, getActiveFilterBlurColor, insights, filterInsights } from '@/components/insights/filterUtils';

const Insights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('favorites');
  const [activeFilter, setActiveFilter] = useState('balanced');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Insights loaded successfully");
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const filteredInsights = filterInsights(insights, activeCategory, searchQuery);

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-background overflow-x-hidden relative" 
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
        <main className="flex-1 pt-28 pb-16 px-6 max-w-7xl mx-auto w-full">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold mb-2">Insights</h1>
            <p className="text-muted-foreground">Get insights or search your on-chain task</p>
          </div>
          
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            getActiveFilterColor={() => getActiveFilterColor(activeFilter)}
            getActiveFilterBlurColor={() => getActiveFilterBlurColor(activeFilter)}
          />
          
          <CategoryFilters 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          <div className="mt-6">
            <InsightsList filteredInsights={filteredInsights} />
          </div>
        </main>
      )}
      
      <Footer />
      
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <AnimatePresence>
        {isSearchFocused && (
          <motion.div 
            className="fixed inset-0 bg-background/70 backdrop-blur-sm z-10" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsSearchFocused(false)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Insights;
