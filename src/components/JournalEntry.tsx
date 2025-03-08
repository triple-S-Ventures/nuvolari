
import { ArrowRight, Wallet, RefreshCw, ArrowUpDown, WalletCards, Coins, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EntryProps {
  entry: {
    id: number;
    type: string;
    title: string;
    iconBg: string;
    secondaryIconBg?: string;
    executed: boolean;
    timestamp: string;
  };
  onClick: () => void;
}

const JournalEntry = ({ entry, onClick }: EntryProps) => {
  // Determine which icon to use based on the entry type
  const getIcon = () => {
    switch (entry.type) {
      case 'rebalance':
        return <RefreshCw className="h-4 w-4 text-white" />;
      case 'swap':
        return <ArrowUpDown className="h-4 w-4 text-white" />;
      case 'snapshot':
        return <Wallet className="h-4 w-4 text-white" />;
      case 'close':
        return <WalletCards className="h-4 w-4 text-white" />;
      case 'claim':
        return <Coins className="h-4 w-4 text-white" />;
      default:
        return <ArrowUpDown className="h-4 w-4 text-white" />;
    }
  };

  // Format timestamp to display time in 12-hour format
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  return (
    <div 
      onClick={onClick}
      className="glass-card rounded-xl p-4 flex items-center justify-between hover:shadow-card-hover transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <div className={cn("flex items-center justify-center w-8 h-8 rounded-full", entry.iconBg)}>
            {getIcon()}
          </div>
          
          {entry.secondaryIconBg && (
            <div className={cn("flex items-center justify-center w-8 h-8 rounded-full -ml-2 border-2 border-background", entry.secondaryIconBg)}>
              <ArrowRight className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        
        <div>
          <h4 className="font-medium">{entry.title}</h4>
          <p className="text-sm text-muted-foreground">{formatTime(entry.timestamp)}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {entry.executed && (
          <span className="bg-primary/20 text-primary text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
            Executed
            <Check className="h-3 w-3 ml-1" />
          </span>
        )}
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default JournalEntry;
