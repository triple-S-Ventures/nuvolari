
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type TokenIconProps = {
  symbol: string;
};

const TokenIcon = ({ symbol }: TokenIconProps) => {
  const getBackgroundColor = () => {
    switch(symbol) {
      case 'ETH':
        return 'bg-crypto-eth';
      case 'SOL':
        return 'bg-crypto-sol';
      case 'FART':
        return 'bg-crypto-fart';
      case 'MOG':
        return 'bg-purple-500';
      case 'BAL':
        return 'bg-blue-500';
      case 'UNI':
        return 'bg-pink-500';
      case 'SWAP':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={cn(
      "w-7 h-7 rounded-full flex items-center justify-center text-white font-medium text-xs",
      getBackgroundColor()
    )}>
      {symbol.substring(0, 1)}
    </div>
  );
};

type InsightCardProps = {
  title: string;
  tokens: string[];
};

const InsightCard = ({ title, tokens }: InsightCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={cn(
        "bg-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="p-5">
        {/* Token icons */}
        <div className="flex -space-x-2 mb-4">
          {tokens.map((token, index) => (
            <TokenIcon key={index} symbol={token} />
          ))}
        </div>
        
        {/* Insight title */}
        <h3 className="text-lg font-medium text-foreground">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default InsightCard;
