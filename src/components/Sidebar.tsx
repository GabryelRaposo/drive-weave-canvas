
import { Home, Archive, BookOpen, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Home", icon: <Home size={20} />, route: "/", active: true },
    { name: "Solicitar Arts", icon: <Archive size={20} />, route: "/solicitar" },
    { name: "Meu plano", icon: <BookOpen size={20} />, route: "/plano" },
  ];

  return (
    <div className="flex flex-col h-full border-r border-gray-200 bg-white">
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
};

export default Sidebar;
