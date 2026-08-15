/*
  Arquivo: button.tsx
  Propósito:
  - Define um componente Button reutilizável para a interface do AGNEP.
  - Centraliza variantes de estilo (usando class-variance-authority) e exporta tanto
    o componente quanto as variantes para uso em outros lugares do projeto.
  Observações:
  - Mantém suporte para renderizar como um botão nativo ou como um "slot" (asChild),
    permitindo composição com bibliotecas de roteamento ou wrappers.
  - Comentários em pontos chave explicam o que cada parte faz e por que está presente.
*/

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define variantes de estilo para o botão usando class-variance-authority (cva).
// Cada variante controla classes utilitárias do Tailwind para diferentes aparências e tamanhos.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Interface das props do componente Button.
// Estende as props nativas de <button> e as variantes definidas em buttonVariants.
// asChild permite renderizar o botão como um Slot (útil para composição com outros componentes).
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Componente Button com forwardRef para permitir referência externa ao elemento DOM.
// - Usa asChild para escolher entre renderizar um <button> padrão ou um <Slot> do Radix,
//   o que permite que o consumidor substitua o elemento sem perder estilos.
// - Usa cn para combinar classes geradas por buttonVariants com qualquer className passado.
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Se asChild for true, usamos Slot para permitir composição; caso contrário, usamos 'button'.
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
// Define displayName para facilitar depuração em ferramentas de desenvolvimento React.
Button.displayName = "Button";

// Exporta o componente e as variantes para uso em outros módulos.
export { Button, buttonVariants };
