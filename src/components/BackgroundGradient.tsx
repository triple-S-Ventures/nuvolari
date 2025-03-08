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
            rgba(168, 85, 247, 0.2) 0%, 
            rgba(139, 92, 246, 0.15) 20%, 
            rgba(107, 33, 168, 0.1) 40%, 
            rgba(88, 28, 135, 0.05) 60%, 
            rgba(30, 27, 75, 0.02) 100%)`,
          transition: 'background 0.8s ease-out, opacity 0.7s ease-in'
        }}
      />
      
      {/* Additional subtle gradient layers for depth */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};

export default BackgroundGradient; 