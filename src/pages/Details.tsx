
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";

const Details = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Details loaded successfully");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <main className="flex-1 pt-24 pb-16 px-4 max-w-4xl mx-auto w-full">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">Details</h1>
            <p className="text-muted-foreground">Detailed information about your portfolio</p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Portfolio Analytics</h2>
            <p className="text-muted-foreground mb-3">
              This page contains detailed analytics and insights about your portfolio performance.
            </p>
            <p className="text-muted-foreground">
              Use the arrow button on the left side of the screen to navigate back to the main dashboard.
            </p>
          </div>
          
          <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
            <Link 
              to="/"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-glow-md hover:shadow-glow-lg transition-all duration-300"
            >
              <ArrowLeft size={24} />
            </Link>
          </div>
        </main>
      )}
      
      <Footer />
      
      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
    </div>
  );
};

export default Details;
