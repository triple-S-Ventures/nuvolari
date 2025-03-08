import { ArrowRight, ArrowUpRight, ArrowDownRight, Repeat, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Entry {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'trade' | 'transfer' | 'swap' | 'mint';
  executed: boolean;
  amount?: string;
  token?: string;
  profit?: string;
  profitPercentage?: number;
}

interface JournalEntryProps {
  entry: Entry;
  onClick: () => void;
}

const JournalEntry = ({ entry, onClick }: JournalEntryProps) => {
  // Determine icon based on entry type
  const getIcon = () => {
    switch (entry.type) {
      case 'trade':
        return entry.profit && entry.profit.startsWith('+') 
          ? <ArrowUpRight className="text-green-500" /> 
          : <ArrowDownRight className="text-red-500" />;
      case 'transfer':
        return <ArrowRight className="text-blue-500" />;
      case 'swap':
        return <Repeat className="text-purple-500" />;
      case 'mint':
        return <Coins className="text-amber-500" />;
      default:
        return <ArrowRight className="text-primary" />;
    }
  };

  // Determine background color based on entry type
  const getBgColor = () => {
    switch (entry.type) {
      case 'trade':
        return 'bg-green-500/10';
      case 'transfer':
        return 'bg-blue-500/10';
      case 'swap':
        return 'bg-purple-500/10';
      case 'mint':
        return 'bg-amber-500/10';
      default:
        return 'bg-primary/10';
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center p-3 rounded-xl border border-white/5 bg-card/50 hover:bg-card/80 transition-colors cursor-pointer",
        !entry.executed && "opacity-70"
      )}
      onClick={onClick}
    >
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-4", getBgColor())}>
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium text-foreground truncate">{entry.title}</h4>
          <span className="text-sm text-muted-foreground">{entry.timestamp}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground truncate">{entry.description}</p>
          
          {entry.profit && (
            <span className={cn(
              "text-sm font-medium",
              entry.profit.startsWith('+') ? "text-green-500" : "text-red-500"
            )}>
              {entry.profit} ({entry.profitPercentage}%)
            </span>
          )}
          
          {entry.amount && !entry.profit && (
            <span className="text-sm font-medium text-foreground">{entry.amount}</span>
          )}
          
          {!entry.executed && (
            <span className="text-xs bg-secondary/50 text-muted-foreground px-2 py-0.5 rounded-full">
              Pending
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalEntry;
