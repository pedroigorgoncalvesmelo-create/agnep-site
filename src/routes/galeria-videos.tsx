/*
  Arquivo: galeria-videos.tsx
  Propósito:
  - Definir a rota "/galeria-videos" do site AGNEP que exibe uma galeria de vídeos.
  - Buscar os metadados dos vídeos do banco (Supabase) e renderizar uma lista com embeds do YouTube.
  - Fornecer meta tags para SEO/social (título, descrição, Open Graph).
  Observação:
  - Comentários explicam o que cada parte faz e por que ela existe, voltados para desenvolvedores iniciantes.
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { supabase } from "@/integrations/supabase/client";

// Define a rota de arquivo para "/galeria-videos" usando react-router.
// head: configurações de meta tags (SEO e social).
// component: aponta para o componente que vai renderizar a página.
export const Route = createFileRoute("/galeria-videos")({
  head: () => ({
    meta: [
      { title: "Galeria de Vídeos — AGNEP" },
      { name: "description", content: "Vídeos dos campeonatos, treinos e atividades da AGNEP, integrados com o YouTube." },
      { property: "og:title", content: "Vídeos AGNEP" },
      { property: "og:description", content: "Assista aos melhores momentos das competições e atividades da AGNEP." },
    ],
  }),
  component: Videos,
});

// Tipo que descreve a estrutura de um vídeo retornado pelo banco.
// Ajuda o TypeScript a validar o uso das propriedades do vídeo no componente.
type Video = { id: string; titulo: string; descricao: string | null; youtube_id: string; modalidade: string };

// Componente principal da página de vídeos.
// O que faz:
// - Busca a lista de vídeos no Supabase ao montar.
// - Mantém estado de carregamento e os vídeos recebidos.
// - Renderiza um cabeçalho e a lista de vídeos (ou mensagens de carregamento/vazio).
function Videos() {
  // Estado que armazena os vídeos buscados do banco.
  const [rows, setRows] = useState<Video[]>([]);
  // Estado para indicar se os dados ainda estão sendo carregados.
  const [loading, setLoading] = useState(true);

  // useEffect executa a busca dos vídeos somente uma vez quando o componente monta.
  useEffect(() => {
    (async () => {
      // Busca todos os registros da tabela "videos", ordenando pela data de publicação (mais recentes primeiro).
      const { data } = await supabase.from("videos").select("*").order("data_publicacao", { ascending: false });
      // Atualiza o estado com os dados recebidos ou um array vazio se vier null.
      setRows(data ?? []); setLoading(false);
    })();
    // Dependências vazias => executa apenas uma vez.
  }, []);

  return (
    <>
      {/* Cabeçalho da página com título, subtítulo e descrição.
          editableId permite que o conteúdo seja editável em algum CMS/fluxo de edição. */}
      <PageHeader
        editableId="galeria-videos"
        eyebrow="Vídeos"
        titleTop="Em movimento."
        titleBottom="Em alta definição."
        description="Acompanhe os melhores momentos dos nossos campeonatos, treinos e atividades."
      />


      <section className="container-page py-16">
        {/* Renderização condicional:
            - Se estiver carregando, mostra "Carregando..."
            - Se não tiver vídeos, mostra mensagem de vazio
            - Caso contrário, renderiza grid de vídeos */}
        {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : rows.length === 0 ? (
          <p className="bg-muted/40 p-6 text-sm text-muted-foreground">Nenhum vídeo publicado ainda.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {rows.map((v) => (
              // Cada vídeo é renderizado como um article com embed do YouTube e metadados.
              <article key={v.id} className="bg-card ring-1 ring-border">
                <div className="aspect-video w-full bg-secondary">
                  {/* Embed do YouTube usando o youtube_id do registro.
                      loading="lazy" melhora o desempenho ao carregar iframes apenas quando necessário. */}
                  <iframe
                    src={`https://www.youtube.com/embed/${v.youtube_id}`}
                    title={v.titulo}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <div className="p-6">
                  {/* Modalidade exibida em fonte monoespaçada como tag */}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary">{v.modalidade}</span>
                  {/* Título do vídeo */}
                  <h3 className="heading-display mt-2 text-xl">{v.titulo}</h3>
                  {/* Se houver descrição, renderiza o parágrafo */}
                  {v.descricao && <p className="mt-2 text-sm text-muted-foreground">{v.descricao}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
