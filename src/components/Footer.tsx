import { Twitter, Github, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn(
      "w-full py-6 px-4 flex items-center justify-between mt-10 text-sm text-muted-foreground max-w-4xl mx-auto",
      className
    )}>
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-foreground transition-colors">Terms of Use</a>
        <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
        <a href="#" className="hover:text-foreground transition-colors">Docs</a>
      </div>
      
      <div className="flex items-center space-x-4">
        <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary/50 transition-colors">
          <Twitter size={18} />
        </a>
        <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary/50 transition-colors">
          <Github size={18} />
        </a>
        <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary/50 transition-colors">
          <Send size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
