/*
  admin.home.tsx

  Página de administração para gerenciar os "números em destaque" exibidos na página inicial.
  - Carrega, edita, adiciona e remove registros da tabela "site_stats" via Supabase.
  - Mantém uma lista local (rows) para edição imediata e persiste as alterações ao salvar.
  - Utilizado pela rota /_authenticated/admin/home.
*/

import { createFileRoute } from "@tanstack/react-router";
// Hooks React para estado e efeitos colaterais
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader, Field, inputCls } from "@/components/admin-ui";

// Registra a rota de arquivo e associa o componente AdminHome a ela
export const Route = createFileRoute("/_authenticated/admin/home")({
  component: AdminHome,
});

// Tipo dos registros carregados da tabela site_stats
type Stat = { id: string; label: string; valor: string; ordem: number };

/*
  Componente AdminHome
  - Exibe e permite editar os "números em destaque".
  - A interação é feita localmente em `rows` e persistida no Supabase quando o usuário salva.
*/
function AdminHome() {
  // Lista de estatísticas exibidas e editáveis
  const [rows, setRows] = useState<Stat[]>([]);
  // Indicador de carregamento inicial
  const [loading, setLoading] = useState(true);
  // Indicador de salvamento em progresso
  const [saving, setSaving] = useState(false);
  // Mensagem de sucesso/erro exibida ao usuário
  const [msg, setMsg] = useState<string | null>(null);

  /*
    load
    - Busca os registros da tabela `site_stats` ordenados por `ordem`.
    - Atualiza o estado local com os dados retornados.
  */
  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("site_stats")
      .select("id,label,valor,ordem")
      .order("ordem");
    setRows((data ?? []) as Stat[]);
    setLoading(false);
  }

  // Executa o carregamento apenas na montagem do componente
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    update
    - Atualiza um registro localmente (optimistic update).
    - Não toca no backend até que o usuário acione "Salvar alterações".
  */
  function update(id: string, patch: Partial<Stat>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  /*
    saveAll
    - Envia atualizações para cada registro no servidor (Supabase).
    - Em caso de erro em qualquer registro, interrompe e exibe a mensagem de erro.
    - Mostra mensagem de sucesso ao final.
  */
  async function saveAll() {
    setSaving(true);
    setMsg(null);
    for (const r of rows) {
      const { error } = await supabase
        .from("site_stats")
        .update({ label: r.label, valor: r.valor, ordem: r.ordem })
        .eq("id", r.id);
      if (error) {
        setMsg(error.message);
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    setMsg("Salvo com sucesso.");
  }

  /*
    add
    - Insere um novo registro padrão na tabela e recarrega a lista.
    - O novo registro recebe ordem = rows.length + 1 por padrão.
  */
  async function add() {
    const { error } = await supabase
      .from("site_stats")
      .insert({ label: "Novo número", valor: "0", ordem: rows.length + 1 });
    if (error) {
      setMsg(error.message);
      return;
    }
    load();
  }

  /*
    remove
    - Pergunta confirmação ao usuário e remove o registro selecionado.
    - Recarrega a lista após remoção bem-sucedida.
  */
  async function remove(id: string) {
    if (!confirm("Apagar este número?")) return;
    const { error } = await supabase.from("site_stats").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    load();
  }

  return (
    <div>
      {/* Cabeçalho da área administrativa com ação para adicionar novo item */}
      <AdminHeader
        eyebrow="Página inicial"
        title="Números em destaque"
        action={
          <button
            onClick={add}
            className="border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-accent"
          >
            + Adicionar
          </button>
        }
      />

      {/* Descrição breve sobre o que esses números representam */}
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Edite os cartões de números exibidos logo abaixo do banner da página inicial (medalhas,
        atletas, títulos, projetos etc.).
      </p>

      {/* Estado de carregamento vs. lista de itens */}
      {loading ? (
        <p className="mt-8 text-sm text-muted-foreground">Carregando...</p>
      ) : (
        <div className="mt-8 space-y-4">
          {/* Lista de entradas editáveis */}
          {rows.map((r) => (
            <div
              key={r.id}
              className="grid gap-4 bg-card p-5 ring-1 ring-border md:grid-cols-[80px_1fr_1fr_auto] md:items-end"
            >
              {/* Campo Ordem: altera a ordem do cartão */}
              <Field label="Ordem">
                <input
                  type="number"
                  value={r.ordem}
                  onChange={(e) => update(r.id, { ordem: Number(e.target.value) })}
                  className={inputCls}
                />
              </Field>

              {/* Campo Rótulo: texto que aparece no cartão */}
              <Field label="Rótulo">
                <input
                  value={r.label}
                  onChange={(e) => update(r.id, { label: e.target.value })}
                  className={inputCls}
                />
              </Field>

              {/* Campo Valor: número/valor exibido no cartão */}
              <Field label="Valor">
                <input
                  value={r.valor}
                  onChange={(e) => update(r.id, { valor: e.target.value })}
                  className={inputCls}
                />
              </Field>

              {/* Botão para apagar o registro */}
              <button
                onClick={() => remove(r.id)}
                className="border border-destructive px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                Apagar
              </button>
            </div>
          ))}

          {/* Exibe mensagens de erro ou sucesso ao usuário */}
          {msg && (
            <p className="border-l-4 border-primary bg-primary/10 px-3 py-2 text-xs">{msg}</p>
          )}

          {/* Botão para persistir todas as alterações feitas localmente */}
          <button
            onClick={saveAll}
            disabled={saving || rows.length === 0}
            className="bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground hover:brightness-110 disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      )}
    </div>
  );
}
