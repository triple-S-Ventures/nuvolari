
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import { 
  Search, 
  Star,
  Percent, 
  RefreshCw, 
  Wallet, 
  ArrowRightLeft, 
  Coins,
  CircleDollarSign,
  Landmark,
  X,
  Plus,
  DollarSign,
  ClipboardList,
  Info,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import InsightsCarousel from '@/components/InsightCard';

const CategoryFilter = ({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: any;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0",
        isActive 
          ? "bg-secondary text-foreground" 
          : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
      )}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );
};

const FilterChip = ({ 
  label, 
  color, 
  isActive, 
  onClick 
}: { 
  label: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium transition-colors",
        isActive ? "bg-primary/80 text-white" : `bg-${color}/20 text-${color}`
      )}
    >
      {label}
    </button>
  );
};

const SearchSuggestion = ({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: any;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors rounded-md group"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
          <Icon size={18} />
        </div>
        <span className="text-foreground text-sm font-medium">{label}</span>
      </div>
      <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};

const Insights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('favorites');
  const [activeFilter, setActiveFilter] = useState('balanced');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Insights loaded successfully");
    }, 1000);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = [
    { id: 'favorites', label: 'Favourites', icon: Star },
    { id: 'yield', label: 'Yield', icon: Percent },
    { id: 'rebalance', label: 'Rebalance', icon: RefreshCw },
    { id: 'lending', label: 'Lending', icon: Landmark },
    { id: 'swap', label: 'Swap', icon: ArrowRightLeft },
  ];

  const filters = [
    { id: 'balanced', label: 'Balanced', color: 'blue-400' },
    { id: 'degen', label: 'Degen', color: 'orange-400' },
    { id: 'saver', label: 'Saver', color: 'green-400' },
  ];

  const getActiveFilterColor = () => {
    switch (activeFilter) {
      case 'balanced':
        return 'bg-blue-400/20';
      case 'degen':
        return 'bg-orange-400/20';
      case 'saver':
        return 'bg-green-400/20';
      default:
        return 'bg-secondary/30';
    }
  };

  const getActiveFilterBlurColor = () => {
    switch (activeFilter) {
      case 'balanced':
        return 'from-blue-400/15 to-blue-400/5'; // Reduced opacity by 50%
      case 'degen':
        return 'from-orange-400/15 to-orange-400/5'; // Reduced opacity by 50%
      case 'saver':
        return 'from-green-400/15 to-green-400/5'; // Reduced opacity by 50%
      default:
        return 'from-primary/10 to-primary/5'; // Reduced opacity by 50%
    }
  };

  const searchSuggestions = [
    { id: 'buy', label: 'Buy', icon: Plus },
    { id: 'swap', label: 'Swap', icon: ArrowRightLeft },
    { id: 'rebalance', label: 'Rebalance', icon: RefreshCw },
    { id: 'add-liquidity', label: 'Add Liquidity', icon: Wallet },
    { id: 'dca', label: 'Dollar-Cost Averaging', icon: DollarSign },
    { id: 'limit', label: 'Limit order', icon: ClipboardList },
    { id: 'info', label: 'Info', icon: Info },
    { id: 'fees', label: 'Fees', icon: BarChart3 },
    { id: 'yield', label: 'Yield', icon: TrendingUp },
    { id: 'advanced', label: 'Advanced strategy', icon: Plus },
  ];

  const handleSearchSuggestionClick = (suggestionId: string) => {
    setSearchQuery(suggestionId);
    setIsSearchFocused(false);
    toast.info(`Selected action: ${suggestionId}`);
  };

  const insights = [
    {
      id: 1,
      title: 'Add $6.8K to the SOL/FART LP',
      tokens: ['SOL', 'FART'],
      category: 'yield',
    },
    {
      id: 2,
      title: 'Swap 10 ETH to MOG',
      tokens: ['ETH', 'MOG'],
      category: 'swap',
    },
    {
      id: 3,
      title: 'Repay wETH Leveraged Farming Position',
      tokens: ['ETH'],
      category: 'lending',
    },
    {
      id: 4,
      title: 'Rebalance',
      tokens: ['BAL'],
      category: 'rebalance',
    },
    {
      id: 5,
      title: 'Add Liquidity',
      tokens: ['UNI'],
      category: 'yield',
    },
    {
      id: 6,
      title: 'Swap',
      tokens: ['SWAP'],
      category: 'swap',
    },
  ];

  const filteredInsights = insights.filter(insight => {
    const matchesCategory = activeCategory === 'favorites' || insight.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.tokens.some(token => token.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
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
        <main className="flex-1 pt-28 pb-16 px-6 max-w-4xl mx-auto w-full">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold mb-2">Insights</h1>
            <p className="text-muted-foreground">Get insights or search your on-chain task</p>
          </div>
          
          <div className="relative mb-8 z-20" ref={searchRef}>
            <div 
              className={cn(
                "backdrop-blur-sm rounded-full overflow-hidden flex items-center px-4 py-3 transition-all duration-300",
                isSearchFocused 
                  ? "ring-1 ring-primary/30 rounded-t-xl rounded-b-none" 
                  : "focus-within:ring-1 focus-within:ring-primary/30",
                isSearchFocused ? getActiveFilterColor() : "bg-secondary/30"
              )}
            >
              <Search className="h-5 w-5 text-muted-foreground mr-3" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-muted-foreground hover:text-foreground p-1"
                >
                  <X size={16} />
                </button>
              )}
              <div className="flex gap-2 items-center">
                <motion.div
                  className={cn(
                    "flex items-center px-3 py-1 rounded-full text-xs font-medium",
                    activeFilter === 'balanced' ? "bg-blue-400 text-white" : "bg-blue-400/20 text-blue-400"
                  )}
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  onClick={() => setActiveFilter('balanced')}
                >
                  {activeFilter === 'balanced' && "Balanced"}
                </motion.div>
                
                <motion.div 
                  className={cn(
                    "flex items-center rounded-full cursor-pointer transition-all duration-300",
                    activeFilter === 'degen' 
                      ? "bg-orange-400 text-white px-3 py-1" 
                      : "bg-orange-400 w-6 h-6"
                  )}
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  onClick={() => setActiveFilter('degen')}
                >
                  {activeFilter === 'degen' && (
                    <motion.span 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-xs font-medium"
                    >
                      Degen
                    </motion.span>
                  )}
                </motion.div>
                
                <motion.div 
                  className={cn(
                    "flex items-center rounded-full cursor-pointer transition-all duration-300",
                    activeFilter === 'saver' 
                      ? "bg-green-400 text-white px-3 py-1" 
                      : "bg-green-400 w-6 h-6"
                  )}
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  onClick={() => setActiveFilter('saver')}
                >
                  {activeFilter === 'saver' && (
                    <motion.span
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="text-xs font-medium px-1" // Added padding to fix mobile cropping
                    >
                      Saver
                    </motion.span>
                  )}
                </motion.div>
              </div>
            </div>
            
            <AnimatePresence>
              {isSearchFocused && (
                <>
                  {/* Reduced blur effect by 50% and apply to whole dropdown component */}
                  <motion.div 
                    className={cn(
                      "absolute -inset-6 -z-10 rounded-xl bg-gradient-to-b",
                      getActiveFilterBlurColor()
                    )}
                    initial={{ opacity: 0, filter: "blur(5px)" }}
                    animate={{ opacity: 1, filter: "blur(15px)" }}
                    exit={{ opacity: 0, filter: "blur(5px)" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className={cn(
                      "absolute w-full backdrop-blur-md rounded-b-xl shadow-lg overflow-hidden",
                      getActiveFilterColor().replace('/20', '/80')
                    )}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs text-muted-foreground">
                        Suggested
                      </div>
                      <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
                        {searchSuggestions.map((suggestion) => (
                          <SearchSuggestion
                            key={suggestion.id}
                            icon={suggestion.icon}
                            label={suggestion.label}
                            onClick={() => handleSearchSuggestionClick(suggestion.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          {/* Fixed horizontal scrolling for filter categories on mobile */}
          <div className="overflow-x-auto scrollbar-none pb-2 -mx-2 px-2 mb-6">
            <div className="flex space-x-3 min-w-max">
              {categories.map((category) => (
                <CategoryFilter
                  key={category.id}
                  icon={category.icon}
                  label={category.label}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredInsights.map((insight) => (
              <InsightsCarousel
                key={insight.id}
                insights={[{
                  title: insight.title,
                  tokens: insight.tokens
                }]}
              />
            ))}
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
