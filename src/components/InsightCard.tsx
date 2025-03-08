
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
    setCurrentIndex(prevIndex => (prevIndex + 1) >= insights.length ? 0 : prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? insights.length - 1 : prevIndex - 1);
  };

  // Helper function to get visible cards (3 at a time with the center one being the focus)
  const getVisibleCards = () => {
    const cards = [];
    // Previous card
    const prevIndex = currentIndex === 0 ? insights.length - 1 : currentIndex - 1;
    cards.push({ data: insights[prevIndex], position: 'left' });
    
    // Current card (center, main focus)
    cards.push({ data: insights[currentIndex], position: 'center' });
    
    // Next card
    const nextIndex = (currentIndex + 1) % insights.length;
    cards.push({ data: insights[nextIndex], position: 'right' });
    
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
        
        {/* Carousel container with 3 visible cards, center one bigger */}
        <div className="relative flex justify-center items-center w-full h-[85%] px-2">
          {getVisibleCards().map(({ data: insight, position }, idx) => (
            <div 
              key={idx} 
              className={cn(
                "h-full overflow-hidden transition-all duration-300 transform",
                position === 'center' ? "w-[60%] z-10 scale-100" : "w-[20%] z-0 opacity-60",
                position === 'left' ? "-mr-4 mx-4" : position === 'right' ? "-ml-4 mx-4" : "mx-6"
              )}
            >
              <div className={cn(
                "glass-card rounded-xl p-3 h-full flex flex-col",
                position === 'center' ? "p-3" : "p-2"
              )}>
                <div className="flex items-center mb-2">
                  {insight.tokens.length > 0 && <TokenIcon symbol={insight.tokens[0]} />}
                  
                  {insight.tokens.length > 1 && <>
                      <ArrowRight size={16} className="mx-1 text-muted-foreground" />
                      <TokenIcon symbol={insight.tokens[1]} />
                    </>}
                </div>
                
                <h3 className={cn(
                  "font-medium text-foreground line-clamp-3 flex-grow",
                  position === 'center' ? "text-base" : "text-xs"
                )}>
                  {insight.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export the InsightsCarousel as the default export
export default InsightsCarousel;
