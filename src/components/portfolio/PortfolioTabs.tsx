
import { cn } from "@/lib/utils";

type TabType = 'holdings' | 'defi' | 'nft';

interface PortfolioTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const PortfolioTabs = ({ activeTab, setActiveTab }: PortfolioTabsProps) => {
  return (
    <div className="flex items-center justify-start p-1 rounded-full bg-[#222222] mb-4 max-w-fit">
      <button 
        onClick={() => setActiveTab('holdings')}
        className={cn(
          "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
          activeTab === 'holdings' 
            ? "bg-[#403E43] text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-[#333333]/50"
        )}
      >
        Holdings
      </button>
      
      <button 
        onClick={() => setActiveTab('defi')}
        className={cn(
          "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
          activeTab === 'defi' 
            ? "bg-[#403E43] text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-[#333333]/50"
        )}
      >
        DeFi
      </button>
      
      <button 
        onClick={() => setActiveTab('nft')}
        className={cn(
          "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
          activeTab === 'nft' 
            ? "bg-[#403E43] text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-[#333333]/50"
        )}
      >
        NFT
      </button>
    </div>
  );
};

export default PortfolioTabs;
