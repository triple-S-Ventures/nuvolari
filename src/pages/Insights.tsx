import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import SearchBar from '@/components/insights/SearchBar';
import CategoryFilters from '@/components/insights/CategoryFilters';
import InsightsList from '@/components/insights/InsightsList';
import { getActiveFilterColor, getActiveFilterBlurColor, insights, filterInsights } from '@/components/insights/filterUtils';
import SwapPopup from '@/components/swap/SwapPopup';
import { searchSuggestions } from '@/components/insights/SearchSuggestions';

const Insights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('favorites');
  const [activeFilter, setActiveFilter] = useState('balanced');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSwapPopup, setShowSwapPopup] = useState(false);
  const [swapDetails, setSwapDetails] = useState({
    fromToken: 'ETH',
    toToken: 'MOG',
    amount: 5.8
  });
  const [swapStep, setSwapStep] = useState(1);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [searchBarWidth, setSearchBarWidth] = useState(0);
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

  // Measure search bar width when component mounts
  useEffect(() => {
    const measureAndSetWidth = () => {
      if (searchBarRef.current) {
        const width = searchBarRef.current.offsetWidth;
        console.log('MEASURED searchBarWidth:', width);
        
        // Only update if width is valid and different from current
        if (width > 0 && width !== searchBarWidth) {
          console.log('UPDATING searchBarWidth to:', width);
          setSearchBarWidth(width);
        } else {
          console.log('NOT updating searchBarWidth. Current:', searchBarWidth, 'Measured:', width);
        }
      }
    };
    
    // Initial measurement
    measureAndSetWidth();
    
    // Update width on window resize
    const handleResize = () => {
      measureAndSetWidth();
    };
    
    // Force a measurement after a short delay to ensure accurate width
    const timerId = setTimeout(() => {
      measureAndSetWidth();
    }, 500);
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timerId);
    };
  }, [searchBarWidth]);

  const filteredInsights = filterInsights(insights, activeCategory, searchQuery);

  const handleSearchSuggestionClick = (suggestionId: string) => {
    // Find the suggestion that was clicked
    const suggestion = searchSuggestions.find(s => s.id === suggestionId);
    
    if (suggestionId === 'swap') {
      // Set a predefined search query for swap
      setSearchQuery('Swap 5.8 ETH to MOG');
      setIsSearchFocused(false);
      
      // Show swap popup
      setShowSwapPopup(true);
      setSwapStep(1);
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

  const handleNextStep = () => {
    if (swapStep < 3) {
      setSwapStep(swapStep + 1);
    } else {
      setShowSwapPopup(false);
      setSwapStep(1);
    }
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
        {showSwapPopup && (
          <SwapPopup 
            fromToken={swapDetails.fromToken}
            toToken={swapDetails.toToken}
            amount={swapDetails.amount}
            onClose={() => setShowSwapPopup(false)}
            searchBarWidth={searchBarWidth}
            step={swapStep}
            totalSteps={3}
          />
        )}
      </AnimatePresence>
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <motion.main 
          className="flex-1 pt-28 pb-16 flex flex-col items-center justify-start w-full"
          animate={{ 
            y: showSwapPopup ? -50 : 0,
            opacity: showSwapPopup ? 0.3 : 1,
            filter: showSwapPopup ? 'blur(2px)' : 'blur(0px)',
            scale: showSwapPopup ? 0.95 : 1
          }}
          transition={{ 
            type: 'spring',
            damping: 25,
            stiffness: 300
          }}
        >
          <div className="w-full max-w-5xl mx-auto px-4">
            <div className="mb-16 text-center">
              <h1 className="text-4xl font-bold mb-2">Insights</h1>
              <p className="text-muted-foreground">Get insights or search your on-chain task</p>
            </div>
            
            <div ref={searchBarRef}>
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
            </div>
            
            <CategoryFilters 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            
            <div ref={insightsListRef} className="mt-8">
              <InsightsList filteredInsights={filteredInsights} />
            </div>
          </div>
        </motion.main>
      )}
      
      <motion.footer
        animate={{ 
          y: showSwapPopup ? -50 : 0,
          opacity: showSwapPopup ? 0.3 : 1,
          filter: showSwapPopup ? 'blur(2px)' : 'blur(0px)'
        }}
        transition={{ 
          type: 'spring',
          damping: 25,
          stiffness: 300
        }}
      >
        <Footer />
      </motion.footer>
      
      <AnimatePresence>
        {isSearchFocused && !showSwapPopup && (
          <motion.div 
            className="fixed inset-0 bg-background/30" 
            style={{ 
              zIndex: 5,
              pointerEvents: 'none'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Insights;
