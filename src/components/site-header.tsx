/*
  Arquivo: site-header.tsx

  Propósito:
  Componente de cabeçalho do site AGNEP. Exibe logo, navegação principal,
  botão de contato e menu responsivo para dispositivos móveis.

  Observações:
  - Mantém a navegação visível em telas grandes (desktop).
  - Mostra um botão "hamburger" em telas pequenas que alterna um menu empilhado.
  - Comentários explicativos adicionados para ajudar desenvolvedores iniciantes.
*/

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logoAsset from "@/assets/agnep-logo.png.asset.json";

/* Lista de itens de navegação usados no cabeçalho.
   Usamos "as const" para manter os tipos literais das rotas/labels. */
const NAV = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/eventos", label: "Eventos" },
  { to: "/resultados", label: "Resultados" },
  { to: "/galeria-fotos", label: "Galeria" },
  { to: "/documentos", label: "Documentos" },
  { to: "/patrocinadores", label: "Patrocinadores" },
  { to: "/novidades", label: "Fique por Dentro" },
] as const;

/* Componente SiteHeader
   O QUE: Renderiza o cabeçalho fixo do site com logo, links de navegação e menu responsivo.
   POR QUE: Centraliza a navegação principal do site e provê acesso ao menu em dispositivos móveis.
*/
export function SiteHeader() {
  // Estado que controla se o menu móvel está aberto (true) ou fechado (false).
  // Usado para exibir/ocultar o menu em telas pequenas.
  const [open, setOpen] = useState(false);

  // Render do cabeçalho
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between gap-8">
        {/* Link para a página inicial com logo e texto */}
        <Link to="/" className="flex items-center gap-3" aria-label="AGNEP — Início">
          <img
            src={logoAsset.url}
            alt="Logo AGNEP"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          {/* Nome e subtítulo ao lado do logo (visível a partir do breakpoint 'sm') */}
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="heading-display text-base">AGNEP</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Núcleo Esportivo
            </span>
          </div>
        </Link>

        {/* Navegação principal visível em telas grandes (lg) */}
        <nav className="hidden items-center gap-7 text-[11px] font-bold uppercase tracking-[0.18em] lg:flex">
          {NAV.map((item) => (
            // Cada item da NAV vira um Link; activeProps define estilo para rota ativa.
            <Link
              key={item.to}
              to={item.to}
              className="text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Botão de contato visível em telas grandes */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contato"
            className="bg-secondary px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-foreground transition hover:bg-primary"
          >
            Contato
          </Link>
        </div>

        {/* Botão "hamburger" para abrir/fechar o menu em telas pequenas */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1">
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </div>
        </button>
      </div>

      {/* Menu móvel condicional: exibido apenas quando `open` for true */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-4 text-sm font-semibold">
            {NAV.map((item) => (
              // Itens da navegação no menu móvel; ao clicar, o menu fecha.
              <Link
                key={item.to}
                to={item.to}
                className="border-b border-border/60 py-3 uppercase tracking-wider text-foreground/80 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* Link de contato também presente no menu móvel */}
            <Link
              to="/contato"
              className="mt-3 bg-primary px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-primary-foreground"
              onClick={() => setOpen(false)}
            >
              Contato
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
