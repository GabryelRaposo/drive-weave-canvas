
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Página não encontrada</p>
        <p className="text-gray-500 mb-8">
          A página que você está procurando pode ter sido removida ou temporariamente indisponível.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-bkarts-primary hover:bg-bkarts-primary-hover text-gray-800 rounded-md transition-colors font-medium"
        >
          Voltar à Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
