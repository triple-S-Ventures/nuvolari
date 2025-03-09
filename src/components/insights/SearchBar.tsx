import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
import SearchSuggestions from './SearchSuggestions';
import FilterButtons from './FilterButtons';
import { getSearchBarBlurColor, getStandardSearchBarColor, getDropdownBackgroundColor } from './filterUtils';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  getActiveFilterColor: () => string;
  getActiveFilterBlurColor: () => string;
};

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  getActiveFilterColor,
  getActiveFilterBlurColor
}: SearchBarProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSuggestionClick = (suggestionId: string) => {
    setSearchQuery(suggestionId);
    setIsSearchFocused(false);
    toast.info(`Selected action: ${suggestionId}`);
  };

  return (
    <div className="relative mb-10 z-20" ref={searchRef}>
      <div className={cn(
        "rounded-full overflow-hidden flex items-center px-4 py-3 transition-all duration-300 relative z-20", 
        isSearchFocused 
          ? "ring-1 ring-primary/30 rounded-t-xl rounded-b-none shadow-lg" 
          : "focus-within:ring-1 focus-within:ring-primary/30", 
        isSearchFocused 
          ? getSearchBarBlurColor(activeFilter)
          : getStandardSearchBarColor()
      )}>
        <Search className="h-5 w-5 text-muted-foreground mr-3" />
        <input 
          type="text" 
          placeholder="Search" 
          className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground" 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
          onFocus={() => setIsSearchFocused(true)} 
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-muted-foreground hover:text-foreground p-1">
            <X size={16} />
          </button>
        )}
        <FilterButtons activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>
      
      <AnimatePresence>
        {isSearchFocused && (
          <>
            {/* Subtle glow effect around all four borders */}
            <div className="absolute -z-10 overflow-hidden" style={{ 
              top: '-15px', 
              left: '-15px', 
              right: '-15px', 
              bottom: '-15px',
              pointerEvents: 'none'
            }}>
              <motion.div 
                className="w-full h-full"
                style={{
                  background: activeFilter === 'balanced' 
                    ? 'radial-gradient(ellipse at center, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.05) 50%, transparent 80%)' 
                    : activeFilter === 'degen'
                      ? 'radial-gradient(ellipse at center, rgba(251, 146, 60, 0.15) 0%, rgba(251, 146, 60, 0.05) 50%, transparent 80%)'
                      : 'radial-gradient(ellipse at center, rgba(74, 222, 128, 0.15) 0%, rgba(74, 222, 128, 0.05) 50%, transparent 80%)',
                  filter: 'blur(8px)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            
            <motion.div 
              className={cn(
                "absolute w-full rounded-b-xl shadow-lg overflow-hidden z-20 border-t-0",
                getDropdownBackgroundColor(activeFilter)
              )} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                boxShadow: activeFilter === 'balanced' 
                  ? '0 10px 25px -5px rgba(96, 165, 250, 0.15), 0 0 15px -5px rgba(96, 165, 250, 0.2)' 
                  : activeFilter === 'degen'
                    ? '0 10px 25px -5px rgba(251, 146, 60, 0.15), 0 0 15px -5px rgba(251, 146, 60, 0.2)'
                    : '0 10px 25px -5px rgba(74, 222, 128, 0.15), 0 0 15px -5px rgba(74, 222, 128, 0.2)'
              }}
            >
              <SearchSuggestions onSuggestionClick={handleSearchSuggestionClick} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
