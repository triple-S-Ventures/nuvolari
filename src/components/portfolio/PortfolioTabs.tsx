
import { cn } from "@/lib/utils";

type TabType = 'holdings' | 'defi' | 'nft';

interface PortfolioTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const PortfolioTabs = ({ activeTab, setActiveTab }: PortfolioTabsProps) => {
  return (
    <div className="flex items-center justify-start p-1 rounded-full border border-white/5 mb-4 w-full">
      <button 
        onClick={() => setActiveTab('holdings')}
        className={cn(
          "flex-1 px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
          activeTab === 'holdings' 
            ? "bg-white/5 text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-white/2"
        )}
      >
        Holdings
      </button>
      
      <button 
        onClick={() => setActiveTab('defi')}
        className={cn(
          "flex-1 px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
          activeTab === 'defi' 
            ? "bg-white/5 text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-white/2"
        )}
      >
        DeFi
      </button>
      
      <button 
        onClick={() => setActiveTab('nft')}
        className={cn(
          "flex-1 px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
          activeTab === 'nft' 
            ? "bg-white/5 text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-white/2"
        )}
      >
        NFT
      </button>
    </div>
  );
};

export default PortfolioTabs;
