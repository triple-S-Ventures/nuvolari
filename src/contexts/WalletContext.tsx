import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// Define wallet types and sample data
export type WalletType = {
  address: string;
  label: string;
  balance: number;
  assets: WalletAsset[];
  defiPositions: WalletAsset[];
  nfts: WalletAsset[];
};

export type WalletAsset = {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changeValue: number;
  isPositive: boolean;
};

// Define demo wallets
const demoWallets: WalletType[] = [
  {
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    label: "Balanced",
    balance: 1250000.89,
    assets: [
      { symbol: "BTC", name: "Bitcoin", value: 500000, change: 5.24, changeValue: 25000.00, isPositive: true },
      { symbol: "ETH", name: "Ethereum", value: 350000, change: 2.72, changeValue: 9318.00, isPositive: true },
      { symbol: "SOL", name: "Solana", value: 200000, change: 12.03, changeValue: 21500.00, isPositive: true },
      { symbol: "LINK", name: "Chainlink", value: 120000, change: 3.87, changeValue: 4468.00, isPositive: true },
      { symbol: "AAVE", name: "Aave", value: 80000, change: -1.24, changeValue: 1003.00, isPositive: false },
    ],
    defiPositions: [
      { symbol: "aUSDC", name: "Aave USDC", value: 150000, change: 4.35, changeValue: 6265.00, isPositive: true },
      { symbol: "cDAI", name: "Compound DAI", value: 80000, change: 2.12, changeValue: 1664.00, isPositive: true },
    ],
    nfts: [
      { symbol: "MILADY", name: "Milady Maker", value: 200000, change: 8.32, changeValue: 15420.00, isPositive: true },
      { symbol: "PUNK", name: "CryptoPunks", value: 150000, change: 4.11, changeValue: 5958.00, isPositive: true },
    ]
  },
  {
    address: "0x8932Be3bA383F81A508c43C037dD31B4bA61afF4",
    label: "Degen",
    balance: 124688.46,
    assets: [
      { symbol: "ETH", name: "Ethereum", value: 45000, change: -1.72, changeValue: 788.00, isPositive: false },
      { symbol: "SOL", name: "Solana", value: 28000, change: 15.03, changeValue: 3662.00, isPositive: true },
      { symbol: "AVAX", name: "Avalanche", value: 22000, change: 4.51, changeValue: 948.00, isPositive: true },
      { symbol: "FART", name: "Fartcoin", value: 18688.46, change: 45.24, changeValue: 5819.00, isPositive: true },
    ],
    defiPositions: [
      { symbol: "yvUSDC", name: "Yearn USDC", value: 11000, change: 8.35, changeValue: 847.00, isPositive: true },
    ],
    nfts: [
      { symbol: "SCHIZO", name: "SchizoPoster", value: 12000, change: -2.25, changeValue: 276.00, isPositive: false },
    ]
  },
  {
    address: "0x1a89aA97D31576d66CF5bFd0E674138B55495E16",
    label: "Saver",
    balance: 5325.78,
    assets: [
      { symbol: "ETH", name: "Ethereum", value: 2800, change: 1.32, changeValue: 36.50, isPositive: true },
      { symbol: "BTC", name: "Bitcoin", value: 1200, change: 0.75, changeValue: 8.95, isPositive: true },
      { symbol: "DOGE", name: "Dogecoin", value: 325.78, change: 13.61, changeValue: 39.12, isPositive: true },
      { symbol: "SHIB", name: "Shiba Inu", value: 1000, change: -2.15, changeValue: 22.00, isPositive: false },
    ],
    defiPositions: [],
    nfts: []
  }
];

type WalletContextType = {
  isConnected: boolean;
  currentWallet: WalletType | null;
  customAddress: string;
  setCustomAddress: (address: string) => void;
  connectWallet: (address: string) => void;
  connectDemoWallet: (index: number) => void;
  disconnectWallet: () => void;
  demoWallets: WalletType[];
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentWallet, setCurrentWallet] = useState<WalletType | null>(null);
  const [customAddress, setCustomAddress] = useState<string>("");

  // Check if wallet is saved in localStorage on mount
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
      // Try to find in demo wallets first
      const demoWallet = demoWallets.find(wallet => wallet.address === savedWalletAddress);
      
      if (demoWallet) {
        setCurrentWallet(demoWallet);
        setIsConnected(true);
        toast.success(`Welcome back! Connected to ${demoWallet.label}`);
      } else if (savedWalletAddress) {
        // Custom address
        setCurrentWallet({
          address: savedWalletAddress,
          label: "Custom Wallet",
          balance: 876588.12, // Default from UI
          assets: [],
          defiPositions: [],
          nfts: []
        });
        setIsConnected(true);
        toast.success(`Welcome back! Connected to ${savedWalletAddress.slice(0, 6)}...${savedWalletAddress.slice(-4)}`);
      }
    }
  }, []);

  const connectWallet = (address: string) => {
    if (!address) {
      toast.error("Please enter a valid wallet address");
      return;
    }

    setCurrentWallet({
      address,
      label: "Custom Wallet",
      balance: 876588.12, // Default from UI
      assets: [],
      defiPositions: [],
      nfts: []
    });
    setIsConnected(true);
    localStorage.setItem('walletAddress', address);
    toast.success(`Connected to ${address.slice(0, 6)}...${address.slice(-4)}`);
  };

  const connectDemoWallet = (index: number) => {
    if (index >= 0 && index < demoWallets.length) {
      const wallet = demoWallets[index];
      setCurrentWallet(wallet);
      setIsConnected(true);
      localStorage.setItem('walletAddress', wallet.address);
      toast.success(`Connected to ${wallet.label}`);
    }
  };

  const disconnectWallet = () => {
    setCurrentWallet(null);
    setIsConnected(false);
    setCustomAddress("");
    localStorage.removeItem('walletAddress');
    toast.info("Wallet disconnected");
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      currentWallet,
      customAddress,
      setCustomAddress,
      connectWallet,
      connectDemoWallet,
      disconnectWallet,
      demoWallets
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
