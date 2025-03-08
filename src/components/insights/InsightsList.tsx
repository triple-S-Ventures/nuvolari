
import InsightsCarousel from '@/components/InsightCard';

type InsightsListProps = {
  filteredInsights: Array<{
    id: number;
    title: string;
    tokens: string[];
    category: string;
  }>;
};

const InsightsList = ({ filteredInsights }: InsightsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredInsights.map(insight => (
        <div key={insight.id} className="h-44">
          <InsightsCarousel 
            insights={[{
              title: insight.title,
              tokens: insight.tokens
            }]} 
          />
        </div>
      ))}
    </div>
  );
};

export default InsightsList;
