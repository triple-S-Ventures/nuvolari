import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  return <div className={cn("w-full overflow-hidden transition-all duration-500 relative h-full flex flex-col", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
      <div className="relative w-full flex-grow">
        <div className="glass-card rounded-xl p-3 mb-3 h-[80%]">
          {/* Token icons */}
          <div className="flex -space-x-2 mb-2">
            {insights[currentIndex].tokens.map((token, index) => <TokenIcon key={index} symbol={token} />)}
          </div>
          
          {/* Insight title */}
          <h3 className="text-base font-medium text-foreground">
            {insights[currentIndex].title}
          </h3>
        </div>

        {/* Navigation controls */}
        {insights.length > 1 && <>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
              <button onClick={prevSlide} className="w-6 h-6 rounded-full bg-background/50 hover:bg-background/80 text-foreground flex items-center justify-center">
                <ChevronLeft size={16} />
              </button>
            </div>
            
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
              <button onClick={nextSlide} className="w-6 h-6 rounded-full bg-background/50 hover:bg-background/80 text-foreground flex items-center justify-center">
                <ChevronRight size={16} />
              </button>
            </div>
          </>}
      </div>

      {/* Dots indicators */}
      {insights.length > 1 && <div className="flex justify-center space-x-1 pb-1 mt-auto">
          {insights.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className="" />)}
        </div>}
    </div>;
};

// Export the InsightsCarousel as the default export
export default InsightsCarousel;