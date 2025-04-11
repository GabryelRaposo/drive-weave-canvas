
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import SolicitarForm from '@/components/SolicitarForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useNavigate } from 'react-router-dom';

// Tipo para as solicitações
export type Solicitacao = {
  id: string;
  data: Date;
  tipo: string;
  nome: string;
  status: 'pendente' | 'aprovado' | 'recusado';
  storeId: string;
};

const Solicitar = () => {
  const { storeData, user } = useAuth();
  const [storeName, setStoreName] = useState("Nome da loja");
  const [plano, setPlano] = useState("Plano UNLIMITED");
  const isMobile = useIsMobile();
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [showLimitAlert, setShowLimitAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (storeData) {
      setStoreName(storeData.name);
      
      // Set the plan type based on store data
      if (storeData.plan_type) {
        switch (storeData.plan_type) {
          case 'test':
            setPlano('Plano Test');
            break;
          case 'experience':
            setPlano('Plano Experience');
            break;
          case 'unlimited':
            setPlano('Plano UNLIMITED');
            break;
          case 'unlimited_pro':
            setPlano('Plano UNLIMITED PRO');
            break;
          default:
            setPlano('Plano UNLIMITED');
        }
      }
    }
  }, [storeData]);

  // Load existing solicitations from localStorage
  useEffect(() => {
    const solicitacoesExistentes = localStorage.getItem('solicitacoes');
    if (solicitacoesExistentes) {
      const parsedSolicitacoes = JSON.parse(solicitacoesExistentes);
      // Only show solicitations for the current store
      if (user) {
        setSolicitacoes(parsedSolicitacoes.filter((s: Solicitacao) => s.storeId === user.id));
      }
    }
  }, [user]);

  // Function to check if user has reached plan limit
  const checkPlanLimit = (): boolean => {
    if (!storeData || !storeData.plan_type) return true;

    const storeSpecificSolicitacoes = solicitacoes.filter(s => s.storeId === user?.id);
    
    switch (storeData.plan_type) {
      case 'test':
        return storeSpecificSolicitacoes.length < 3;
      case 'experience':
        return storeSpecificSolicitacoes.length < 7;
      case 'unlimited':
      case 'unlimited_pro':
        return true;
      default:
        return true;
    }
  };

  // Function to add new solicitation
  const adicionarSolicitacao = (tipo: string, nome: string) => {
    if (!user) return;
    
    // Check plan limit
    if (!checkPlanLimit()) {
      setShowLimitAlert(true);
      return;
    }
    
    const novaSolicitacao: Solicitacao = {
      id: Date.now().toString(),
      data: new Date(),
      tipo,
      nome,
      status: 'pendente',
      storeId: user.id
    };
    
    // Get all solicitations to save them back to localStorage
    const solicitacoesExistentes = localStorage.getItem('solicitacoes');
    let todasSolicitacoes: Solicitacao[] = [];
    
    if (solicitacoesExistentes) {
      todasSolicitacoes = JSON.parse(solicitacoesExistentes);
    }
    
    const novasSolicitacoes = [...solicitacoes, novaSolicitacao];
    const todasNovasSolicitacoes = [...todasSolicitacoes.filter(s => s.storeId !== user.id), ...novasSolicitacoes];
    
    setSolicitacoes(novasSolicitacoes);
    
    // Save to localStorage (simulating persistence)
    localStorage.setItem('solicitacoes', JSON.stringify(todasNovasSolicitacoes));
  };

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
            <Header userName={storeData?.owner_name || "Usuário"} storeName={storeName} />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">Solicitar Artes</h1>
                  <p className="text-sm md:text-base text-gray-600 mt-1">
                    Seu plano atual: <span className="font-medium text-[#E11D48]">{plano}</span>
                  </p>
                </div>
              </div>
              
              <Separator className="mb-6" />

              <SolicitarForm onSubmit={adicionarSolicitacao} plano={plano} />
            </div>

            {solicitacoes.length > 0 && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">
                    Solicitações Feitas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {solicitacoes.map((solicitacao) => (
                      <div 
                        key={solicitacao.id} 
                        className="p-4 border rounded-md flex flex-col md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <h3 className="font-medium">{solicitacao.nome}</h3>
                          <p className="text-sm text-gray-500">
                            {solicitacao.tipo} • {new Date(solicitacao.data).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            solicitacao.status === 'pendente' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : solicitacao.status === 'aprovado' 
                                ? 'bg-[#E11D48] text-white' 
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {solicitacao.status === 'pendente' ? 'Pendente' : 
                             solicitacao.status === 'aprovado' ? 'Aprovado' : 'Recusado'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Plan limit alert dialog */}
      <AlertDialog open={showLimitAlert} onOpenChange={setShowLimitAlert}>
        <AlertDialogContent className="bg-yellow-50 border-yellow-300">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-yellow-800">Limite de solicitações atingido</AlertDialogTitle>
            <AlertDialogDescription className="text-yellow-700">
              Infelizmente seus créditos de solicitação acabaram. Por favor, clique no botão abaixo para renovar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-[#E11D48] hover:bg-[#C81D45] text-white"
              onClick={() => navigate("/plano")}
            >
              Renovar meu plano
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Solicitar;
