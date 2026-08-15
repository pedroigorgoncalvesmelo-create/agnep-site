/*
  page-header.tsx

  PADRÃO VISUAL UNIFICADO DOS BANNERS — AGNEP
  ============================================
  Todas as páginas internas usam este componente como banner.
  Ele garante o MESMO padrão de cor em todo o site:

  - Fundo azul marinho (cor institucional secundária)
  - Brilho dourado suave no topo esquerdo (assinatura da marca)
  - Brilho vermelho-sangue bem discreto no canto inferior direito
  - Textura animada de brilhos (mesmo padrão de outras seções do site)

  Assim, home, sobre, eventos, resultados, galeria, documentos,
  patrocinadores e contato ficam com os banners "na mesma camisa".
*/

import { EText } from "@/lib/site-content";

interface PageHeaderProps {
  /** Prefixo único para persistir textos editáveis (ex.: "sobre"). */
  editableId: string;
  eyebrow?: string;
  titleTop: string;
  titleBottom?: string;
  description?: string;
  /** Cor de destaque alternativa — por padrão usa o dourado institucional. */
  accent?: "gold" | "red";
}

export function PageHeader({ editableId, eyebrow, titleTop, titleBottom, description, accent = "gold" }: PageHeaderProps) {
  // Cores dos brilhos decorativos — sempre navy + dourado, com toque de vermelho discreto.
  const accentGlow =
    accent === "red"
      ? "oklch(0.56 0.22 27 / 0.10)"   // vermelho institucional (uso pontual)
      : "oklch(0.72 0.14 80 / 0.16)";  // dourado institucional (padrão)

  return (
    <section
      className="agnep-banner relative isolate overflow-hidden"
      data-accent={accent}
    >
      {/* ===== Fundo azul marinho institucional ===== */}
      <div className="absolute inset-0 bg-secondary" aria-hidden />

      {/* ===== Camada 1: brilho dourado no topo esquerdo (assinatura) ===== */}
      <div
        className="pointer-events-none absolute inset-0 animate-gradient-pan"
        style={{
          backgroundImage: `radial-gradient(circle at 12% 20%, ${accentGlow}, transparent 50%), radial-gradient(circle at 88% 85%, oklch(0.56 0.22 27 / 0.08), transparent 55%)`,
        }}
        aria-hidden
      />

      {/* ===== Camada 2: faixa diagonal dourada translúcida no topo ===== */}
      <div
        className="pointer-events-none absolute -right-1/4 -top-1/4 h-full w-3/4 rotate-12"
        style={{ background: "linear-gradient(160deg, transparent, oklch(0.72 0.14 80 / 0.06) 45%, transparent)" }}
        aria-hidden
      />

      {/* ===== Textura animada: brilhos flutuantes (mesmo padrão de outras seções do site) ===== */}
      <div
        className="animate-float-gentle pointer-events-none absolute -left-16 top-1/3 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "oklch(0.56 0.22 27 / 0.16)" }}
        aria-hidden
      />
      <div
        className="animate-float-gentle pointer-events-none absolute -right-12 bottom-1/4 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "oklch(0.72 0.14 80 / 0.14)" }}
        aria-hidden
      />

      <div className="container-page relative py-20 md:py-28">
        {eyebrow && (
          <EText
            id={`${editableId}.header.eyebrow`}
            defaultValue={eyebrow}
            as="p"
            className="eyebrow mb-4 text-primary"
          />
        )}
        <h1 className="heading-display max-w-3xl text-5xl leading-[0.95] text-white md:text-7xl">
          <EText id={`${editableId}.header.titleTop`} defaultValue={titleTop} as="span" />
          {titleBottom && (
            <>
              <br />
              <EText
                id={`${editableId}.header.titleBottom`}
                defaultValue={titleBottom}
                as="span"
                className="text-primary"
              />
            </>
          )}
        </h1>
        {description && (
          <EText
            id={`${editableId}.header.description`}
            defaultValue={description}
            as="p"
            multiline
            className="mt-6 max-w-2xl text-base text-white/70 md:text-lg"
          />
        )}
      </div>
    </section>
  );
}
