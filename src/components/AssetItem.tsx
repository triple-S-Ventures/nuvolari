import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import CryptoIcon from './CryptoIcon';

interface AssetItemProps {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changeValue: number;
  isPositive: boolean;
  delay?: number;
  animationDirection?: string;
}

const AssetItem = ({ 
  symbol, 
  name, 
  value, 
  change, 
  changeValue, 
  isPositive,
  delay = 0,
  animationDirection
}: AssetItemProps) => {
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
      "flex items-center py-3 px-3 mb-2 rounded-xl bg-[#1B1B1C] border border-white/5 transition-all duration-700 transform",
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
      animationDirection === "top" && isVisible ? "translate-y-0" : animationDirection === "top" ? "translate-y-8" : ""
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

export default AssetItem;
