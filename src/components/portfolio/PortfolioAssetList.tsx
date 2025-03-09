import { useRef, useEffect, useState } from 'react';
import AssetItem from '../AssetItem';
import CryptoIcon from '../CryptoIcon';
import { cn } from '@/lib/utils';

export interface Asset {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changeValue: number;
  isPositive: boolean;
}

interface PortfolioAssetListProps {
  assets: Asset[];
  onScrollToBottom?: () => void;
  inDialog?: boolean;
  disableScroll?: boolean;
}

const PortfolioAssetList = ({ 
  assets, 
  onScrollToBottom, 
  inDialog = false,
  disableScroll = false
}: PortfolioAssetListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!onScrollToBottom || disableScroll) return;
    
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const threshold = 20; // 20px from bottom
      
      if (scrollHeight - scrollTop - clientHeight < threshold) {
        onScrollToBottom();
      }
    };
    
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [onScrollToBottom, disableScroll]);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "pr-1 -mr-1 mt-2",
        !disableScroll && "max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent",
        inDialog && disableScroll && "h-full w-full space-y-1"
      )}
    >
      <div className="bg-[#1B1B1C] rounded-xl p-3 border border-white/5">
        {assets.map((asset, index) => (
          <div 
            key={`${asset.symbol}-${index}`}
            className={cn(
              "py-3 border-b border-white/5 last:border-b-0 transition-all duration-700 transform",
              index === 0 ? "" : "mt-1"
            )}
          >
            <AssetItemContent
              symbol={asset.symbol}
              name={asset.name}
              value={asset.value}
              change={asset.change}
              changeValue={asset.changeValue}
              isPositive={asset.isPositive}
              delay={index * 0.1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Extracted the content of AssetItem without the background and border
const AssetItemContent = ({ 
  symbol, 
  name, 
  value, 
  change, 
  changeValue, 
  isPositive,
  delay = 0
}: Asset & { delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800 + (delay * 1000));
    
    return () => clearTimeout(timer);
  }, [delay]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={cn(
      "flex items-center px-1",
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
    )}>
      <div className="flex items-center">
        <div className="mr-3">
          <CryptoIcon symbol={symbol} className="w-10 h-10" />
        </div>
        
        <div>
          <div className="flex items-center">
            <span className="font-medium text-sm">{symbol}</span>
          </div>
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      </div>
      
      <div className="ml-auto text-right">
        <div className="font-medium text-sm">{formatCurrency(value)} $</div>
        <div className={cn(
          "text-xs",
          isPositive ? "text-crypto-positive" : "text-crypto-negative"
        )}>
          {isPositive ? "+" : "-"}{change}% ({formatCurrency(changeValue)}$)
        </div>
      </div>
    </div>
  );
};

export default PortfolioAssetList;
