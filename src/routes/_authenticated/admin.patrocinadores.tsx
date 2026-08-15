/*
  Arquivo: admin.patrocinadores.tsx

  Propósito:
  - Component React para a área administrativa de "Patrocinadores" do site AGNEP.
  - Permite listar, criar, editar e apagar patrocinadores.
  - Faz upload/remoção de arquivos de logo via storage e obtém URLs assinadas para exibição.
  - Usa Supabase como back-end (tabela "patrocinadores").

  Observações:
  - Comentários curtos e em português para desenvolvedores iniciantes.
  - Não altera lógica nem comportamento do código original.
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile, getSignedUrl, removeFile } from "@/lib/storage";
import { AdminHeader, Field, inputCls } from "@/components/admin-ui";
import type { Database } from "@/integrations/supabase/types";
import { enviarAvisoConteudoNovoFn } from "@/lib/enviar-aviso.functions";

/* Rota do arquivo registrada no roteador da aplicação */
export const Route = createFileRoute("/_authenticated/admin/patrocinadores")({
  component: AdminPatrocinadores,
});

/* Tipo da linha da tabela 'patrocinadores' a partir das definições do Supabase */
type Row = Database["public"]["Tables"]["patrocinadores"]["Row"];

/* Estado inicial para o formulário de criação/edição */
const EMPTY = { nome: "", link: "", descricao: "", ordem: 0, ativo: true };

/* 
  Componente principal da página administrativa de patrocinadores.

  O QUE faz:
  - Gerencia o estado da lista de patrocinadores e do formulário.
  - Carrega imagens via storage e exibe URLs assinadas.
  - Permite criar/editar/apagar registros na tabela 'patrocinadores'.

  POR QUE:
  - Centraliza a UI e lógica de CRUD para facilitar manutenção e reuso.
*/
function AdminPatrocinadores() {
  // Lista de patrocinadores carregada do banco
  const [rows, setRows] = useState<Row[]>([]);
  // Map de caminhos de logo -> URL assinada para exibição no front-end
  const [logoUrls, setLogoUrls] = useState<Record<string, string>>({});
  // Indica se está carregando dados
  const [loading, setLoading] = useState(true);
  // Estado do formulário (nome, link, descrição, ordem, ativo)
  const [form, setForm] = useState({ ...EMPTY });
  // Arquivo selecionado no input (logo)
  const [file, setFile] = useState<File | null>(null);
  // ID do registro que está sendo editado (null = novo)
  const [editingId, setEditingId] = useState<string | null>(null);
  // Caminho do logo existente quando em edição (para possível substituição)
  const [editingLogoPath, setEditingLogoPath] = useState<string | null>(null);
  // Mensagem de erro para exibir ao usuário
  const [error, setError] = useState<string | null>(null);

  /*
    load()

    O QUE faz:
    - Carrega todos os patrocinadores da tabela (ordenados).
    - Para cada registro com logo, obtém a URL assinada para exibição.

    POR QUE:
    - Precisamos das URLs assinadas para que o navegador consiga acessar imagens privadas do storage.
  */
  async function load() {
    setLoading(true);
    const { data } = await supabase.from("patrocinadores").select("*").order("ordem").order("nome");
    setRows(data ?? []);
    const map: Record<string, string> = {};
    for (const r of data ?? []) {
      if (r.logo_url) { const u = await getSignedUrl("patrocinadores", r.logo_url); if (u) map[r.logo_url] = u; }
    }
    setLogoUrls(map);
    setLoading(false);
  }

  // Carrega os dados quando o componente é montado pela primeira vez
  useEffect(() => { load(); }, []);

  /*
    reset()

    O QUE faz:
    - Restaura o formulário ao estado inicial e limpa seleções de arquivo/edição.
    - Também limpa o input de arquivo no DOM.

    POR QUE:
    - Facilita reutilizar o mesmo formulário para novos cadastros após operações.
  */
  function reset() {
    setForm({ ...EMPTY }); setEditingId(null); setEditingLogoPath(null); setFile(null); setError(null);
    const el = document.getElementById("pat-file") as HTMLInputElement | null; if (el) el.value = "";
  }

  /*
    edit(r)

    O QUE faz:
    - Preenche o formulário com os dados do patrocinador selecionado para edição.
    - Guarda o id e o caminho do logo atual para possibilitar substituição.

    POR QUE:
    - Permite ao usuário editar registros existentes de forma intuitiva.
  */
  function edit(r: Row) {
    setEditingId(r.id);
    setEditingLogoPath(r.logo_url);
    setForm({ nome: r.nome, link: r.link ?? "", descricao: r.descricao ?? "", ordem: r.ordem, ativo: r.ativo });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /*
    save(ev)

    O QUE faz:
    - Envia o formulário para criar ou atualizar um patrocinador.
    - Se um novo arquivo foi selecionado, faz upload e remove o anterior (se existir).
    - Monta o payload e chama Supabase para insert ou update.
    - Trata erros e recarrega a lista ao final.

    POR QUE:
    - Centraliza toda a lógica de persistência e tratamento de arquivos em um único lugar.
  */
  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);
    try {
      let logo_url = editingLogoPath;
      if (file) {
        if (editingLogoPath) await removeFile("patrocinadores", editingLogoPath);
        logo_url = await uploadFile("patrocinadores", file);
      }
      const payload = {
        nome: form.nome,
        link: form.link || null,
        descricao: form.descricao || null,
        ordem: Number(form.ordem) || 0,
        ativo: form.ativo,
        logo_url,
      };
      const res = editingId
        ? await supabase.from("patrocinadores").update(payload).eq("id", editingId)
        : await supabase.from("patrocinadores").insert(payload);
      if (res.error) throw res.error;
      reset(); load();
      // Se foi um patrocinador NOVO (não edição), avisa automaticamente os inscritos
      if (!editingId) {
        enviarAvisoConteudoNovoFn({ data: { area: "patrocinadores" } }).catch(() => {});
      }
    } catch (e: any) { setError(e.message); }
  }

  /*
    remove(r)

    O QUE faz:
    - Pergunta confirmação e então remove o arquivo de logo (se houver) e deleta o registro no banco.
    - Recarrega a lista após remoção.

    POR QUE:
    - Evita deixar arquivos órfãos no storage e garante feedback ao usuário via confirmação.
  */
  async function remove(r: Row) {
    if (!confirm("Apagar patrocinador?")) return;
    if (r.logo_url) await removeFile("patrocinadores", r.logo_url);
    await supabase.from("patrocinadores").delete().eq("id", r.id);
    load();
  }

  // Renderiza o formulário de criação/edição e a lista de patrocinadores
  return (
    <div>
      <AdminHeader
        eyebrow="Parceiros"
        title="Patrocinadores"
        action={editingId && (
          <button onClick={reset} className="border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-accent">Cancelar edição</button>
        )}
      />

      <form onSubmit={save} className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-2">
        <h2 className="heading-display col-span-full text-xl">{editingId ? "Editar parceiro" : "Novo parceiro"}</h2>
        <Field label="Nome *" className="md:col-span-2">
          <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Link (site)">
          <input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className={inputCls} placeholder="https://..." />
        </Field>
        <Field label="Ordem de exibição">
          <input type="number" value={form.ordem} onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })} className={inputCls} />
        </Field>
        <Field label={editingLogoPath ? "Substituir logo (opcional)" : "Logo *"} className="md:col-span-2">
          <input
            id="pat-file"
            type="file"
            accept="image/*"
            required={!editingLogoPath}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className={inputCls}
          />
        </Field>
        <Field label="Descrição" className="md:col-span-2">
          <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={2} className={inputCls} />
        </Field>
        <label className="col-span-full flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.ativo} onChange={(e) => setForm({ ...form, ativo: e.target.checked })} />
          Exibir no site
        </label>
        {error && <p className="col-span-full border-l-4 border-destructive bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
        <button type="submit" className="col-span-full justify-self-start bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground">
          {editingId ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      <div className="mt-12">
        <h2 className="heading-display mb-4 text-2xl">Cadastrados ({rows.length})</h2>
        {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : (
          <ul className="divide-y divide-border border border-border bg-card">
            {rows.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-20 bg-muted flex items-center justify-center">
                    {r.logo_url && logoUrls[r.logo_url] ? (
                      <img src={logoUrls[r.logo_url]} alt={r.nome} className="max-h-full max-w-full object-contain" />
                    ) : <span className="text-xs text-muted-foreground">sem logo</span>}
                  </div>
                  <div>
                    <p className="font-semibold">{r.nome} {!r.ativo && <span className="text-xs text-muted-foreground">(oculto)</span>}</p>
                    <p className="font-mono text-xs text-muted-foreground">ordem: {r.ordem}</p>
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
