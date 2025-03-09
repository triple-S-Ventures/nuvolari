import { ArrowUpRight, Plus, ArrowRightLeft, RefreshCw, Wallet, DollarSign, ClipboardList, Info, BarChart3, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SearchSuggestionAction = {
  id: string;
  label: string;
  icon: React.ElementType;
};

type SearchSuggestionProps = {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  isDarkText?: boolean;
};

const SearchSuggestion = ({ icon: Icon, label, onClick, isDarkText = false }: SearchSuggestionProps) => {
  return (
    <button 
      onClick={onClick} 
      className="w-full flex items-center justify-between px-4 py-3 transition-colors rounded-md group text-white hover:bg-white/5"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-[#AC87CF] flex items-center justify-center text-white">
          <Icon size={18} />
        </div>
        <span className="text-base font-medium">{label}</span>
      </div>
      <div className="w-8 h-8 rounded-2xl bg-[#2A2A2A] flex items-center justify-center">
        <ArrowUpRight size={14} className="text-white/70" />
      </div>
    </button>
  );
};

type SearchSuggestionsProps = {
  onSuggestionClick: (suggestionId: string) => void;
  className?: string;
};

// Export the search suggestions array so it can be used elsewhere
export const searchSuggestions: SearchSuggestionAction[] = [
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

const SearchSuggestions = ({ onSuggestionClick, className }: SearchSuggestionsProps) => {
  return (
    <div className="py-2 bg-black" style={{ backgroundColor: '#000000' }}>
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
