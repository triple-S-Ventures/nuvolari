
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import PortfolioBalanceHeader from './portfolio/PortfolioBalanceHeader';
import PortfolioTabs from './portfolio/PortfolioTabs';
import PortfolioAssetList from './portfolio/PortfolioAssetList';
import PortfolioAssetsDialog from './portfolio/PortfolioAssetsDialog';
import { holdingsAssets, defiAssets, nftAssets } from './portfolio/portfolioAssetData';

const PortfolioBalance = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'holdings' | 'defi' | 'nft'>('holdings');
  const [isPrivate, setIsPrivate] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToBottom = () => {
    setOpenDialog(true);
  };

  const getAssetsByTab = (tab: 'holdings' | 'defi' | 'nft') => {
    switch (tab) {
      case 'holdings': return holdingsAssets;
      case 'defi': return defiAssets;
      case 'nft': return nftAssets;
    }
  };

  return (
    <div className={cn(
      "border border-white/10 rounded-2xl p-6 transition-all duration-700 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <PortfolioBalanceHeader isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
      
      <div className={cn(
        "transition-all duration-500",
        isPrivate ? "blur-md select-none" : ""
      )}>
        <h2 className={cn(
          "text-4xl font-bold mb-6 transition-all duration-1000 delay-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          $ 876.588,12
        </h2>
        
        <PortfolioTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <PortfolioAssetList 
          assets={getAssetsByTab(activeTab)} 
          onScrollToBottom={handleScrollToBottom}
        />
      </div>
      
      <PortfolioAssetsDialog 
        open={openDialog}
        onOpenChange={setOpenDialog}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        assets={{
          holdings: holdingsAssets,
          defi: defiAssets,
          nft: nftAssets
        }}
      />
    </div>
  );
};

export default PortfolioBalance;
