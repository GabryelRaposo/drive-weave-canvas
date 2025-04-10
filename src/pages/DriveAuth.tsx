
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const DriveAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleConnectDrive = async () => {
    setIsLoading(true);
    // Simulamos uma conexão com o Google Drive
    setTimeout(() => {
      toast.success('Conectado ao Google Drive com sucesso!');
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Conectar ao Google Drive</CardTitle>
          <CardDescription>
            Para visualizar e gerenciar suas artes, conecte o BK Arts ao seu Google Drive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Ao conectar-se, você permitirá que o BK Arts acesse apenas a pasta designada para suas artes.
            Não nos preocupamos com outros conteúdos do seu Drive.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleConnectDrive} 
            disabled={isLoading}
            className="w-full bg-bkarts-primary hover:bg-bkarts-primary-hover text-gray-800"
          >
            {isLoading ? "Conectando..." : "Conectar ao Google Drive"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DriveAuth;
