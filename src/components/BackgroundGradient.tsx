import React, { useEffect, useState } from 'react';

const BackgroundGradient: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle movement - divide by large number to make the effect very subtle
      setMousePosition({
        x: e.clientX / 50,
        y: e.clientY / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Set loaded immediately to ensure the background is visible right away
    setIsLoaded(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isLoaded ? 1 : 0,
          background: `radial-gradient(circle at calc(50% + ${mousePosition.x}px) calc(50% + ${mousePosition.y}px), 
            rgba(148, 85, 247, 0.15) 0%, 
            rgba(99, 102, 241, 0.12) 20%, 
            rgba(79, 70, 229, 0.08) 40%, 
            rgba(67, 56, 202, 0.04) 60%, 
            rgba(30, 41, 59, 0.02) 100%)`,
          transition: 'background 0.8s ease-out, opacity 0.7s ease-in'
        }}
      />
      
      {/* Additional subtle gradient layers for depth */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 60%)',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(79, 70, 229, 0.08) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};

export default BackgroundGradient; 