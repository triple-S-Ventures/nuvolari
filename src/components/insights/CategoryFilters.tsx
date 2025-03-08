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
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all", 
        isActive ? "bg-card text-foreground shadow-sm" : "bg-transparent text-muted-foreground hover:text-foreground"
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
  const categories = [
    { id: 'favorites', label: 'Favourites', icon: Star },
    { id: 'yield', label: 'Yield', icon: Percent },
    { id: 'rebalance', label: 'Rebalance', icon: RefreshCw },
    { id: 'lending', label: 'Lending', icon: Landmark },
    { id: 'swap', label: 'Swap', icon: ArrowRightLeft }
  ];

  return (
    <div className="pb-2 mb-6">
      <div className="flex justify-center flex-wrap gap-2 py-1">
        {categories.map(category => (
          <div key={category.id} data-category={category.id}>
            <CategoryFilter
              icon={category.icon}
              label={category.label}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
