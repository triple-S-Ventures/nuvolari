
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
      return 'from-blue-400/8 to-blue-400/3';
    case 'degen':
      return 'from-orange-400/8 to-orange-400/3';
    case 'saver':
      return 'from-green-400/8 to-green-400/3';
    default:
      return 'from-primary/5 to-primary/3';
  }
};

export const insights = [
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

export const filterInsights = (insights: typeof insights, activeCategory: string, searchQuery: string) => {
  return insights.filter(insight => {
    const matchesCategory = activeCategory === 'favorites' || insight.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      insight.tokens.some(token => token.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
};
