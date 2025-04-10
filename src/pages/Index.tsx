
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import StoreHeader from '@/components/StoreHeader';
import FeaturedContent from '@/components/FeaturedContent';
import DriveGallery from '@/components/DriveGallery';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [isConnectedToDrive, setIsConnectedToDrive] = useState(true);
  const isMobile = useIsMobile();

  // Simulação de verificação de conexão com o Drive
  useEffect(() => {
    // Aqui você implementaria a verificação real da conexão com o Google Drive
    const checkDriveConnection = () => {
      // Simulação simplificada - em uma implementação real, isso seria uma chamada API
      const isConnected = localStorage.getItem('driveConnected') === 'true';
      setIsConnectedToDrive(isConnected);
    };
    
    checkDriveConnection();
  }, []);

  useEffect(() => {
    // Apenas para simulação - em produção você não faria isso
    localStorage.setItem('driveConnected', 'true');
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {!isMobile && (
        <div className="hidden md:block md:w-64 h-full">
          <Sidebar />
        </div>
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center bg-white shadow-sm">
          {isMobile && (
            <div className="px-2">
              <Sidebar />
            </div>
          )}
          <div className="flex-1">
            <StoreHeader />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <FeaturedContent />
          <DriveGallery />
        </div>
      </div>
    </div>
  );
};

export default Index;
