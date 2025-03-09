import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

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
        return 'bg-purple-500';
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
    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-white font-medium text-xs", getBackgroundColor())}>
      {symbol.substring(0, 1)}
    </div>
  );
};

type InsightCardProps = {
  title: string;
  tokens: string[];
};

const InsightCard = ({ title, tokens }: InsightCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamic box-shadow values based on hover state
  const getBoxShadow = () => {
    const topGlow = isHovered ? 'rgba(180, 180, 180, 0.4)' : 'rgba(180, 180, 180, 0.25)';
    const sideGlow = isHovered ? 'rgba(180, 180, 180, 0.2)' : 'rgba(180, 180, 180, 0.1)';
    const border = 'rgba(0, 0, 0, 0.2)';
    
    return `
      0 -1px 1px ${topGlow},
      -1px -1px 1px ${sideGlow},
      1px -1px 1px ${sideGlow},
      0 0 0 1px ${border}
    `;
  };
  
  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card with illuminated border using box-shadow */}
      <div 
        className="w-full h-full rounded-xl bg-black/50 backdrop-blur-md p-4 flex flex-col hover:bg-black/60 transition-all duration-300 cursor-pointer"
        style={{
          boxShadow: getBoxShadow(),
          transition: 'box-shadow 0.3s ease, background-color 0.3s ease'
        }}
      >
        <div className="flex items-center mb-3 gap-2">
          {tokens.map((token, index) => (
            <div key={index} className="flex items-center">
              <TokenIcon symbol={token} />
              {index < tokens.length - 1 && (
                <ArrowRight size={14} className="text-gray-400 mx-1" />
              )}
            </div>
          ))}
        </div>
        
        <h3 className="font-medium text-white text-base mt-auto line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default InsightCard; 