import React, { useRef, useEffect } from 'react';
import { Logo } from '@/components/ui/logo';

export default function LogoExport() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is to ensure the component is fully rendered
    const timer = setTimeout(() => {
      if (logoRef.current) {
        // Styles to make sure the logo is visible during screenshot
        document.body.style.backgroundColor = 'white';
        logoRef.current.style.padding = '20px';
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-white">
      <div ref={logoRef} className="flex flex-col items-center space-y-10">
        <h1 className="text-2xl font-bold">Noveloper Logo Export</h1>
        
        <div className="p-8 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Standard Logo</h2>
          <Logo size="lg" />
        </div>
        
        <div className="p-8 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Large Logo</h2>
          <div style={{ transform: 'scale(2)', transformOrigin: 'left center', marginBottom: '2rem' }}>
            <Logo size="lg" />
          </div>
        </div>
        
        <div className="p-8 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Text Only</h2>
          <span className="text-4xl font-extrabold">
            <span className="bg-gradient-to-r from-black to-indigo-600 bg-clip-text text-transparent">
              NOVELOPER
            </span>
          </span>
        </div>
        
        <div className="p-8 border border-gray-200 rounded-lg shadow-sm bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-white">Inverted Logo</h2>
          <Logo size="lg" inverted={true} />
        </div>
        
        <p className="mt-8 text-gray-500">
          Take a screenshot of each version you need and save it as PNG or JPG.
        </p>
      </div>
    </div>
  );
}
