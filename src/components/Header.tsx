
import { CircleUser } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  userName: string;
  storeName: string;
}

const Header = ({ userName, storeName }: HeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex justify-between items-center p-4 md:px-8 md:py-4 border-b border-gray-200 w-full">
      <div>
        <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-gray-700`}>
          {`Olá, ${userName}!`}{!isMobile && ' Bem-vindo ao BK Arts!'}
        </h2>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <span className="text-xs md:text-sm text-gray-600">{storeName}</span>
        <CircleUser size={isMobile ? 32 : 40} className="text-gray-400" />
      </div>
    </div>
  );
};

export default Header;
