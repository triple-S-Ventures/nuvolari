import React, { useState, useEffect } from 'react';
import { ChevronRight, Lightbulb } from 'lucide-react';

// Define the insight type
export type InsightData = {
  id?: number;
  title: string;
  tokens: string[];
};

type TokenIconProps = {
  symbol: string;
};

const TokenIcon = ({ symbol }: TokenIconProps) => {
  const getBackgroundColor = () => {
    switch (symbol) {
      case 'ETH':
        return 'bg-blue-500';
      case 'BTC':
        return 'bg-amber-500';
      case 'SOL':
        return 'bg-purple-600';
      case 'USDC':
        return 'bg-blue-400';
      case 'USDT':
        return 'bg-green-500';
      case 'MATIC':
        return 'bg-purple-500';
      case 'FART':
        return 'bg-crypto-fart';
      case 'MOG':
        return 'bg-purple-500';
      case 'LINK':
        return 'bg-blue-600';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${getBackgroundColor()}`}>
      {symbol.substring(0, 1)}
    </div>
  );
};

type CryptoCarouselProps = {
  insights?: InsightData[];
  onChangeIndex?: (index: number) => void;
};

const CryptoCarousel = ({ insights = [], onChangeIndex }: CryptoCarouselProps) => {
  // Use default insights if none are provided
  const defaultInsights: InsightData[] = [
    {
      id: 1,
      title: "Add 5 BTC to long-term holdings",
      tokens: ["BTC"],
    },
    {
      id: 2,
      title: "Reduce SOL exposure by 15%",
      tokens: ["SOL"],
    },
    {
      id: 3,
      title: "Swap 18.6 ETH to USDC to optimize portfolio",
      tokens: ["ETH", "USDC"],
    },
    {
      id: 4,
      title: "Convert 1000 USDT to MATIC",
      tokens: ["USDT", "MATIC"],
    }
  ];

  const insightsData = insights.length > 0 ? insights : defaultInsights;
  const [activeIndex, setActiveIndex] = useState(2);
  const [animating, setAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const totalItems = insightsData.length;
  
  // Notify parent component when index changes
  useEffect(() => {
    if (onChangeIndex) {
      onChangeIndex(activeIndex);
    }
  }, [activeIndex, onChangeIndex]);
  
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
  
  const goToPrev = () => {
    if (animating) return;
    setAnimating(true);
    setSlideDirection('right');
    setActiveIndex((prevIndex) => (prevIndex === 0 ? totalItems - 1 : prevIndex - 1));
    
    setTimeout(() => {
      setAnimating(false);
      setSlideDirection(null);
    }, 500);
  };
  
  const goToNext = () => {
    if (animating) return;
    setAnimating(true);
    setSlideDirection('left');
    setActiveIndex((prevIndex) => (prevIndex === totalItems - 1 ? 0 : prevIndex + 1));
    
    setTimeout(() => {
      setAnimating(false);
      setSlideDirection(null);
    }, 500);
  };
  
  const handleCardClick = (index: number) => {
    if (animating || index === activeIndex) return;
    
    setAnimating(true);
    setSlideDirection(index > activeIndex ? 'left' : 'right');
    setActiveIndex(index);
    
    setTimeout(() => {
      setAnimating(false);
      setSlideDirection(null);
    }, 500);
  };
  
  const getPrevIndex = () => {
    return activeIndex === 0 ? totalItems - 1 : activeIndex - 1;
  };
  
  const getNextIndex = () => {
    return activeIndex === totalItems - 1 ? 0 : activeIndex + 1;
  };
  
  // Render token icons with chevron between them
  const renderTokenIcons = (tokens: string[]) => {
    return (
      <div className="flex items-center justify-start">
        {tokens.map((token, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center justify-center">
              <TokenIcon symbol={token} />
            </div>
            {index < tokens.length - 1 && (
              <div className="mx-2 flex items-center justify-center">
                <ChevronRight size={16} className="text-white/60" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-[#151417] rounded-2xl w-full overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Lightbulb size={18} className="text-foreground/60" />
          <span className="text-sm font-medium text-foreground/80">Suggested Insights</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {activeIndex + 1}/{totalItems}
        </div>
      </div>
      
      <div className="relative w-full overflow-hidden h-64">
        <div className="flex h-full relative">
          {/* Previous Card - Clickable for navigation */}
          <div 
            className="absolute left-0 w-24 h-full cursor-pointer z-10 flex items-center" 
            onClick={goToPrev}
            title="Previous insight"
          >
            <div 
              className="absolute -left-32 w-48 h-48 bg-[#151417] rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{
                boxShadow: getBoxShadow()
              }}
            >
              <div className="h-full w-full flex flex-col justify-between p-4 items-start">
                {renderTokenIcons(insightsData[getPrevIndex()].tokens)}
                <p className="text-sm text-white/80 mt-auto line-clamp-2">
                  {insightsData[getPrevIndex()].title}
                </p>
              </div>
            </div>
          </div>
          
          {/* Current Card */}
          <div className="absolute left-24 right-24 h-full flex items-center justify-center">
            <div 
              className="w-full h-48 bg-[#151417] rounded-xl p-6 transition-all duration-500 flex flex-col justify-between items-start"
              style={{
                boxShadow: getBoxShadow(),
                transform: slideDirection === 'left' 
                  ? 'translateX(-5%) scale(0.95)' 
                  : slideDirection === 'right' 
                    ? 'translateX(5%) scale(0.95)' 
                    : 'translateX(0) scale(1)'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {renderTokenIcons(insightsData[activeIndex].tokens)}
              
              <p className="text-lg font-medium text-white mt-auto">
                {insightsData[activeIndex].title}
              </p>
            </div>
          </div>
          
          {/* Next Card - Clickable for navigation */}
          <div 
            className="absolute right-0 w-24 h-full cursor-pointer z-10 flex items-center justify-end" 
            onClick={goToNext}
            title="Next insight"
          >
            <div 
              className="absolute -right-32 w-48 h-48 bg-[#151417] rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{
                boxShadow: getBoxShadow()
              }}
            >
              <div className="h-full w-full flex flex-col justify-between p-4 items-start">
                {renderTokenIcons(insightsData[getNextIndex()].tokens)}
                <p className="text-sm text-white/80 mt-auto line-clamp-2">
                  {insightsData[getNextIndex()].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCarousel; 