/*
  Arquivo: admin.equipe.tsx
  Propósito:
  - Rota administrativa para gerenciar os membros da equipe (diretoria, professores, etc.) da AGNEP.
  - Fornece CRUD básico (listar, criar, editar, apagar) usando Supabase.
  - Implementa upload de foto direto do computador para o bucket "equipe" do Supabase Storage.
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { uploadFile, getSignedUrl, removeFile } from "@/lib/storage";
import { AdminHeader, Field, inputCls } from "@/components/admin-ui";

export const Route = createFileRoute("/_authenticated/admin/equipe")({
  component: AdminEquipe,
});

type Membro = Database["public"]["Tables"]["equipe"]["Row"];

type FormState = {
  nome: string;
  cargo: string;
  bio: string;
  ordem: number;
  foto_url: string;
  foto_file: File | null;
  foto_nome: string;
};

const EMPTY: FormState = {
  nome: "",
  cargo: "",
  bio: "",
  ordem: 0,
  foto_url: "",
  foto_file: null,
  foto_nome: "",
};

function AdminEquipe() {
  const [rows, setRows] = useState<Membro[]>([]);
  const [fotoUrls, setFotoUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>({ ...EMPTY });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("equipe").select("*").order("ordem", { ascending: true });
    if (error) {
      setError(error.message);
    } else {
      setRows(data ?? []);
      const map: Record<string, string> = {};
      for (const m of data ?? []) {
        if (m.foto_url && !m.foto_url.startsWith("http" )) {
          const url = await getSignedUrl("equipe", m.foto_url);
          if (url) map[m.foto_url] = url;
        }
      }
      setFotoUrls(map);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function resetForm() {
    setForm({ ...EMPTY });
    setEditingId(null);
    setError(null);
    const el = document.getElementById("equipe-foto") as HTMLInputElement | null;
    if (el) el.value = "";
  }

  function edit(m: Membro) {
    setEditingId(m.id);
    setForm({
      nome: m.nome,
      cargo: m.cargo,
      bio: m.bio ?? "",
      ordem: m.ordem,
      foto_url: m.foto_url ?? "",
      foto_file: null,
      foto_nome: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    setSaving(true);
    setError(null);
    let path = form.foto_url;
    try {
      if (form.foto_file) {
        if (form.foto_url && !form.foto_url.startsWith("http" )) {
          await removeFile("equipe", form.foto_url);
        }
        path = await uploadFile("equipe", form.foto_file);
      }
      const payload = {
        nome: form.nome,
        cargo: form.cargo,
        bio: form.bio || null,
        ordem: Number(form.ordem),
        foto_url: path || null,
      };
      const res = editingId
        ? await supabase.from("equipe").update(payload).eq("id", editingId)
        : await supabase.from("equipe").insert(payload);
      if (res.error) throw res.error;
      resetForm();
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(m: Membro) {
    if (!confirm(`Apagar ${m.nome}?`)) return;
    try {
      if (m.foto_url && !m.foto_url.startsWith("http" )) {
        await removeFile("equipe", m.foto_url);
      }
      await supabase.from("equipe").delete().eq("id", m.id);
      load();
    } catch (e: any) { alert(e.message); }
  }

  return (
    <div>
      <AdminHeader eyebrow="Institucional" title="Equipe" action={editingId && (
        <button onClick={resetForm} className="border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase hover:bg-accent">Cancelar edição</button>
      )} />
      <form onSubmit={save} className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-2">
        <h2 className="heading-display col-span-full text-xl">{editingId ? "Editar membro" : "Novo membro"}</h2>
        <Field label="Nome *" className="md:col-span-2">
          <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Cargo *">
          <input required value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Ordem">
          <input type="number" value={form.ordem} onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })} className={inputCls} />
        </Field>
        <Field label="Foto do membro (Upload)" className="md:col-span-2">
          <input id="equipe-foto" type="file" accept="image/*" onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setForm({ ...form, foto_file: f, foto_nome: f?.name ?? "" });
          }} className={inputCls} />
        </Field>
        <Field label="Bio" className="md:col-span-2">
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className={inputCls} />
        </Field>
        {error && <p className="col-span-full text-xs text-destructive">{error}</p>}
        <button type="submit" disabled={saving} className="bg-primary px-6 py-3 text-xs font-bold uppercase text-primary-foreground disabled:opacity-50">
          {saving ? "Salvando..." : editingId ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
      <div className="mt-12">
        <h2 className="heading-display mb-4 text-2xl">Membros ({rows.length})</h2>
        <ul className="divide-y divide-border border border-border bg-card">
          {rows.map((m) => (
            <li key={m.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                  {(fotoUrls[m.foto_url ?? ""] || m.foto_url) && <img src={fotoUrls[m.foto_url ?? ""] ?? m.foto_url} alt="" className="h-full w-full object-cover" />}
                </div>
                <div><p className="font-semibold">{m.nome}</p><p className="text-xs text-muted-foreground">{m.cargo}</p></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(m)} className="border border-border px-3 py-2 text-[10px] font-bold uppercase hover:bg-accent">Editar</button>
                <button onClick={() => remove(m)} className="border border-destructive px-3 py-2 text-[10px] font-bold uppercase text-destructive hover:bg-destructive hover:text-white">Apagar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
