/*
  Arquivo: badge.tsx
  Propósito:
  Componente reutilizável de "Badge" (etiqueta/insígnia) usado na UI do site AGNEP.
  Define estilos variantes através da biblioteca class-variance-authority (cva)
  e exporta o componente React além das variantes de classe para uso em outros módulos.

  Observações:
  - Comentários explicam o que cada parte faz e por que existe.
  - Não altera a lógica ou nomes originais do arquivo.
*/

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Cria uma função que gera classes CSS dependendo das variantes fornecidas.
// cva permite definir classes base + variantes nomeadas e valores padrão.
/* 
  - string inicial: classes base aplicadas sempre ao badge.
  - variants: objetos com diferentes estilos para a propriedade "variant".
  - defaultVariants: valor padrão quando nenhum variant é passado.
*/
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Variante padrão com fundo primário e texto contrastante
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        // Variante secundária com esquema de cores secundário
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Variante destrutiva (ex.: para indicar algo crítico/remover)
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        // Variante outline sem background, apenas texto/contorno
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Tipagem das props do Badge:
// - Estende React.HTMLAttributes<HTMLDivElement> para permitir props padrão de div (className, id, style, etc).
// - Extende VariantProps<typeof badgeVariants> para incluir a prop "variant" tipada conforme badgeVariants.
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

// Componente Badge funcional.
// Recebe className (opcional), variant (opcional) e demais props de div.
// Usa a função cn para mesclar as classes geradas por badgeVariants com className passado pelo consumidor.
/*
  Por que:
  - badgeVariants({ variant }) retorna as classes apropriadas para a variante escolhida.
  - cn permite concatenar/filtrar classes adicionais seguras.
  - Spread {...props} repassa handlers e atributos (title, onClick, etc.) para a div.
*/
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// Exporta o componente e a configuração de variantes para eventuais usos externos
// (por exemplo, compor classes ou reutilizar as mesmas variantes fora do componente).
export { Badge, badgeVariants };
