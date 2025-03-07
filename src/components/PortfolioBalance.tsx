
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import AssetItem from './AssetItem';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Wallet, X } from 'lucide-react'; 

const PortfolioBalance = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'holdings' | 'defi' | 'nft'>('holdings');
  const [isPrivate, setIsPrivate] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to detect when user is at the bottom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Check if scrolled to bottom (with a small threshold)
      const isBottom = 
        container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
      
      if (isBottom && assets.length > 8) {
        setOpenDialog(true);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const assets = [
    { symbol: "FART", name: "Fartcoin", value: 175020, change: 12.24, changeValue: 19019.00, isPositive: true },
    { symbol: "ETH", name: "Ethereum", value: 200116, change: 1.72, changeValue: 3340.00, isPositive: false },
    { symbol: "SOL", name: "Solana", value: 107502, change: 7.03, changeValue: 26630.00, isPositive: true },
    { symbol: "BTC", name: "Bitcoin", value: 100000, change: 3.51, changeValue: 3395.00, isPositive: true },
    { symbol: "LINK", name: "Chainlink", value: 90000, change: 2.87, changeValue: 2523.00, isPositive: true },
    { symbol: "UNI", name: "Uniswap", value: 65000, change: 5.12, changeValue: 3168.00, isPositive: true },
    { symbol: "AAVE", name: "Aave", value: 78500, change: -3.24, changeValue: 2624.00, isPositive: false },
    { symbol: "MOG", name: "Mogcoin", value: 55000, change: 25.75, changeValue: 11289.00, isPositive: true },
    { symbol: "DOGE", name: "Dogecoin", value: 25000, change: -1.32, changeValue: 334.00, isPositive: false },
    { symbol: "PEPE", name: "Pepe", value: 12000, change: 45.61, changeValue: 3762.00, isPositive: true },
  ];

  const defiAssets = [
    { symbol: "aUSDC", name: "Aave USDC", value: 55000, change: 2.35, changeValue: 1265.00, isPositive: true },
    { symbol: "cDAI", name: "Compound DAI", value: 32000, change: 1.12, changeValue: 354.00, isPositive: true },
    { symbol: "yvETH", name: "Yearn ETH", value: 28000, change: 3.45, changeValue: 932.00, isPositive: true },
  ];

  const nftAssets = [
    { symbol: "BAYC", name: "Bored Ape Yacht Club", value: 120000, change: -5.32, changeValue: 6720.00, isPositive: false },
    { symbol: "PUNK", name: "CryptoPunks", value: 85000, change: 2.11, changeValue: 1758.00, isPositive: true },
    { symbol: "MAYC", name: "Mutant Ape Yacht Club", value: 35000, change: -1.25, changeValue: 442.00, isPositive: false },
  ];

  const renderTabContent = (tab: 'holdings' | 'defi' | 'nft', inDialog = false) => {
    let displayAssets = [];
    
    switch (tab) {
      case 'holdings':
        displayAssets = assets;
        break;
      case 'defi':
        displayAssets = defiAssets;
        break;
      case 'nft':
        displayAssets = nftAssets;
        break;
    }
    
    return (
      <div className={cn(
        inDialog ? "max-h-[60vh]" : "max-h-[250px]", 
        "space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
      )}>
        {displayAssets.map((asset, index) => (
          <AssetItem 
            key={index}
            symbol={asset.symbol} 
            name={asset.name} 
            value={asset.value} 
            change={asset.change} 
            changeValue={asset.changeValue} 
            isPositive={asset.isPositive}
            delay={inDialog ? 0.1 + (index * 0.05) : 0.1 + (index * 0.05)}
            animationDirection={inDialog ? "top" : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cn(
      "glass-card rounded-2xl p-6 transition-all duration-700 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Wallet className="w-5 h-5 text-primary mr-2" />
          <span className="text-base font-medium text-muted-foreground">Balance</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground mr-2">Private</span>
          <Switch 
            checked={isPrivate} 
            onCheckedChange={setIsPrivate}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
      
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
        
        <div 
          ref={containerRef}
          className="space-y-4 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
        >
          {activeTab === 'holdings' && assets.map((asset, index) => (
            <AssetItem 
              key={index}
              symbol={asset.symbol} 
              name={asset.name} 
              value={asset.value} 
              change={asset.change} 
              changeValue={asset.changeValue} 
              isPositive={asset.isPositive}
              delay={0.1 + (index * 0.05)}
            />
          ))}
          
          {activeTab === 'defi' && defiAssets.map((asset, index) => (
            <AssetItem 
              key={index}
              symbol={asset.symbol} 
              name={asset.name} 
              value={asset.value} 
              change={asset.change} 
              changeValue={asset.changeValue} 
              isPositive={asset.isPositive}
              delay={0.1 + (index * 0.05)}
            />
          ))}
          
          {activeTab === 'nft' && nftAssets.map((asset, index) => (
            <AssetItem 
              key={index}
              symbol={asset.symbol} 
              name={asset.name} 
              value={asset.value} 
              change={asset.change} 
              changeValue={asset.changeValue} 
              isPositive={asset.isPositive}
              delay={0.1 + (index * 0.05)}
            />
          ))}
        </div>
      </div>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-xl bg-background/95 backdrop-blur-lg border border-white/10">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Portfolio Assets</DialogTitle>
            <button 
              onClick={() => setOpenDialog(false)}
              className="rounded-full p-1.5 bg-secondary/50 hover:bg-secondary/80 transition-colors"
            >
              <X size={16} />
            </button>
          </DialogHeader>
          
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
          
          {renderTabContent(activeTab, true)}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioBalance;
