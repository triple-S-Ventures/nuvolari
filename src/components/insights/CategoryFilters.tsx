
import { Star, Percent, RefreshCw, Landmark, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const categories = [
    { id: 'favorites', label: 'Favourites', icon: Star },
    { id: 'yield', label: 'Yield', icon: Percent },
    { id: 'rebalance', label: 'Rebalance', icon: RefreshCw },
    { id: 'lending', label: 'Lending', icon: Landmark },
    { id: 'swap', label: 'Swap', icon: ArrowRightLeft }
  ];

  return (
    <div className="overflow-x-auto scrollbar-none pb-2 -mx-2 px-2 mb-6">
      <div className="flex space-x-3 min-w-max">
        {categories.map(category => (
          <CategoryFilter 
            key={category.id} 
            icon={category.icon} 
            label={category.label} 
            isActive={activeCategory === category.id} 
            onClick={() => setActiveCategory(category.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
