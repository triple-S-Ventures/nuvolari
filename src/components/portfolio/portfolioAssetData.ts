
import { Asset } from "./PortfolioAssetList";

export const holdingsAssets: Asset[] = [
  { symbol: "FART", name: "Fartcoin", value: 175020, change: 12.24, changeValue: 19019.00, isPositive: true },
  { symbol: "ETH", name: "Ethereum", value: 200116, change: 1.72, changeValue: 3340.00, isPositive: false },
  { symbol: "SOL", name: "Solana", value: 107502, change: 7.03, changeValue: 26630.00, isPositive: true },
  { symbol: "BTC", name: "Bitcoin", value: 100000, change: 3.51, changeValue: 3395.00, isPositive: true },
  { symbol: "LINK", name: "Chainlink", value: 90000, change: 2.87, changeValue: 2523.00, isPositive: true },
  { symbol: "UNI", name: "Uniswap", value: 65000, change: 5.12, changeValue: 3168.00, isPositive: true },
  { symbol: "AAVE", name: "Aave", value: 78500, change: -3.24, changeValue: 2624.00, isPositive: false },
  { symbol: "MOG", name: "Mogcoin", value: 55000, change: 25.75, changeValue: 11289.00, isPositive: true },
  { symbol: "DOGE", name: "Dogecoin", value: 25000, change: -1.32, changeValue: 334.00, isPositive: false },
  { symbol: "PEPE", name: "Pepe", value: 12000, change: 45.61, changeValue: 3762.00, isPositive: true },
];

export const defiAssets: Asset[] = [
  { symbol: "aUSDC", name: "Aave USDC", value: 55000, change: 2.35, changeValue: 1265.00, isPositive: true },
  { symbol: "cDAI", name: "Compound DAI", value: 32000, change: 1.12, changeValue: 354.00, isPositive: true },
  { symbol: "yvETH", name: "Yearn ETH", value: 28000, change: 3.45, changeValue: 932.00, isPositive: true },
];

export const nftAssets: Asset[] = [
  { symbol: "BAYC", name: "Bored Ape Yacht Club", value: 120000, change: -5.32, changeValue: 6720.00, isPositive: false },
  { symbol: "PUNK", name: "CryptoPunks", value: 85000, change: 2.11, changeValue: 1758.00, isPositive: true },
  { symbol: "MAYC", name: "Mutant Ape Yacht Club", value: 35000, change: -1.25, changeValue: 442.00, isPositive: false },
];
