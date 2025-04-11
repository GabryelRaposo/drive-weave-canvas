
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const StoreHeader = () => {
  const { storeData, signOut } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm w-full">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          {storeData?.logo_url ? (
            <AvatarImage src={storeData.logo_url} alt={storeData.name} />
          ) : (
            <AvatarFallback>{storeData?.name?.substring(0, 2).toUpperCase() || 'ST'}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="font-semibold text-gray-800">{storeData?.name || 'Nome da loja'}</h2>
          <p className="text-sm text-gray-500">{storeData?.owner_name || 'Proprietário'}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={signOut} className="text-[#E11D48]">
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default StoreHeader;
