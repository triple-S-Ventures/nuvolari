
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
      {filteredInsights.map(insight => (
        <InsightsCarousel 
          key={insight.id} 
          insights={[{
            title: insight.title,
            tokens: insight.tokens
          }]} 
        />
      ))}
    </div>
  );
};

export default InsightsList;
