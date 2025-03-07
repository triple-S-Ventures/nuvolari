
import { useRef, useEffect } from 'react';
import AssetItem from '../AssetItem';
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
}

const PortfolioAssetList = ({ assets, onScrollToBottom, inDialog = false }: PortfolioAssetListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!onScrollToBottom) return;
    
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
  }, [onScrollToBottom]);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "max-h-[280px] overflow-y-auto pr-3 -mr-3 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
      )}
    >
      {assets.map((asset, index) => (
        <AssetItem
          key={`${asset.symbol}-${index}`}
          symbol={asset.symbol}
          name={asset.name}
          value={asset.value}
          change={asset.change}
          changeValue={asset.changeValue}
          isPositive={asset.isPositive}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default PortfolioAssetList;
