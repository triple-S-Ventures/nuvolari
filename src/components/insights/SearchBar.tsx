
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
import SearchSuggestions from './SearchSuggestions';

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
    <div className="relative mb-8 z-20" ref={searchRef}>
      <div className={cn(
        "backdrop-blur-sm rounded-full overflow-hidden flex items-center px-4 py-3 transition-all duration-300", 
        isSearchFocused ? "ring-1 ring-primary/30 rounded-t-xl rounded-b-none" : "focus-within:ring-1 focus-within:ring-primary/30", 
        isSearchFocused ? getActiveFilterColor() : "bg-secondary/30"
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
            <motion.div 
              initial={{ opacity: 0, filter: "blur(5px)" }}
              animate={{ opacity: 1, filter: "blur(15px)" }}
              exit={{ opacity: 0, filter: "blur(5px)" }}
              transition={{ duration: 0.3 }}
              className=""
            />
            
            <motion.div 
              className={cn("absolute w-full backdrop-blur-md rounded-b-xl shadow-lg overflow-hidden z-20", getActiveFilterColor().replace('/20', '/80'))} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
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
