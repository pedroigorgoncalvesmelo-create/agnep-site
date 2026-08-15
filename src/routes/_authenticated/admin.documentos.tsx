/*
  Arquivo: admin.documentos.tsx

  Propósito:
  Página administrativa para gerenciar documentos (PDF) da associação AGNEP.
  - Lista documentos já cadastrados no Supabase.
  - Permite enviar novos arquivos PDF para o storage e salvar metadados no banco.
  - Permite visualizar (abre em nova aba via URL assinado) e remover documentos.

  Observações:
  - Código usa Supabase para CRUD e um utilitário de storage para upload/remover/obter URL assinado.
  - Comentários neste arquivo explicam as partes principais para desenvolvedores iniciantes.
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile, getSignedUrl, removeFile } from "@/lib/storage";
import { enviarAvisoConteudoNovoFn } from "@/lib/enviar-aviso.functions";
import { AdminHeader, Field, inputCls } from "@/components/admin-ui";
import type { Database } from "@/integrations/supabase/types";

// Rota de administração para documentos
export const Route = createFileRoute("/_authenticated/admin/documentos")({
  component: AdminDocumentos,
});

type Row = Database["public"]["Tables"]["documentos"]["Row"];

// Estado inicial do formulário de novo documento
const EMPTY = { titulo: "", descricao: "", categoria: "Institucional" };

/* Componente principal da página de administração de documentos.
   Permite criar, listar, visualizar e apagar documentos PDF.
*/
function AdminDocumentos() {
  // Estado que guarda os documentos carregados do banco
  const [rows, setRows] = useState<Row[]>([]);
  // Indicador de carregamento da lista
  const [loading, setLoading] = useState(true);
  // Estado do formulário de novo documento (título, descrição, categoria)
  const [form, setForm] = useState({ ...EMPTY });
  // Arquivo selecionado pelo usuário (File) ou null
  const [file, setFile] = useState<File | null>(null);
  // Indicador de envio (upload) em progresso
  const [saving, setSaving] = useState(false);
  // Mensagem de erro para exibir ao usuário
  const [error, setError] = useState<string | null>(null);

  // Função que carrega a lista de documentos do Supabase.
  // O QUE: busca todos os registros da tabela "documentos" ordenados por data.
  // POR QUE: precisamos mostrar os documentos cadastrados na interface administrativa.
  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("documentos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    setRows(data ?? []);
    setLoading(false);
  }

  // useEffect para carregar os documentos quando o componente monta.
  // Executa apenas uma vez [].
  useEffect(() => {
    load();
  }, []);

  /* Função responsável por tratar o envio do formulário de novo documento.
     O QUE:
      - Valida se um arquivo foi selecionado.
      - Faz upload do arquivo para o storage (função uploadFile).
      - Insere um registro na tabela "documentos" com o caminho do arquivo.
      - Reseta o formulário e recarrega a lista.
     POR QUE:
      - Separar upload de arquivo e persistência evita inconsistências e mantém rastreabilidade.
  */
  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    if (!file) {
      setError("Selecione um arquivo PDF.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const path = await uploadFile("documentos", file);
      const { error } = await supabase.from("documentos").insert({
        titulo: form.titulo,
        descricao: form.descricao || null,
        categoria: form.categoria || null,
        arquivo_url: path,
      });
      if (error) throw error;
      // Reseta formulário e campo de arquivo na UI
      setForm({ ...EMPTY });
      setFile(null);
      (document.getElementById("doc-file") as HTMLInputElement).value = "";
      // Recarrega lista para exibir novo documento
      load();
      // Avisa automaticamente os inscritos que o site foi atualizado
      enviarAvisoConteudoNovoFn({ data: { area: "documentos" } }).catch(() => {});
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  /* Remove um documento:
     O QUE:
      - Pergunta confirmação ao usuário.
      - Remove o arquivo do storage e o registro do banco.
      - Recarrega a lista.
     POR QUE:
      - Garantir que o arquivo não fique órfão no storage ao deletar o registro.
  */
  async function remove(row: Row) {
    if (!confirm("Apagar este documento?")) return;
    await removeFile("documentos", row.arquivo_url);
    await supabase.from("documentos").delete().eq("id", row.id);
    load();
  }

  // Abre o documento em nova aba usando URL assinado do storage.
  // O QUE: solicita URL temporária para acesso ao arquivo e abre em nova janela.
  // POR QUE: evita expor arquivos publicamente e utiliza tokens temporários do storage.
  async function openDoc(path: string) {
    const url = await getSignedUrl("documentos", path);
    if (url) window.open(url, "_blank");
  }

  // Renderização da UI: formulário para novo documento e listagem dos cadastrados.
  return (
    <div>
      <AdminHeader eyebrow="Biblioteca" title="Documentos (PDF)" />

      <form onSubmit={save} className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-2">
        <h2 className="heading-display col-span-full text-xl">Novo documento</h2>
        <Field label="Título *" className="md:col-span-2">
          <input required value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Categoria">
          <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className={inputCls}>
            <option>Institucional</option>
            <option>Jiu-Jitsu</option>
            <option>Xadrez</option>
          </select>
        </Field>
        <Field label="Arquivo PDF *">
          <input
            id="doc-file"
            type="file"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className={inputCls}
          />
        </Field>
        <Field label="Descrição" className="md:col-span-2">
          <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} className={inputCls} />
        </Field>
        {error && <p className="col-span-full border-l-4 border-destructive bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
        <button type="submit" disabled={saving} className="col-span-full justify-self-start bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-50">
          {saving ? "Enviando..." : "Publicar"}
        </button>
      </form>

      <div className="mt-12">
        <h2 className="heading-display mb-4 text-2xl">Cadastrados ({rows.length})</h2>
        {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : (
          <ul className="divide-y divide-border border border-border bg-card">
            {rows.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <span className="bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground">{r.categoria ?? "—"}</span>
                  <p className="mt-1 font-semibold">{r.titulo}</p>
                  {r.descricao && <p className="text-xs text-muted-foreground">{r.descricao}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openDoc(r.arquivo_url)} className="border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-accent">Ver</button>
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
