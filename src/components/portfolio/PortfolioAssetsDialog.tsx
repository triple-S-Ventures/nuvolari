
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import PortfolioTabs from "./PortfolioTabs";
import PortfolioAssetList, { Asset } from "./PortfolioAssetList";

type TabType = 'holdings' | 'defi' | 'nft';

interface PortfolioAssetsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  assets: {
    holdings: Asset[];
    defi: Asset[];
    nft: Asset[];
  };
}

const PortfolioAssetsDialog = ({
  open,
  onOpenChange,
  activeTab,
  setActiveTab,
  assets
}: PortfolioAssetsDialogProps) => {
  const getAssetsByTab = (tab: TabType) => {
    switch (tab) {
      case 'holdings':
        return assets.holdings;
      case 'defi':
        return assets.defi;
      case 'nft':
        return assets.nft;
    }
  };

  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl w-full h-full sm:h-auto max-h-[100dvh] sm:max-h-[90vh] rounded-none sm:rounded-lg p-5 sm:p-6 bg-background/95 backdrop-blur-lg border-0 sm:border sm:border-white/10 flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between mb-4">
          <DialogTitle className="text-xl font-bold">Portfolio Assets</DialogTitle>
          <DialogPrimitive.Close className="rounded-full p-1.5 bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
        
        <PortfolioTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto py-2">
          <PortfolioAssetList assets={getAssetsByTab(activeTab)} inDialog={true} disableScroll={true} />
        </div>
      </DialogContent>
    </Dialog>;
};

export default PortfolioAssetsDialog;
