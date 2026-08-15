/*
  arquivo: src/routes/documentos.tsx

  Propósito:
  - Rota "/documentos" do site AGNEP que lista documentos e regulamentos disponíveis para download.
  - Busca os registros na tabela "documentos" do Supabase, exibe filtros por categoria e permite baixar
    arquivos usando URLs temporárias (signed URLs) do storage.

  Observações:
  - Não altera a lógica de negócio, apenas adiciona comentários explicativos para desenvolvedores iniciantes.
  - Componentes, estados e efeitos foram documentados com comentários curtos em português.
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { supabase } from "@/integrations/supabase/client";
import { getSignedUrl } from "@/lib/storage";

/* 
  Define a rota de arquivo para "/documentos".
  head: configura meta tags da página para SEO e compartilhamento (og:).
  component: componente que será renderizado para essa rota (Documentos).
*/
export const Route = createFileRoute("/documentos")({
  head: () => ({
    meta: [
      { title: "Documentos e Regulamentos — AGNEP" },
      { name: "description", content: "Baixe folders, regulamentos e materiais oficiais dos eventos da AGNEP." },
      { property: "og:title", content: "Documentos AGNEP" },
      { property: "og:description", content: "Folders e regulamentos em PDF para download — Jiu-Jitsu e Xadrez." },
    ],
  }),
  component: Documentos,
});

/* Tipo que representa um documento conforme armazenado no Supabase.
   Inclui título, descrição, categoria e caminho/URL do arquivo no storage. */
type Doc = { id: string; titulo: string; descricao: string | null; categoria: string | null; arquivo_url: string };

function Documentos() {
  // Estado com a lista de documentos carregados do Supabase.
  const [docs, setDocs] = useState<Doc[]>([]);
  // Estado que guarda o filtro atual de categoria ("Todos" por padrão).
  const [filter, setFilter] = useState("Todos");
  // Estado que indica se os dados ainda estão sendo carregados.
  const [loading, setLoading] = useState(true);

  /*
    useEffect para buscar os documentos assim que o componente monta.
    - Faz uma consulta à tabela "documentos" ordenada por created_at desc.
    - Atualiza os estados docs e loading.
    Motivo: manter a UI atualizada com os documentos publicados.
  */
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("documentos").select("*").order("created_at", { ascending: false });
      setDocs(data ?? []); setLoading(false);
    })();
  }, []);

  // Extrai categorias únicas a partir dos documentos e adiciona a opção "Todos".
  const cats = ["Todos", ...Array.from(new Set(docs.map((d) => d.categoria).filter(Boolean) as string[]))];
  // Lista de documentos após aplicação do filtro de categoria.
  const filtered = docs.filter((d) => filter === "Todos" || d.categoria === filter);

  /*
    Função para baixar um arquivo:
    - Recebe o caminho do arquivo no storage.
    - Solicita uma URL assinada (temporária) via getSignedUrl.
    - Abre a URL em nova aba para iniciar o download ou visualização.
    Motivo: usar URLs assinadas para fornecer acesso seguro a arquivos privados.
  */
  async function baixar(path: string) {
    const url = await getSignedUrl("documentos", path);
    if (url) window.open(url, "_blank");
  }

  return (
    <>
      {/* Cabeçalho da página com título, descrição e id editável */}
      <PageHeader
        editableId="documentos"
        eyebrow="Biblioteca Oficial"
        titleTop="Documentos &"
        titleBottom="Regulamentos"
        description="Folders, regulamentos técnicos e materiais oficiais dos eventos AGNEP, disponíveis para download."
      />


      <section className="container-page py-16">
        {/* Botões de filtro por categoria */}
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map((m) => (
            <button key={m} onClick={() => setFilter(m)}
              /* 
                Botão que altera o filtro.
                Classe muda visualmente quando o filtro está ativo para indicar seleção.
              */
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition ${filter === m ? "bg-primary text-primary-foreground" : "bg-card text-foreground ring-1 ring-border hover:ring-primary"}`}>
              {m}
            </button>
          ))}
        </div>

        {/* Estados de carregamento, lista vazia ou tabela com documentos */}
        {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : filtered.length === 0 ? (
          <p className="bg-muted/40 p-6 text-sm text-muted-foreground">Nenhum documento publicado ainda.</p>
        ) : (
          <div className="overflow-hidden border border-border bg-card">
            <ul className="divide-y divide-border">
              {filtered.map((d) => (
                <li key={d.id} className="grid gap-4 px-6 py-5 transition hover:bg-muted/30 md:grid-cols-[1fr_140px_140px] md:items-center">
                  <div>
                    {/* Título do documento */}
                    <p className="font-semibold">{d.titulo}</p>
                    {/* Descrição opcional do documento */}
                    {d.descricao && <p className="text-xs text-muted-foreground">{d.descricao}</p>}
                  </div>
                  {/* Categoria do documento (ou traço se ausente) */}
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{d.categoria ?? "—"}</span>
                  {/* Botão de download que chama a função baixar com o caminho do arquivo */}
                  <button onClick={() => baixar(d.arquivo_url)} className="inline-flex items-center justify-center bg-secondary px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-foreground transition hover:bg-primary md:justify-self-end">
                    Baixar ↓
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
