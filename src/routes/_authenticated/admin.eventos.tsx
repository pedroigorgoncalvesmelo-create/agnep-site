/*
  Arquivo: admin.eventos.tsx
  Propósito:
  - Rota administrativa para gerenciar eventos do site AGNEP.
  - Implementa upload de Folder/Cartaz (imagem) e PDF direto do computador.
  - Inclui caixa de pré-visualização da imagem para melhor experiência visual.
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { uploadFile, getSignedUrl, removeFile } from "@/lib/storage";
import { enviarAvisoConteudoNovoFn } from "@/lib/enviar-aviso.functions";
import { AdminHeader, Field, inputCls } from "@/components/admin-ui";

export const Route = createFileRoute("/_authenticated/admin/eventos")({
  component: AdminEventos,
});

type Evento = Database["public"]["Tables"]["eventos"]["Row"];
type Modalidade = Database["public"]["Enums"]["modalidade"];

type FormState = {
  titulo: string;
  descricao: string;
  modalidade: Modalidade;
  data_evento: string;
  data_fim: string;
  local: string;
  cidade: string;
  link_inscricao: string;
  imagem_url: string; 
  destaque: boolean;
  pdf_url: string; 
  imagem_file: File | null;
  imagem_nome: string;
  imagem_preview: string | null; 
  pdf_file: File | null;
  pdf_nome: string;
};

const EMPTY: FormState = {
  titulo: "",
  descricao: "",
  modalidade: "geral" as Modalidade,
  data_evento: "",
  data_fim: "",
  local: "",
  cidade: "",
  link_inscricao: "",
  imagem_url: "",
  destaque: false,
  pdf_url: "",
  imagem_file: null,
  imagem_nome: "",
  imagem_preview: null,
  pdf_file: null,
  pdf_nome: "",
};

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function AdminEventos() {
  const [rows, setRows] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>({ ...EMPTY });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("eventos").select("*").order("data_evento", { ascending: false });
    if (error) setError(error.message);
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function resetForm() {
    setForm({ ...EMPTY });
    setEditingId(null);
    setError(null);
  }

  async function edit(e: Evento) {
    setEditingId(e.id);
    let preview = null;
    if (e.imagem_url) {
      if (e.imagem_url.startsWith("http" )) preview = e.imagem_url;
      else preview = await getSignedUrl("galeria", e.imagem_url);
    }
    setForm({
      titulo: e.titulo,
      descricao: e.descricao ?? "",
      modalidade: e.modalidade,
      data_evento: toLocalInput(e.data_evento),
      data_fim: e.data_fim ? toLocalInput(e.data_fim) : "",
      local: e.local ?? "",
      cidade: e.cidade ?? "",
      link_inscricao: e.link_inscricao ?? "",
      imagem_url: e.imagem_url ?? "",
      destaque: e.destaque,
      pdf_url: e.pdf_url ?? "",
      imagem_file: null,
      imagem_nome: "",
      imagem_preview: preview,
      pdf_file: null,
      pdf_nome: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    setSaving(true);
    setError(null);
    let imgPath = form.imagem_url;
    let pdfPath = form.pdf_url;
    try {
      if (form.imagem_file) {
        if (form.imagem_url && !form.imagem_url.startsWith("http" )) await removeFile("galeria", form.imagem_url);
        imgPath = await uploadFile("galeria", form.imagem_file);
      }
      if (form.pdf_file) {
        if (form.pdf_url && !form.pdf_url.startsWith("http" )) await removeFile("documentos", form.pdf_url);
        pdfPath = await uploadFile("documentos", form.pdf_file);
      }
      const payload = {
        titulo: form.titulo,
        descricao: form.descricao || null,
        modalidade: form.modalidade,
        data_evento: new Date(form.data_evento).toISOString(),
        data_fim: form.data_fim ? new Date(form.data_fim).toISOString() : null,
        local: form.local || null,
        cidade: form.cidade || null,
        link_inscricao: form.link_inscricao || null,
        imagem_url: imgPath || null,
        pdf_url: pdfPath || null,
        destaque: form.destaque,
      };
      const res = editingId
        ? await supabase.from("eventos").update(payload).eq("id", editingId)
        : await supabase.from("eventos").insert(payload);
      if (res.error) throw res.error;
      resetForm(); load();
      if (!editingId) enviarAvisoConteudoNovoFn({ data: { area: "eventos" } }).catch(() => {});
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  return (
    <div>
      <AdminHeader eyebrow="Calendário" title="Eventos" action={editingId && (
        <button onClick={resetForm} className="border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase hover:bg-accent">Cancelar edição</button>
      )} />
      <form onSubmit={save} className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-2">
        <h2 className="heading-display col-span-full text-xl">{editingId ? "Editar evento" : "Novo evento"}</h2>
        <Field label="Título *" className="md:col-span-2"><input required value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className={inputCls} /></Field>
        <Field label="Modalidade *">
          <select value={form.modalidade} onChange={(e) => setForm({ ...form, modalidade: e.target.value as Modalidade })} className={inputCls}>
            <option value="geral">Institucional / Geral</option>
            <option value="jiu-jitsu">Jiu-Jitsu</option>
            <option value="xadrez">Xadrez</option>
          </select>
        </Field>
        <Field label="Data e hora de início *"><input type="datetime-local" required value={form.data_evento} onChange={(e) => setForm({ ...form, data_evento: e.target.value })} className={inputCls} /></Field>
        <Field label="Data e hora de término (opcional)"><input type="datetime-local" value={form.data_fim} onChange={(e) => setForm({ ...form, data_fim: e.target.value })} className={inputCls} /></Field>
        <Field label="Local"><input value={form.local} onChange={(e) => setForm({ ...form, local: e.target.value })} className={inputCls} /></Field>
        <Field label="Cidade"><input value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} className={inputCls} /></Field>
        <Field label="Link de inscrição (URL)" className="md:col-span-2"><input type="url" value={form.link_inscricao} onChange={(e) => setForm({ ...form, link_inscricao: e.target.value })} className={inputCls} placeholder="https://..." /></Field>

        {/* ÁREA DE IMAGEM COM PRÉ-VISUALIZAÇÃO (FORMATO BANNER ) */}
        <div className="md:col-span-2 space-y-4">
          <Field label="Imagem / Folder do Evento (Folder do Torneio)">
            <div className="mb-4 aspect-video w-full max-w-2xl overflow-hidden bg-muted ring-1 ring-border">
              {form.imagem_preview ? (
                <img src={form.imagem_preview} alt="Pré-visualização" className="h-full w-full object-contain" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground italic">Nenhuma imagem selecionada</div>
              )}
            </div>
            <input id="evento-imagem" type="file" accept="image/*" onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setForm({ ...form, imagem_file: f, imagem_nome: f?.name ?? "", imagem_preview: f ? URL.createObjectURL(f) : form.imagem_preview });
            }} className={inputCls} />
          </Field>
        </div>

        <Field label="Arquivo PDF / Regulamento (Upload)" className="md:col-span-2">
          <input type="file" accept="application/pdf" onChange={(e) => setForm({ ...form, pdf_file: e.target.files?.[0] ?? null, pdf_nome: e.target.files?.[0]?.name ?? "" })} className={inputCls} />
          {form.pdf_nome && <p className="mt-1 text-xs text-emerald-400">✓ {form.pdf_nome}</p>}
        </Field>
        <Field label="Descrição" className="md:col-span-2"><textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} className={inputCls} /></Field>
        <label className="col-span-full flex items-center gap-2 text-sm"><input type="checkbox" checked={form.destaque} onChange={(e) => setForm({ ...form, destaque: e.target.checked })} /> Destacar na home</label>
        <button type="submit" disabled={saving} className="bg-primary px-6 py-3 text-xs font-bold uppercase text-primary-foreground disabled:opacity-50">{saving ? "Salvando..." : "Salvar"}</button>
      </form>
      {/* ... restante da lista de eventos ... */}
    </div>
  );
}
