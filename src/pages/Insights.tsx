import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import SearchBar from '@/components/insights/SearchBar';
import CategoryFilters from '@/components/insights/CategoryFilters';
import InsightsList from '@/components/insights/InsightsList';
import { getActiveFilterColor, getActiveFilterBlurColor, insights, filterInsights } from '@/components/insights/filterUtils';
import SwapInterface from '@/components/swap/SwapInterface';
import { searchSuggestions } from '@/components/insights/SearchSuggestions';

const Insights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('favorites');
  const [activeFilter, setActiveFilter] = useState('balanced');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSwapInterface, setShowSwapInterface] = useState(false);
  const [swapDetails, setSwapDetails] = useState({
    fromToken: 'ETH',
    toToken: 'MOG',
    amount: 5.8
  });
  const insightsListRef = useRef<HTMLDivElement>(null);

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

  const handleSearchSuggestionClick = (suggestionId: string) => {
    // Find the suggestion that was clicked
    const suggestion = searchSuggestions.find(s => s.id === suggestionId);
    
    if (suggestionId === 'swap') {
      // Set a predefined search query for swap
      setSearchQuery('Swap 5.8 ETH to MOG');
      setIsSearchFocused(false);
      
      // Scroll to insights list with animation
      setTimeout(() => {
        if (insightsListRef.current) {
          insightsListRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          
          // Show swap interface after scrolling
          setTimeout(() => {
            setShowSwapInterface(true);
          }, 800);
        }
      }, 500);
    } else if (suggestionId === 'yield') {
      // Set a predefined search query for yield
      setSearchQuery('Yield farming opportunities for ETH');
      setIsSearchFocused(false);
      toast.info(`Selected action: ${suggestion?.label || suggestionId}`);
    } else {
      // Handle other suggestions
      setSearchQuery(`${suggestion?.label || suggestionId} query`);
      setIsSearchFocused(false);
      toast.info(`Selected action: ${suggestion?.label || suggestionId}`);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col overflow-x-hidden relative" 
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
        <main className="flex-1 pt-28 pb-16 flex flex-col items-center justify-start w-full">
          <div className="w-full max-w-5xl mx-auto px-4">
            <div className="mb-16 text-center">
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
              onSuggestionClick={handleSearchSuggestionClick}
              setIsSearchFocused={setIsSearchFocused}
              isSearchFocused={isSearchFocused}
            />
            
            <CategoryFilters 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            
            <div className="mt-8 w-full" ref={insightsListRef}>
              <InsightsList filteredInsights={filteredInsights} />
            </div>
          </div>
        </main>
      )}
      
      <Footer />
      
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

      <AnimatePresence>
        {showSwapInterface && (
          <SwapInterface 
            fromToken={swapDetails.fromToken}
            toToken={swapDetails.toToken}
            amount={swapDetails.amount}
            onClose={() => setShowSwapInterface(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Insights;
