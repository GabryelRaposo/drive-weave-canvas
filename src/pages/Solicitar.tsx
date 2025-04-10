
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import SolicitarForm from '@/components/SolicitarForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Tipo para as solicitações
export type Solicitacao = {
  id: string;
  data: Date;
  tipo: string;
  nome: string;
  status: 'pendente' | 'aprovado' | 'recusado';
};

const Solicitar = () => {
  const [userName] = useState("João");
  const [storeName] = useState("Nome da loja");
  const [plano] = useState("Plano UNLIMITED");
  const isMobile = useIsMobile();
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

  // Simular carregamento de solicitações existentes
  useEffect(() => {
    // Em uma implementação real, isso seria uma chamada API
    const solicitacoesExistentes = localStorage.getItem('solicitacoes');
    if (solicitacoesExistentes) {
      setSolicitacoes(JSON.parse(solicitacoesExistentes));
    }
  }, []);

  // Função para adicionar nova solicitação
  const adicionarSolicitacao = (tipo: string, nome: string) => {
    const novaSolicitacao: Solicitacao = {
      id: Date.now().toString(),
      data: new Date(),
      tipo,
      nome,
      status: 'pendente'
    };
    
    const novasSolicitacoes = [...solicitacoes, novaSolicitacao];
    setSolicitacoes(novasSolicitacoes);
    
    // Salva no localStorage (simulando persistência)
    localStorage.setItem('solicitacoes', JSON.stringify(novasSolicitacoes));
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
            <Header userName={userName} storeName={storeName} />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">Solicitar Artes</h1>
                  <p className="text-sm md:text-base text-gray-600 mt-1">
                    Seu plano atual: <span className="font-medium text-pink-600">{plano}</span>
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
                                ? 'bg-green-100 text-green-800' 
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
    </div>
  );
};

export default Solicitar;
