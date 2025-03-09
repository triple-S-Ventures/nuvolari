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
  
  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card background */}
      <div className="absolute inset-0 rounded-xl bg-black/70 backdrop-blur-md"></div>
      
      {/* Top light effect */}
      <div 
        className="absolute -top-[2px] left-0 right-0 h-[2px] z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%)',
          opacity: isHovered ? 0.8 : 0.4,
          transition: 'opacity 0.3s ease',
          filter: 'blur(1px)'
        }}
      ></div>
      
      {/* Left edge light effect */}
      <div 
        className="absolute top-0 left-0 w-[2px] h-[30%] z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, transparent 100%)',
          opacity: isHovered ? 0.6 : 0.3,
          transition: 'opacity 0.3s ease',
          filter: 'blur(1px)'
        }}
      ></div>
      
      {/* Right edge light effect */}
      <div 
        className="absolute top-0 right-0 w-[2px] h-[30%] z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, transparent 100%)',
          opacity: isHovered ? 0.6 : 0.3,
          transition: 'opacity 0.3s ease',
          filter: 'blur(1px)'
        }}
      ></div>
      
      {/* Top corners light effect */}
      <div 
        className="absolute top-0 left-0 w-[15%] h-[15%] rounded-tl-xl z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
          opacity: isHovered ? 0.6 : 0.3,
          transition: 'opacity 0.3s ease'
        }}
      ></div>
      
      <div 
        className="absolute top-0 right-0 w-[15%] h-[15%] rounded-tr-xl z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
          opacity: isHovered ? 0.6 : 0.3,
          transition: 'opacity 0.3s ease'
        }}
      ></div>
      
      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0 rounded-xl z-10 pointer-events-none"
        style={{
          boxShadow: isHovered 
            ? 'inset 0 1px 3px 0 rgba(255, 255, 255, 0.15), 0 1px 2px 0 rgba(255, 255, 255, 0.05)' 
            : 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.1)',
          transition: 'box-shadow 0.3s ease'
        }}
      ></div>
      
      {/* Card content */}
      <div className="absolute inset-0 rounded-xl p-4 flex flex-col hover:bg-black/80 transition-all duration-300 cursor-pointer z-5">
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