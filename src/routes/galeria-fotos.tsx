/*
  Arquivo: galeria-fotos.tsx
  Propósito: Rota da página "Galeria de Fotos" do site AGNEP.
  Descrição:
    - Busca álbuns e fotos no Supabase ao carregar a página.
    - Gera URLs assinadas para imagens armazenadas (privadas) e exibe uma grade responsiva de fotos.
    - Permite filtrar fotos por álbum e mostra legendas quando disponíveis.
  Observações:
    - Comentários explicativos foram adicionados para ajudar desenvolvedores iniciantes.
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { supabase } from "@/integrations/supabase/client";
import { getSignedUrls } from "@/lib/storage";

// Define a rota de arquivo para "/galeria-fotos" com metadados (head) e componente
export const Route = createFileRoute("/galeria-fotos")({
  head: () => ({
    meta: [
      { title: "Galeria de Fotos — AGNEP" },
      { name: "description", content: "Registros das aulas, treinos, eventos e premiações da AGNEP em Goiás." },
      { property: "og:title", content: "Galeria de Fotos AGNEP" },
      { property: "og:description", content: "Fotos das atividades, competições e momentos marcantes da AGNEP." },
    ],
  }),
  component: Galeria,
});

// Tipos simples para auxiliar o uso do estado e o entendimento dos dados retornados
type Album = { id: string; titulo: string; descricao: string | null; data_evento: string | null };
type Foto = { id: string; album_id: string | null; imagem_url: string; legenda: string | null };

// Componente principal da página de galeria
function Galeria() {
  // Estados locais:
  // albuns: lista de álbuns disponíveis
  // fotos: lista de fotos carregadas
  // urls: mapa de caminho/storage -> URL assinada (para uso em src de <img>)
  // albumSel: id do álbum selecionado (ou "Todos")
  // loading: indica se os dados ainda estão sendo carregados
  const [albuns, setAlbuns] = useState<Album[]>([]);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [admin, setAdmin] = useState(false);
  const [albumSel, setAlbumSel] = useState<string>("Todos");
  const [loading, setLoading] = useState(true);

  /* Efeito ao montar o componente:
     - Busca álbuns e fotos do Supabase em paralelo.
     - Ordena os resultados conforme a necessidade.
     - Gera URLs assinadas para as imagens usando getSignedUrls.
     - Atualiza estados correspondentes e desliga o loading.
     Por que: precisamos das URLs assinadas para exibir imagens que podem estar em storage privado.
  */
  useEffect(() => {
    (async () => {
      // Verifica se o visitante é admin logado (para mostrar ações de edição)
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.user) {
        const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", session.session.user.id).eq("role", "admin").single();
        setAdmin(!!role);
      }
      const [{ data: a }, { data: f }] = await Promise.all([
        supabase.from("albuns").select("*").order("created_at", { ascending: false }),
        supabase.from("fotos").select("*").order("ordem"),
      ]);
      setAlbuns(a ?? []);
      setFotos(f ?? []);
      // Gera URLs assinadas para os paths do storage; URLs externas passam direto
      const paths = (f ?? []).map((x) => x.imagem_url).filter((p) => !/^https?:\/\//.test(p));
      const urlsMap = paths.length > 0 ? await getSignedUrls("galeria", paths) : {};
      const base = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
      const finalUrls: Record<string, string> = {};
      (f ?? []).forEach((x) => {
        finalUrls[x.imagem_url] = /^https?:\/\//.test(x.imagem_url)
          ? x.imagem_url
          : (urlsMap[x.imagem_url] ?? `${base}/storage/v1/object/public/galeria/${x.imagem_url}`);
      });
      setUrls(finalUrls);
      setLoading(false);
    })();
  }, []);

  /* Remove uma foto da galeria (apaga o arquivo do storage e o registro da tabela).
     Só disponível para admins logados, aparece no canto da foto. */
  async function removerFoto(p: Foto) {
    if (!confirm(`Remover a foto "${p.legenda ?? "sem legenda"}" da galeria?`)) return;
    try {
      if (!/^https?:\/\//.test(p.imagem_url)) {
        await supabase.storage.from("galeria").remove([p.imagem_url]);
      }
      await supabase.from("fotos").delete().eq("id", p.id);
      setFotos((prev) => prev.filter((x) => x.id !== p.id));
    } catch {
      alert("Não foi possível remover a foto.");
    }
  }

  /* Edita a legenda de uma foto (prompt simples; só para admins). */
  async function editarLegenda(p: Foto) {
    const nova = prompt("Nova legenda:", p.legenda ?? "");
    if (nova === null) return;
    const { error } = await supabase.from("fotos").update({ legenda: nova || null }).eq("id", p.id);
    if (error) alert(error.message);
    else setFotos((prev) => prev.map((x) => (x.id === p.id ? { ...x, legenda: nova || null } : x)));
  }

  // Filtra as fotos com base no álbum selecionado. Mantém "Todos" como opção padrão.
  // IMPORTANTE: só aparecem fotos vinculadas a um álbum (evento/torneio); fotos "órfãs"
  // da biblioteca interna não aparecem na galeria pública.
  const filtered = fotos.filter((p) => p.album_id && (albumSel === "Todos" || p.album_id === albumSel));

  // Ordena os álbuns: data do evento mais recente primeiro (null = sem data no final)
  const albunsOrdenados = [...albuns].sort((a, b) =>
    (b.data_evento ?? "").localeCompare(a.data_evento ?? ""),
  );

  return (
    <>
      {/* Cabeçalho da página com título e descrição */}
      <PageHeader
        editableId="galeria-fotos"
        eyebrow="Galeria"
        titleTop="Os momentos"
        titleBottom="da AGNEP"
        description="Aulas, treinos, viagens e conquistas — o registro visual da nossa comunidade esportiva."
      />


      <section className="container-page py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {/* Botão para selecionar "Todos" os álbuns */}
            <button onClick={() => setAlbumSel("Todos")}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition ${albumSel === "Todos" ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-border hover:ring-primary"}`}>
              Todos
            </button>
            {/* Renderiza um botão para cada álbum disponível */}
            {albunsOrdenados.map((a) => (
              <button key={a.id} onClick={() => setAlbumSel(a.id)}
                className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition ${albumSel === a.id ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-border hover:ring-primary"}`}>
                {a.titulo}
              </button>
            ))}
          </div>
          {/* Link para a página de vídeos relacionada */}
          <a href="/galeria-videos" className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Ver vídeos →</a>
        </div>

        {/* Lógica de exibição:
            - Mostra "Carregando..." enquanto loading for true.
            - Se não houver fotos após o carregamento, mostra uma mensagem.
            - Caso contrário, renderiza as fotos filtradas em colunas responsivas.
        */}
        {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : filtered.length === 0 ? (
          <p className="bg-muted/40 p-6 text-sm text-muted-foreground">Nenhuma foto disponível ainda.</p>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {albumSel === "Todos"
              ? albunsOrdenados.map((a) => (
                  <div key={a.id} className="mb-10 break-inside-avoid">
                    <h3 className="heading-display mb-1 text-lg">{a.titulo}</h3>
                    <p className="mb-4 text-xs text-muted-foreground">
                      {a.data_evento ? new Date(a.data_evento).toLocaleDateString("pt-BR") : "Sem data"}
                      {a.descricao ? ` — ${a.descricao}` : ""}
                    </p>
                    <div className="space-y-4">
                      {filtered.filter((p) => p.album_id === a.id).map((p) => (
                        urls[p.imagem_url] ? (
                          <figure key={p.id} className="group relative overflow-hidden break-inside-avoid bg-muted">
                            <img src={urls[p.imagem_url]} alt={p.legenda ?? ""} loading="lazy" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 text-xs font-medium text-white">
                              {p.legenda || <span className="italic opacity-60">Sem legenda</span>}
                            </figcaption>
                          </figure>
                        ) : null
                      ))}
                    </div>
                  </div>
                ))
              : filtered.map((p) => (
              /* Cada figura exibe a imagem (usando a URL assinada/pública) e a legenda.
                 A propriedade loading="lazy" ajuda no desempenho carregando imagens sob demanda.
                 Transições e classes são apenas para aparência/UX.
                 Admins veem botões para editar a legenda e remover a foto.
              */
              <figure key={p.id} className="group relative overflow-hidden break-inside-avoid bg-muted">
                <img src={urls[p.imagem_url]} alt={p.legenda ?? ""} loading="lazy" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {/* Painel de ações do admin no canto superior */}
                {admin && (
                  <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => editarLegenda(p)}
                      className="bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground"
                      title="Editar legenda"
                    >
                      ✎ Legenda
                    </button>
                    <button
                      type="button"
                      onClick={() => removerFoto(p)}
                      className="bg-destructive px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-destructive-foreground"
                      title="Remover foto"
                    >
                      ✕ Remover
                    </button>
                  </div>
                )}
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 text-xs font-medium text-white">
                  {p.legenda || <span className="italic opacity-60">Sem legenda (passe o mouse e use ✎ Legenda)</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
