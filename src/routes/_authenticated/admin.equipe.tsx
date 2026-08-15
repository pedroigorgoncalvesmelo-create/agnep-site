/*
Arquivo: admin.equipe.tsx
Propósito: Página administrativa para gerenciar os membros da equipe (CRUD).
Descrição: Este arquivo fornece a interface para listar, criar, editar e remover membros,
incluindo upload e remoção de fotos armazenadas no storage do Supabase. As URLs das
fotos são obtidas como URLs assinadas para exibição segura no frontend.
*/

/* Importações e integração com rotas, React e Supabase */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile, getSignedUrl, removeFile } from "@/lib/storage";
import { AdminHeader, Field, inputCls } from "@/components/admin-ui";
import type { Database } from "@/integrations/supabase/types";
import { enviarAvisoConteudoNovoFn } from "@/lib/enviar-aviso.functions";

/* Rota do arquivo usando o roteador da aplicação */
export const Route = createFileRoute("/_authenticated/admin/equipe")({
  component: AdminEquipe,
});

/* Tipo de uma linha da tabela "equipe" para tipagem local */
type Row = Database["public"]["Tables"]["equipe"]["Row"];
/* Valor vazio padrão usado para inicializar o formulário */
const EMPTY = { nome: "", cargo: "", bio: "", ordem: 0 };

/* Componente principal da página de administração da equipe */
/* Contém lista, formulário de criação/edição e ações de upload/remoção de foto. */
function AdminEquipe() {
  /* Estados locais:
     - rows: lista de membros carregados do Supabase
     - urls: mapa foto_url -> URL assinada para exibição
     - loading: indicador de carregamento
     - form: dados do formulário (nome, cargo, bio, ordem)
     - file: arquivo selecionado para upload (opcional)
     - editingId: id do registro em edição (null se criando novo)
     - editingFoto: nome do arquivo atual da foto quando editando
     - error: mensagem de erro para exibir ao usuário
  */
  const [rows, setRows] = useState<Row[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...EMPTY });
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingFoto, setEditingFoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* Carrega os membros da equipe e busca URLs assinadas para as fotos.
     Ordena pelo campo 'ordem' e depois por 'nome' para apresentação.
  */
  async function load() {
    setLoading(true);
    const { data } = await supabase.from("equipe").select("*").order("ordem").order("nome");
    setRows(data ?? []);
    const map: Record<string, string> = {};
    // Para cada registro que tenha foto, solicita uma URL assinada para exibição
    for (const r of data ?? []) {
      if (r.foto_url) { const u = await getSignedUrl("equipe", r.foto_url); if (u) map[r.foto_url] = u; }
    }
    setUrls(map);
    setLoading(false);
  }

  /* Executa o carregamento inicial ao montar o componente */
  useEffect(() => { load(); }, []);

  /* Reseta o formulário e estados relacionados à edição/arquivo */
  function reset() {
    setForm({ ...EMPTY }); setEditingId(null); setEditingFoto(null); setFile(null); setError(null);
    const el = document.getElementById("eq-file") as HTMLInputElement | null; if (el) el.value = "";
  }

  /* Preenche o formulário com os dados do membro para permitir edição */
  function edit(r: Row) {
    setEditingId(r.id);
    setEditingFoto(r.foto_url);
    setForm({ nome: r.nome, cargo: r.cargo, bio: r.bio ?? "", ordem: r.ordem });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* Salva o registro (cria novo ou atualiza existente).
     Fluxo:
     - Se um novo arquivo foi selecionado, faz upload e remove a foto antiga se houver.
     - Monta payload convertendo campos conforme esperado pelo banco.
     - Chama Supabase para inserir ou atualizar.
     - Em caso de erro, exibe mensagem.
  */
  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);
    try {
      let foto_url = editingFoto;
      if (file) {
        if (editingFoto) await removeFile("equipe", editingFoto);
        foto_url = await uploadFile("equipe", file);
      }
      const payload = {
        nome: form.nome, cargo: form.cargo,
        bio: form.bio || null, ordem: Number(form.ordem) || 0, foto_url,
      };
      const res = editingId
        ? await supabase.from("equipe").update(payload).eq("id", editingId)
        : await supabase.from("equipe").insert(payload);
      if (res.error) throw res.error;
      reset(); load();
      // Se foi um membro NOVO (não edição), avisa automaticamente os inscritos
      if (!editingId) {
        enviarAvisoConteudoNovoFn({ data: { area: "equipe" } }).catch(() => {});
      }
    } catch (e: any) { setError(e.message); }
  }

  /* Remove um membro e sua foto associada (após confirmação do usuário) */
  async function remove(r: Row) {
    if (!confirm("Apagar membro da equipe?")) return;
    if (r.foto_url) await removeFile("equipe", r.foto_url);
    await supabase.from("equipe").delete().eq("id", r.id);
    load();
  }

  return (
    <div>
      {/* Cabeçalho administrativo com ação condicional para cancelar edição */}
      <AdminHeader
        eyebrow="Sobre"
        title="Equipe"
        action={editingId && (
          <button onClick={reset} className="border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-accent">Cancelar edição</button>
        )}
      />

      {/* Formulário de criação/edição de membro */}
      <form onSubmit={save} className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-2">
        <h2 className="heading-display col-span-full text-xl">{editingId ? "Editar membro" : "Novo membro"}</h2>
        <Field label="Nome *">
          <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Cargo *">
          <input required value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })} className={inputCls} placeholder="Ex.: Coordenador de Jiu-Jitsu" />
        </Field>
        <Field label="Ordem">
          <input type="number" value={form.ordem} onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })} className={inputCls} />
        </Field>
        <Field label={editingFoto ? "Substituir foto (opcional)" : "Foto"}>
          <input id="eq-file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className={inputCls} />
        </Field>
        <Field label="Mini-bio" className="md:col-span-2">
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className={inputCls} />
        </Field>
        {/* Exibe mensagem de erro se houver */}
        {error && <p className="col-span-full border-l-4 border-destructive bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
        <button type="submit" className="col-span-full justify-self-start bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground">
          {editingId ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      {/* Lista de membros carregados */}
      <div className="mt-12">
        <h2 className="heading-display mb-4 text-2xl">Membros ({rows.length})</h2>
        {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : (
          <ul className="divide-y divide-border border border-border bg-card">
            {rows.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden bg-muted">
                    {/* Exibe a imagem se a URL assinada estiver disponível */}
                    {r.foto_url && urls[r.foto_url] ? <img src={urls[r.foto_url]} alt={r.nome} className="h-full w-full object-cover" /> : null}
                  </div>
                  <div>
                    <p className="font-semibold">{r.nome}</p>
                    <p className="text-xs text-muted-foreground">{r.cargo}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => edit(r)} className="border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-accent">Editar</button>
                  <button onClick={() => remove(r)} className="border border-destructive px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive hover:text-destructive-foreground">Apagar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
