
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

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

  return <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-white font-medium text-xs", getBackgroundColor())}>
      {symbol.substring(0, 1)}
    </div>;
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 3) >= insights.length ? 0 : prevIndex + 3);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => prevIndex < 3 ? Math.max(insights.length - 3, 0) : prevIndex - 3);
  };

  // Helper function to get visible cards (3 at a time)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % insights.length;
      cards.push(insights[index]);
    }
    return cards;
  };

  return (
    <div className={cn("w-full transition-all duration-500 relative h-full flex flex-col", 
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
      
      <div className="relative w-full flex-grow">
        {/* Navigation buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 bg-background/80 rounded-full p-1"
          aria-label="Previous slides"
        >
          <ChevronLeft size={20} className="text-foreground/60" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 bg-background/80 rounded-full p-1"
          aria-label="Next slides"
        >
          <ChevronRight size={20} className="text-foreground/60" />
        </button>
        
        {/* Carousel container with 3 visible cards */}
        <div className="relative flex justify-between items-center w-full h-[85%] px-2">
          {getVisibleCards().map((insight, idx) => (
            <div key={idx} className="w-[32%] h-full mx-[0.5%]">
              <div className="glass-card rounded-xl p-3 h-full">
                <div className="flex items-center mb-2">
                  {insight.tokens.length > 0 && <TokenIcon symbol={insight.tokens[0]} />}
                  
                  {insight.tokens.length > 1 && <>
                      <ArrowRight size={16} className="mx-1 text-muted-foreground" />
                      <TokenIcon symbol={insight.tokens[1]} />
                    </>}
                </div>
                
                <h3 className="text-base font-medium text-foreground line-clamp-3">
                  {insight.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination indicator dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(insights.length / 3) }).map((_, index) => (
          <div 
            key={index}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all",
              Math.floor(currentIndex / 3) === index ? "bg-primary w-3" : "bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
};

// Export the InsightsCarousel as the default export
export default InsightsCarousel;
