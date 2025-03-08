
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, Check, Copy, LogOut } from 'lucide-react';

interface ConnectWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConnectWalletDialog: React.FC<ConnectWalletDialogProps> = ({ open, onOpenChange }) => {
  const { 
    isConnected, 
    currentWallet, 
    customAddress, 
    setCustomAddress, 
    connectWallet, 
    connectDemoWallet, 
    disconnectWallet,
    demoWallets
  } = useWallet();
  
  const [activeTab, setActiveTab] = useState<string>("custom");
  const [copied, setCopied] = useState(false);

  const handleCustomConnect = () => {
    if (customAddress) {
      connectWallet(customAddress);
      onOpenChange(false);
    }
  };

  const handleDemoWalletConnect = (index: number) => {
    connectDemoWallet(index);
    onOpenChange(false);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    onOpenChange(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] backdrop-blur-sm glass-card border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2 flex items-center">
            <Wallet className="mr-2 h-5 w-5" /> 
            {isConnected ? 'Wallet Connected' : 'Connect Your Wallet'}
          </DialogTitle>
        </DialogHeader>

        {isConnected && currentWallet ? (
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm text-muted-foreground">Connected Wallet</p>
                <p className="font-medium">{currentWallet.label}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => copyToClipboard(currentWallet.address)}
                  className="p-2 rounded-md hover:bg-secondary/80 transition-colors"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30">
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-mono text-sm break-all">{currentWallet.address}</p>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30">
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="font-medium">${currentWallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>

            <button
              onClick={handleDisconnect}
              className="w-full mt-4 flex items-center justify-center gap-2 p-2 rounded-md bg-destructive/80 text-destructive-foreground hover:bg-destructive transition-colors"
            >
              <LogOut size={16} />
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <Tabs defaultValue="custom" className="py-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="custom">Custom Address</TabsTrigger>
              <TabsTrigger value="demo">Demo Wallets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="custom" className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Enter your wallet address</p>
                <div className="flex space-x-2">
                  <Input
                    placeholder="0x..."
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    className="flex-1"
                  />
                  <button
                    onClick={handleCustomConnect}
                    disabled={!customAddress}
                    className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                  >
                    Connect
                  </button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="demo" className="space-y-4">
              <p className="text-sm text-muted-foreground">Select a demo wallet to connect with</p>
              <div className="space-y-3">
                {demoWallets.map((wallet, index) => (
                  <button
                    key={wallet.address}
                    onClick={() => handleDemoWalletConnect(index)}
                    className="w-full p-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors text-left"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{wallet.label}</span>
                      <span className="text-sm text-muted-foreground">${wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatAddress(wallet.address)}
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletDialog;
