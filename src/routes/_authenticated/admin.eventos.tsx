/*
  Arquivo: admin.eventos.tsx
  Propósito: Rota administrativa COMPLETA para gerenciar eventos.
*/
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile, getSignedUrl, removeFile } from "@/lib/storage";
import { AdminHeader, Field, inputCls } from "@/components/admin-ui";

export const Route = createFileRoute("/_authenticated/admin/eventos")({
  component: AdminEventos,
});

function AdminEventos() {
  const [rows, setRows] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ titulo: "", modalidade: "geral", data_evento: "", data_fim: "", local: "", cidade: "", link_inscricao: "", descricao: "", destaque: false, imagem_preview: null });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await supabase.from("eventos").select("*").order("data_evento", { ascending: false });
    setRows(data ?? []);
  }
  useEffect(() => { load(); }, []);

  function toLocalInput(iso: string) {
    if(!iso) return "";
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  async function edit(e: any) {
    setEditingId(e.id);
    let preview = null;
    if (e.imagem_url) {
      if (e.imagem_url.startsWith("http" )) preview = e.imagem_url;
      else preview = await getSignedUrl("galeria", e.imagem_url);
    }
    setForm({ ...e, data_evento: toLocalInput(e.data_evento), data_fim: toLocalInput(e.data_fim), imagem_preview: preview });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(ev: any) {
    ev.preventDefault();
    setSaving(true);
    let imgPath = form.imagem_url;
    let pdfPath = form.pdf_url;
    let fotoPath = form.foto_url;
    
    if (form.imagem_file) imgPath = await uploadFile("galeria", form.imagem_file);
    if (form.foto_file) fotoPath = await uploadFile("galeria", form.foto_file);
    if (form.pdf_file) pdfPath = await uploadFile("documentos", form.pdf_file);

    const payload = {
      titulo: form.titulo,
      descricao: form.descricao,
      modalidade: form.modalidade,
      data_evento: new Date(form.data_evento).toISOString(),
      data_fim: form.data_fim ? new Date(form.data_fim).toISOString() : null,
      local: form.local,
      cidade: form.cidade,
      link_inscricao: form.link_inscricao,
      imagem_url: imgPath,
      pdf_url: pdfPath,
      foto_url: fotoPath,
      destaque: form.destaque,
    };

    if (editingId) await supabase.from("eventos").update(payload).eq("id", editingId);
    else await supabase.from("eventos").insert(payload);
    
    setEditingId(null); setForm({ titulo: "", modalidade: "geral", data_evento: "" }); load();
    setSaving(false);
  }

  return (
    <div>
      <AdminHeader eyebrow="Calendário" title="Eventos" action={editingId && <button onClick={() => { setEditingId(null); setForm({}); }} className="border border-border px-4 py-2 text-[11px] font-bold uppercase hover:bg-accent">Cancelar</button>} />
      
      <form onSubmit={save} className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-2">
        <h2 className="heading-display col-span-full text-xl">{editingId ? "Editar Evento" : "Novo Evento"}</h2>
        
        <Field label="Título *"><input required value={form.titulo || ""} onChange={e => setForm({...form, titulo: e.target.value})} className={inputCls} /></Field>
        <Field label="Modalidade *">
          <select value={form.modalidade || "geral"} onChange={e => setForm({...form, modalidade: e.target.value})} className={inputCls}>
            <option value="geral">Institucional / Geral</option>
            <option value="jiu-jitsu">Jiu-Jitsu</option>
            <option value="xadrez">Xadrez</option>
          </select>
        </Field>
        <Field label="Data de Início *"><input type="datetime-local" required value={form.data_evento || ""} onChange={e => setForm({...form, data_evento: e.target.value})} className={inputCls} /></Field>
        <Field label="Data de Término"><input type="datetime-local" value={form.data_fim || ""} onChange={e => setForm({...form, data_fim: e.target.value})} className={inputCls} /></Field>
        <Field label="Local"><input value={form.local || ""} onChange={e => setForm({...form, local: e.target.value})} className={inputCls} /></Field>
        <Field label="Cidade"><input value={form.cidade || ""} onChange={e => setForm({...form, cidade: e.target.value})} className={inputCls} /></Field>
        <Field label="Link de Inscrição (URL)" className="md:col-span-2"><input type="url" value={form.link_inscricao || ""} onChange={e => setForm({...form, link_inscricao: e.target.value})} className={inputCls} placeholder="https://..." /></Field>

        <div className="md:col-span-2 space-y-4">
          <Field label="Folder / Cartaz (Pré-visualização )">
            <div className="mb-4 aspect-video w-full max-w-2xl overflow-hidden bg-muted ring-1 ring-border">
              {form.imagem_preview ? <img src={form.imagem_preview} className="h-full w-full object-contain" /> : <div className="flex h-full items-center justify-center text-xs italic">Nenhuma imagem</div>}
            </div>
            <input type="file" accept="image/*" onChange={e => {
              const f = e.target.files?.[0];
              if(f) setForm({...form, imagem_file: f, imagem_preview: URL.createObjectURL(f)});
            }} className={inputCls} />
          </Field>
        </div>

        <Field label="Foto Real do Torneio (Upload Normal)">
          <input type="file" accept="image/*" onChange={e => setForm({...form, foto_file: e.target.files?.[0]})} className={inputCls} />
        </Field>
        <Field label="Regulamento PDF"><input type="file" accept="application/pdf" onChange={e => setForm({...form, pdf_file: e.target.files?.[0]})} className={inputCls} /></Field>
        <Field label="Descrição" className="md:col-span-2"><textarea value={form.descricao || ""} onChange={e => setForm({...form, descricao: e.target.value})} rows={3} className={inputCls} /></Field>
        <label className="col-span-full flex items-center gap-2 text-sm"><input type="checkbox" checked={form.destaque || false} onChange={e => setForm({...form, destaque: e.target.checked})} /> Destacar na home</label>
        <button type="submit" disabled={saving} className="bg-primary px-6 py-3 text-xs font-bold uppercase text-primary-foreground">{saving ? "Salvando..." : "Salvar Evento"}</button>
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
                <button onClick={() => { if(confirm("Apagar?")) supabase.from("eventos").delete().eq("id", e.id).then(load); }} className="border border-destructive px-3 py-2 text-[10px] font-bold uppercase text-destructive hover:bg-destructive hover:text-white">Apagar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
