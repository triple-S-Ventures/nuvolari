
import { Wallet } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface PortfolioBalanceHeaderProps {
  isPrivate: boolean;
  setIsPrivate: (value: boolean) => void;
}

const PortfolioBalanceHeader = ({ isPrivate, setIsPrivate }: PortfolioBalanceHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Wallet className="w-5 h-5 text-foreground/60 mr-2" />
        <span className="text-base font-medium text-muted-foreground">Balance</span>
      </div>
      
      <div className="flex items-center">
        <span className="text-sm text-muted-foreground mr-2">Private</span>
        <Switch 
          checked={isPrivate} 
          onCheckedChange={setIsPrivate}
          className="data-[state=checked]:bg-primary"
        />
      </div>
    </div>
  );
};

export default PortfolioBalanceHeader;
