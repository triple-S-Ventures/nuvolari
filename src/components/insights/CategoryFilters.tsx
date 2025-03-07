
import { Star, Percent, RefreshCw, Landmark, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

type CategoryFilterProps = {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export const CategoryFilter = ({
  icon: Icon,
  label,
  isActive,
  onClick
}: CategoryFilterProps) => {
  return (
    <button 
      onClick={onClick} 
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0", 
        isActive ? "bg-secondary text-foreground" : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
      )}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );
};

type CategoryFiltersProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

const CategoryFilters = ({ activeCategory, setActiveCategory }: CategoryFiltersProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll active category into view whenever it changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeButton = container.querySelector(`[data-category="${activeCategory}"]`);
      
      if (activeButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        // Calculate the scroll position to center the button
        const scrollLeft = buttonRect.left + container.scrollLeft - containerRect.left - (containerRect.width / 2) + (buttonRect.width / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeCategory]);

  const categories = [
    { id: 'favorites', label: 'Favourites', icon: Star },
    { id: 'yield', label: 'Yield', icon: Percent },
    { id: 'rebalance', label: 'Rebalance', icon: RefreshCw },
    { id: 'lending', label: 'Lending', icon: Landmark },
    { id: 'swap', label: 'Swap', icon: ArrowRightLeft }
  ];

  return (
    <div className="relative overflow-hidden pb-2 mb-6">
      <div 
        ref={scrollContainerRef}
        className="flex space-x-3 overflow-x-auto scrollbar-none py-1 px-2 -mx-2 snap-x"
      >
        {categories.map(category => (
          <div key={category.id} className="snap-start" data-category={category.id}>
            <CategoryFilter
              icon={category.icon}
              label={category.label}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          </div>
        ))}
      </div>
      <div className="absolute left-0 bottom-0 w-8 h-full pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 bottom-0 w-8 h-full pointer-events-none bg-gradient-to-l from-background to-transparent" />
    </div>
  );
};

export default CategoryFilters;
