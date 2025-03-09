import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowUpRight, Copy } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import BackgroundGradient from '@/components/BackgroundGradient';
import Footer from '@/components/Footer';

const Onboarding = () => {
  const { connectDemoWallet, connectWallet } = useWallet();
  const [customAddress, setCustomAddress] = useState('');
  const navigate = useNavigate();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const demoWallets = [
    {
      name: "Balanced",
      address: "0x31794deb7ac412929cc6506b64f9c43870086ac3",
      allocation: {
        defi: 40,
        tokens: 50,
        nfts: 10
      }
    },
    {
      name: "Degen",
      address: "0x21794deb7ac412929cc6506b64f9c43870086ac2",
      allocation: {
        defi: 20,
        tokens: 70,
        nfts: 10
      }
    },
    {
      name: "Saver",
      address: "0x11794deb7ac412929cc6506b64f9c43870086ac1",
      allocation: {
        defi: 70,
        tokens: 20,
        nfts: 10
      }
    }
  ];

  const handleDemoWalletConnect = (index: number) => {
    connectDemoWallet(index);
    navigate('/');
  };

  const handleCustomConnect = () => {
    if (customAddress) {
      connectWallet(customAddress);
      navigate('/');
    }
  };

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <BackgroundGradient />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="inline-block mb-4">
              <img 
                src="/logo_brand.png" 
                alt="Nuvolari Logo" 
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold mb-2">Welcome to Nuvolari</h1>
            <p className="text-lg text-white/60">
              Connect your wallet or try a demo to get started
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-5 backdrop-blur-md bg-[#121212]/80 border border-white/5">
            <h2 className="text-xl font-medium text-white mb-4 text-center">Select a Portfolio Type</h2>
            
            <div className="space-y-3 mb-6">
              {demoWallets.map((wallet, index) => (
                <div 
                  key={wallet.address}
                  className="w-full p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] transition-colors text-left border border-white/5 cursor-pointer"
                  onClick={() => handleDemoWalletConnect(index)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-lg text-white">{wallet.name}</div>
                    </div>
                    <div
                      className="w-8 h-8 rounded-md bg-[#2A2A2A] flex items-center justify-center flex-shrink-0"
                    >
                      <ArrowUpRight className="h-4 w-4 text-white/70" />
                    </div>
                  </div>
                  
                  <div className="flex h-2 rounded-full overflow-hidden bg-[#252525] w-full mt-3">
                    <div 
                      className="bg-[#9289D0]" 
                      style={{ width: `${wallet.allocation.defi}%` }}
                    />
                    <div 
                      className="bg-[#FF8F44]" 
                      style={{ width: `${wallet.allocation.tokens}%` }}
                    />
                    <div 
                      className="bg-[#00FFE5]" 
                      style={{ width: `${wallet.allocation.nfts}%` }}
                    />
                  </div>
                  
                  <div className="flex text-xs mt-3 justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#9289D0] mr-1"></div>
                      <span className="text-white/60">{wallet.allocation.defi}% DeFi</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF8F44] mr-1"></div>
                      <span className="text-white/60">{wallet.allocation.tokens}% Tokens</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#00FFE5] mr-1"></div>
                      <span className="text-white/60">{wallet.allocation.nfts}% NFTs</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-[#121212] text-white/40 text-sm">or use your own</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="0x..."
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-white/10 focus:border-[#6c5ce7] focus:outline-none text-white"
                />
              </div>
              
              <button
                onClick={handleCustomConnect}
                disabled={!customAddress}
                className="w-full p-3 rounded-lg bg-[#6c5ce7] text-white hover:bg-[#5b4cc7] disabled:opacity-50 disabled:pointer-events-none transition-colors flex items-center justify-center gap-2"
              >
                <Wallet className="h-5 w-5" />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Onboarding; 