
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import FeaturedContent from '@/components/FeaturedContent';
import DriveGallery from '@/components/DriveGallery';

const Index = () => {
  const [userName, setUserName] = useState("João");
  const [storeName, setStoreName] = useState("Nome da loja");
  const [isConnectedToDrive, setIsConnectedToDrive] = useState(true);

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
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 h-full">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName={userName} storeName={storeName} />
        
        <div className="flex-1 overflow-auto">
          <FeaturedContent />
          <DriveGallery />
        </div>
      </div>
    </div>
  );
};

export default Index;
