/*
  Arquivo: aspect-ratio.tsx

  Propósito:
  - Encapsula e reexporta o componente de "aspect ratio" do Radix UI.
  - Fornece um ponto central para importar o componente AspectRatio no projeto AGNEP,
    permitindo renomear, documentar e, no futuro, adicionar customizações sem alterar
    chamadas espalhadas pelo código.
  - Não altera a lógica do componente original; apenas facilita o uso com um nome
    consistente (AspectRatio).
*/

/* Importa o primitivo de AspectRatio do Radix UI.
   Usamos o namespace AspectRatioPrimitive para acessar a API exposta (Root, etc.). */
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/* Mapeia o Root do primitivo para o identificador AspectRatio utilizado no projeto.
   O Root é o componente principal que aplica a proporção definida ao seu conteúdo. */
const AspectRatio = AspectRatioPrimitive.Root;

/* Reexporta o componente com o nome AspectRatio para ser usado em outros módulos.
   Isso permite importar { AspectRatio } de 'components/ui/aspect-ratio' no restante do app. */
export { AspectRatio };
