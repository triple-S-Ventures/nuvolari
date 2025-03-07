
import { cn } from "@/lib/utils";

type TabType = 'holdings' | 'defi' | 'nft';

interface PortfolioTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const PortfolioTabs = ({ activeTab, setActiveTab }: PortfolioTabsProps) => {
  return (
    <div className="flex border-b border-white/5 mb-4">
      <button 
        onClick={() => setActiveTab('holdings')}
        className={cn(
          "px-4 py-2 text-sm font-medium transition-all",
          activeTab === 'holdings' 
            ? "text-foreground border-b-2 border-primary" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Holdings
      </button>
      
      <button 
        onClick={() => setActiveTab('defi')}
        className={cn(
          "px-4 py-2 text-sm font-medium transition-all",
          activeTab === 'defi' 
            ? "text-foreground border-b-2 border-primary" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        DeFi
      </button>
      
      <button 
        onClick={() => setActiveTab('nft')}
        className={cn(
          "px-4 py-2 text-sm font-medium transition-all",
          activeTab === 'nft' 
            ? "text-foreground border-b-2 border-primary" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        NFT
      </button>
    </div>
  );
};

export default PortfolioTabs;
