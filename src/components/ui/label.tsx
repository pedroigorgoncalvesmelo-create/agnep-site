/*
 * Componente de interface do AGNEP (biblioteca shadcn/ui).
 * Arquivo: label.tsx
 * Este arquivo contém um componente de UI padrão da biblioteca shadcn/ui,
 * utilizado para construir a interface do site (botões, caixas de diálogo,
 * formulários, menus, tabelas, etc.). Não altere a lógica interna dele —
 * use o componente importando-o nas páginas do site.
 * Documentação de referência: https://ui.shadcn.com/docs
 */

"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
