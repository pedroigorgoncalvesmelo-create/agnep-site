/*
  Arquivo: alert.tsx
  Propósito: Define componentes de alerta reutilizáveis (Alert, AlertTitle, AlertDescription)
  para a interface do AGNEP. Usa a library "class-variance-authority" para gerenciar variantes
  de classes CSS e fornece suporte a forwardRef para permitir acesso ao ref dos elementos.
  Esses componentes incluem marcação e atributos para acessibilidade (role="alert") e
  são pensados para serem combinados com utilitários de classe via `cn`.
*/

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* 
  Define as classes base e variantes do componente de alerta usando `cva`.
  O objetivo é centralizar as classes utilitárias e permitir variantes (ex: default, destructive)
  sem espalhar strings de classe pelo projeto.
*/
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/* 
  Componente Alert:
  - Encapsula a marcação do alerta e aplica as classes conforme a variante.
  - Usa forwardRef para permitir que componentes pais referenciem o elemento DOM.
  - role="alert" melhora a acessibilidade (leitura por leitores de tela).
  - Recebe props padrão de uma div e as variantes definidas por alertVariants.
*/
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
/* Nome para facilitar depuração no React DevTools */
Alert.displayName = "Alert";

/* 
  Componente AlertTitle:
  - Representa o título do alerta, estilizado e semântico.
  - Usa forwardRef para possibilitar acesso ao elemento (por exemplo para foco).
  - Recebe classes adicionais via className e repassa restantes props para o elemento.
*/
const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
/* Nome para facilitar depuração no React DevTools */
AlertTitle.displayName = "AlertTitle";

/* 
  Componente AlertDescription:
  - Fornece a descrição do alerta, com estilo para texto menor.
  - Usa um contêiner <div> para permitir múltiplos parágrafos internos e aplicar estilo [_p]:leading-relaxed.
  - Também suporta forwardRef e props adicionais.
*/
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
));
/* Nome para facilitar depuração no React DevTools */
AlertDescription.displayName = "AlertDescription";

/* Exporta os componentes para uso em outras partes da aplicação */
export { Alert, AlertTitle, AlertDescription };
