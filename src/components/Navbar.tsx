import { useState, useEffect } from 'react';
import { Eye, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import ConnectWalletDialog from './wallet/ConnectWalletDialog';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<'mood' | 'insights' | 'journal'>('mood');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
        "flex items-center gap-4 px-6 py-2 rounded-full transition-all duration-300", 
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : "bg-secondary/50 backdrop-blur-md"
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
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => handleTabClick('mood')}
            className={cn(
              "flex items-center px-3 py-2 rounded-full transition-all duration-300",
              activeTab === 'mood' 
                ? "bg-card text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Eye size={16} className="mr-2" />
            <span className="text-sm font-medium">Mood</span>
          </button>
          
          <button 
            onClick={() => handleTabClick('insights')}
            className={cn(
              "flex items-center px-3 py-2 rounded-full transition-all duration-300",
              activeTab === 'insights' 
                ? "bg-card text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
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
              "flex items-center px-3 py-2 rounded-full transition-all duration-300",
              activeTab === 'journal' 
                ? "bg-card text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
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

        {/* Connect button */}
        <button 
          onClick={() => setIsWalletDialogOpen(true)}
          className="flex items-center px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-xs"
        >
          <Wallet size={12} className="mr-1.5" />
          <span className="font-medium">Connect</span>
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
