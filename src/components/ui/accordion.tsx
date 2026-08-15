/*
  Arquivo: components/ui/accordion.tsx
  Propósito: Componentes reutilizáveis de Accordion (colapso/expansível) baseados em Radix UI.
  Explicação: Exporta os componentes Accordion, AccordionItem, AccordionTrigger e AccordionContent,
  adicionando classes e pequenas customizações (estilos, ícone, animações) para uso no site AGNEP.
*/

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

// Reexport do Root do Radix como Accordion para uso direto nos formulários/layouts
const Accordion = AccordionPrimitive.Root;

/* 
  AccordionItem
  O QUE: Componente que envolve cada item do accordion (cabeçalho + conteúdo).
  POR QUE: Encapsula o Item do Radix e adiciona uma borda inferior padrão e suporte a className via `cn`.
*/
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

/* 
  AccordionTrigger
  O QUE: Cabeçalho clicável que abre/fecha o conteúdo do item do accordion.
  POR QUE: Cria um trigger com estilo consistente, adiciona o ícone de Chevron que gira
         quando aberto e permite personalização de classes.
*/
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      {/* Ícone que indica estado; a rotação é controlada pela classe data-state */}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/* 
  AccordionContent
  O QUE: Área de conteúdo que aparece/oculta quando o trigger é acionado.
  POR QUE: Adiciona classes de overflow e animações baseadas no estado (open/closed) e
         um wrapper interno para aplicar padding separadamente do container animado.
*/
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// Export dos componentes para uso em outras partes da aplicação
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
