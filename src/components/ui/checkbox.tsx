/*
  Componente Checkbox para o site AGNEP

  Este arquivo define um componente de checkbox reutilizável baseado em
  @radix-ui/react-checkbox e no ícone Check de lucide-react. O objetivo é
  encapsular o comportamento visual e de acessibilidade do checkbox,
  aplicando classes utilitárias e expondo a API do Radix para uso em formulários.

  Comentários no código explicam o que cada parte faz e porque foi feita dessa forma,
  voltado para desenvolvedores iniciantes.
*/

 // Importa React para criar componentes e usar forwardRef
import * as React from "react";
// Importa os primitives de Checkbox do Radix (comportamento e acessibilidade)
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
// Importa o ícone de checkmark para indicar estado "checked"
import { Check } from "lucide-react";

 // Importa função utilitária para concatenar classes condicionalmente
import { cn } from "@/lib/utils";

 // Define o componente Checkbox usando forwardRef para que referências possam ser passadas
 // Mantém os tipos corretos com generics para compatibilidade com o primitive do Radix
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  // Root do Radix fornece toda a lógica de acessibilidade e estados
  <CheckboxPrimitive.Root
    ref={ref}
    // Aplica classes padrões + possíveis classes passadas via props
    // As classes controlam layout, foco, estados desativado e estado checked via data attributes
    className={cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    {/* Indicador interno que aparece quando o checkbox está marcado */}
    <CheckboxPrimitive.Indicator className={cn("grid place-content-center text-current")}>
      {/* Ícone visual do checkmark; usa tamanho fixo para alinhar com o container */}
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
// Define displayName para facilitar debug em ferramentas de React DevTools
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
