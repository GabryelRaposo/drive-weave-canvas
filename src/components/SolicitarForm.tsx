import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { FormEtapa1 } from './FormEtapa1';
import { FormEtapa2 } from './FormEtapa2';
import { FormEtapa3 } from './FormEtapa3';
import { useToast } from "@/hooks/use-toast";

export type FormData = {
  email: string;
  nomeLoja: string;
  telefone: string;
  nomeProduto: string;
  linkLoja: string;
  linkProduto: string;
  idioma: string;
  outroIdioma?: string;
  
  tipoSolicitacao: 'video' | 'imagem' | 'landingPage';
  
  descricaoVideo?: string;
  quantidadeVideo?: string;
  resolucaoVideo?: string[];
  especificacoesVideo?: string[];
  copyVideo?: string;
  
  descricaoImagem?: string;
  layoutImagem?: string;
  quantidadeImagem?: string;
  especificacoesImagem?: string[];
  resolucaoImagem?: string[];
  copyImagem?: string;
  
  descricaoLanding?: string;
  layoutLanding?: string;
  marcaDagua?: 'sim' | 'nao';
  usarCoresIdentidade?: 'sim' | 'nao';
  copyLanding?: string;
  
  publicoAlvo?: string;
  promocao?: string;
  qualidades?: string;
  observacoes?: string;
  linkMateriais?: string;
  aceitaTermos: boolean;
};

interface SolicitarFormProps {
  onSubmit: (tipo: string, nome: string) => void;
  plano: string;
}

const SolicitarForm = ({ onSubmit, plano }: SolicitarFormProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    nomeLoja: '',
    telefone: '',
    nomeProduto: '',
    linkLoja: '',
    linkProduto: '',
    idioma: 'Português do Brasil',
    tipoSolicitacao: 'imagem',
    aceitaTermos: false
  });

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const validateStep = (): boolean => {
    if (step === 1) {
      const { email, nomeLoja, telefone, nomeProduto, linkLoja, linkProduto, idioma } = formData;
      
      if (!email || !nomeLoja || !telefone || !nomeProduto || !linkLoja || !linkProduto || !idioma) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return false;
      }
      
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        toast({
          title: "Email inválido",
          description: "Por favor, informe um endereço de email válido.",
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    }
    
    if (step === 2) {
      const { tipoSolicitacao } = formData;
      
      if (tipoSolicitacao === 'video' && !formData.quantidadeVideo) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, informe a quantidade de vídeos.",
          variant: "destructive",
        });
        return false;
      }
      
      if (tipoSolicitacao === 'imagem' && !formData.quantidadeImagem) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, informe a quantidade de imagens.",
          variant: "destructive",
        });
        return false;
      }
      
      if (tipoSolicitacao === 'landingPage' && !formData.layoutLanding) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, selecione um layout para a Landing Page.",
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    }
    
    if (step === 3) {
      if (!formData.aceitaTermos) {
        toast({
          title: "Termos contratuais",
          description: "Você precisa aceitar os termos contratuais para continuar.",
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      const tipoFormatado = 
        formData.tipoSolicitacao === 'video' 
          ? 'Criativo em Vídeo' 
          : formData.tipoSolicitacao === 'imagem'
            ? 'Criativo em Imagem'
            : 'Landing Page';
      
      onSubmit(tipoFormatado, formData.nomeProduto);
      
      setFormData({
        email: '',
        nomeLoja: '',
        telefone: '',
        nomeProduto: '',
        linkLoja: '',
        linkProduto: '',
        idioma: 'Português do Brasil',
        tipoSolicitacao: 'imagem',
        aceitaTermos: false
      });
      
      setStep(1);
      
      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Acompanhe o status da sua solicitação na lista abaixo.",
      });
    }
  };

  const isUnlimited = plano.includes("UNLIMITED");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center w-full max-w-3xl mx-auto">
          <div className="relative flex items-center justify-center w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= i
                      ? 'bg-[#E11D48] text-white'
                      : 'bg-gray-200 text-gray-500'
                  } transition-colors`}
                  disabled={i > step}
                >
                  {step > i ? <Check className="w-5 h-5" /> : i}
                </button>
                
                {i < 3 && (
                  <div 
                    className={`flex-1 h-1 mx-2 ${
                      step > i ? 'bg-[#E11D48]' : 'bg-gray-200'
                    }`}
                    style={{ width: '80px' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="p-4 md:p-6">
        {step === 1 && (
          <FormEtapa1 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        )}
        
        {step === 2 && (
          <FormEtapa2 
            formData={formData} 
            updateFormData={updateFormData}
            isUnlimited={isUnlimited}
          />
        )}
        
        {step === 3 && (
          <FormEtapa3 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        )}

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <Button 
              type="button" 
              onClick={prevStep}
              variant="outline"
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < 3 ? (
            <Button 
              type="button" 
              onClick={nextStep}
              className="flex items-center bg-[#E11D48] hover:bg-[#C81D45]"
            >
              Avançar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={handleSubmit}
              className="flex items-center bg-[#E11D48] hover:bg-[#C81D45]"
            >
              Enviar Solicitação
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SolicitarForm;
