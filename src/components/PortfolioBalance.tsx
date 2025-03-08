
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import PortfolioBalanceHeader from './portfolio/PortfolioBalanceHeader';
import PortfolioTabs from './portfolio/PortfolioTabs';
import PortfolioAssetList from './portfolio/PortfolioAssetList';
import PortfolioAssetsDialog from './portfolio/PortfolioAssetsDialog';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from 'sonner';

const PortfolioBalance = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'holdings' | 'defi' | 'nft'>('holdings');
  const [isPrivate, setIsPrivate] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { isConnected, currentWallet } = useWallet();
  
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
    if (!isConnected || !currentWallet) {
      switch (tab) {
        case 'holdings': return [];
        case 'defi': return [];
        case 'nft': return [];
      }
    }

    switch (tab) {
      case 'holdings': return currentWallet.assets;
      case 'defi': return currentWallet.defiPositions;
      case 'nft': return currentWallet.nfts;
    }
  };

  return (
    <div className={cn(
      "glass-card rounded-2xl p-4 transition-all duration-700 transform h-full",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <PortfolioBalanceHeader isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
      
      <div className={cn(
        "transition-all duration-500",
        isPrivate ? "blur-md select-none" : ""
      )}>
        <h2 className={cn(
          "text-4xl font-bold mb-4 transition-all duration-1000 delay-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          {isConnected && currentWallet 
            ? `$ ${currentWallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : "$ 0.00"}
        </h2>
        
        {!isConnected ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Connect your wallet to see your portfolio</p>
            <button
              onClick={() => toast.info("Click the Connect Wallet button in the top right corner")}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <PortfolioTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <PortfolioAssetList 
              assets={getAssetsByTab(activeTab)} 
              onScrollToBottom={handleScrollToBottom}
            />
          </>
        )}
      </div>
      
      {isConnected && (
        <PortfolioAssetsDialog 
          open={openDialog}
          onOpenChange={setOpenDialog}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          assets={{
            holdings: currentWallet?.assets || [],
            defi: currentWallet?.defiPositions || [],
            nft: currentWallet?.nfts || []
          }}
        />
      )}
    </div>
  );
};

export default PortfolioBalance;
