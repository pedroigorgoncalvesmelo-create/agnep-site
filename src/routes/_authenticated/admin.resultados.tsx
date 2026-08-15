/*
  Arquivo: admin.resultados.tsx

  Propósito:
  - Componente de administração para gerenciar "resultados" (conquistas/hall da fama).
  - Permite listar, criar, editar e apagar resultados armazenados no Supabase.
  - Fornece um formulário para inserir/atualizar dados e uma lista com ações rápidas.

  Observações:
  - Comentários curtos e explicativos foram adicionados para ajudar desenvolvedores iniciantes.
  - A lógica e os nomes do código não foram alterados.
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { enviarAvisoConteudoNovoFn } from "@/lib/enviar-aviso.functions";

// Registra a rota de arquivo para o React Router, associando o componente AdminResultados
export const Route = createFileRoute("/_authenticated/admin/resultados")({
  component: AdminResultados,
});

// Tipagens baseadas no schema do Supabase para segurança de tipos
type Resultado = Database["public"]["Tables"]["resultados"]["Row"];
type Modalidade = Database["public"]["Enums"]["modalidade"];

// Estado inicial do formulário — usado para limpar e inicializar campos
const EMPTY = {
  atleta: "",
  modalidade: "jiu-jitsu" as Modalidade,
  competicao: "",
  colocacao: "",
  categoria: "",
  data_conquista: "",
  descricao: "",
  imagem_url: "",
};

function AdminResultados() {
  // Estados locais do componente
  // rows: lista de resultados carregados do banco
  const [rows, setRows] = useState<Resultado[]>([]);
  // loading: indicador de carregamento para operações de leitura
  const [loading, setLoading] = useState(true);
  // form: dados do formulário atual (criar/editar)
  const [form, setForm] = useState({ ...EMPTY });
  // editingId: id do resultado sendo editado (null se criando novo)
  const [editingId, setEditingId] = useState<string | null>(null);
  // saving: indicador de operação de gravação
  const [saving, setSaving] = useState(false);
  // error: mensagem de erro exibida ao usuário
  const [error, setError] = useState<string | null>(null);

  // Carrega resultados do Supabase e atualiza o estado
  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("resultados")
      .select("*")
      .order("data_conquista", { ascending: false });
    if (error) setError(error.message);
    setRows(data ?? []);
    setLoading(false);
  }

  // Carrega dados ao montar o componente
  useEffect(() => {
    load();
  }, []);

  // Reseta o formulário para o estado inicial (útil ao cancelar/apos salvar)
  function resetForm() {
    setForm({ ...EMPTY });
    setEditingId(null);
    setError(null);
  }

  // Preenche o formulário com os dados do resultado selecionado para edição
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
    });
    // Rola a página para o topo para foco no formulário
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Salva (cria ou atualiza) um resultado no Supabase
  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      atleta: form.atleta,
      modalidade: form.modalidade,
      competicao: form.competicao,
      colocacao: form.colocacao,
      categoria: form.categoria || null,
      data_conquista: form.data_conquista,
      descricao: form.descricao || null,
      imagem_url: form.imagem_url || null,
    };
    const res = editingId
      ? await supabase.from("resultados").update(payload).eq("id", editingId)
      : await supabase.from("resultados").insert(payload);
    setSaving(false);
    if (res.error) {
      setError(res.error.message);
      return;
    }
    // Após salvar, limpa o formulário e recarrega a lista
    resetForm();
    load();
    // Se foi um resultado NOVO (não edição), avisa automaticamente os inscritos
    if (!editingId) {
      enviarAvisoConteudoNovoFn({ data: { area: "resultados" } }).catch(() => {});
    }
  }

  // Remove um resultado do Supabase após confirmação do usuário
  async function remove(id: string) {
    if (!confirm("Apagar este resultado?")) return;
    const { error } = await supabase.from("resultados").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    // Recarrega a lista após remoção
    load();
  }

  // Render do componente com formulário e listagem de resultados
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow mb-2">Hall da Fama</p>
          <h1 className="heading-display text-4xl">Resultados</h1>
        </div>
        {editingId && (
          <button
            onClick={resetForm}
            className="border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-accent"
          >
            Cancelar edição
          </button>
        )}
      </div>

      <form
        onSubmit={save}
        className="mt-8 grid gap-4 bg-card p-6 ring-1 ring-border md:grid-cols-2"
      >
        <h2 className="heading-display col-span-full text-xl">
          {editingId ? "Editar conquista" : "Nova conquista"}
        </h2>

        <Field label="Atleta / Equipe *">
          <input
            required
            value={form.atleta}
            onChange={(e) => setForm({ ...form, atleta: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Modalidade *">
          <select
            value={form.modalidade}
            onChange={(e) => setForm({ ...form, modalidade: e.target.value as Modalidade })}
            className={inputCls}
          >
            <option value="jiu-jitsu">Jiu-Jitsu</option>
            <option value="xadrez">Xadrez</option>
            <option value="geral">Geral</option>
          </select>
        </Field>

        <Field label="Competição *" className="md:col-span-2">
          <input
            required
            value={form.competicao}
            onChange={(e) => setForm({ ...form, competicao: e.target.value })}
            className={inputCls}
            placeholder="Ex.: Mundial IBJJF — Las Vegas"
          />
        </Field>

        <Field label="Colocação *">
          <input
            required
            value={form.colocacao}
            onChange={(e) => setForm({ ...form, colocacao: e.target.value })}
            className={inputCls}
            placeholder="Ouro, Prata, Bronze, Campeã Geral..."
          />
        </Field>

        <Field label="Categoria">
          <input
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            className={inputCls}
            placeholder="Ex.: Juvenil · Pena"
          />
        </Field>

        <Field label="Data da conquista *">
          <input
            type="date"
            required
            value={form.data_conquista}
            onChange={(e) => setForm({ ...form, data_conquista: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Imagem (URL)">
          <input
            type="url"
            value={form.imagem_url}
            onChange={(e) => setForm({ ...form, imagem_url: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Descrição" className="md:col-span-2">
          <textarea
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            rows={3}
            className={inputCls}
          />
        </Field>

        {error && (
          <p className="col-span-full border-l-4 border-destructive bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}

        <div className="col-span-full">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground hover:brightness-110 disabled:opacity-50"
          >
            {saving ? "Salvando..." : editingId ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="heading-display mb-4 text-2xl">
          Resultados <span className="text-muted-foreground">({rows.length})</span>
        </h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : rows.length === 0 ? (
          <p className="bg-muted/40 p-6 text-sm text-muted-foreground">
            Nenhum resultado cadastrado ainda.
          </p>
        ) : (
          <ul className="divide-y divide-border border border-border bg-card">
            {rows.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <span className="bg-secondary px-2 py-0.5 text-secondary-foreground">
                      {r.modalidade}
                    </span>
                    <span className="bg-primary px-2 py-0.5 text-primary-foreground">
                      {r.colocacao}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(r.data_conquista + "T00:00:00").toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="mt-1 font-semibold">
                    {r.atleta} <span className="text-muted-foreground">— {r.competicao}</span>
                  </p>
                  {r.categoria && (
                    <p className="text-xs text-muted-foreground">{r.categoria}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => edit(r)}
                    className="border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-accent"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => remove(r.id)}
                    className="border border-destructive px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Apagar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Classe comum para inputs — evita repetição de strings de classe pelo componente
const inputCls =
  "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none";

/*
  Componente Field:
  - Componente simples para renderizar um rótulo (label) e seu filho (input/select/textarea).
  - Recebe label, children e className adicional (opcional).
*/
function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
