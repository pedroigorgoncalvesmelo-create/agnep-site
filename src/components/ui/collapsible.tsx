/*
  Arquivo: componentes reutilizáveis de colapsível (Collapsible) para o site AGNEP.
  Propósito:
  - Encapsular e reexportar os componentes primitivos do Radix UI para colapsíveis.
  - Fornecer um ponto único de importação na aplicação (evita importar diretamente do Radix em vários lugares).
  - Comentários curtos explicam o que cada alias faz e por que existimos.
*/

/* Directive para Next.js/React indicando que este módulo roda no client */
"use client";

/* Importa todos os primitivos de colapsível do Radix UI.
   Usamos o namespace "CollapsiblePrimitive" para referenciar explicitamente Root, Trigger e Content.
   Mantemos a dependência isolada aqui para facilitar trocas futuras ou customizações. */
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/* Alias para o componente raíz do Radix Collapsible.
   O Root controla o estado (aberto/fechado) do colapsível.
   Criamos este alias para expor um nome mais curto/consistente na nossa base de código. */
const Collapsible = CollapsiblePrimitive.Root;

/* Alias para o gatilho (trigger) do colapsível.
   Usualmente usado como o botão ou elemento que o usuário clica para abrir/fechar o painel. */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

/* Alias para o conteúdo do colapsível.
   Contém o conteúdo que aparece ou desaparece quando o colapsível é toggled. */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

/* Reexporta os aliases para uso em outros componentes da aplicação.
   Mantemos as exports nomeadas para facilitar importações tree-shakable e explícitas. */
export { Collapsible, CollapsibleTrigger, CollapsibleContent };
