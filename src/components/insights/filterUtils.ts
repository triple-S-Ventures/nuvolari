export const getActiveFilterColor = (activeFilter: string) => {
  switch (activeFilter) {
    case 'balanced':
      return 'bg-blue-400/20';
    case 'degen':
      return 'bg-orange-400/20';
    case 'saver':
      return 'bg-green-400/20';
    default:
      return 'bg-secondary/30';
  }
};

export const getActiveFilterBlurColor = (activeFilter: string) => {
  switch (activeFilter) {
    case 'balanced':
      return 'from-blue-400/15 to-blue-400/5';
    case 'degen':
      return 'from-orange-400/15 to-orange-400/5';
    case 'saver':
      return 'from-green-400/15 to-green-400/5';
    default:
      return 'from-primary/5 to-primary/3';
  }
};

export const getSearchBarBlurColor = (activeFilter: string) => {
  switch (activeFilter) {
    case 'balanced':
      return 'bg-blue-400/10 backdrop-blur-md border-blue-400/20';
    case 'degen':
      return 'bg-orange-400/10 backdrop-blur-md border-orange-400/20';
    case 'saver':
      return 'bg-green-400/10 backdrop-blur-md border-green-400/20';
    default:
      return 'bg-black/50 backdrop-blur-md border-white/10';
  }
};

export const getStandardSearchBarColor = () => {
  return 'bg-black/50 border border-white/10';
};

type Insight = {
  id: number;
  title: string;
  tokens: string[];
  category: string;
};

export const insights: Insight[] = [
  {
    id: 1,
    title: 'Add $6.8K to the SOL/FART LP',
    tokens: ['SOL', 'FART'],
    category: 'yield'
  }, 
  {
    id: 2,
    title: 'Swap 10 ETH to MOG',
    tokens: ['ETH', 'MOG'],
    category: 'swap'
  }, 
  {
    id: 3,
    title: 'Repay wETH Leveraged Farming Position',
    tokens: ['ETH'],
    category: 'lending'
  }, 
  {
    id: 4,
    title: 'Rebalance',
    tokens: ['BAL'],
    category: 'rebalance'
  }, 
  {
    id: 5,
    title: 'Add Liquidity',
    tokens: ['UNI'],
    category: 'yield'
  }, 
  {
    id: 6,
    title: 'Swap',
    tokens: ['SWAP'],
    category: 'swap'
  }
];

export const filterInsights = (insightsArray: Insight[], activeCategory: string, searchQuery: string) => {
  return insightsArray.filter(insight => {
    const matchesCategory = activeCategory === 'favorites' || insight.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      insight.tokens.some(token => token.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
};
