import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import React from 'react';

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
    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-lg shadow-md", getBackgroundColor())}>
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
  onChangeIndex?: (index: number) => void;
};

const InsightsCarousel = ({
  insights,
  onChangeIndex
}: InsightsCarouselProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Notify parent component when index changes
  useEffect(() => {
    if (onChangeIndex) {
      onChangeIndex(currentIndex);
    }
  }, [currentIndex, onChangeIndex]);

  const handleNext = () => {
    if (isAnimating || insights.length <= 1) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % insights.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating || insights.length <= 1) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + insights.length) % insights.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleCardClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // If there are no insights, return null
  if (insights.length === 0) return null;

  // Get the previous, current, and next indices
  const prevIndex = (currentIndex - 1 + insights.length) % insights.length;
  const nextIndex = (currentIndex + 1) % insights.length;

  return (
    <div 
      className={cn(
        "transition-all duration-500 h-full relative",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Card Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Card Wrapper - Creates a horizontal layout */}
              <div className="flex items-center justify-center w-full">
                {/* Previous Card */}
                {insights.length > 1 && (
                  <div 
                    className={cn(
                      "w-[25%] h-[85%] mx-2 transition-all duration-300 cursor-pointer opacity-70 hover:opacity-90 transform scale-90",
                      isAnimating ? "pointer-events-none" : ""
                    )}
                    onClick={() => handleCardClick(prevIndex)}
                  >
                    <InsightCard insight={insights[prevIndex]} />
                  </div>
                )}

                {/* Current Card */}
                <div className="w-[50%] h-[85%] mx-2 z-10 transition-all duration-300">
                  <InsightCard insight={insights[currentIndex]} />
                </div>

                {/* Next Card */}
                {insights.length > 1 && (
                  <div 
                    className={cn(
                      "w-[25%] h-[85%] mx-2 transition-all duration-300 cursor-pointer opacity-70 hover:opacity-90 transform scale-90",
                      isAnimating ? "pointer-events-none" : ""
                    )}
                    onClick={() => handleCardClick(nextIndex)}
                  >
                    <InsightCard insight={insights[nextIndex]} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {insights.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            disabled={isAnimating}
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            disabled={isAnimating}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Pagination dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-3 pb-1">
        {insights.map((_, index) => (
          <div 
            key={index}
            className={cn(
              "h-2 rounded-full transition-all cursor-pointer",
              currentIndex === index ? "bg-white w-4" : "bg-gray-500/50 w-2"
            )}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Separate component for individual insight cards
const InsightCard = ({ insight }: { insight: InsightData }) => {
  return (
    <div className="w-full h-full bg-black/50 backdrop-blur-md rounded-2xl p-4 flex flex-col hover:bg-black/60 transition-all duration-300 shadow-md">
      <div className="flex items-center justify-center mb-6 mt-2">
        <div className="flex items-center">
          {insight.tokens.map((token, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-center">
                <TokenIcon symbol={token} />
              </div>
              {index < insight.tokens.length - 1 && (
                <div className="mx-2 flex items-center justify-center">
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <h3 className="font-medium text-white text-base mt-auto text-center line-clamp-2">
        {insight.title}
      </h3>
    </div>
  );
};

export default InsightsCarousel;
