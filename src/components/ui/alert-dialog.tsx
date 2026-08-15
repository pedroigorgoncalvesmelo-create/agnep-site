/*
  Arquivo: components/ui/alert-dialog.tsx

  Propósito:
  - Fornece componentes reutilizáveis de diálogo de alerta (AlertDialog) baseados em Radix UI.
  - Centraliza a estilização e composição (Overlay, Content, Header, Footer, Title, Description, Action, Cancel).
  - Permite uso consistente de animações, posicionamento e variantes de botão na aplicação AGNEP.

  Observações:
  - Este arquivo apenas encapsula componentes primitvos do Radix para facilitar o uso na UI.
  - Comentários explicam o que cada componente faz e por que foi criado dessa forma.
*/

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Root do AlertDialog (componente de controle principal do Radix).
const AlertDialog = AlertDialogPrimitive.Root;

// Trigger para abrir o AlertDialog (ex.: botão que dispara o diálogo).
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

// Portal para renderizar o conteúdo do diálogo fora da hierarquia DOM atual (útil para modais).
const AlertDialogPortal = AlertDialogPrimitive.Portal;

/* Overlay do diálogo
   - Usa forwardRef para expor a ref ao componente pai.
   - Aplica classes para fundo escuro, posicionamento fixo e animações ao abrir/fechar.
   - Mantemos a API do Radix para comportamentos de acessibilidade.
*/
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

/* Conteúdo do diálogo (box central)
   - Renderiza dentro do Portal para garantir sobreposição sobre outros elementos.
   - Inclui o Overlay (fundo escuro) e o Content do Radix.
   - As classes cuidam do posicionamento centrado, responsividade e animações.
*/
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

/* Header do diálogo
   - Container para título e descrição.
   - Alinha verticalmente e adapta texto para dispositivos pequenos (centro) e maiores (esquerda).
*/
const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

/* Footer do diálogo
   - Container para ações (botões).
   - Em telas pequenas exibe botões em coluna invertida, em telas maiores em linha à direita.
*/
const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

/* Título do diálogo
   - Encapsula o Primitive.Title do Radix com estilos padrão (tamanho e peso).
   - forwardRef para compatibilidade com APIs que precisem da ref.
*/
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

/* Descrição do diálogo
   - Texto auxiliar menor e com cor de destaque reduzida.
   - Também expõe ref via forwardRef.
*/
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

/* Ação principal do diálogo (ex.: Confirmar)
   - Usa o componente Action do Radix e aplica variantes de botão padronizadas.
   - forwardRef para compatibilidade com foco e acessibilidade.
*/
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

/* Botão de cancelar do diálogo
   - Usa a variante "outline" dos botões para indicar ação secundária.
   - Em telas pequenas aplica margem superior para separar dos botões empilhados.
*/
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// Exporta todos os componentes para uso em outras partes da aplicação.
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
