
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// Tipo para imagens do Google Drive (simulado)
interface DriveImage {
  id: string;
  name: string;
  thumbnailUrl: string;
  createdAt: string;
}

// Função que simula buscar as imagens do Google Drive
const fetchDriveImages = async (): Promise<DriveImage[]> => {
  // Simulação de carregamento
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Dados simulados do Google Drive
  return [
    {
      id: '1',
      name: 'Banner de Promoção',
      thumbnailUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D',
      createdAt: '2023-09-15',
    },
    {
      id: '2',
      name: 'Post Instagram',
      thumbnailUrl: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D',
      createdAt: '2023-10-02',
    },
    {
      id: '3',
      name: 'Logo Redesenhado',
      thumbnailUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D',
      createdAt: '2023-10-12',
    },
    {
      id: '4',
      name: 'Thumbnail YouTube',
      thumbnailUrl: 'https://images.unsplash.com/photo-1553949345-eb786118c597?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D',
      createdAt: '2023-10-25',
    },
  ];
};

const DriveGallery = () => {
  const [images, setImages] = useState<DriveImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchDriveImages();
        setImages(fetchedImages);
      } catch (err) {
        console.error('Erro ao carregar imagens:', err);
        setError('Não foi possível carregar as imagens do seu Drive. Por favor, tente novamente mais tarde.');
        toast.error('Falha ao carregar imagens do Drive');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <p className="mt-4 text-sm text-gray-500">Carregando suas artes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-sm text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-bkarts-primary hover:bg-bkarts-primary-hover rounded-md text-sm font-medium transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="px-8 py-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Minhas Artes</h2>
      
      {images.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">Você ainda não tem artes no seu Drive.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div 
              key={image.id}
              className="group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={image.thumbnailUrl} 
                  alt={image.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 truncate">{image.name}</h3>
                <p className="text-xs text-gray-500 mt-1">Criado em {new Date(image.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriveGallery;
