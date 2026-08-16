/*
  Arquivo: admin.eventos.tsx
  Propósito:
  - Rota administrativa para gerenciar eventos do site AGNEP.
  - Fornece CRUD básico (listar, criar, editar, apagar) usando Supabase.
  - Contém formulário controlado para criar/editar eventos e lista de eventos cadastrados.
  Novidades desta versão:
  - Data de término opcional (data_fim) para campeonatos de vários dias.
  - Upload de arquivo PDF direto do computador (bucket "documentos" do Supabase Storage).
  - Comentários em português para explicar o que cada parte faz.
*/


import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { uploadFile, getSignedUrl } from "@/lib/storage";
import { enviarAvisoConteudoNovoFn } from "@/lib/enviar-aviso.functions";

export const Route = createFileRoute("/_authenticated/admin/eventos")({
  component: AdminEventos,
});

// Tipo que representa uma linha da tabela "eventos" no banco (feito a partir do tipo gerado do supabase)
type Evento = Database["public"]["Tables"]["eventos"]["Row"];
// Tipo para a enumeração de modalidade definida no banco
type Modalidade = Database["public"]["Enums"]["modalidade"];

/*
  Estado estendido do formulário (campos que NÃO vão direto para o banco):
  - data_fim: data/hora de término do evento (opcional)
  - pdf_file: o arquivo PDF selecionado no computador (File), pronto para upload
  - pdf_nome: nome do arquivo exibido na interface como feedback
  - pdf_url: path do PDF já salvo no bucket "documentos" (quando editando um evento com PDF)
*/
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
  pdf_file: File | null;
  pdf_nome: string;
  pdf_url: string;
};

/* Valores padrão para o formulário de evento.
   Usado tanto para limpeza quanto para inicialização do estado do formulário. */
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
  pdf_file: null,
  pdf_nome: "",
  pdf_url: "",
};

/* Converte uma string ISO (UTC) para o formato aceito pelo input type="datetime-local".
   O input espera algo como "YYYY-MM-DDTHH:MM" na hora local. */
function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* Componente principal da página de administração de eventos.
   - Controla estados do formulário e da lista.
   - Realiza operações no Supabase para listar, inserir, atualizar e apagar eventos.
   - Mantém feedback visual de carregamento, erro e salvamento. */
function AdminEventos() {
  // Lista de eventos carregados do banco
  const [rows, setRows] = useState<Evento[]>([]);
  // Indica se a lista está sendo carregada
  const [loading, setLoading] = useState(true);
  // Estado do formulário (campos controlados)
  const [form, setForm] = useState<FormState>({ ...EMPTY });
  // ID do evento que está sendo editado (null quando criando novo)
  const [editingId, setEditingId] = useState<string | null>(null);
  // Indica que uma ação de salvamento está em progresso
  const [saving, setSaving] = useState(false);
  // Mensagem de erro para exibir ao usuário
  const [error, setError] = useState<string | null>(null);

  // Carrega eventos do supabase, ordenados pela data (decrescente).
  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .order("data_evento", { ascending: false });
    if (error) setError(error.message);
    // data pode ser null, garantimos um array
    setRows(data ?? []);
    setLoading(false);
  }

  // Carrega os eventos ao montar o componente
  useEffect(() => {
    load();
  }, []);

  // Restaura o formulário ao estado inicial e limpa edição/erros
  function resetForm() {
    setForm({ ...EMPTY });
    setEditingId(null);
    setError(null);
    const el = document.getElementById("evento-pdf") as HTMLInputElement | null;
    if (el) el.value = "";
  }

  /* Preenche o formulário com os valores do evento selecionado para editar.
     Também converte a data ISO para o formato aceito pelo input datetime-local
     e rola a página para o topo para que o usuário veja o formulário. */
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
      pdf_file: null,
      pdf_nome: "",
      pdf_url: e.pdf_url ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* Handler de envio do formulário.
     O QUE:
      - Se houver um arquivo PDF selecionado, faz o upload para o bucket "documentos".
      - Monta o payload com os campos do formulário (data_fim é opcional).
      - Se editingId estiver setado, atualiza; caso contrário, insere novo registro.
     POR QUE:
      - Separar o upload do PDF da gravação no banco evita registros inconsistentes.
      - A data de término opcional permite campeonatos de vários dias. */
  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    setSaving(true);
    setError(null);

    let pdfPath: string | null = null;
    try {
      /* Se o admin escolheu um arquivo PDF no computador, envia ao Storage */
      if (form.pdf_file) {
        pdfPath = await uploadFile("documentos", form.pdf_file);
      } else if (form.pdf_url) {
        /* Mantém o PDF que já estava vinculado ao evento (em edições) */
        pdfPath = form.pdf_url;
      }
    } catch (e: any) {
      setSaving(false);
      setError(e.message);
      return;
    }

    const payload = {
      titulo: form.titulo,
      descricao: form.descricao || null,
      modalidade: form.modalidade,
      // converte o valor do input local para ISO (UTC) para armazenar no banco
      data_evento: new Date(form.data_evento).toISOString(),
      // data de término é OPCIONAL: só envia se o campo foi preenchido
      data_fim: form.data_fim ? new Date(form.data_fim).toISOString() : null,
      local: form.local || null,
      cidade: form.cidade || null,
      link_inscricao: form.link_inscricao || null,
      imagem_url: form.imagem_url || null,
      destaque: form.destaque,
      // caminho do PDF no bucket "documentos" (ou null se não houver)
      pdf_url: pdfPath,
    };
    const res = editingId
      ? await supabase.from("eventos").update(payload).eq("id", editingId)
      : await supabase.from("eventos").insert(payload);
    setSaving(false);
    if (res.error) {
      setError(res.error.message);
      return;
    }
    // Limpa o formulário e recarrega a lista para refletir mudanças
    resetForm();
    load();
    // Se foi um evento NOVO (não edição), avisa automaticamente os inscritos
    if (!editingId) {
      enviarAvisoConteudoNovoFn({ data: { area: "eventos" } }).catch(() => {});
    }
  }

  /* Remove um evento após confirmação do usuário.
     - Confirmação evita deleção acidental.
     - Recarrega lista após sucesso. */
  async function remove(id: string) {
    if (!confirm("Apagar este evento?")) return;
    const { error } = await supabase.from("eventos").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    load();
  }

  // Render da UI: formulário de criação/edição + lista de eventos
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow mb-2">Calendário</p>
          <h1 className="heading-display text-4xl">Eventos</h1>
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
          {editingId ? "Editar evento" : "Novo evento"}
        </h2>

        <Field label="Título *" className="md:col-span-2">
          <input
            required
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Modalidade *">
          <select
            value={form.modalidade}
            onChange={(e) => setForm({ ...form, modalidade: e.target.value as Modalidade })}
            className={inputCls}
          >
            <option value="geral">Institucional / Geral</option>
            <option value="jiu-jitsu">Jiu-Jitsu</option>
            <option value="xadrez">Xadrez</option>
          </select>
        </Field>

        {/*
          Data e hora de INÍCIO do evento (obrigatória).
          Input datetime-local: abre o calendário/relógio do navegador.
        */}
        <Field label="Data e hora de início *">
          <input
            type="datetime-local"
            required
            value={form.data_evento}
            onChange={(e) => setForm({ ...form, data_evento: e.target.value })}
            className={inputCls}
          />
        </Field>

        {/*
          Data e hora de TÉRMINO do evento (opcional):
          Útil para campeonatos que duram vários dias.
          Se deixado vazio, o evento é tratado como de um único dia
          na página pública (aparece só a data de início).
        */}
        <Field label="Data e hora de término (opcional)">
          <input
            type="datetime-local"
            value={form.data_fim}
            onChange={(e) => setForm({ ...form, data_fim: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Local">
          <input
            value={form.local}
            onChange={(e) => setForm({ ...form, local: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Cidade">
          <input
            value={form.cidade}
            onChange={(e) => setForm({ ...form, cidade: e.target.value })}
            className={inputCls}
          />
        </Field>

        <Field label="Link de inscrição" className="md:col-span-2">
          <input
            type="url"
            value={form.link_inscricao}
            onChange={(e) => setForm({ ...form, link_inscricao: e.target.value })}
            className={inputCls}
            placeholder="https://..."
          />
        </Field>

        <Field label="Imagem (URL)" className="md:col-span-2">
          <input
            type="url"
            value={form.imagem_url}
            onChange={(e) => setForm({ ...form, imagem_url: e.target.value })}
            className={inputCls}
            placeholder="https://..."
          />
        </Field>

        {/*
          Arquivo PDF do evento (opcional):
          Permite enviar o PDF direto do computador (ex.: regulamento,
          tabela do campeonato) em vez de apenas um link externo.
          O arquivo vai para o bucket "documentos" do Supabase Storage.
          Quando estamos editando um evento que já tem PDF, mostramos
          "✓ PDF do evento definido." como feedback.
        */}
        <Field label="Arquivo PDF do evento (opcional)" className="md:col-span-2">
          <input
            id="evento-pdf"
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setForm({ ...form, pdf_file: f, pdf_nome: f?.name ?? "" });
            }}
            className={inputCls}
          />
          {(form.pdf_url || form.pdf_nome) && (
            <p className="mt-2 text-xs text-emerald-300">
              {form.pdf_url
                ? "✓ PDF do evento definido."
                : `Arquivo selecionado: ${form.pdf_nome} (será enviado ao clicar em Cadastrar)`}
            </p>
          )}
        </Field>

        <Field label="Descrição" className="md:col-span-2">
          <textarea
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            rows={3}
            className={inputCls}
          />
        </Field>

        <label className="col-span-full flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.destaque}
            onChange={(e) => setForm({ ...form, destaque: e.target.checked })}
          />
          Destacar evento na home
        </label>

        {error && (
          <p className="col-span-full border-l-4 border-destructive bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}

        <div className="col-span-full flex gap-3">
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
          Eventos cadastrados <span className="text-muted-foreground">({rows.length})</span>
        </h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : rows.length === 0 ? (
          <p className="bg-muted/40 p-6 text-sm text-muted-foreground">
            Nenhum evento cadastrado ainda.
          </p>
        ) : (
          <ul className="divide-y divide-border border border-border bg-card">
            {rows.map((e) => (
              <li
                key={e.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <span className="bg-secondary px-2 py-0.5 text-secondary-foreground">
                      {e.modalidade}
                    </span>
                    {e.destaque && (
                      <span className="bg-primary px-2 py-0.5 text-primary-foreground">
                        Destaque
                      </span>
                    )}
                    <span className="text-muted-foreground">
                      {new Date(e.data_evento).toLocaleString("pt-BR")}
                      {e.data_fim
                        ? ` até ${new Date(e.data_fim).toLocaleString("pt-BR")}`
                        : ""}
                    </span>
                  </div>
                  <p className="mt-1 font-semibold">{e.titulo}</p>
                  {(e.local || e.cidade) && (
                    <p className="text-xs text-muted-foreground">
                      {[e.local, e.cidade].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => edit(e)}
                    className="border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-accent"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => remove(e.id)}
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

// Classe comum para inputs do formulário (apenas helper de estilo)
const inputCls =
  "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none";

/* Componente auxiliar para renderizar um rótulo + controle.
   Simplifica a marcação repetida do formulário. */
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
