
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FormData } from "./SolicitarForm";

interface FormEtapa2Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  isUnlimited: boolean;
}

export function FormEtapa2({ formData, updateFormData, isUnlimited }: FormEtapa2Props) {
  const [tipoSolicitacao, setTipoSolicitacao] = useState<'video' | 'imagem' | 'landingPage'>(
    formData.tipoSolicitacao
  );

  const form = useForm({
    defaultValues: {
      tipoSolicitacao: formData.tipoSolicitacao,
      
      // Vídeo
      descricaoVideo: formData.descricaoVideo || '',
      quantidadeVideo: formData.quantidadeVideo || '',
      copyVideo: formData.copyVideo || '',
      
      // Imagem
      descricaoImagem: formData.descricaoImagem || '',
      layoutImagem: formData.layoutImagem || '',
      quantidadeImagem: formData.quantidadeImagem || '',
      copyImagem: formData.copyImagem || '',
      
      // Landing Page
      descricaoLanding: formData.descricaoLanding || '',
      layoutLanding: formData.layoutLanding || '',
      copyLanding: formData.copyLanding || '',
    }
  });

  // Atualize o tipo de solicitação quando ele mudar
  useEffect(() => {
    updateFormData({ tipoSolicitacao });
  }, [tipoSolicitacao, updateFormData]);

  // Manipular checkboxes para Resolução de Vídeo
  const [resolucaoVideo, setResolucaoVideo] = useState<string[]>(
    formData.resolucaoVideo || []
  );

  // Manipular checkboxes para Especificações de Vídeo
  const [especificacoesVideo, setEspecificacoesVideo] = useState<string[]>(
    formData.especificacoesVideo || []
  );

  // Manipular checkboxes para Especificações de Imagem
  const [especificacoesImagem, setEspecificacoesImagem] = useState<string[]>(
    formData.especificacoesImagem || []
  );

  // Manipular checkboxes para Resolução de Imagem
  const [resolucaoImagem, setResolucaoImagem] = useState<string[]>(
    formData.resolucaoImagem || []
  );

  // Manipular opções para marca d'água
  const [marcaDagua, setMarcaDagua] = useState<'sim' | 'nao'>(
    formData.marcaDagua || 'nao'
  );

  // Manipular opções para usar cores da identidade
  const [usarCoresIdentidade, setUsarCoresIdentidade] = useState<'sim' | 'nao'>(
    formData.usarCoresIdentidade || 'sim'
  );

  // Repassar mudanças para o componente pai ao alterar qualquer campo
  const handleChange = (field: string, value: any) => {
    updateFormData({ [field]: value });
  };

  // Manipular checkboxes para Resolução de Vídeo
  const toggleResolucaoVideo = (value: string) => {
    setResolucaoVideo(prev => {
      const newValues = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      updateFormData({ resolucaoVideo: newValues });
      return newValues;
    });
  };

  // Manipular checkboxes para Especificações de Vídeo
  const toggleEspecificacoesVideo = (value: string) => {
    setEspecificacoesVideo(prev => {
      const newValues = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      updateFormData({ especificacoesVideo: newValues });
      return newValues;
    });
  };

  // Manipular checkboxes para Especificações de Imagem
  const toggleEspecificacoesImagem = (value: string) => {
    setEspecificacoesImagem(prev => {
      const newValues = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      updateFormData({ especificacoesImagem: newValues });
      return newValues;
    });
  };

  // Manipular checkboxes para Resolução de Imagem
  const toggleResolucaoImagem = (value: string) => {
    setResolucaoImagem(prev => {
      const newValues = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      updateFormData({ resolucaoImagem: newValues });
      return newValues;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-semibold">Tipo de Solicitação</h2>
        <p className="text-gray-500 text-sm md:text-base mt-1">
          Selecione o tipo de arte que deseja solicitar
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="tipoSolicitacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Tipo de solicitação: <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    value={tipoSolicitacao}
                    onValueChange={(value: 'video' | 'imagem' | 'landingPage') => {
                      field.onChange(value);
                      setTipoSolicitacao(value);
                    }}
                    className="flex flex-col md:flex-row gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <label htmlFor="video" className="cursor-pointer">Criativo em Vídeo</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="imagem" id="imagem" />
                      <label htmlFor="imagem" className="cursor-pointer">Criativo em Imagem</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="landingPage" id="landingPage" />
                      <label htmlFor="landingPage" className="cursor-pointer">Landing Page</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campos específicos para Vídeo */}
          {tipoSolicitacao === 'video' && (
            <div className="space-y-6 pt-4 border-t border-gray-200">
              <h3 className="text-base md:text-lg font-semibold">Detalhes do Criativo em Vídeo</h3>
              
              <FormField
                control={form.control}
                name="descricaoVideo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (opcional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o que você deseja para seu vídeo"
                        {...field}
                        value={formData.descricaoVideo || ''}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('descricaoVideo', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantidadeVideo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quantidade de Criativos em Vídeo: <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Número de vídeos"
                        min={1}
                        {...field}
                        value={formData.quantidadeVideo || ''}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('quantidadeVideo', e.target.value);
                        }}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500">
                      Informe o número total de vídeos solicitados (excluindo variações de resolução).
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Resolução do Criativo em Vídeo:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'feed-1-1', label: 'Feed (1:1)' },
                    { id: 'feed-3-4', label: 'Feed (3:4)' },
                    { id: 'story-9-16', label: 'Story (9:16)' },
                    { id: 'youtube-16-9', label: 'Youtube (16:9)' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={item.id}
                        checked={resolucaoVideo.includes(item.label)}
                        onCheckedChange={() => toggleResolucaoVideo(item.label)}
                      />
                      <label 
                        htmlFor={item.id}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Informe qual resolução deseja em seus criativos de vídeo!
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Especificações do Vídeo:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'narracao', label: 'Narração' },
                    { id: 'legenda', label: 'Legenda' },
                    { id: 'musica', label: 'Música' },
                    { id: 'marca-dagua-fixa', label: 'Marca d\'água (Fixa)' },
                    { id: 'marca-dagua-flutuante', label: 'Marca d\'água (Flutuante)' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={item.id}
                        checked={especificacoesVideo.includes(item.label)}
                        onCheckedChange={() => toggleEspecificacoesVideo(item.label)}
                      />
                      <label 
                        htmlFor={item.id}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Deseja que seu vídeo contenha quais atributos
                </p>
              </div>

              <FormField
                control={form.control}
                name="copyVideo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copy do criativo em Vídeo:</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Informe o texto (copy) que deseja utilizar no vídeo"
                        {...field}
                        value={formData.copyVideo || ''}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('copyVideo', e.target.value);
                        }}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500">
                      Informe a copy que deseja que seja utilizada em sua solicitação dos criativos em vídeo!
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Campos específicos para Imagem */}
          {tipoSolicitacao === 'imagem' && (
            <div className="space-y-6 pt-4 border-t border-gray-200">
              <h3 className="text-base md:text-lg font-semibold">Detalhes do Criativo em Imagem</h3>
              
              <FormField
                control={form.control}
                name="descricaoImagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (opcional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o que você deseja para sua imagem"
                        {...field}
                        value={formData.descricaoImagem || ''}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('descricaoImagem', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="layoutImagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Layouts de criativo em Imagem:
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Informe o número do layout (1 a 16)"
                        {...field}
                        value={formData.layoutImagem || ''}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('layoutImagem', e.target.value);
                        }}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500">
                      Caso tenha alguma dúvida sobre os layouts de Imagem, pode entrar em contato com nosso suporte via grupo do WhatsApp! Informe qual layout de Imagem deseja, dentre as referências da foto acima (de 1 a 16)
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantidadeImagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quantidade de Criativos em Imagem: <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Número de imagens"
                        min={1}
                        {...field}
                        value={formData.quantidadeImagem || ''}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('quantidadeImagem', e.target.value);
                        }}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500">
                      Informe o número total de imagens (excluindo variações de resolução).
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Especificações da Imagem:
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'discovery', label: 'Discovery (Anuncio no Google Ads)' },
                    { id: 'metaads', label: 'MetaAds (Anuncio no Facebook Ads)' },
                    { id: 'instagram', label: 'Instagram (Postar nas Redes Sociais - Social Mídia - Apenas Ilimitado PRO)', disabled: !isUnlimited },
                    { id: 'banner', label: 'Banner (Apenas para Ilimitado PRO)', disabled: !isUnlimited },
                    { id: 'outro', label: 'Outro (Se escolheu essa opção, informe a especificação no grupo do WhatsApp)' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={item.id}
                        checked={especificacoesImagem.includes(item.label)}
                        onCheckedChange={() => toggleEspecificacoesImagem(item.label)}
                        disabled={item.disabled}
                      />
                      <label 
                        htmlFor={item.id}
                        className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ${item.disabled ? 'opacity-50' : ''}`}
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Selecione as especificações desejadas para sua imagem
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Resolução do Criativo em Imagem:
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'discovery-res', label: 'Discovery (1080x1350 / 1200x628 /1200x1200)' },
                    { id: 'feed-1-1', label: 'Feed (1080x1080)' },
                    { id: 'feed-1-35', label: 'Feed (1080x1350)' },
                    { id: 'story', label: 'Story (1080x1920)' },
                    { id: 'feed-story-1', label: 'Feed (1080x1080) e Story (1080 x 1920)' },
                    { id: 'feed-story-2', label: 'Feed (1080x1350) e Story (1080x1920)' },
                    { id: 'banner-res', label: 'Banner (Mobile e Desktop)' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={item.id}
                        checked={resolucaoImagem.includes(item.label)}
                        onCheckedChange={() => toggleResolucaoImagem(item.label)}
                      />
                      <label 
                        htmlFor={item.id}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Informe qual resolução deseja em seus criativos de imagem!
                </p>
              </div>

              <FormField
                control={form.control}
                name="copyImagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copy do criativo em Imagem:</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Informe o texto (copy) que deseja utilizar na imagem"
                        {...field}
                        value={formData.copyImagem || ''}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('copyImagem', e.target.value);
                        }}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500">
                      Informe a copy que deseja que seja utilizada em sua solicitação dos criativos em imagem!
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Campos específicos para Landing Page */}
          {tipoSolicitacao === 'landingPage' && (
            <div className="space-y-6 pt-4 border-t border-gray-200">
              <h3 className="text-base md:text-lg font-semibold">Detalhes da Landing Page</h3>
              
              <FormField
                control={form.control}
                name="descricaoLanding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (opcional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o que você deseja para sua landing page"
                        {...field}
                        value={formData.descricaoLanding || ''}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('descricaoLanding', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="layoutLanding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Layouts de Landing Page:
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Informe o número do layout (1 a 7)"
                        {...field}
                        value={formData.layoutLanding || ''}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('layoutLanding', e.target.value);
                        }}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500">
                      Caso tenha alguma dúvida sobre a LP, pode entrar em contato com nosso suporte via grupo do WhatsApp! Informe qual layout de Landing Page deseja, dentre as referências da foto acima (de 1 a 7)
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Deseja solicitar marca d'água em sua Landing Page?
                </h4>
                <RadioGroup
                  value={marcaDagua}
                  onValueChange={(value: 'sim' | 'nao') => {
                    setMarcaDagua(value);
                    updateFormData({ marcaDagua: value });
                  }}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="marca-dagua-sim" />
                    <label htmlFor="marca-dagua-sim" className="cursor-pointer">Sim</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="marca-dagua-nao" />
                    <label htmlFor="marca-dagua-nao" className="cursor-pointer">Não</label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-gray-500 mt-1">
                  Informe se deseja adição da logo em sua Landing Page!
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Podemos usar as cores de acordo com a identidade visual da loja?
                </h4>
                <RadioGroup
                  value={usarCoresIdentidade}
                  onValueChange={(value: 'sim' | 'nao') => {
                    setUsarCoresIdentidade(value);
                    updateFormData({ usarCoresIdentidade: value });
                  }}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="cores-identidade-sim" />
                    <label htmlFor="cores-identidade-sim" className="cursor-pointer">Sim</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="cores-identidade-nao" />
                    <label htmlFor="cores-identidade-nao" className="cursor-pointer">Não (Caso queira outra paleta de cores, informe no grupo do WhatsApp)</label>
                  </div>
                </RadioGroup>
              </div>

              <FormField
                control={form.control}
                name="copyLanding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copy da Landing Page:</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Informe o texto (copy) que deseja utilizar na landing page"
                        {...field}
                        value={formData.copyLanding || ''}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('copyLanding', e.target.value);
                        }}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500">
                      Informe a copy que deseja que seja utilizada em sua solicitação da Landing Page!
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}
