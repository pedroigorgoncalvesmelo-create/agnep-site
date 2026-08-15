/*
  Componente de UI: Card e subcomponentes

  Este arquivo define um conjunto de componentes reutilizáveis para representar
  um "card" (cartão) na interface. Cada subcomponente (Header, Title, Description,
  Content, Footer) é um wrapper simples que aplica classes utilitárias (Tailwind)
  e suporta encaminhamento de ref via React.forwardRef.

  Objetivo:
  - Fornecer blocos semânticos e estilizados para construir interfaces consistentes.
  - Permitir passagem de className adicional e outras props padrão de HTML.
  - Manter compatibilidade com ref para manipulação/integração externa.

  Observação:
  - Comentários curtos e didáticos para desenvolvedores iniciantes.
*/

 // Importa React (necessário para JSX/forwardRef) e a função utilitária `cn`
 // que junta classes condicionalmente.
import * as React from "react";

import { cn } from "@/lib/utils";

 // Card principal: container com borda, fundo e sombra.
 // Usa forwardRef para expor a ref do div para componentes pais quando necessário.
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
      {...props}
    />
  ),
);
 // Define displayName para facilitar debug no React DevTools.
Card.displayName = "Card";

 // CardHeader: área superior do card, geralmente para título e descrição.
 // Mantém padding e espaçamento vertical entre elementos.
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

 // CardTitle: título do card com estilo de fonte mais forte.
 // Usado dentro do CardHeader para destacar o título.
const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

 // CardDescription: texto descritivo menor, normalmente abaixo do título.
 // Aplica cor de texto atenuada para hierarquia visual.
const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

 // CardContent: área principal do card para conteúdo arbitrário.
 // Remove padding-top para permitir alinhamento com o header quando necessário.
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

 // CardFooter: rodapé do card, geralmente para ações (botões) ou metadados.
 // Alinha itens horizontalmente e aplica padding.
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

// Exporta todos os componentes para uso em outras partes da aplicação.
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
