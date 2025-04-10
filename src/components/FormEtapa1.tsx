
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { FormData } from "./SolicitarForm";

interface FormEtapa1Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export function FormEtapa1({ formData, updateFormData }: FormEtapa1Props) {
  const form = useForm({
    defaultValues: {
      email: formData.email,
      nomeLoja: formData.nomeLoja,
      telefone: formData.telefone,
      nomeProduto: formData.nomeProduto,
      linkLoja: formData.linkLoja,
      linkProduto: formData.linkProduto,
      idioma: formData.idioma,
      outroIdioma: formData.outroIdioma || ''
    }
  });

  const { watch, register } = form;
  const idiomaValue = watch('idioma');

  // Repassar mudanças para o componente pai ao alterar qualquer campo
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-semibold">BK Arts Ilimitado - Formulário de Solicitação</h2>
        <p className="text-gray-500 text-sm md:text-base mt-1">
          Informações sobre loja ou infoproduto
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  E-mail <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Seu email"
                    {...field}
                    value={formData.email}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange('email', e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nomeLoja"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Nome da Loja <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nome da sua loja"
                    {...field}
                    value={formData.nomeLoja}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange('nomeLoja', e.target.value);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Informe o nome da sua loja conforme consta no grupo do WhatsApp. Se for infoproduto ou algum serviço, coloque o nome que consta no WhatsApp.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Telefone <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(00) 00000-0000"
                    {...field}
                    value={formData.telefone}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange('telefone', e.target.value);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Informe seu telefone para contato.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nomeProduto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Nome do Produto <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nome do produto"
                    {...field}
                    value={formData.nomeProduto}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange('nomeProduto', e.target.value);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Coloque aqui o nome do seu produto. Se for infoproduto ou algum serviço, coloque o nome do seu infoproduto ou serviço.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkLoja"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Qual o link da sua loja? <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://sualoja.com.br"
                    {...field}
                    value={formData.linkLoja}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange('linkLoja', e.target.value);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Aqui preencha com o link de sua loja! (Caso não tenha loja, coloque um link qualquer!)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkProduto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Link do Produto <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://sualoja.com.br/produto"
                    {...field}
                    value={formData.linkProduto}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange('linkProduto', e.target.value);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Preencha com o link do seu produto na internet. (Não necessariamente da sua loja!)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idioma"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Qual idioma deseja: <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  value={formData.idioma}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleChange('idioma', value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Português do Brasil">Português do Brasil</SelectItem>
                    <SelectItem value="Espanhol">Espanhol</SelectItem>
                    <SelectItem value="Francês">Francês</SelectItem>
                    <SelectItem value="Inglês">Inglês</SelectItem>
                    <SelectItem value="Holandês">Holandês</SelectItem>
                    <SelectItem value="Italiano">Italiano</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Informe em qual idioma quer que sejam realizados os seus criativos!
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {idiomaValue === 'Outro' && (
            <FormField
              control={form.control}
              name="outroIdioma"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Se escolheu outro idioma:
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Especifique o idioma"
                      {...field}
                      value={formData.outroIdioma || ''}
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange('outroIdioma', e.target.value);
                      }}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    Informe o idioma que deseja para sua solicitação.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </Form>
    </div>
  );
}
