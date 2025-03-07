
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      case 'USDC':
        return 'bg-blue-400';
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

type InsightData = {
  title: string;
  tokens: string[];
};

type InsightsCarouselProps = {
  insights: InsightData[];
};

const InsightsCarousel = ({ insights }: InsightsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === insights.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? insights.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className={cn(
        "glass-card rounded-2xl w-full overflow-hidden transition-all duration-500 relative",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="flex items-center justify-between mb-2 p-4 pb-0">
        <div className="flex items-center">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2 text-foreground/60"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span className="text-sm font-medium text-foreground/80">Suggested Insights</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {currentIndex + 1}/{insights.length}
        </div>
      </div>

      <div className="relative w-full">
        <div className="p-5">
          {/* Token icons */}
          <div className="flex -space-x-2 mb-4">
            {insights[currentIndex].tokens.map((token, index) => (
              <TokenIcon key={index} symbol={token} />
            ))}
          </div>
          
          {/* Insight title */}
          <h3 className="text-lg font-medium text-foreground">
            {insights[currentIndex].title}
          </h3>
        </div>

        {/* Navigation controls */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          <button 
            onClick={prevSlide}
            className="w-6 h-6 rounded-full bg-background/50 hover:bg-background/80 text-foreground flex items-center justify-center"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <button 
            onClick={nextSlide}
            className="w-6 h-6 rounded-full bg-background/50 hover:bg-background/80 text-foreground flex items-center justify-center"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Dots indicators */}
      <div className="flex justify-center space-x-1 pb-3">
        {insights.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all",
              currentIndex === index ? "bg-primary w-3" : "bg-foreground/20"
            )}
          />
        ))}
      </div>
    </div>
  );
};

// Export the InsightsCarousel as the default export
export default InsightsCarousel;
