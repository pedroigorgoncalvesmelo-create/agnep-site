/*
  Arquivo: admin.eventos.tsx
  Propósito:
  - Rota administrativa para gerenciar eventos do site AGNEP.
  - Fornece CRUD básico (listar, criar, editar, apagar) usando Supabase.
  - Implementa upload de Folder/Cartaz (imagem) e PDF direto do computador.
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
    const imgInput = document.getElementById("evento-imagem") as HTMLInputElement | null;
    if (imgInput) imgInput.value = "";
    const pdfInput = document.getElementById("evento-pdf") as HTMLInputElement | null;
    if (pdfInput) pdfInput.value = "";
  }

  function edit(e: Evento) {
    setEditingId(e.id);
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

  async function remove(id: string) {
    if (!confirm("Apagar este evento?")) return;
    await supabase.from("eventos").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <AdminHeader eyebrow="Calendário" title="Eventos" action={editingId && (
        <button onClick={resetForm} className="border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase hover:bg-accent">Cancelar edição</button>
      )} />
      <form onSubmit={save} className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-2">
        <h2 className="heading-display col-span-full text-xl">{editingId ? "Editar evento" : "Novo evento"}</h2>
        <Field label="Título *" className="md:col-span-2">
          <input required value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Modalidade *">
          <select value={form.modalidade} onChange={(e) => setForm({ ...form, modalidade: e.target.value as Modalidade })} className={inputCls}>
            <option value="geral">Institucional / Geral</option>
            <option value="jiu-jitsu">Jiu-Jitsu</option>
            <option value="xadrez">Xadrez</option>
          </select>
        </Field>
        <Field label="Data e hora de início *">
          <input type="datetime-local" required value={form.data_evento} onChange={(e) => setForm({ ...form, data_evento: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Data e hora de término (opcional)">
          <input type="datetime-local" value={form.data_fim} onChange={(e) => setForm({ ...form, data_fim: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Local"><input value={form.local} onChange={(e) => setForm({ ...form, local: e.target.value })} className={inputCls} /></Field>
        <Field label="Cidade"><input value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} className={inputCls} /></Field>
        <Field label="Link de inscrição (URL)" className="md:col-span-2">
          <input type="url" value={form.link_inscricao} onChange={(e) => setForm({ ...form, link_inscricao: e.target.value })} className={inputCls} placeholder="https://..." />
        </Field>
        <Field label="Imagem / Folder do Evento (Upload )" className="md:col-span-2">
          <input id="evento-imagem" type="file" accept="image/*" onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setForm({ ...form, imagem_file: f, imagem_nome: f?.name ?? "" });
          }} className={inputCls} />
          {(form.imagem_url || form.imagem_nome) && (
            <p className="mt-2 text-xs text-emerald-300">
              {form.imagem_url && !form.imagem_file ? "✓ Imagem atual mantida." : `Selecionada: ${form.imagem_nome}`}
            </p>
          )}
        </Field>
        <Field label="Arquivo PDF / Regulamento (Upload)" className="md:col-span-2">
          <input id="evento-pdf" type="file" accept="application/pdf" onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setForm({ ...form, pdf_file: f, pdf_nome: f?.name ?? "" });
          }} className={inputCls} />
          {(form.pdf_url || form.pdf_nome) && (
            <p className="mt-2 text-xs text-emerald-300">
              {form.pdf_url && !form.pdf_file ? "✓ PDF atual mantido." : `Selecionado: ${form.pdf_nome}`}
            </p>
          )}
        </Field>
        <Field label="Descrição" className="md:col-span-2">
          <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} className={inputCls} />
        </Field>
        <label className="col-span-full flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.destaque} onChange={(e) => setForm({ ...form, destaque: e.target.checked })} />
          Destacar evento na home
        </label>
        {error && <p className="col-span-full text-xs text-destructive">{error}</p>}
        <button type="submit" disabled={saving} className="bg-primary px-6 py-3 text-xs font-bold uppercase text-primary-foreground disabled:opacity-50">
          {saving ? "Salvando..." : editingId ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
      <div className="mt-12">
        <h2 className="heading-display mb-4 text-2xl">Cadastrados ({rows.length})</h2>
        <ul className="divide-y divide-border border border-border bg-card">
          {rows.map((e) => (
            <li key={e.id} className="flex items-center justify-between p-4">
              <div className="min-w-0 flex-1">
                <span className="bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-secondary-foreground">{e.modalidade}</span>
                <p className="mt-1 font-semibold">{e.titulo}</p>
                <p className="text-xs text-muted-foreground">{new Date(e.data_evento).toLocaleDateString("pt-BR")} · {e.cidade}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(e)} className="border border-border px-3 py-2 text-[10px] font-bold uppercase hover:bg-accent">Editar</button>
                <button onClick={() => remove(e.id)} className="border border-destructive px-3 py-2 text-[10px] font-bold uppercase text-destructive hover:bg-destructive hover:text-white">Apagar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
