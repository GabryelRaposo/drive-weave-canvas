
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const Plano = () => {
  const [userName] = useState("João");
  const [storeName] = useState("Nome da loja");
  const [selectedPlan] = useState("unlimited"); // Pode ser "test", "experience" ou "unlimited_pro"
  const isMobile = useIsMobile();
  
  const plans = [
    {
      id: "test",
      name: "Plano Test",
      subtitle: "3 Produtos",
      price: "347",
      highlighted: false,
      tag: "Custo Benefício!",
      features: [
        "Solicitação para 3 Produtos",
        "Criativos em Imagens ou vídeo",
        "Landing Page para Dropshipping",
        "Páginas de alta conversão",
        "Pessoas sugerem os seu produto"
      ],
      buttonLabel: "Escolher plano"
    },
    {
      id: "experience",
      name: "Plano Experience",
      subtitle: "7 Produtos",
      price: "650",
      highlighted: false,
      tag: "Maior Desconto!",
      features: [
        "Solicitação para 7 Produtos",
        "Criativos em Imagens ou vídeo",
        "Landing Page para Dropshipping",
        "Páginas de alta conversão",
        "Pessoas sugerem os seu produto"
      ],
      buttonLabel: "Escolher plano"
    },
    {
      id: "unlimited",
      name: "Plano UNLIMITED",
      subtitle: "",
      price: "997",
      highlighted: true,
      tag: "Mais Vendido!",
      features: [
        "Solicitação para produtos ILIMITADOS",
        "Suporte Prioritário",
        "Criativos em Imagens ou vídeo",
        "Landing Page para Dropshipping",
        "Entrega em 24hrs",
        "Páginas de alta conversão",
        "Criativos automáticos em escala",
        "Criativos para o UGC",
        "Criativos para Google Ads"
      ],
      buttonLabel: "Escolher plano"
    },
    {
      id: "unlimited_pro",
      name: "Plano UNLIMITED PRO",
      subtitle: "",
      price: "1497",
      highlighted: true,
      tagVariant: "secondary",
      tag: "Mais Personalizado!",
      features: [
        "Solicitação para produtos ILIMITADOS",
        "Suporte Prioritário",
        "Criativos em Imagens ou vídeo",
        "Landing Page para Dropshipping",
        "Entrega em 24hrs",
        "Páginas de alta conversão",
        "Criativos automáticos em escala",
        "Criativos para o UGC",
        "Criativos para Google Ads",
        "Banners",
        "4 novos formatos para sua loja",
        "Post para Instagram",
        "Criação de Branding Personalizado"
      ],
      buttonLabel: "Escolher plano"
    }
  ];

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
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Meu Plano</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {plans.map((plan) => (
                <div key={plan.id} className={`relative ${plan.highlighted ? 'md:scale-105' : ''}`}>
                  {plan.tag && (
                    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium text-white ${plan.tagVariant === 'secondary' ? 'bg-red-500' : 'bg-pink-600'}`}>
                      {plan.tag}
                    </div>
                  )}
                  <Card className={`overflow-hidden h-full flex flex-col ${plan.id === 'unlimited_pro' ? 'border-red-500 border-2' : plan.id === 'unlimited' ? 'border-pink-500 border-2' : ''}`}>
                    <CardHeader className="pb-2 md:pb-3 pt-4 md:pt-6 px-3 md:px-4 bg-gray-900 text-white">
                      <div className="text-center">
                        <h3 className="font-bold text-base md:text-lg">{plan.name}</h3>
                        {plan.subtitle && <p className="text-xs md:text-sm text-gray-300">- {plan.subtitle} -</p>}
                        <div className="mt-1 flex items-baseline justify-center">
                          <span className="text-lg md:text-xl font-semibold">R$</span>
                          <span className="text-3xl md:text-4xl font-extrabold">{plan.price}</span>
                          <span className="text-lg md:text-xl font-semibold">,00</span>
                          <span className="ml-1 text-xs md:text-sm text-gray-300">/Mês</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 pt-3 md:pt-4 pb-0 px-3 md:px-4 bg-gray-900 text-white">
                      <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0 mr-1 md:mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-3 md:pt-4 px-3 md:px-4 pb-4 md:pb-6 bg-gray-900 text-white">
                      <Button 
                        className={`w-full text-xs md:text-sm py-1 md:py-2 ${
                          plan.id === 'unlimited_pro' 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : plan.id === 'unlimited' 
                              ? 'bg-pink-600 hover:bg-pink-700' 
                              : 'bg-pink-600 hover:bg-pink-700'
                        }`}
                      >
                        {plan.buttonLabel}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-12 text-center">
              <p className="text-sm md:text-base text-gray-600">Fale com nosso time comercial para mais informações sobre os planos!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plano;
