/*
  Arquivo: breadcrumb.tsx
  Propósito: Fornecer componentes reutilizáveis para exibir uma breadcrumb (trilha de navegação)
            no site AGNEP. Estes componentes encapsulam marcação, estilos utilitários e atributos
            de acessibilidade (aria) para facilitar a construção da navegação hierárquica.
  Contém:
    - Breadcrumb: wrapper <nav> com aria-label
    - BreadcrumbList: <ol> que contém os itens
    - BreadcrumbItem: <li> para cada item
    - BreadcrumbLink: link clicável (ou Slot para composição)
    - BreadcrumbPage: representação do item atual (não clicável)
    - BreadcrumbSeparator: separador entre itens (ícone por padrão)
    - BreadcrumbEllipsis: indicador de itens ocultos (reticências)
  Observações:
    - Comentários explicativos em português para desenvolvedores iniciantes.
    - Mantido comportamento, nomes e tipos originais.
*/

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

// Breadcrumb: wrapper de navegação. Usamos forwardRef para expor a ref do nav.
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
/* 
  O QUE: Componente que renderiza um <nav aria-label="breadcrumb">.
  POR QUE: Prover contexto semântico para leitores de tela e permitir que outros componentes
         sejam compostos dentro (ex.: BreadcrumbList).
*/
Breadcrumb.displayName = "Breadcrumb";

// BreadcrumbList: lista ordenada que contém os itens da breadcrumb
const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  ),
);
/*
  O QUE: Renderiza um <ol> estilizado para agrupar os itens da breadcrumb.
  POR QUE: Usar <ol> melhora a semântica (ordem hierárquica) e facilita a estilização consistente.
*/
BreadcrumbList.displayName = "BreadcrumbList";

// BreadcrumbItem: item individual da lista (li)
const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
/*
  O QUE: Renderiza um <li> com estilos base.
  POR QUE: Padroniza o espaçamento e alinhamento entre o conteúdo do item e o separador.
*/
BreadcrumbItem.displayName = "BreadcrumbItem";

// BreadcrumbLink: link navegável dentro do breadcrumb. Suporta asChild para composição.
// Quando asChild=true, usa Slot para permitir que outro componente (ex.: NextLink) seja renderizado.
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
});
/*
  O QUE: Renderiza um elemento de link (ou um Slot para composition).
  POR QUE: Permite reutilização com diferentes roteadores ou componentes de link sem perder estilos.
*/
BreadcrumbLink.displayName = "BreadcrumbLink";

// BreadcrumbPage: representa a página atual (não clicável) com atributos de acessibilidade
const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  ),
);
/*
  O QUE: Renderiza um <span> que indica o item atual da trilha.
  POR QUE: Usamos aria-current="page" para sinalizar a posição atual e aria-disabled para indicar não clicável.
*/
BreadcrumbPage.displayName = "BreadcrumbPage";

// BreadcrumbSeparator: separador entre itens. Por padrão usa um ícone ChevronRight.
const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
/*
  O QUE: Renderiza um <li> usado como separador visual entre itens.
  POR QUE: O separador é marcado como presentation/hidden para leitores de tela, já que não soma informação.
*/
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// BreadcrumbEllipsis: indicador de itens ocultos (ex.: quando a breadcrumb está truncada)
const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
/*
  O QUE: Renderiza um ícone de três pontos para indicar conteúdo adicional oculto.
  POR QUE: Mantém acessibilidade visual (sr-only) e apresentação consistente quando há muitos itens.
*/
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
