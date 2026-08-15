/*
  Arquivo: admin.galeria.tsx

  Propósito:
  - Página administrativa para gerenciar a GALERIA PÚBLICA por EVENTOS (torneios passados/futuros).
  - Cada evento (album) tem fotos escolhidas manualmente — as fotos do "Trocar Imagem" ficam na
    BIBLIOTECA interna (tabela `biblioteca`) e NÃO aparecem aqui nem na galeria pública.
  - Aqui o admin cria eventos, adiciona fotos da biblioteca (ou sobe novas só para o evento),
    edita legenda e remove fotos do evento.

  Observações:
  - Comentários explicativos ajudam desenvolvedores iniciantes a entender o fluxo de dados e as interações com Supabase/storage.
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile, getSignedUrl, removeFile } from "@/lib/storage";
import { enviarAvisoConteudoNovoFn } from "@/lib/enviar-aviso.functions";
import { AdminHeader, Field, inputCls } from "@/components/admin-ui";
import type { Database } from "@/integrations/supabase/types";

// Registra a rota de arquivo e associa o componente AdminGaleria a esta rota.
// Isso integra o componente com o roteador da aplicação.
export const Route = createFileRoute("/_authenticated/admin/galeria")({
  component: AdminGaleria,
});

// Tipagens derivadas do schema do Supabase para facilitar autocompletar e segurança de tipos.
type Album = Database["public"]["Tables"]["albuns"]["Row"];
type Foto = Database["public"]["Tables"]["fotos"]["Row"];

/* Tipo para itens da biblioteca interna (fotos de decoração do site) */
type BiblioItem = { id: string; imagem_url: string; legenda: string | null };

function AdminGaleria() {
  // Estados locais para gerenciar eventos (álbuns), fotos do evento e formulários.
  const [albuns, setAlbuns] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [fotoUrls, setFotoUrls] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  // Biblioteca interna: itens disponíveis para anexar a um evento
  const [biblio, setBiblio] = useState<BiblioItem[]>([]);
  const [libUrls, setLibUrls] = useState<Record<string, string>>({});

  // Carrega a lista de álbuns do banco, ordenados pela data de criação (mais recentes primeiro).
  // WHY: usado para listar álbuns na interface e permitir gerenciamento.
  async function loadAlbuns() {
    setLoading(true);
    const { data } = await supabase.from("albuns").select("*").order("created_at", { ascending: false });
    setAlbuns(data ?? []);
    setLoading(false);
  }

  /* 
    Carrega fotos de um álbum específico e busca URLs assinadas para cada imagem.
    WHAT: atualiza `fotos` com os registros e `fotoUrls` com URLs temporárias para exibição.
    WHY: imagens estão armazenadas em storage privado, então precisamos de signed URLs para mostrar no cliente.
  */
  async function loadFotos(albumId: string) {
    const { data } = await supabase.from("fotos").select("*").eq("album_id", albumId).order("ordem");
    setFotos(data ?? []);
    const map: Record<string, string> = {};
    for (const f of data ?? []) {
      const u = await getSignedUrl("galeria", f.imagem_url);
      if (u) map[f.imagem_url] = u;
    }
    setFotoUrls(map);
  }

  // Efeito para carregar os álbuns e a biblioteca quando o componente monta.
  useEffect(() => { loadAlbuns(); loadBiblio(); }, []);

  // Efeito para carregar fotos quando um álbum é selecionado; limpa quando deselecionado.
  useEffect(() => { if (selected) loadFotos(selected); else { setFotos([]); setFotoUrls({}); } }, [selected]);

  /*
    Cria um novo álbum no banco.
    WHAT: insere título, descrição e data (opcionais) e seleciona o álbum criado.
    WHY: permite criar rapidamente um álbum e já abrir sua interface de gestão.
  */
  async function criarAlbum(ev: React.FormEvent) {
    ev.preventDefault();
    const { data, error } = await supabase.from("albuns").insert({
      titulo,
      descricao: descricao || null,
      data_evento: dataEvento || null,
    }).select().single();
    if (error) return alert(error.message);
    setTitulo(""); setDescricao(""); setDataEvento("");
    loadAlbuns();
    if (data) setSelected(data.id);
    // Avisa automaticamente os inscritos que o site foi atualizado
    enviarAvisoConteudoNovoFn({ data: { area: "galeria" } }).catch(() => {});
  }

  /*
    Remove um álbum e todas as fotos associadas do storage e do banco.
    WHAT: confirma ação, remove arquivos do storage e elimina entradas do DB.
    WHY: garantir que não fiquem arquivos órfãos no storage ao apagar um álbum.
  */
  async function removerAlbum(id: string) {
    if (!confirm("Apagar álbum e todas as fotos?")) return;
    const { data: fs } = await supabase.from("fotos").select("imagem_url").eq("album_id", id);
    for (const f of fs ?? []) await removeFile("galeria", f.imagem_url);
    await supabase.from("albuns").delete().eq("id", id);
    if (selected === id) setSelected(null);
    loadAlbuns();
  }

  /*
    Faz upload de múltiplos arquivos para o storage e insere registros no banco.
    WHAT: itera sobre os arquivos, faz upload e registra o caminho retornado.
    WHY: separar upload (storage) do registro (DB) mantém consistência entre ambos.
  */
  async function uploadFotos(files: FileList) {
    if (!selected) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      try {
        const path = await uploadFile("galeria", file);
        await supabase.from("fotos").insert({ album_id: selected, imagem_url: path });
      } catch (e: any) { alert(e.message); }
    }
    setUploading(false);
    loadFotos(selected);
    loadBiblio();
    // Avisa automaticamente os inscritos que o site foi atualizado
    enviarAvisoConteudoNovoFn({ data: { area: "galeria" } }).catch(() => {});
  }

  /* Remove um arquivo do storage e o registro correspondente no banco (só do evento). */
  async function removerFoto(f: Foto) {
    if (!confirm("Remover esta foto do evento? O arquivo da biblioteca interna é mantido.")) return;
    await removeFile("galeria", f.imagem_url);
    await supabase.from("fotos").delete().eq("id", f.id);
    if (selected) loadFotos(selected);
  }

  /* Anexa uma foto da BIBLIOTECA interna ao evento selecionado (mesmo path no storage). */
  async function anexarDaBiblioteca(b: BiblioItem) {
    if (!selected) return;
    try {
      await supabase.from("fotos").insert({ album_id: selected, imagem_url: b.imagem_url, legenda: b.legenda });
      loadFotos(selected);
      // Avisa automaticamente os inscritos que o site foi atualizado
      enviarAvisoConteudoNovoFn({ data: { area: "galeria" } }).catch(() => {});
    } catch (e: any) { alert(e.message ?? "Falha ao anexar."); }
  }

  /* Edita a legenda de uma foto do evento. */
  async function editarLegenda(f: Foto) {
    const nova = prompt("Nova legenda:", f.legenda ?? "");
    if (nova === null) return;
    const { error } = await supabase.from("fotos").update({ legenda: nova || null }).eq("id", f.id);
    if (error) alert(error.message);
    else if (selected) loadFotos(selected);
  }

  /* Carrega a biblioteca interna (fotos do "Trocar Imagem", fora da galeria pública). */
  async function loadBiblio() {
    const { data } = await supabase.from("biblioteca").select("id, imagem_url, legenda").order("created_at", { ascending: false }).limit(200);
    setBiblio(data ?? []);
    const map: Record<string, string> = {};
    for (const b of data ?? []) {
      const u = await getSignedUrl("galeria", b.imagem_url);
      if (u) map[b.imagem_url] = u;
    }
    setLibUrls(map);
  }

  return (
    <div>
      {/* Cabeçalho da seção administrativa */}
      <AdminHeader eyebrow="Mídia" title="Galeria por Eventos" />

      {/* Aviso: as fotos da biblioteca interna (usadas no "Trocar Imagem") não aparecem na galeria pública.
          Para o site/visitantes, crie um evento abaixo e adicione fotos a ele. */}

      {/* Formulário para criar novo álbum */}
      <form onSubmit={criarAlbum} className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-3">
        <h2 className="heading-display col-span-full text-xl">Novo evento / torneio</h2>
        <p className="col-span-full text-xs text-muted-foreground">Os eventos criados aqui aparecem para os visitantes em "Galeria", organizados por torneios passados e futuros.</p>
        <Field label="Título *" className="md:col-span-2">
          <input required value={titulo} onChange={(e) => setTitulo(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Data do evento">
          <input type="date" value={dataEvento} onChange={(e) => setDataEvento(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Descrição" className="md:col-span-3">
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={2} className={inputCls} />
        </Field>
        <button type="submit" className="col-span-full justify-self-start bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground">Criar evento</button>
      </form>

      {/* Lista de álbuns e interface para gerenciar cada álbum */}
      <div className="mt-12">
        <h2 className="heading-display mb-4 text-2xl">Eventos / Torneios ({albuns.length})</h2>
        {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : (
                  <ul className="divide-y divide-border border border-border bg-card">
                    {albuns.map((a) => (
              <li key={a.id}>
                <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-semibold">{a.titulo}</p>
                    <p className="text-xs text-muted-foreground">{a.data_evento ?? "sem data"}{a.descricao ? ` · ${a.descricao}` : ""}</p>
                  </div>
                  <div className="flex gap-2">
                    {/* Botão para abrir/fechar a gestão de fotos deste evento */}
                    <button onClick={() => setSelected(selected === a.id ? null : a.id)} className="border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-accent">
                      {selected === a.id ? "Fechar" : "Gerenciar fotos"}
                    </button>
                    {selected === a.id && (
                      <button onClick={() => setSelected(null)} className="border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-accent">Cancelar</button>
                    )}
                    {/* Botão para apagar o álbum */}
                    <button onClick={() => removerAlbum(a.id)} className="border border-destructive px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive hover:text-destructive-foreground">Apagar</button>
                  </div>
                </div>
                {selected === a.id && (
                  <div className="border-t border-border bg-muted/30 p-4">
                    <label className="block">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Adicionar fotos</span>
                      {/* Input para seleção de múltiplas imagens; ao mudar chama uploadFotos */}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={uploading}
                        onChange={(e) => e.target.files && uploadFotos(e.target.files)}
                        className={inputCls}
                      />
                    </label>
                    {/* Indicador visual enquanto arquivos estão sendo enviados */}
                    {uploading && <p className="mt-2 text-xs text-muted-foreground">Enviando...</p>}
                    {/* Grid de miniaturas das fotos do evento */}
                    <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                      {fotos.map((f) => (
                        <div key={f.id} className="group relative aspect-square overflow-hidden bg-muted">
                          {/* Exibe imagem se tiver URL assinada disponível */}
                          {fotoUrls[f.imagem_url] && <img src={fotoUrls[f.imagem_url]} alt="" className="h-full w-full object-cover" />}
                          {/* Ações do admin: legenda e remoção */}
                          <div className="absolute inset-x-0 top-0 flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <button onClick={() => editarLegenda(f)} className="bg-primary px-2 py-1 text-[8px] font-bold uppercase text-primary-foreground" title="Editar legenda">✎</button>
                            <button onClick={() => removerFoto(f)} className="bg-destructive px-2 py-1 text-[9px] font-bold uppercase text-destructive-foreground" title="Remover do evento">X</button>
                          </div>
                          {f.legenda && <span className="absolute inset-x-0 bottom-0 truncate bg-black/70 px-1 text-[9px] text-white" title={f.legenda}>{f.legenda}</span>}
                        </div>
                      ))}
                    </div>

                    {/* Biblioteca interna: escolher fotos já enviadas (do "Trocar Imagem") para este evento */}
                    <div className="mt-6 flex items-center justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Adicionar da biblioteca interna (fotos usadas no site)</p>
                    </div>
                    {biblio.length === 0 ? (
                      <p className="mt-2 text-xs text-muted-foreground">Nenhuma foto na biblioteca ainda. Use "Trocar Imagem" em qualquer página do site para enviar.</p>
                    ) : (
                      <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                        {biblio.map((b) => (
                          <div key={b.id} className="group relative aspect-square overflow-hidden bg-muted ring-1 ring-border">
                            {(libUrls[b.imagem_url] || b.imagem_url) && <img src={libUrls[b.imagem_url] ?? b.imagem_url} alt="" className="h-full w-full object-cover" />}
                            <button onClick={() => anexarDaBiblioteca(b)} className="absolute inset-x-0 bottom-0 bg-primary px-2 py-1 text-[9px] font-bold uppercase text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100" title="Anexar a este evento">+ Adicionar</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
