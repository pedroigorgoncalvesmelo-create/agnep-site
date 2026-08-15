/*
 * Componente de interface do AGNEP (biblioteca shadcn/ui).
 * Arquivo: textarea.tsx
 * Este arquivo contém um componente de UI padrão da biblioteca shadcn/ui,
 * utilizado para construir a interface do site (botões, caixas de diálogo,
 * formulários, menus, tabelas, etc.). Não altere a lógica interna dele —
 * use o componente importando-o nas páginas do site.
 * Documentação de referência: https://ui.shadcn.com/docs
 */

import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
