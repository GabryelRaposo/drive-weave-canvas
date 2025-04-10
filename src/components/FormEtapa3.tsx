
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
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { FormData } from "./SolicitarForm";

interface FormEtapa3Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export function FormEtapa3({ formData, updateFormData }: FormEtapa3Props) {
  const form = useForm({
    defaultValues: {
      publicoAlvo: formData.publicoAlvo || '',
      promocao: formData.promocao || '',
      qualidades: formData.qualidades || '',
      observacoes: formData.observacoes || '',
      linkMateriais: formData.linkMateriais || '',
      aceitaTermos: formData.aceitaTermos
    }
  });

  // Repassar mudanças para o componente pai ao alterar qualquer campo
  const handleChange = (field: string, value: any) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-semibold">Informações Gerais</h2>
        <p className="text-gray-500 text-sm md:text-base mt-1">
          São informações complementares que não são obrigatórias, mas que podem contribuir para o desenvolvimento da sua solicitação.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="publicoAlvo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Qual seu público alvo?
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Exemplo: Homens 40+, Pais com filhos de 3 a 9 anos, Mulheres 50+, entre outros!"
                    {...field}
                    value={formData.publicoAlvo || ''}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange('publicoAlvo', e.target.value);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Informe a qual público alvo você deseja direcionar sua solicitação!
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="promocao"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Qual a sua promoção?
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Exemplo: 'Compre 1 e leve 2', 'Frete grátis', 'Desconto de 50%', entre outros."
                    {...field}
                    value={formData.promocao || ''}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange('promocao', e.target.value);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Descreva a promoção associada ao produto.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qualidades"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Quais são as principais qualidades e diferenças de seu produto?
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Liste os diferenciais do seu produto"
                    {...field}
                    value={formData.qualidades || ''}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange('qualidades', e.target.value);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Liste as características relevantes do seu produto, que deseja destacar nos criativos! Pois vão ser utilizadas nas copys dos vídeos, imagens e landing page!
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Observações extras:
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Informações adicionais para sua solicitação"
                    {...field}
                    value={formData.observacoes || ''}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange('observacoes', e.target.value);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Informe algum direcionamento extra que devemos seguir para realizar sua solicitação!
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkMateriais"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Link de Materiais Auxiliares
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://drive.google.com/..."
                    {...field}
                    value={formData.linkMateriais || ''}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange('linkMateriais', e.target.value);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Caso tenha algum drive que gostaria de disponibilizar, pode deixar aqui embaixo! Exemplo: Takes para criativos, imagens de refências, copy, identidade visual, logo, entre outros. Garanta que o link esteja público para que nossos colaboradores possam acessá-lo!
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-base md:text-lg font-semibold mb-4">Termos Contratuais</h3>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-sm">
                Pode verificar os termos do contrato através do seguinte link:
              </p>
              <a 
                href="https://docs.google.com/document/d/1xPzhyBXP7986T8yLMucWwhKIoyELAibHjmGLlOHzgU4/edit?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline text-sm mt-2 inline-block"
              >
                Ver termos contratuais
              </a>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="aceita-termos" 
                checked={formData.aceitaTermos}
                onCheckedChange={(checked) => {
                  handleChange('aceitaTermos', checked === true);
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="aceita-termos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Confirmo que li e aceito os termos contratuais para prestação de serviço <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500">
                  É necessário aceitar os termos para enviar o formulário
                </p>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
