
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type TokenIconProps = {
  symbol: string;
};

const TokenIcon = ({
  symbol
}: TokenIconProps) => {
  const getBackgroundColor = () => {
    switch (symbol) {
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
      case 'USDC':
        return 'bg-blue-400';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-xs", getBackgroundColor())}>
      {symbol.substring(0, 1)}
    </div>
  );
};

type InsightData = {
  title: string;
  tokens: string[];
};

type InsightsCarouselProps = {
  insights: InsightData[];
};

const InsightsCarousel = ({
  insights
}: InsightsCarouselProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Since we're displaying cards in a grid now (not a carousel), 
  // we'll just use the first item from insights
  const insight = insights[0];

  return (
    <div className={cn("transition-all duration-500 h-full flex flex-col",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
      <div className="w-full h-full bg-black/40 backdrop-blur-md rounded-xl p-4 flex flex-col">
        <div className="flex items-center mb-3 gap-2">
          {insight.tokens.map((token, index) => (
            <div key={index} className="flex items-center">
              <TokenIcon symbol={token} />
              {index < insight.tokens.length - 1 && (
                <div className="w-4 h-px bg-gray-600 mx-1"></div>
              )}
            </div>
          ))}
        </div>
        
        <h3 className="font-medium text-white text-lg mt-auto">
          {insight.title}
        </h3>
      </div>
    </div>
  );
};

export default InsightsCarousel;
