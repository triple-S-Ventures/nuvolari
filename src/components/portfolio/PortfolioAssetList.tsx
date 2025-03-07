
import { cn } from "@/lib/utils";
import AssetItem from "../AssetItem";
import { useRef, useEffect } from "react";

export type Asset = {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changeValue: number;
  isPositive: boolean;
};

interface PortfolioAssetListProps {
  assets: Asset[];
  inDialog?: boolean;
  onScrollToBottom?: () => void;
}

const PortfolioAssetList = ({ 
  assets, 
  inDialog = false,
  onScrollToBottom 
}: PortfolioAssetListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!onScrollToBottom) return;
    
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Check if scrolled to bottom (with a small threshold)
      const isBottom = 
        container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
      
      if (isBottom && assets.length > 8) {
        onScrollToBottom();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [assets.length, onScrollToBottom]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        inDialog ? "max-h-[60vh]" : "max-h-[250px]", 
        "space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
      )}
    >
      {assets.map((asset, index) => (
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

export default PortfolioAssetList;
