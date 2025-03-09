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
  onSuggestionClick?: (suggestionId: string) => void;
  isSearchFocused?: boolean;
  setIsSearchFocused?: (focused: boolean) => void;
};

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  getActiveFilterColor,
  getActiveFilterBlurColor,
  onSuggestionClick,
  isSearchFocused: externalIsSearchFocused,
  setIsSearchFocused: externalSetIsSearchFocused
}: SearchBarProps) => {
  const [internalIsSearchFocused, setInternalIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Use either external or internal state for focus
  const isSearchFocused = externalIsSearchFocused !== undefined ? externalIsSearchFocused : internalIsSearchFocused;
  const setIsSearchFocused = externalSetIsSearchFocused || setInternalIsSearchFocused;

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
  }, [setIsSearchFocused]);

  const handleSearchSuggestionClick = (suggestionId: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestionId);
    } else {
      setSearchQuery(suggestionId);
      setIsSearchFocused(false);
      toast.info(`Selected action: ${suggestionId}`);
    }
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
              top: '-10px', 
              left: '-10px', 
              right: '-10px', 
              bottom: '-20px',
              pointerEvents: 'none'
            }}>
              <motion.div 
                className="w-full h-full"
                style={{
                  background: activeFilter === 'balanced' 
                    ? 'radial-gradient(ellipse at center, rgba(96, 165, 250, 0.1) 0%, rgba(96, 165, 250, 0.03) 50%, transparent 80%)' 
                    : activeFilter === 'degen'
                      ? 'radial-gradient(ellipse at center, rgba(251, 146, 60, 0.1) 0%, rgba(251, 146, 60, 0.03) 50%, transparent 80%)'
                      : 'radial-gradient(ellipse at center, rgba(74, 222, 128, 0.1) 0%, rgba(74, 222, 128, 0.03) 50%, transparent 80%)',
                  filter: 'blur(6px)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            
            {/* Subtle border glow effects for each side */}
            <div className="absolute -z-10" style={{
              top: '0',
              left: '10px',
              right: '10px',
              height: '1px',
              background: activeFilter === 'balanced' 
                ? 'linear-gradient(to right, transparent, rgba(96, 165, 250, 0.3), transparent)'
                : activeFilter === 'degen'
                  ? 'linear-gradient(to right, transparent, rgba(251, 146, 60, 0.3), transparent)'
                  : 'linear-gradient(to right, transparent, rgba(74, 222, 128, 0.3), transparent)',
              pointerEvents: 'none'
            }} />
            
            <div className="absolute -z-10" style={{
              bottom: '0',
              left: '10px',
              right: '10px',
              height: '1px',
              background: activeFilter === 'balanced' 
                ? 'linear-gradient(to right, transparent, rgba(96, 165, 250, 0.3), transparent)'
                : activeFilter === 'degen'
                  ? 'linear-gradient(to right, transparent, rgba(251, 146, 60, 0.3), transparent)'
                  : 'linear-gradient(to right, transparent, rgba(74, 222, 128, 0.3), transparent)',
              pointerEvents: 'none'
            }} />
            
            <div className="absolute -z-10" style={{
              left: '0',
              top: '10px',
              bottom: '10px',
              width: '1px',
              background: activeFilter === 'balanced' 
                ? 'linear-gradient(to bottom, transparent, rgba(96, 165, 250, 0.3), transparent)'
                : activeFilter === 'degen'
                  ? 'linear-gradient(to bottom, transparent, rgba(251, 146, 60, 0.3), transparent)'
                  : 'linear-gradient(to bottom, transparent, rgba(74, 222, 128, 0.3), transparent)',
              pointerEvents: 'none'
            }} />
            
            <div className="absolute -z-10" style={{
              right: '0',
              top: '10px',
              bottom: '10px',
              width: '1px',
              background: activeFilter === 'balanced' 
                ? 'linear-gradient(to bottom, transparent, rgba(96, 165, 250, 0.3), transparent)'
                : activeFilter === 'degen'
                  ? 'linear-gradient(to bottom, transparent, rgba(251, 146, 60, 0.3), transparent)'
                  : 'linear-gradient(to bottom, transparent, rgba(74, 222, 128, 0.3), transparent)',
              pointerEvents: 'none'
            }} />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.8)'
              }}
            >
              <div 
                className="bg-black text-white w-full" 
                style={{ 
                  backdropFilter: 'none', 
                  backgroundColor: '#000000', 
                  boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.1)' 
                }}
              >
                <SearchSuggestions 
                  onSuggestionClick={handleSearchSuggestionClick} 
                  className="text-white"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
