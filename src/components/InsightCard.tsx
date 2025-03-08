
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
    setCurrentIndex(prevIndex => prevIndex === insights.length - 1 ? 0 : prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? insights.length - 1 : prevIndex - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getSlideIndex = (relativeIndex: number) => {
    const index = (currentIndex + relativeIndex) % insights.length;
    return index < 0 ? insights.length + index : index;
  };

  return <div className={cn("w-full overflow-hidden transition-all duration-500 relative h-full flex flex-col", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
      <div className="relative w-full flex-grow">
        {/* Carousel container with overflow visible to show adjacent slides */}
        <div className="relative flex items-center w-full h-[85%] overflow-visible">
          {/* Previous slide (partially visible) */}
          <div className="absolute left-[-15%] w-[30%] h-full opacity-50 scale-95">
            <div className="rounded-xl p-3 h-full border border-white/5">
              <div className="flex items-center mb-2">
                {insights[getSlideIndex(-1)].tokens.length > 0 && <TokenIcon symbol={insights[getSlideIndex(-1)].tokens[0]} />}
                
                {insights[getSlideIndex(-1)].tokens.length > 1 && <>
                    <ArrowRight size={16} className="mx-1 text-muted-foreground" />
                    <TokenIcon symbol={insights[getSlideIndex(-1)].tokens[1]} />
                  </>}
              </div>
              
              <h3 className="text-base font-medium text-foreground line-clamp-2">
                {insights[getSlideIndex(-1)].title}
              </h3>
            </div>
          </div>
          
          {/* Current slide (center, fully visible) */}
          <div className="w-full h-full z-10">
            <div className="rounded-xl p-3 h-full transform transition-all duration-300 border border-white/10">
              <div className="flex items-center mb-2">
                {insights[currentIndex].tokens.length > 0 && <TokenIcon symbol={insights[currentIndex].tokens[0]} />}
                
                {insights[currentIndex].tokens.length > 1 && <>
                    <ArrowRight size={16} className="mx-1 text-muted-foreground" />
                    <TokenIcon symbol={insights[currentIndex].tokens[1]} />
                  </>}
                
                {insights[currentIndex].tokens.slice(2).map((token, index) => <TokenIcon key={index + 2} symbol={token} />)}
              </div>
              
              <h3 className="text-base font-medium text-foreground">
                {insights[currentIndex].title}
              </h3>
            </div>
          </div>
          
          {/* Next slide (partially visible) */}
          <div className="absolute right-[-15%] w-[30%] h-full opacity-50 scale-95">
            <div className="rounded-xl p-3 h-full border border-white/5">
              <div className="flex items-center mb-2">
                {insights[getSlideIndex(1)].tokens.length > 0 && <TokenIcon symbol={insights[getSlideIndex(1)].tokens[0]} />}
                
                {insights[getSlideIndex(1)].tokens.length > 1 && <>
                    <ArrowRight size={16} className="mx-1 text-muted-foreground" />
                    <TokenIcon symbol={insights[getSlideIndex(1)].tokens[1]} />
                  </>}
              </div>
              
              <h3 className="text-base font-medium text-foreground line-clamp-2">
                {insights[getSlideIndex(1)].title}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Position indicator and navigation buttons now at the bottom center */}
      
    </div>;
};

// Export the InsightsCarousel as the default export
export default InsightsCarousel;
