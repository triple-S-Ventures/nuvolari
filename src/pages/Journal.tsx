import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import JournalEntry from '@/components/JournalEntry';
import JournalAccessPopup from '@/components/JournalAccessPopup';
import BackgroundGradient from '@/components/BackgroundGradient';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

// Define types
type EntryType = 'trade' | 'transfer' | 'swap' | 'mint';
type FilterType = 'all' | 'trades' | 'transfers' | 'swaps' | 'mints';

interface Entry {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: EntryType;
  executed: boolean;
  amount?: string;
  token?: string;
  profit?: string;
  profitPercentage?: number;
}

interface DateGroup {
  id: string;
  date: string;
  entries: Entry[];
}

// Sample data
const journalEntries: DateGroup[] = [
  {
    id: 'today',
    date: 'Today',
    entries: [
      {
        id: 'entry1',
        title: 'Long ETH',
        description: 'Opened a long position on ETH at $3,450',
        timestamp: '10:30 AM',
        type: 'trade',
        executed: true,
        amount: '2.5 ETH',
        profit: '+$320',
        profitPercentage: 3.7
      },
      {
        id: 'entry2',
        title: 'Transfer to Binance',
        description: 'Transferred USDT to Binance account',
        timestamp: '09:15 AM',
        type: 'transfer',
        executed: true,
        amount: '1,000 USDT'
      },
      {
        id: 'entry3',
        title: 'Swap ETH for USDC',
        description: 'Swapped ETH for USDC on Uniswap',
        timestamp: '08:45 AM',
        type: 'swap',
        executed: false,
        amount: '1.2 ETH'
      }
    ]
  },
  {
    id: 'yesterday',
    date: 'Yesterday',
    entries: [
      {
        id: 'entry4',
        title: 'Short BTC',
        description: 'Opened a short position on BTC at $65,200',
        timestamp: '03:20 PM',
        type: 'trade',
        executed: true,
        amount: '0.5 BTC',
        profit: '-$150',
        profitPercentage: -0.46
      },
      {
        id: 'entry5',
        title: 'Mint NFT',
        description: 'Minted a new NFT from the Bored Ape collection',
        timestamp: '11:30 AM',
        type: 'mint',
        executed: true
      }
    ]
  },
  {
    id: 'lastweek',
    date: 'Last Week',
    entries: [
      {
        id: 'entry6',
        title: 'Long SOL',
        description: 'Opened a long position on SOL at $120',
        timestamp: 'Mon, 3:45 PM',
        type: 'trade',
        executed: true,
        amount: '20 SOL',
        profit: '+$240',
        profitPercentage: 10
      },
      {
        id: 'entry7',
        title: 'Transfer to Hardware Wallet',
        description: 'Transferred BTC to hardware wallet for cold storage',
        timestamp: 'Mon, 10:20 AM',
        type: 'transfer',
        executed: true,
        amount: '0.25 BTC'
      }
    ]
  }
];

const Journal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showExecuted, setShowExecuted] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  
  useEffect(() => {
    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Journal loaded successfully");
    }, 1000);
    
    // Show popup after 2 seconds
    const popupTimer = setTimeout(() => {
      setIsBlurred(true);
      setShowPopup(true);
    }, 2000);
    
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(popupTimer);
    };
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsBlurred(false);
  };

  // Filter entries based on search query, filter type, and executed status
  const filteredEntries = journalEntries.map(dateGroup => {
    const filteredGroupEntries = dateGroup.entries.filter(entry => {
      // Filter by search query
      const matchesSearch = 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by type
      const matchesType = 
        activeFilter === 'all' || 
        (activeFilter === 'trades' && entry.type === 'trade') ||
        (activeFilter === 'transfers' && entry.type === 'transfer') ||
        (activeFilter === 'swaps' && entry.type === 'swap') ||
        (activeFilter === 'mints' && entry.type === 'mint');
      
      // Filter by executed status
      const matchesExecuted = showExecuted ? true : entry.executed;
      
      return matchesSearch && matchesType && matchesExecuted;
    });
    
    return {
      ...dateGroup,
      entries: filteredGroupEntries
    };
  }).filter(dateGroup => dateGroup.entries.length > 0);
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <BackgroundGradient />
      <Navbar />
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          <div 
            className={cn(
              "fixed inset-0 z-10 bg-black/60 backdrop-blur-md transition-opacity duration-500",
              isBlurred ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          />
          <main className={cn(
            "flex-1 pt-28 pb-16 flex flex-col items-center justify-start w-full transition-all duration-500 relative z-20",
            isBlurred && "blur-sm pointer-events-none"
          )}>
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2">Journal</h1>
                <p className="text-muted-foreground">Track your on-chain activity</p>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search journal entries..." 
                    className="w-full bg-secondary/30 border border-white/5 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                  onClick={() => setActiveFilter('trades')}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                    activeFilter === 'trades' 
                      ? "bg-card text-foreground" 
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  Trades
                </button>
                <button 
                  onClick={() => setActiveFilter('transfers')}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                    activeFilter === 'transfers' 
                      ? "bg-card text-foreground" 
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  Transfers
                </button>
                <button 
                  onClick={() => setActiveFilter('swaps')}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                    activeFilter === 'swaps' 
                      ? "bg-card text-foreground" 
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  Swaps
                </button>
                <button 
                  onClick={() => setActiveFilter('mints')}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                    activeFilter === 'mints' 
                      ? "bg-card text-foreground" 
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  Mints
                </button>
              </div>
              
              <div className="flex items-center justify-between mb-6 mt-4">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={showExecuted} 
                    onCheckedChange={setShowExecuted} 
                    className="data-[state=checked]:bg-primary"
                  />
                  <span className="text-sm text-muted-foreground">Show executed</span>
                </div>
                
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <span>Latest first</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              
              {filteredEntries.length > 0 ? (
                <div className="space-y-8">
                  {filteredEntries.map(dateGroup => (
                    <div key={dateGroup.id}>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-sm font-medium text-foreground">{dateGroup.date}</h3>
                        <div className="flex-1 h-px bg-white/5"></div>
                      </div>
                      
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
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                    <Search size={24} className="text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">No journal entries found</p>
                  <p className="text-muted-foreground max-w-md">
                    No journal entries match your current filters. Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </div>
          </main>
        </>
      )}
      
      <Footer />
      
      <AnimatePresence>
        {showPopup && (
          <JournalAccessPopup onClose={handleClosePopup} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Journal;
