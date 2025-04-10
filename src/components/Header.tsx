
import { CircleUser } from "lucide-react";

interface HeaderProps {
  userName: string;
  storeName: string;
}

const Header = ({ userName, storeName }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200">
      <div>
        <h2 className="text-lg font-medium text-gray-700">
          Olá, {userName}! Bem-vindo ao BK Arts!
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{storeName}</span>
        <CircleUser size={40} className="text-gray-400" />
      </div>
    </div>
  );
};

export default Header;
