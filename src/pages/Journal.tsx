
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import JournalEntry from '@/components/JournalEntry';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

// Mock data for journal entries
const journalEntries = [
  {
    id: 1,
    date: 'Today',
    entries: [
      {
        id: 101,
        type: 'rebalance',
        title: 'Rebalance portfolio ETH to USDT',
        iconBg: 'bg-primary',
        secondaryIconBg: 'bg-blue-500',
        executed: false,
        timestamp: new Date().toISOString(),
      },
      {
        id: 102,
        type: 'snapshot',
        title: 'Make a wallet snapshot',
        iconBg: 'bg-purple-500',
        executed: true,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: 2,
    date: 'Tue, 28 Jan',
    entries: [
      {
        id: 201,
        type: 'swap',
        title: 'Swap 18K USDC to FART',
        iconBg: 'bg-purple-500',
        executed: true,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 202,
        type: 'close',
        title: 'Close SOL/USDC LP',
        iconBg: 'bg-primary',
        secondaryIconBg: 'bg-blue-500',
        executed: false,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },
  {
    id: 3,
    date: 'Fri, 24 Jan',
    entries: [
      {
        id: 301,
        type: 'claim',
        title: 'Claim fees on SOL/USDC pool',
        iconBg: 'bg-teal-500',
        secondaryIconBg: 'bg-purple-500',
        executed: false,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ]
  }
];

type FilterType = 'all' | 'yield' | 'rebalance' | 'lending' | 'swap';

const Journal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showExecuted, setShowExecuted] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Journal loaded successfully");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredEntries = journalEntries.map(dateGroup => {
    const filteredGroupEntries = dateGroup.entries.filter(entry => {
      // Filter by search query
      const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by type
      const matchesType = activeFilter === 'all' || entry.type === activeFilter;
      
      // Filter by execution status
      const matchesExecutionStatus = showExecuted || !entry.executed;
      
      return matchesSearch && matchesType && matchesExecutionStatus;
    });
    
    return {
      ...dateGroup,
      entries: filteredGroupEntries
    };
  }).filter(dateGroup => dateGroup.entries.length > 0);
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-background overflow-x-hidden"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
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
            <h1 className="text-4xl font-bold mb-2">Journal</h1>
            <p className="text-muted-foreground">Get back to your previous actions, see the whole picture</p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search actions or insights"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary/50 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">By Date</span>
                <button className="flex items-center gap-1 bg-secondary/50 rounded-full px-3 py-1.5 text-sm font-medium">
                  Date
                  <ChevronDown size={14} />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Executed</span>
                <Switch 
                  checked={showExecuted} 
                  onCheckedChange={setShowExecuted} 
                />
              </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button 
                onClick={() => setActiveFilter('all')}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  activeFilter === 'all' 
                    ? "bg-card text-foreground" 
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter('yield')}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  activeFilter === 'yield' 
                    ? "bg-card text-foreground" 
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                Yield
              </button>
              <button 
                onClick={() => setActiveFilter('rebalance')}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  activeFilter === 'rebalance' 
                    ? "bg-card text-foreground" 
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                Rebalance
              </button>
              <button 
                onClick={() => setActiveFilter('lending')}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  activeFilter === 'lending' 
                    ? "bg-card text-foreground" 
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                Lending
              </button>
              <button 
                onClick={() => setActiveFilter('swap')}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  activeFilter === 'swap' 
                    ? "bg-card text-foreground" 
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                Swap
              </button>
            </div>
          </div>
          
          {/* Journal Entries */}
          <div className="space-y-8">
            {filteredEntries.length > 0 ? (
              filteredEntries.map(dateGroup => (
                <div key={dateGroup.id} className="animate-fade-in-up">
                  <h3 className="text-lg font-semibold mb-4">{dateGroup.date}</h3>
                  <div className="space-y-3">
                    {dateGroup.entries.map(entry => (
                      <JournalEntry 
                        key={entry.id}
                        entry={entry}
                        onClick={() => toast.info(`Viewing details for: ${entry.title}`)}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground max-w-md">
                  No journal entries match your current filters. Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </main>
      )}
      
      <Footer />
      
      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
    </motion.div>
  );
};

export default Journal;
