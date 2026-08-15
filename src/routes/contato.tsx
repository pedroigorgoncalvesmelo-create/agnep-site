/*
  arquivo: contato.tsx
  propósito: Página de contato do site AGNEP (versão simplificada).
  descrição: Define a rota "/contato" com metadados para SEO e exporta o componente
  de página que exibe as informações de contato da associação: e-mail oficial,
  localização da sede em Itumbiara (com mapa) e links para redes sociais.
  O formulário antigo foi removido por não enviar mensagens de verdade — o canal
  oficial de contato agora é o e-mail Agnepgoias@gmail.com.
*/

import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

// E-mail oficial da AGNEP — canal único de contato do site.
const EMAIL_CONTATO = "Agnepgoias@gmail.com";

// Cria a rota de arquivo para "/contato" e define metadados (head) para SEO.
export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — AGNEP" },
      {
        name: "description",
        content:
          "Entre em contato com a AGNEP pelo e-mail oficial Agnepgoias@gmail.com. Sede em Itumbiara, Goiás.",
      },
      { property: "og:title", content: "Fale com a AGNEP" },
      {
        property: "og:description",
        content:
          "Associação Goiana Núcleo Esportivo e Paradesportivo. E-mail oficial e localização da sede em Itumbiara.",
      },
    ],
  }),
  component: Contato,
});

/* Componente principal da página de contato.
   - Renderiza o cabeçalho da página e a seção de contato com destaque para o
     e-mail oficial, a localização (mapa de Itumbiara) e redes sociais.
*/
function Contato() {
  return (
    <>
      {/* Cabeçalho da página com título e descrição. */}
      <PageHeader
        editableId="contato"
        eyebrow="Fale Conosco"
        titleTop="Estamos a uma"
        titleBottom="mensagem de distância."
        description="Dúvidas, parcerias, inscrição em aulas ou divulgação de eventos — entre em contato."
      />

      {/* Seção principal: e-mail em destaque à esquerda; informações e mapa à direita */}
      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr]">
        {/* Bloco de destaque com o e-mail oficial */}
        <div className="surface-navy-glow p-10">
          <span className="glow-accent" aria-hidden />
          <p className="eyebrow mb-3">Canal oficial de contato</p>
          <h2 className="heading-display mb-6 text-4xl">
            Fale com a <span className="text-primary">AGNEP</span>
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-white/80">
            Para qualquer assunto — dúvidas, parcerias, inscrições em aulas ou
            divulgação de eventos — envie um e-mail para o endereço oficial da
            associação. Respondemos o mais rápido possível.
          </p>

          {/* Botão de e-mail em destaque: abre o aplicativo de e-mail do visitante */}
          <a
            href={`mailto:${EMAIL_CONTATO}`}
            className="group inline-flex items-center gap-4 bg-primary px-8 py-5 text-base font-bold uppercase tracking-widest text-primary-foreground transition hover:brightness-110"
          >
            {/* Ícone de envelope simples em SVG */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
            {EMAIL_CONTATO}
          </a>
          <p className="mt-4 text-xs tracking-wide text-white/60">
            Clique no botão acima para abrir seu aplicativo de e-mail com o
            endereço da AGNEP já preenchido.
          </p>
        </div>

        {/* Coluna lateral com informações da sede e mapa */}
        <aside className="space-y-6">
          <div className="surface-navy-glow p-8">
            <span className="glow-accent" aria-hidden />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Sede AGNEP
            </p>
            <p className="heading-display mt-3 text-2xl text-white">Itumbiara · Goiás</p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-white/50">
                  E-mail
                </span>
                <a href={`mailto:${EMAIL_CONTATO}`} className="transition hover:text-primary">
                  {EMAIL_CONTATO}
                </a>
              </li>
              <li>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-white/50">
                  Localização
                </span>
                Itumbiara, Goiás — Brasil
              </li>
              <li>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-white/50">
                  Horário
                </span>
                Seg–Sex · 08h às 21h · Sáb · 08h às 14h
              </li>
            </ul>
          </div>

          {/* Mapa incorporado via iframe apontando para Itumbiara */}
          <div className="aspect-video w-full overflow-hidden bg-muted">
            <iframe
              title="Mapa da AGNEP em Itumbiara"
              src="https://www.google.com/maps?q=Itumbiara,%20Goi%C3%A1s,%20Brasil&output=embed"
              loading="lazy"
              className="h-full w-full border-0"
            />
          </div>

          {/* Links para redes sociais — apenas o Instagram oficial da AGNEP */}
          <div>
            <a
              href="https://www.instagram.com/agnep_?igsh=MXVqbjQxbjlla3F5aw=="
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-card px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] ring-1 ring-border transition hover:bg-primary hover:text-primary-foreground hover:ring-primary"
            >
              Instagram
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
