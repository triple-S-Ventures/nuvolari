import InsightCard from '@/components/insights/InsightCard';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {filteredInsights.map(insight => (
        <div key={insight.id} className="h-36 transition-all duration-300 hover:transform hover:scale-[1.02]">
          <InsightCard 
            title={insight.title}
            tokens={insight.tokens}
          />
        </div>
      ))}
    </div>
  );
};

export default InsightsList;
