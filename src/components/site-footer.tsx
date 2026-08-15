/*
  Arquivo: site-footer.tsx
  Propósito: Componente React que renderiza o rodapé do site da AGNEP.
  Contém logo, descrição, links para redes sociais, navegação principal, informações de contato
  e a linha de direitos autorais com ano dinâmico.
*/

import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/agnep-logo.png.asset.json";

/* Componente funcional SiteFooter
   O que: Renderiza o rodapé da página.
   Por que: Centraliza informações de marca, navegação rápida e contato em todas as páginas.
*/
export function SiteFooter() {
  /* Retorna o JSX do rodapé. Sem estado/efeitos, simples componente de apresentação. */
  return (
    <footer className="surface-navy-glow">
      {/* Elemento visual de brilho / destaque no fundo */}
      <span className="glow-accent" aria-hidden />
      {/* Conteúdo principal do rodapé: layout em grid com 3 colunas (logo, navegação, contato) */}
      <div className="container-page relative grid gap-12 py-20 md:grid-cols-4">
        {/* Coluna principal: logo, nome e descrição */}
        <div className="md:col-span-2">
          {/* Logo ao lado do título da organização */}
          <div className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="AGNEP"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <div className="leading-tight">
              <p className="heading-display text-lg text-white">AGNEP</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                Núcleo Esportivo e Paradesportivo
              </p>
            </div>
          </div>
          {/* Texto descritivo curto sobre a missão */}
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
            Transformando campeões no esporte e na vida. Promovendo o Jiu-Jitsu e o Xadrez como
            ferramentas de desenvolvimento humano, educacional e paradesportivo em Goiás.
          </p>
          {/* Links para redes sociais: apenas o Instagram oficial da AGNEP (@agnep_) */}
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.instagram.com/agnep_?igsh=MXVqbjQxbjlla3F5aw=="
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[10px] font-bold tracking-wider text-white/70 transition hover:border-primary hover:bg-primary hover:text-white"
              aria-label="Instagram da AGNEP (@agnep_)"
              title="Instagram @agnep_"
            >
              IG
            </a>
          </div>
        </div>

        {/* Coluna de navegação com links internos do site */}
        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Navegação
          </h4>
          <ul className="space-y-3 text-sm text-white/65">
            <li>
              <Link to="/sobre" className="hover:text-primary">
                Sobre a AGNEP
              </Link>
            </li>
            <li>
              <Link to="/eventos" className="hover:text-primary">
                Calendário
              </Link>
            </li>
            <li>
              <Link to="/resultados" className="hover:text-primary">
                Resultados
              </Link>
            </li>
            <li>
              <Link to="/galeria-fotos" className="hover:text-primary">
                Galeria de Fotos
              </Link>
            </li>
            <li>
              <Link to="/galeria-videos" className="hover:text-primary">
                Galeria de Vídeos
              </Link>
            </li>
            <li>
              <Link to="/documentos" className="hover:text-primary">
                Documentos
              </Link>
            </li>
            <li>
              <Link to="/novidades" className="hover:text-primary">
                Fique por Dentro
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna de contato com e-mail, telefone, localização e link para página de contato */}
        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">Contato</h4>
          <ul className="space-y-3 text-sm text-white/65">
            <li>
              <a
                href="mailto:Agnepgoias@gmail.com"
                className="transition hover:text-primary"
              >
                Agnepgoias@gmail.com
              </a>
            </li>
            <li>Itumbiara — Goiás, Brasil</li>
            <li>
              <Link to="/contato" className="text-primary hover:brightness-125">
                Fale conosco →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Linha inferior com borda e informação de direitos autorais */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:flex-row">
          {/* Ano é gerado dinamicamente para não precisar atualizar manualmente a cada ano */}
          <span>© {new Date().getFullYear()} AGNEP. Todos os direitos reservados.</span>
          <span>Transformando campeões no esporte e na vida</span>
        </div>
      </div>
    </footer>
  );
}
