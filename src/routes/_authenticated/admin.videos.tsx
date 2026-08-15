/*
  Arquivo: admin.videos.tsx

  Propósito:
  Interface administrativa para gerenciar vídeos do canal do YouTube da AGNEP.
  - Lista vídeos cadastrados no banco (Supabase).
  - Permite criar, editar e apagar vídeos.
  - Faz validação simples do ID/URL do YouTube.

  Observações:
  Comentários adicionados para auxiliar desenvolvedores iniciantes a entenderem
  cada função/parte importante do componente.
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader, Field, inputCls } from "@/components/admin-ui";
import type { Database } from "@/integrations/supabase/types";
import { enviarAvisoConteudoNovoFn } from "@/lib/enviar-aviso.functions";

export const Route = createFileRoute("/_authenticated/admin/videos")({
  component: AdminVideos,
});

/* Tipagens extraídas do schema do Supabase para melhor autocompletar/checagem */
type Row = Database["public"]["Tables"]["videos"]["Row"];
type Modalidade = Database["public"]["Enums"]["modalidade"];

/* Estado inicial do formulário para novo vídeo */
const EMPTY = {
  titulo: "",
  descricao: "",
  youtube_id: "",
  modalidade: "geral" as Modalidade,
  data_publicacao: new Date().toISOString().slice(0, 10),
};

/* 
  Extrai o ID do YouTube a partir de uma URL ou retorna o próprio input.
  Por que: o usuário pode colar a URL completa ou apenas o ID; precisamos do ID (11 chars).
*/
function extractYouTubeId(input: string): string {
  const trimmed = input.trim();
  const m = trimmed.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : trimmed;
}

/* Componente principal que renderiza a UI de gerenciamento de vídeos */
function AdminVideos() {
  // lista de vídeos carregados do banco
  const [rows, setRows] = useState<Row[]>([]);
  // flag de carregamento para mostrar feedback ao usuário
  const [loading, setLoading] = useState(true);
  // estado do formulário (edição/criação)
  const [form, setForm] = useState({ ...EMPTY });
  // id do vídeo sendo editado (null => criando novo)
  const [editingId, setEditingId] = useState<string | null>(null);
  // mensagem de erro para validações/erros do supabase
  const [error, setError] = useState<string | null>(null);

  /*
    Carrega vídeos do Supabase ordenados por data de publicação (mais recentes primeiro).
    Por que: centraliza a lógica de fetch para poder reaproveitar após operações.
  */
  async function load() {
    setLoading(true);
    const { data } = await supabase.from("videos").select("*").order("data_publicacao", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  }

  // Carrega a lista uma vez ao montar o componente
  useEffect(() => { load(); }, []);

  // Reseta o formulário para o estado inicial (novo) e limpa erros/edição
  function reset() { setForm({ ...EMPTY }); setEditingId(null); setError(null); }

  /*
    Inicia edição de um registro populando o formulário.
    Por que: permite ao usuário editar sem navegar para outra tela.
  */
  function edit(r: Row) {
    setEditingId(r.id);
    setForm({
      titulo: r.titulo,
      descricao: r.descricao ?? "",
      youtube_id: r.youtube_id,
      modalidade: r.modalidade,
      data_publicacao: r.data_publicacao,
    });
    // traz o topo da página para foco no formulário de edição
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /*
    Salva (insere ou atualiza) um vídeo no Supabase.
    Passos:
    - evita comportamento padrão do form
    - extrai/valida o ID do YouTube
    - monta payload e chama insert/update
    - trata erro e recarrega a lista ao final
  */
  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);
    const youtube_id = extractYouTubeId(form.youtube_id);
    if (youtube_id.length !== 11) { setError("ID/URL do YouTube inválido."); return; }
    const payload = {
      titulo: form.titulo,
      descricao: form.descricao || null,
      youtube_id,
      modalidade: form.modalidade,
      data_publicacao: form.data_publicacao,
    };
    const res = editingId
      ? await supabase.from("videos").update(payload).eq("id", editingId)
      : await supabase.from("videos").insert(payload);
    if (res.error) { setError(res.error.message); return; }
    reset(); load();
    // Se foi um vídeo NOVO (não edição), avisa automaticamente os inscritos
    if (!editingId) {
      enviarAvisoConteudoNovoFn({ data: { area: "videos" } }).catch(() => {});
    }
  }

  /*
    Remove um vídeo após confirmação do usuário.
    Por que: ações destrutivas devem pedir confirmação para evitar exclusões acidentais.
  */
  async function remove(id: string) {
    if (!confirm("Apagar este vídeo?")) return;
    await supabase.from("videos").delete().eq("id", id);
    load();
  }

  return (
    <div>
      {/* Cabeçalho administrativo com ação de cancelar edição se estiver editando */}
      <AdminHeader
        eyebrow="Mídia"
        title="Vídeos do YouTube"
        action={editingId && (
          <button onClick={reset} className="border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-accent">Cancelar edição</button>
        )}
      />

      {/* Formulário de criação/edição */}
      <form onSubmit={save} className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-2">
        <h2 className="heading-display col-span-full text-xl">{editingId ? "Editar vídeo" : "Novo vídeo"}</h2>
        <Field label="Título *" className="md:col-span-2">
          <input required value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className={inputCls} />
        </Field>
        <Field label="URL ou ID do YouTube *" className="md:col-span-2">
          <input required value={form.youtube_id} onChange={(e) => setForm({ ...form, youtube_id: e.target.value })} className={inputCls} placeholder="https://youtube.com/watch?v=..." />
        </Field>
        <Field label="Modalidade">
          <select value={form.modalidade} onChange={(e) => setForm({ ...form, modalidade: e.target.value as Modalidade })} className={inputCls}>
            <option value="geral">Institucional</option>
            <option value="jiu-jitsu">Jiu-Jitsu</option>
            <option value="xadrez">Xadrez</option>
          </select>
        </Field>
        <Field label="Data de publicação">
          <input type="date" value={form.data_publicacao} onChange={(e) => setForm({ ...form, data_publicacao: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Descrição" className="md:col-span-2">
          <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} className={inputCls} />
        </Field>
        {/* Exibe mensagem de erro se houver */}
        {error && <p className="col-span-full border-l-4 border-destructive bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
        <button type="submit" className="col-span-full justify-self-start bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground">
          {editingId ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      {/* Lista de vídeos cadastrados */}
      <div className="mt-12">
        <h2 className="heading-display mb-4 text-2xl">Cadastrados ({rows.length})</h2>
        {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : (
          <ul className="divide-y divide-border border border-border bg-card">
            {rows.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <span className="bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground">{r.modalidade}</span>
                  <p className="mt-1 font-semibold">{r.titulo}</p>
                  <p className="font-mono text-xs text-muted-foreground">{r.youtube_id} · {r.data_publicacao}</p>
                </div>
                <div className="flex gap-2">
                  {/* Botão para iniciar edição do item */}
                  <button onClick={() => edit(r)} className="border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-accent">Editar</button>
                  {/* Botão para remover o item */}
                  <button onClick={() => remove(r.id)} className="border border-destructive px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive hover:text-destructive-foreground">Apagar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
