import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

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

  const getCryptoColor = (symbol: string) => {
    switch (symbol) {
      case 'ETH':
        return 'crypto-eth';
      case 'SOL':
        return 'crypto-sol';
      case 'FART':
      default:
        return 'crypto-fart';
    }
  };

  const getCryptoIcon = (symbol: string) => {
    switch (symbol) {
      case 'ETH':
        return (
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-crypto-eth">
            <g fill="currentColor">
              <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM16.498 27.3l7.496-4.354L16.498 20l-7.498 2.946 7.498 4.354z" />
              <path opacity=".5" d="M16.498 20v7.3l7.496-4.353L16.498 20zm0-15.991v9.802l7.496-4.353-7.496-5.45z" />
              <path opacity=".2" d="M9 16.22l7.498-4.353v-7.869L9 16.22z" />
              <path opacity=".6" d="M9 16.22l7.498 2.946v-7.3L9 16.221z" />
            </g>
          </svg>
        );
      case 'SOL':
        return (
          <svg viewBox="0 0 397.7 311.7" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-crypto-sol">
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="360.879" x2="141.213" y1="351.455" y2="-69.294">
              <stop offset="0" stopColor="#00ffa3" />
              <stop offset="1" stopColor="#dc1fff" />
            </linearGradient>
            <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" fill="currentColor" />
            <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" fill="currentColor" />
            <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z" fill="currentColor" />
          </svg>
        );
      case 'FART':
      default:
        return (
          <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
            F
          </div>
        );
    }
  };

  return (
    <div className={cn(
      "flex items-center py-2 border-b border-white/5 transition-all duration-700 transform",
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
      animationDirection === "top" && isVisible ? "translate-y-0" : animationDirection === "top" ? "translate-y-8" : ""
    )}>
      <div className="flex items-center">
        <div className="mr-2 rounded-full bg-secondary/70 w-8 h-8 flex items-center justify-center">
          {getCryptoIcon(symbol)}
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
