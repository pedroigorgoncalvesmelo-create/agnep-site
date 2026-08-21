/*
  Arquivo: admin.resultados.tsx
  Propósito:
  - Componente de administração para gerenciar "resultados" (conquistas/hall da fama).
  - Implementa upload de imagem direto do computador para o bucket "galeria".
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { uploadFile, getSignedUrl, removeFile } from "@/lib/storage";
import { AdminHeader, Field, inputCls } from "@/components/admin-ui";
import { enviarAvisoConteudoNovoFn } from "@/lib/enviar-aviso.functions";

export const Route = createFileRoute("/_authenticated/admin/resultados")({
  component: AdminResultados,
});

type Resultado = Database["public"]["Tables"]["resultados"]["Row"];
type Modalidade = Database["public"]["Enums"]["modalidade"];

type FormState = {
  atleta: string;
  modalidade: Modalidade;
  competicao: string;
  colocacao: string;
  categoria: string;
  data_conquista: string;
  descricao: string;
  imagem_url: string;
  imagem_file: File | null;
  imagem_nome: string;
};

const EMPTY: FormState = {
  atleta: "",
  modalidade: "jiu-jitsu" as Modalidade,
  competicao: "",
  colocacao: "",
  categoria: "",
  data_conquista: "",
  descricao: "",
  imagem_url: "",
  imagem_file: null,
  imagem_nome: "",
};

function AdminResultados() {
  const [rows, setRows] = useState<Resultado[]>([]);
  const [imgUrls, setImgUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>({ ...EMPTY });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("resultados").select("*").order("data_conquista", { ascending: false });
    setRows(data ?? []);
    const map: Record<string, string> = {};
    for (const r of data ?? []) {
      if (r.imagem_url && !r.imagem_url.startsWith("http" )) {
        const url = await getSignedUrl("galeria", r.imagem_url);
        if (url) map[r.imagem_url] = url;
      }
    }
    setImgUrls(map);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function resetForm() {
    setForm({ ...EMPTY });
    setEditingId(null);
    setError(null);
    const el = document.getElementById("res-imagem") as HTMLInputElement | null;
    if (el) el.value = "";
  }

  function edit(r: Resultado) {
    setEditingId(r.id);
    setForm({
      atleta: r.atleta,
      modalidade: r.modalidade,
      competicao: r.competicao,
      colocacao: r.colocacao,
      categoria: r.categoria ?? "",
      data_conquista: r.data_conquista,
      descricao: r.descricao ?? "",
      imagem_url: r.imagem_url ?? "",
      imagem_file: null,
      imagem_nome: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    setSaving(true);
    setError(null);
    let path = form.imagem_url;
    try {
      if (form.imagem_file) {
        if (form.imagem_url && !form.imagem_url.startsWith("http" )) {
          await removeFile("galeria", form.imagem_url);
        }
        path = await uploadFile("galeria", form.imagem_file);
      }
      const payload = {
        atleta: form.atleta,
        modalidade: form.modalidade,
        competicao: form.competicao,
        colocacao: form.colocacao,
        categoria: form.categoria || null,
        data_conquista: form.data_conquista,
        descricao: form.descricao || null,
        imagem_url: path || null,
      };
      const res = editingId
        ? await supabase.from("resultados").update(payload).eq("id", editingId)
        : await supabase.from("resultados").insert(payload);
      if (res.error) throw res.error;
      resetForm(); load();
      if (!editingId) enviarAvisoConteudoNovoFn({ data: { area: "resultados" } }).catch(() => {});
    } catch (e: any) { setError(e.message); } finally { setSaving(false); }
  }

  async function remove(id: string, imgPath: string | null) {
    if (!confirm("Apagar resultado?")) return;
    try {
      if (imgPath && !imgPath.startsWith("http" )) await removeFile("galeria", imgPath);
      await supabase.from("resultados").delete().eq("id", id);
      load();
    } catch (e: any) { alert(e.message); }
  }

  return (
    <div>
      <AdminHeader eyebrow="Hall da Fama" title="Resultados" action={editingId && (
        <button onClick={resetForm} className="border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase hover:bg-accent">Cancelar edição</button>
      )} />
      <form onSubmit={save} className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-2">
        <h2 className="heading-display col-span-full text-xl">{editingId ? "Editar conquista" : "Nova conquista"}</h2>
        <Field label="Atleta / Equipe *">
          <input required value={form.atleta} onChange={(e) => setForm({ ...form, atleta: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Modalidade *">
          <select value={form.modalidade} onChange={(e) => setForm({ ...form, modalidade: e.target.value as Modalidade })} className={inputCls}>
            <option value="jiu-jitsu">Jiu-Jitsu</option>
            <option value="xadrez">Xadrez</option>
            <option value="geral">Geral</option>
          </select>
        </Field>
        <Field label="Competição *" className="md:col-span-2">
          <input required value={form.competicao} onChange={(e) => setForm({ ...form, competicao: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Colocação *">
          <input required value={form.colocacao} onChange={(e) => setForm({ ...form, colocacao: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Data da conquista *">
          <input type="date" required value={form.data_conquista} onChange={(e) => setForm({ ...form, data_conquista: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Imagem da conquista (Upload)" className="md:col-span-2">
          <input id="res-imagem" type="file" accept="image/*" onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setForm({ ...form, imagem_file: f, imagem_nome: f?.name ?? "" });
          }} className={inputCls} />
        </Field>
        <Field label="Descrição" className="md:col-span-2">
          <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} className={inputCls} />
        </Field>
        {error && <p className="col-span-full text-xs text-destructive">{error}</p>}
        <button type="submit" disabled={saving} className="bg-primary px-6 py-3 text-xs font-bold uppercase text-primary-foreground disabled:opacity-50">
          {saving ? "Salvando..." : editingId ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
      <div className="mt-12">
        <h2 className="heading-display mb-4 text-2xl">Resultados ({rows.length})</h2>
        <ul className="divide-y divide-border border border-border bg-card">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 overflow-hidden bg-muted">
                  {(imgUrls[r.imagem_url ?? ""] || r.imagem_url) && <img src={imgUrls[r.imagem_url ?? ""] ?? r.imagem_url} alt="" className="h-full w-full object-cover" />}
                </div>
                <div><p className="font-semibold">{r.atleta} — {r.competicao}</p><p className="text-xs text-muted-foreground">{r.colocacao}</p></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(r)} className="border border-border px-3 py-2 text-[10px] font-bold uppercase hover:bg-accent">Editar</button>
                <button onClick={() => remove(r.id, r.imagem_url)} className="border border-destructive px-3 py-2 text-[10px] font-bold uppercase text-destructive hover:bg-destructive hover:text-white">Apagar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
