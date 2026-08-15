/*
  Arquivo: patrocinadores.tsx

  Propósito:
  - Define a rota "/patrocinadores" do site AGNEP e o componente que renderiza
    a página de patrocinadores e doadores.
  - Busca os patrocinadores ativos no banco (Supabase), obtém URLs assinadas
    para logos armazenadas e exibe uma grade de cartões com informações.
  - Inclui uma chamada para ação no final convidando a apoiar a AGNEP.

  Observações:
  - Comentários explicativos em português para desenvolvedores iniciantes.
  - Não altera lógica, nomes nem comportamento do código original.
*/

import { createFileRoute, Link } from "@tanstack/react-router";
// useEffect e useState para gerenciar efeitos colaterais e estado no componente
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
// Cliente Supabase para ler dados da tabela "patrocinadores"
import { supabase } from "@/integrations/supabase/client";
// Função utilitária para gerar URLs assinadas de arquivos no storage
import { getSignedUrl } from "@/lib/storage";

// Registra a rota de arquivo "/patrocinadores" com metadados de head (SEO/OG)
// e define o componente responsável por renderizar a página.
export const Route = createFileRoute("/patrocinadores")({
  head: () => ({
    meta: [
      { title: "Patrocinadores e Doadores — AGNEP" },
      { name: "description", content: "Conheça as empresas e parceiros que apoiam os projetos esportivos e educacionais da AGNEP." },
      { property: "og:title", content: "Patrocinadores AGNEP" },
      { property: "og:description", content: "Empresas, instituições e doadores que tornam a AGNEP possível." },
    ],
  }),
  component: Patrocinadores,
});

// Tipo TypeScript representando a estrutura esperada de um patrocinador
type Pat = { id: string; nome: string; link: string | null; logo_url: string | null; descricao: string | null };

function Patrocinadores() {
  // Estado que guarda as linhas recuperadas da tabela "patrocinadores"
  const [rows, setRows] = useState<Pat[]>([]);
  // Mapa de logo_url -> URL assinada (string). Usado para exibir imagens do storage.
  const [urls, setUrls] = useState<Record<string, string>>({});
  // Indicador de carregamento para controlar exibição enquanto busca dados
  const [loading, setLoading] = useState(true);

  /*
    useEffect responsável por:
    - Buscar patrocinadores ativos no Supabase, ordenados por "ordem" e "nome".
    - Para cada registro que tenha logo_url, obter uma URL assinada via getSignedUrl.
    - Armazenar as linhas e o mapa de URLs no estado local.
    - Sinalizar término do carregamento.
  */
  useEffect(() => {
    (async () => {
      // Consulta ao Supabase para obter patrocinadores ativos
      const { data } = await supabase.from("patrocinadores").select("*").eq("ativo", true).order("ordem").order("nome");
      // Atualiza estado com os dados retornados (ou array vazio se null)
      setRows(data ?? []);
      // Constroi um mapa de logo_url para URL assinada
      const map: Record<string, string> = {};
      for (const r of data ?? []) {
        // Se existir logo_url, tenta obter a URL assinada e armazenar no mapa
        if (r.logo_url) { const u = await getSignedUrl("patrocinadores", r.logo_url); if (u) map[r.logo_url] = u; }
      }
      // Salva o mapa de URLs e marca carregamento como concluído
      setUrls(map); setLoading(false);
    })();
    // [] garante que o efeito rode apenas uma vez ao montar o componente
  }, []);

  return (
    <>
      {/* Cabeçalho da página com título e descrição editable */}
      <PageHeader
        editableId="patrocinadores"
        eyebrow="Apoio Institucional"
        titleTop="Quem caminha"
        titleBottom="com a AGNEP"
        description="Patrocinadores e doadores que tornam possível nossos projetos esportivos, sociais e paradesportivos."
      />


      <section className="container-page py-16">
        {/* Estado de carregamento, ausência de patrocinadores ou lista com cartões */}
        {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : rows.length === 0 ? (
          // Mensagem quando ainda não há patrocinadores cadastrados
          <p className="bg-muted/40 p-6 text-sm text-muted-foreground">Em breve, nossos parceiros oficiais.</p>
        ) : (
          // Grid responsivo com cartões dos patrocinadores
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {rows.map((s) => {
              // Conteúdo interno do cartão (imagem ou iniciais, nome e descrição)
              const inner = (
                <>
                  <div className="flex h-32 w-full items-center justify-center bg-muted">
                    {s.logo_url && urls[s.logo_url] ? (
                      // Se tivermos URL assinada, exibe a imagem do logo
                      <img src={urls[s.logo_url]} alt={s.nome} className="max-h-24 max-w-[80%] object-contain" />
                    ) : (
                      // Fallback: exibe iniciais do nome quando não há logo disponível
                      <span className="heading-display text-3xl text-muted-foreground/40">
                        {s.nome.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm font-semibold">{s.nome}</p>
                  {/* Exibe descrição quando disponível, com limite de linhas */}
                  {s.descricao && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.descricao}</p>}
                </>
              );
              // Se o patrocinador tiver link, envolve o cartão em um <a> que abre em nova aba.
              // Caso contrário, renderiza um div estático.
              return s.link ? (
                <a key={s.id} href={s.link} target="_blank" rel="noopener noreferrer"
                   className="group flex flex-col items-center bg-card p-6 ring-1 ring-border transition hover:ring-primary">
                  {inner}
                </a>
              ) : (
                <div key={s.id} className="flex flex-col items-center bg-card p-6 ring-1 ring-border">{inner}</div>
              );
            })}
          </div>
        )}
      </section>

      {/*
        Seção de chamada para ação para potenciais parceiros.
        PADRÃO UNIFICADO: fundo azul marinho institucional + detalhes dourados,
        igual aos banners das demais páginas (antes era um bloco dourado chapado).
      */}
      <section className="relative overflow-hidden border-t border-border bg-secondary text-secondary-foreground">
        {/* Brilho dourado no topo esquerdo + brilho discreto no canto inferior direito */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 25%, oklch(0.72 0.14 80 / 0.14), transparent 55%), radial-gradient(circle at 90% 90%, oklch(0.56 0.22 27 / 0.08), transparent 60%)",
          }}
          aria-hidden
        />
        {/* Textura animada: brilhos flutuantes, mesmo padrão de outras seções */}
        <div
          className="animate-float-gentle pointer-events-none absolute -left-16 top-1/3 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "oklch(0.56 0.22 27 / 0.14)" }}
          aria-hidden
        />
        <div
          className="animate-float-gentle pointer-events-none absolute -right-12 bottom-1/4 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "oklch(0.72 0.14 80 / 0.12)" }}
          aria-hidden
        />
        <div className="container-page relative flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Seja um parceiro</p>
            <h2 className="heading-display mt-3 text-4xl text-white">Sua marca ao lado de quem forma campeões.</h2>
          </div>
          {/* Link interno para a página de contato */}
          <Link to="/contato" className="bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition hover:brightness-110">
            Quero apoiar
          </Link>
        </div>
      </section>
    </>
  );
}
