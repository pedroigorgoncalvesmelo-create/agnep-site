/*
  Arquivo: admin.eventos.tsx
  Implementa upload de Folder, Foto Real do Torneio e PDF.
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
  const [form, setForm] = useState<any>({ titulo: "", modalidade: "geral", data_evento: "", imagem_preview: null });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await supabase.from("eventos").select("*").order("data_evento", { ascending: false });
    setRows(data ?? []);
  }
  useEffect(() => { load(); }, []);

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
      <AdminHeader eyebrow="Calendário" title="Eventos" />
      <form onSubmit={save} className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-2">
        <Field label="Título *"><input required value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} className={inputCls} /></Field>
        <Field label="Data de Início *"><input type="datetime-local" required value={form.data_evento} onChange={e => setForm({...form, data_evento: e.target.value})} className={inputCls} /></Field>
        
        <div className="md:col-span-2">
          <Field label="Folder / Cartaz (Pré-visualização)">
            <div className="mb-2 aspect-video bg-muted overflow-hidden">{form.imagem_preview && <img src={form.imagem_preview} className="h-full w-full object-contain" />}</div>
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
        
        <button type="submit" disabled={saving} className="bg-primary px-6 py-3 text-xs font-bold uppercase text-primary-foreground">{saving ? "Salvando..." : "Salvar Evento"}</button>
      </form>
    </div>
  );
}
