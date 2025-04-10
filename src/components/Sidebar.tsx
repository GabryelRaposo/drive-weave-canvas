
import { Home, Archive, BookOpen, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  className?: string;
};

// Main Sidebar component that handles both mobile and desktop views
const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const menuItems = [
    { name: "Home", icon: <Home size={20} />, route: "/", active: location.pathname === "/" },
    { name: "Solicitar Arts", icon: <Archive size={20} />, route: "/solicitar", active: location.pathname === "/solicitar" },
    { name: "Meu plano", icon: <BookOpen size={20} />, route: "/plano", active: location.pathname === "/plano" },
  ];

  const SidebarContent = () => (
    <div className={`flex flex-col h-full border-r border-gray-200 bg-white ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold text-gray-800">LOGO</h1>
        </div>
      </div>

      <div className="flex flex-col flex-1 pt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.route}
            className={`flex items-center px-6 py-3 text-sm font-medium mb-2 mx-4 rounded-md transition-colors ${
              item.active
                ? "bg-bkarts-primary text-gray-800"
                : "text-gray-600 hover:bg-bkarts-secondary hover:text-gray-800"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>

      <div className="p-6 border-t border-gray-200">
        <Link
          to="/suporte"
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-bkarts-secondary hover:text-gray-800 transition-colors"
        >
          <HelpCircle size={20} className="mr-3" />
          Suporte técnico
        </Link>
      </div>
    </div>
  );

  // Mobile version using a Sheet/Drawer
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[80%] sm:w-[350px]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop version
  return <SidebarContent />;
};

export default Sidebar;
