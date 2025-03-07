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
      <DialogContent className="sm:max-w-xl bg-background/95 backdrop-blur-lg border border-white/10">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Portfolio Assets</DialogTitle>
          
        </DialogHeader>
        
        <PortfolioTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <PortfolioAssetList assets={getAssetsByTab(activeTab)} inDialog={true} />
      </DialogContent>
    </Dialog>;
};
export default PortfolioAssetsDialog;