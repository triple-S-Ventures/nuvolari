
import { ChevronRight, Plus, ArrowRightLeft, RefreshCw, Wallet, DollarSign, ClipboardList, Info, BarChart3, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type SearchSuggestionProps = {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
};

const SearchSuggestion = ({ icon: Icon, label, onClick }: SearchSuggestionProps) => {
  return (
    <button 
      onClick={onClick} 
      className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors rounded-md group"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-[#AC87CF] flex items-center justify-center text-white">
          <Icon size={18} />
        </div>
        <span className="text-foreground text-sm font-medium">{label}</span>
      </div>
      <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};

type SearchSuggestionsProps = {
  onSuggestionClick: (suggestionId: string) => void;
};

const SearchSuggestions = ({ onSuggestionClick }: SearchSuggestionsProps) => {
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
    { id: 'advanced', label: 'Advanced strategy', icon: Plus }
  ];

  return (
    <div className="py-2 backdrop-blur-md border-t border-white/5">
      <div className="px-4 py-2 text-xs text-muted-foreground">
        Suggested
      </div>
      <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
        {searchSuggestions.map(suggestion => (
          <SearchSuggestion 
            key={suggestion.id} 
            icon={suggestion.icon} 
            label={suggestion.label} 
            onClick={() => onSuggestionClick(suggestion.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
