/*
  Arquivo: admin-ui.tsx
  Propósito: Componentes reutilizáveis da interface administrativa do site AGNEP.
  Estes componentes são pequenos blocos de UI usados nas páginas administrativas:
  campos de formulário, cabeçalhos, botões, cartões e tabelas.
  Comentários explicam o que cada componente faz e por que existe.
*/

import { type ReactNode } from "react";

 // Classe base usada em inputs simples para manter consistência visual em formulários.
export const inputCls =
  "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none";

/* Field
   Componente genérico para rótulos de campos de formulário.
   O que: renderiza um label com um título (label) e o conteúdo (children) abaixo.
   Por que: padroniza a aparência dos rótulos e facilita reutilização em formulários.
*/
export function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

/* AdminHeader
   Cabeçalho utilizado nas páginas administrativas.
   O que: mostra um "eyebrow" (texto pequeno), um título grande e uma ação opcional (botão ou elemento).
   Por que: fornece uma estrutura consistente para títulos de página com possível ação à direita.
*/
export function AdminHeader({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h1 className="heading-display text-4xl">{title}</h1>
      </div>
      {action}
    </div>
  );
}

// ============================================================
// Componentes adicionais usados pelo painel de blocos
// ============================================================

/* Tipo para representar uma linha da tabela administrativa.
   id: chave única para o React (renderização eficiente).
   cells: array de células (ReactNode) para cada coluna da linha.
*/
export type AdminTableRow = {
  id: string;
  cells: ReactNode[];
};

/* AdminLabel
   Rótulo pequeno estilizado usado em células/tags na tabela.
   O que: renderiza texto com tipografia monoespaçada e caixa alta.
   Por que: mantém consistência visual em lugares onde precisamos de um rótulo compacto.
*/
export function AdminLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </span>
  );
}

/* AdminButton
   Botão padronizado com variantes (primary, secondary, danger).
   O que: combina classes base com variantes para gerar diferentes aparências.
   Por que: centraliza estilos e comportamentos de botão (hover, padding, tipografia).
*/
export function AdminButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}) {
  const base = "px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:brightness-110",
    secondary: "bg-secondary text-secondary-foreground hover:brightness-110",
    danger: "bg-destructive text-destructive-foreground hover:brightness-110",
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

/* AdminCard
   Cartão simples com sombra e padding usado para agrupar conteúdo administrativo.
   O que: container visual que destaca o conteúdo dentro do painel.
   Por que: melhora hierarquia visual e legibilidade das seções administrativas.
*/
export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-sm bg-card p-6 shadow-brand ring-1 ring-border ${className}`}>
      {children}
    </div>
  );
}

/* AdminTable
   Tabela genérica usada para listar dados no painel administrativo.
   O que: recebe headers (títulos das colunas) e rows (linhas com células) e renderiza uma tabela.
   Por que: facilita exibir listas de itens de forma consistente, separando dados da apresentação.
*/
export function AdminTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: AdminTableRow[];
}) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-border">
          {headers.map((h, i) => (
            <th key={i} className="pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b border-border/50 hover:bg-muted/30">
            {row.cells.map((cell, i) => (
              <td key={i} className="py-3 align-middle">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
