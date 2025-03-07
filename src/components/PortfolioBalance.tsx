
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AssetItem from './AssetItem';
import { Switch } from '@/components/ui/switch';

const PortfolioBalance = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'holdings' | 'defi' | 'nft'>('holdings');
  const [isPrivate, setIsPrivate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "glass-card rounded-2xl p-6 transition-all duration-700 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-sm font-medium text-muted-foreground mr-2">Balance</span>
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
        
        <div className="space-y-4">
          <AssetItem 
            symbol="FART" 
            name="Fartcoin" 
            value={175020} 
            change={12.24} 
            changeValue={19019.00} 
            isPositive={true}
            delay={0.1}
          />
          
          <AssetItem 
            symbol="ETH" 
            name="Ethereum" 
            value={200116} 
            change={1.72} 
            changeValue={3340.00} 
            isPositive={false}
            delay={0.2}
          />
          
          <AssetItem 
            symbol="SOL" 
            name="Solana" 
            value={107502} 
            change={7.03} 
            changeValue={26630.00} 
            isPositive={true}
            delay={0.3}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioBalance;
