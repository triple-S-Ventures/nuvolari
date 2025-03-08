
import { useState, useEffect } from 'react';
import { Eye, BarChartHorizontal, FileText, Wallet } from 'lucide-react';
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

  // Update active tab based on current route
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
    
    // Navigate to the appropriate route
    if (tab === 'mood') {
      navigate('/');
    } else if (tab === 'insights') {
      navigate('/insights');
    } else if (tab === 'journal') {
      navigate('/journal');
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex justify-between py-3 px-6 transition-all duration-300", 
      isScrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : "bg-transparent backdrop-blur-sm"
    )}>
      <div className="flex items-center justify-center max-w-4xl w-full">
        <div className="flex items-center justify-center w-full">
          <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/50 backdrop-blur-sm text-primary hover:bg-secondary/70 transition-all duration-300 mr-6 animate-fade-in">
            <div className="w-7 h-7 text-primary">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor" />
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor" />
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor" />
              </svg>
            </div>
          </button>
          
          <div className="bg-secondary rounded-full p-1 backdrop-blur-md animate-fade-in mx-auto">
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
                <BarChartHorizontal size={16} className="mr-2" />
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
                <FileText size={16} className="mr-2" />
                <span className="text-sm font-medium">Journal</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsWalletDialogOpen(true)}
        className="flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 animate-fade-in"
      >
        <Wallet size={16} className="mr-2" />
        <span className="text-sm font-medium">Connect Wallet</span>
      </button>

      <ConnectWalletDialog 
        open={isWalletDialogOpen} 
        onOpenChange={setIsWalletDialogOpen} 
      />
    </nav>
  );
};

export default Navbar;
