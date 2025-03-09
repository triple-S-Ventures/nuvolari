import { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import ConnectWalletDialog from './wallet/ConnectWalletDialog';
import { useWallet } from '@/contexts/WalletContext';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<'mood' | 'insights' | 'journal'>('mood');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('mood');
    } else if (location.pathname === '/journal') {
      setActiveTab('journal');
    } else if (location.pathname === '/insights') {
      setActiveTab('insights');
    }
  }, [location.pathname]);

  const handleTabClick = (tab: 'mood' | 'insights' | 'journal') => {
    if (!isConnected) {
      navigate('/onboarding');
      return;
    }
    
    setActiveTab(tab);
    
    if (tab === 'mood') {
      navigate('/');
    } else if (tab === 'insights') {
      navigate('/insights');
    } else if (tab === 'journal') {
      navigate('/journal');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center py-3 transition-all duration-300">
      <div className={cn(
        "flex items-center gap-4 px-6 py-2 rounded-2xl transition-all duration-300", 
        isScrolled 
          ? "bg-[#121212]/90 backdrop-blur-lg shadow-md border border-[#2A2A2A]" 
          : "bg-[#121212]/80 backdrop-blur-md border border-[#2A2A2A]"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-center w-8 h-8">
          <img 
            src="/logo_new.png" 
            alt="Nuvolari Logo" 
            className="w-6 h-6 object-contain"
          />
        </div>
        
        {/* Navigation buttons */}
        {isConnected && (
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => handleTabClick('mood')}
              className={cn(
                "flex items-center px-3 py-2 transition-all duration-300",
                activeTab === 'mood' 
                  ? "bg-card text-foreground shadow-sm rounded-2xl" 
                  : "text-muted-foreground hover:text-foreground rounded-2xl"
              )}
            >
              <img 
                src="/eye.png" 
                alt="Mood Icon" 
                className="w-4 h-4 mr-2"
              />
              <span className="text-sm font-medium">Mood</span>
            </button>
            
            <button 
              onClick={() => handleTabClick('insights')}
              className={cn(
                "flex items-center px-3 py-2 transition-all duration-300",
                activeTab === 'insights' 
                  ? "bg-card text-foreground shadow-sm rounded-2xl" 
                  : "text-muted-foreground hover:text-foreground rounded-2xl"
              )}
            >
              <img 
                src="/navbar_logo.png" 
                alt="Insights Icon" 
                className="w-4 h-4 mr-2"
              />
              <span className="text-sm font-medium">Insights</span>
            </button>
            
            <button 
              onClick={() => handleTabClick('journal')}
              className={cn(
                "flex items-center px-3 py-2 transition-all duration-300",
                activeTab === 'journal' 
                  ? "bg-card text-foreground shadow-sm rounded-2xl" 
                  : "text-muted-foreground hover:text-foreground rounded-2xl"
              )}
            >
              <img 
                src="/journal.png" 
                alt="Journal Icon" 
                className="w-4 h-4 mr-2"
              />
              <span className="text-sm font-medium">Journal</span>
            </button>
          </div>
        )}
        
        {/* Connect button */}
        <button 
          onClick={() => setIsWalletDialogOpen(true)}
          className="flex items-center px-3 py-1.5 rounded-2xl bg-[#AC87CF] text-white hover:bg-[#9A78BA] transition-all duration-300 text-xs"
        >
          <Wallet size={12} className="mr-1.5" />
          <span className="font-medium">{isConnected ? 'Wallet' : 'Connect'}</span>
        </button>
      </div>
      
      <ConnectWalletDialog 
        open={isWalletDialogOpen} 
        onOpenChange={setIsWalletDialogOpen} 
      />
    </div>
  );
};

export default Navbar;
