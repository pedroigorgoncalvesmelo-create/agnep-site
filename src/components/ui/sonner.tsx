/*
 * Componente de interface do AGNEP (biblioteca shadcn/ui).
 * Arquivo: sonner.tsx
 * Este arquivo contém um componente de UI padrão da biblioteca shadcn/ui,
 * utilizado para construir a interface do site (botões, caixas de diálogo,
 * formulários, menus, tabelas, etc.). Não altere a lógica interna dele —
 * use o componente importando-o nas páginas do site.
 * Documentação de referência: https://ui.shadcn.com/docs
 */

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
