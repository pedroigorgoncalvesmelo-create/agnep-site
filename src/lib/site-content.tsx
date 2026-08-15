/*
  Arquivo: site-content.tsx
  Propósito: Fornece gerenciamento centralizado de conteúdo editável do site (textos, imagens, vídeos)
  - Carrega dados da tabela `site_content` do Supabase
  - Detecta se o usuário é administrador para permitir edição in-place
  - Expõe hooks e componentes (EText, EImage, EVideo, AdminEditBar) para uso nas páginas
  Observação: Comentários em português para facilitar a manutenção por novos desenvolvedores.
*/

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { Pencil, X } from "lucide-react";
import { uploadFile, getSignedUrl, getSignedUrls } from "@/lib/storage";

type Row = { key: string; kind: string; value: string | null };
type Ctx = {
  ready: boolean;
  isAdmin: boolean;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  get: (key: string) => string | null;
  save: (key: string, kind: string, value: string) => Promise<{ error: string | null }>;
};

/* Contexto que expõe funções/estados para obter e salvar conteúdo do site. */
const SiteContentContext = createContext<Ctx | null>(null);

/*
  Provider principal que carrega conteúdo do Supabase e controla permissões de edição.
  - Carrega todas as chaves de `site_content` ao montar
  - Verifica o papel de admin do usuário atual via RPC `has_role`
  - Expõe get/save e o toggle de editMode para componentes filhos
*/
export function SiteContentProvider({ children }: { children: ReactNode }) {
  // Mapa em memória de key -> value para acesso rápido
  const [map, setMap] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    /* Carregamento inicial:
       - Faz em paralelo a query de conteúdo e a requisição do usuário
       - Constrói o mapa de chaves para uso pela aplicação
       - Verifica se o usuário tem papel de admin (RPC has_role)
       - Usa `cancel` para evitar updates após unmount
    */
    let cancel = false;
    (async () => {
      const [{ data: rows }, { data: userData }] = await Promise.all([
        supabase.from("site_content").select("key,kind,value"),
        supabase.auth.getUser(),
      ]);
      if (cancel) return;
      const next: Record<string, string> = {};
      (rows as Row[] | null)?.forEach((r) => {
        if (r.value != null) next[r.key] = r.value;
      });
      setMap(next);
      if (userData.user) {
        const { data: admin } = await supabase.rpc("has_role", {
          _user_id: userData.user.id,
          _role: "admin",
        });
        if (!cancel) setIsAdmin(Boolean(admin));
      }
      setReady(true);
    })();

    /* Inscreve-se em mudanças de autenticação para atualizar isAdmin ao logar/deslogar */
    const sub = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setIsAdmin(false);
        return;
      }
      if (session?.user) {
        const userId = session.user.id;
        setTimeout(() => {
          supabase
            .rpc("has_role", {
              _user_id: userId,
              _role: "admin",
            })
            .then(({ data: admin }) => {
              if (!cancel) setIsAdmin(Boolean(admin));
            });
        }, 0);
      }
    });

    return () => {
      cancel = true;
      sub.data.subscription.unsubscribe();
    };
  }, []);

  // Retorna um valor do mapa ou null se não existir
  const get = useCallback((key: string) => map[key] ?? null, [map]);

  /* Salva/atualiza um valor em site_content e atualiza o cache local (map)
     - Usa upsert para criar ou atualizar pela chave
     - Retorna objeto com possível erro para tratamento na UI
  */
  const save = useCallback<Ctx["save"]>(async (key, kind, value) => {
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, kind, value }, { onConflict: "key" });
    if (error) return { error: error.message };
    setMap((m) => ({ ...m, [key]: value }));
    return { error: null };
  }, []);

  const ctx = useMemo(
    () => ({ ready, isAdmin, editMode, setEditMode, get, save }),
    [ready, isAdmin, editMode, get, save],
  );
  return <SiteContentContext.Provider value={ctx}>{children}</SiteContentContext.Provider>;
}

/* Hook para obter o contexto; lança erro se o Provider estiver ausente */
function useSiteContent() {
  const c = useContext(SiteContentContext);
  if (!c) throw new Error("SiteContentProvider ausente");
  return c;
}

/* Hook simples para verificar se o usuário é admin */
export function useIsAdmin() {
  return useSiteContent().isAdmin;
}

/* ---------------- EText ---------------- */

/* Tipos suportados para renderizar o texto */
type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "a";

/*
  Componente editável de texto:
  - Usa a chave `id` para buscar valor salvo; usa defaultValue/children como fallback
  - Se o usuário for admin e o editMode estiver ativo, permite edição in-place
  - Edição: botão/duplo-clique abre input/textarea; salvar executa save no contexto
*/
export function EText({
  id,
  defaultValue,
  as = "span",
  className = "",
  multiline = false,
  style,
  children,
}: {
  id: string;
  defaultValue?: string;
  as?: Tag;
  className?: string;
  multiline?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const { get, isAdmin, editMode, save } = useSiteContent();
  const stored = get(id);
  const fallback = defaultValue ?? (typeof children === "string" ? children : "");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  const value = stored ?? fallback;

  // Abre o editor e inicializa o rascunho com o valor atual
  function open() {
    setDraft(value);
    setEditing(true);
  }

  // Submete a alteração para o backend e trata erro simples com alerta
  async function submit() {
    setBusy(true);
    const { error } = await save(id, "text", draft);
    setBusy(false);
    if (error) alert(error);
    else setEditing(false);
  }

  // Se em modo edição, renderiza input/textarea e botões Salvar/Cancelar
  if (editing) {
    return (
      <span className="relative z-40 inline-block w-full align-baseline">
        {multiline ? (
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            className="w-full border-2 border-primary bg-background p-2 font-sans text-base text-foreground"
          />
        ) : (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full border-2 border-primary bg-background p-2 font-sans text-base text-foreground"
          />
        )}
        <span className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className="bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground"
          >
            {busy ? "..." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
          >
            Cancelar
          </button>
        </span>
      </span>
    );
  }

  // Render normal: se admin + editMode mostra contorno e botão de edição
  const Tag = as as keyof React.JSX.IntrinsicElements;
  const adminCls = isAdmin && editMode
    ? "outline outline-1 outline-dashed outline-primary/40 hover:outline-primary cursor-text relative"
    : "";

  return (
    <Tag
      className={`${className} ${adminCls}`}
      style={style}
      onDoubleClick={isAdmin && editMode ? (e) => { e.preventDefault(); e.stopPropagation(); open(); } : undefined}
      title={isAdmin && editMode ? "Duplo-clique para editar" : undefined}
    >
      {value}
      {isAdmin && editMode && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); open(); }}
          className="ml-2 inline-flex h-5 w-5 items-center justify-center bg-primary text-[10px] leading-none text-primary-foreground opacity-70 hover:opacity-100 print:hidden"
          aria-label="Editar"
        >
          ✎
        </button>
      )}
    </Tag>
  );
}

/* ---------------- Media picker ---------------- */

/*
  Componente modal para escolher mídia existente ou fornecer URL/ID manualmente.
  - kind: "image" busca na tabela `biblioteca` (uso interno); "video" busca na tabela `videos`
  - Ao selecionar chama onSelect(value) com URL ou youtube_id
  - onClose fecha o modal
*/
type MediaPickerProps = {
  kind: "image" | "video";
  onSelect: (value: string) => void;
  onClose: () => void;
};

function MediaPicker({ kind, onSelect, onClose }: MediaPickerProps) {
  /*
    Items exibidos na galeria do seletor:
    - Para imagens: registros da tabela `biblioteca` (o `value` pode ser path do storage
      ou URL direta; quando for path do bucket "galeria", geramos URL assinada
      para o preview funcionar)
    - Para vídeos: registros da tabela `videos` com thumbnail do YouTube
  */
  const [items, setItems] = useState<{ id: string; label: string; value: string; preview: string; isPath?: boolean }[]>(
    [],
  );
  const [custom, setCustom] = useState("");
  const [uploading, setUploading] = useState(false);
  // Referência ao input de arquivo oculto (seletor de pastas do computador)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Busca itens dependendo do tipo (fotos => imagem_url, videos => youtube_id)
    (async () => {
      if (kind === "image") {
        // Busca na BIBLIOTECA interna (fotos de decoração do site, fora da galeria pública)
        const { data } = await supabase
          .from("biblioteca")
          .select("id, imagem_url, legenda")
          .order("created_at", { ascending: false })
          .limit(200);
        // Gera URLs assinadas para os paths do bucket "galeria" (preview)
        const paths = (data ?? []).map((f) => f.imagem_url).filter((p) => !/^https?:\/\//.test(p));
        const urls = paths.length > 0 ? await getSignedUrls("galeria", paths) : {};
        setItems(
          (data ?? []).map((f) => ({
            id: f.id,
            label: f.legenda ?? "Foto",
            value: f.imagem_url,
            // Se for URL externa, usa direto; se for path do storage, usa a URL assinada
            preview: /^https?:\/\//.test(f.imagem_url) ? f.imagem_url : (urls[f.imagem_url] ?? f.imagem_url),
          })),
        );
      } else {
        const { data } = await supabase
          .from("videos")
          .select("id, titulo, youtube_id")
          .order("data_publicacao", { ascending: false })
          .limit(200);
        setItems(
          (data ?? []).map((v) => ({
            id: v.id,
            label: v.titulo,
            value: v.youtube_id,
            preview: `https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`,
          })),
        );
      }
    })();
  }, [kind]);

  /* A UI abaixo:
     - lista itens encontrados (botões) que ao clicar retornam o value
     - permite inserir URL de imagem ou ID/URL de YouTube manualmente
  */
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-4xl overflow-hidden bg-background ring-1 ring-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="heading-display text-xl">
            {kind === "image" ? "Escolher foto da galeria" : "Escolher vídeo da galeria"}
          </h3>
          <button onClick={onClose} className="text-2xl leading-none">
            ×
          </button>
        </div>
        {/*
          Botão "Enviar do computador": abre a janela de arquivos do Windows para
          o administrador navegar nas pastas e escolher uma foto do próprio PC.
          O arquivo é enviado ao bucket "galeria" do Supabase, registrado na
          tabela `biblioteca` (uso interno) e inserido automaticamente na lista acima.
          Essas fotos NÃO aparecem na galeria pública.
        */}
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 pb-4">
          <button
            type="button"
            disabled={uploading || kind !== "image"}
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-50"
          >
            {uploading ? "Enviando..." : "⬆ Enviar do computador"}
          </button>
          <p className="text-[11px] text-muted-foreground">JPG, PNG, WebP ou GIF — até 5MB cada.</p>
          {/* Input de arquivo oculto: abre o seletor de pastas do computador */}
          <input
            ref={(el) => { fileInputRef.current = el; }}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={async (e) => {
              if (!e.target.files || e.target.files.length === 0) return;
              const file = e.target.files[0];
              setUploading(true);
              try {
                /* Envia o arquivo para o bucket "galeria" do Supabase Storage */
                const path = await uploadFile("galeria", file);
                /* Registra na BIBLIOTECA interna (uso no site): não aparece na galeria pública */
                await supabase.from("biblioteca").insert({ imagem_url: path }).select().single();
                /* Gera URL assinada para o preview imediato (com fallback para URL pública) */
                let url = await getSignedUrl("galeria", path);
                if (!url) {
                  // Fallback: URL pública do bucket (o bucket "galeria" é público)
                  const base = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
                  url = `${base}/storage/v1/object/public/galeria/${path}`;
                }
                setItems((prev) => [
                  { id: "local-" + crypto.randomUUID(), label: file.name, value: path, preview: url ?? path },
                  ...prev,
                ]);
              } catch (err: any) {
                alert(err.message ?? "Falha ao enviar a imagem.");
              } finally {
                setUploading(false);
                e.target.value = ""; // Permite enviar o mesmo arquivo novamente
              }
            }}
          />
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-3 lg:grid-cols-4" style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {items.length === 0 && (
            <p className="col-span-full text-sm text-muted-foreground">
              Nenhum item cadastrado ainda. Use o botão "Enviar do computador" acima ou adicione em /admin/galeria.
            </p>
          )}
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => {
                onSelect(it.value);
                onClose();
              }}
              className="group block overflow-hidden bg-card ring-1 ring-border hover:ring-primary"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img src={it.preview} alt={it.label} className="h-full w-full object-cover" />
              </div>
              <p className="truncate p-2 text-left text-xs">{it.label}</p>
            </button>
          ))}
        </div>
        <div className="border-t border-border p-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Ou usar {kind === "image" ? "URL de imagem" : "ID/URL do YouTube"} manualmente
          </p>
          <div className="flex gap-2">
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder={kind === "image" ? "https://..." : "youtube_id ou URL"}
              className="flex-1 border border-border bg-background px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => {
                let v = custom.trim();
                if (kind === "video") {
                  const m = v.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
                  if (m) v = m[1];
                }
                if (v) {
                  onSelect(v);
                  onClose();
                }
              }}
              className="bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-primary-foreground"
            >
              Usar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- EImage ---------------- */

/*
  Componente que renderiza uma imagem com suporte a edição por admin:
  - Busca a src salvo via id; usa defaultSrc caso não haja valor
  - Se admin + editMode exibe botão que abre MediaPicker para trocar a imagem
*/
export function EImage({
  id,
  defaultSrc,
  alt = "",
  className = "",
  width,
  height,
  loading,
}: {
  id: string;
  defaultSrc: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}) {
  const { get, isAdmin, editMode, save } = useSiteContent();
  const [picking, setPicking] = useState(false);
  const savedValue = get(id) ?? defaultSrc;
  /*
    Resolve o `src` final da imagem:
    - Se o valor salvo for um path do bucket "galeria" (não começa com http),
      gera uma URL assinada para que a imagem possa ser exibida.
    - Caso contrário, usa o valor diretamente (URL externa já completa).
  */
  const [src, setSrc] = useState(savedValue);
  useEffect(() => {
    let cancel = false;
    (async () => {
      if (/^https?:\/\//.test(savedValue)) {
        if (!cancel) setSrc(savedValue);
        return;
      }
      let url = await getSignedUrl("galeria", savedValue);
      if (!url) {
        // Fallback: URL pública do bucket (o bucket "galeria" é público)
        const base = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
        url = `${base}/storage/v1/object/public/galeria/${savedValue}`;
      }
      if (!cancel) setSrc(url ?? savedValue);
    })();
    return () => { cancel = true; };
  }, [savedValue]);

  // Ao selecionar nova imagem, salva no backend
  async function onSelect(value: string) {
    const { error } = await save(id, "image", value);
    if (error) alert(error);
  }

  return (
    <span className={`relative block ${isAdmin && editMode ? "outline outline-1 outline-dashed outline-primary/40 hover:outline-primary" : ""}`}>
      <img src={src} alt={alt} width={width} height={height} loading={loading} className={className} />
      {isAdmin && editMode && (
        <button
          type="button"
          onClick={() => setPicking(true)}
          className="absolute right-2 top-2 z-10 bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg"
        >
          ✎ Trocar imagem
        </button>
      )}
      {picking && <MediaPicker kind="image" onSelect={onSelect} onClose={() => setPicking(false)} />}
    </span>
  );
}

/* ---------------- EVideo (YouTube embed) ---------------- */

/*
  Componente para incorporar vídeos do YouTube:
  - Usa youtube_id salvo no site_content ou defaultYoutubeId
  - Admins podem trocar o vídeo via MediaPicker (aceita ID ou URL)
*/
export function EVideo({
  id,
  defaultYoutubeId,
  className = "",
  title = "Vídeo",
}: {
  id: string;
  defaultYoutubeId: string;
  className?: string;
  title?: string;
}) {
  const { get, isAdmin, editMode, save } = useSiteContent();
  const [picking, setPicking] = useState(false);
  const yid = get(id) ?? defaultYoutubeId;

  async function onSelect(value: string) {
    const { error } = await save(id, "video", value);
    if (error) alert(error);
  }

  return (
    <div className={`relative ${isAdmin && editMode ? "outline outline-1 outline-dashed outline-primary/40" : ""}`}>
      <div className={`aspect-video w-full ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${yid}`}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {isAdmin && editMode && (
        <button
          type="button"
          onClick={() => setPicking(true)}
          className="absolute right-2 top-2 z-10 bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg"
        >
          ✎ Trocar vídeo
        </button>
      )}
      {picking && <MediaPicker kind="video" onSelect={onSelect} onClose={() => setPicking(false)} />}
    </div>
  );
}

/* ---------------- Admin edit toggle ---------------- */

/*
  Barra flutuante que permite alternar o modo de edição para admins:
  - Mostra estado de edição e fornece link para painel completo
  - Usa um botão com ícone (lápis/X) para ativar/desativar editMode
*/
export function AdminEditBar() {
  const { isAdmin, editMode, setEditMode } = useSiteContent();
  const [open, setOpen] = useState(false);
  if (!isAdmin) return null;

  return (
    <div className="fixed right-3 top-[5.5rem] z-[60] flex flex-col items-end gap-2 sm:right-4 sm:top-4">
      <div className="flex items-center gap-2">
        {editMode && (
          <span className="hidden animate-reveal-up rounded-sm bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg md:inline-block">
            Edição ativa
          </span>
        )}
        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          aria-label={editMode ? "Desativar edição" : "Ativar edição"}
          className={`group inline-flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
            editMode
              ? "bg-primary text-primary-foreground"
              : "bg-background/90 text-foreground ring-1 ring-border backdrop-blur-md hover:bg-card hover:text-primary"
          }`}
        >
          {editMode ? <X size={18} strokeWidth={2.5} /> : <Pencil size={18} strokeWidth={2} />}
        </button>
      </div>

      {open && !editMode && (
        <div className="animate-reveal-up rounded-sm bg-card px-4 py-3 text-xs text-card-foreground shadow-xl ring-1 ring-border">
          <p className="font-semibold">Clique para editar o site</p>
          <p className="mt-1 text-[10px] text-muted-foreground">
            Ative para editar textos e imagens diretamente nas páginas.
          </p>
        </div>
      )}

      {editMode && (
        <div className="animate-reveal-up rounded-sm bg-card px-4 py-3 text-xs text-card-foreground shadow-xl ring-1 ring-border">
          <p className="font-semibold text-primary">Modo edição ativado</p>
          <p className="mt-1 text-[10px] text-muted-foreground">
            Clique no lápis ao lado dos textos ou use o botão ✎ nas imagens/vídeos.
          </p>
          <a
            href="/admin"
            className="mt-2 inline-block text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
          >
            Painel completo →
          </a>
        </div>
      )}
    </div>
  );
}
