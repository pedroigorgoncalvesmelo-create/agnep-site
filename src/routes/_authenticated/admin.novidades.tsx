/*
  Arquivo: admin.novidades.tsx
  Propósito:
  - Página administrativa para gerenciar a área "Fique por Dentro das Novidades".
  - O admin cria publicações (título + texto) e pode PUBLICAR (torna visível no site e
    dispara o aviso por e-mail aos inscritos) ou DESPUBLICAR.
  - O admin também vê a lista de e-mails inscritos e pode removê-los.
  Observações:
  - O envio dos avisos por e-mail usa o cliente do navegador (chamada ao endpoint
    /api/enviar-aviso) — em produção, o envio real é feito pelo endpoint do servidor.
  - Comentários em português para desenvolvedores iniciantes.
*/
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader, Field } from "@/components/admin-ui";
import { enviarAvisoNovidadesFn } from "@/lib/enviar-aviso.functions";

/* Classes utilitárias para manter consistência com o restante do painel administrativo.
   Mantidas aqui para evitar dependências de componentes inexistentes em admin-ui. */
const cardCls = "rounded-sm bg-card p-6 shadow-brand ring-1 ring-border";
const inputCls =
  "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none";
const btnPrimary =
  "px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200 bg-primary text-primary-foreground hover:brightness-110 disabled:opacity-60";
const btnDanger =
  "px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200 bg-destructive text-destructive-foreground hover:brightness-110";

// Tipagens derivadas do schema do Supabase
type Novidade = {
  id: string;
  titulo: string;
  texto: string;
  publicado: boolean;
  created_at: string;
};
type Inscricao = { id: string; email: string; ativo: boolean; created_at: string };

// Registra a rota administrativa "/admin/novidades"
export const Route = createFileRoute("/_authenticated/admin/novidades")({
  component: AdminNovidades,
});

function AdminNovidades() {
  // Estados das publicações
  const [novidades, setNovidades] = useState<Novidade[]>([]);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  // Estados dos inscritos
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  // Feedback da interface
  const [mensagem, setMensagem] = useState<string | null>(null);

  // Carrega as publicações (todas, publicadas ou não) e os inscritos ativos.
  async function carregar() {
    const { data } = await supabase
      .from("novidades")
      .select("*")
      .order("created_at", { ascending: false });
    setNovidades((data ?? []) as Novidade[]);

    const { data: insc } = await supabase
      .from("inscricoes")
      .select("*")
      .eq("ativo", true)
      .order("created_at", { ascending: false });
    setInscricoes((insc ?? []) as Inscricao[]);
  }

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cria uma nova publicação e a publica imediatamente (avisando os inscritos).
  async function publicar(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim() || !texto.trim()) return;
    setEnviando(true);
    setMensagem(null);

    const { data, error } = await supabase
      .from("novidades")
      .insert({ titulo: titulo.trim(), texto: texto.trim(), publicado: true })
      .select()
      .single();

    if (error || !data) {
      setMensagem("Erro ao criar a publicação. Tente novamente.");
      setEnviando(false);
      return;
    }

    // Dispara o aviso por e-mail aos inscritos (server function — roda no servidor)
    try {
      const resultado = await enviarAvisoNovidadesFn({
        data: { titulo: data.titulo, texto: data.texto },
      });
      setMensagem(
        resultado.enviados > 0
          ? `Publicação criada e aviso enviado para ${resultado.enviados} inscrito(s)! ✓`
          : resultado.motivo === "nenhum inscrito"
            ? `Publicação criada no site ✓ — ainda não há e-mails inscritos para receber avisos. Compartilhe a página /novidades para captar inscritos.`
            : `Publicação criada no site ✓ — porém não foi possível enviar o e-mail de aviso agora. Verifique o guia GUIA-EMAIL-NOVIDADES.md.`
      );
    } catch {
      setMensagem(
        "Publicação criada no site ✓ — porém não foi possível enviar o e-mail de aviso agora. Verifique o guia GUIA-EMAIL-NOVIDADES.md."
      );
    }
    setTitulo("");
    setTexto("");
    setEnviando(false);
    await carregar();
  }

  // Alterna entre publicado e não publicado
  async function alternarPublicacao(n: Novidade) {
    if (n.publicado) {
      // Despublicar: apenas torna invisível no site
      await supabase.from("novidades").update({ publicado: false }).eq("id", n.id);
      setMensagem("Publicação despublicada (não aparece mais no site).");
    } else {
      // Publicar: torna visível e envia aviso aos inscritos
      const novoTitulo = prompt("Confirmar publicação? Você pode ajustar o título:", n.titulo) ?? n.titulo;
      const novoTexto = prompt("Confirme o texto (opcional):", n.texto) ?? n.texto;
      await supabase
        .from("novidades")
        .update({ publicado: true, titulo: novoTitulo, texto: novoTexto })
        .eq("id", n.id);
      try {
        const resultado = await enviarAvisoNovidadesFn({
          data: { titulo: novoTitulo, texto: novoTexto },
        });
        setMensagem(
          resultado.enviados > 0
            ? `Publicação ativada e aviso enviado para ${resultado.enviados} inscrito(s)! ✓`
            : "Publicação ativada no site ✓"
        );
      } catch {
        setMensagem(
          "Publicação ativada no site ✓ — porém não foi possível enviar o e-mail de aviso agora. Verifique o guia GUIA-EMAIL-NOVIDADES.md."
        );
      }
    }
    await carregar();
  }

  // Exclui permanentemente uma publicação
  async function excluir(id: string) {
    if (!confirm("Excluir esta publicação permanentemente?")) return;
    await supabase.from("novidades").delete().eq("id", id);
    setMensagem("Publicação excluída.");
    await carregar();
  }

  // Remove um inscrito da lista de avisos
  async function removerInscrito(insc: Inscricao) {
    if (!confirm(`Remover ${insc.email} da lista de avisos?`)) return;
    await supabase.from("inscricoes").update({ ativo: false }).eq("id", insc.id);
    setMensagem("Inscrito removido da lista.");
    await carregar();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminHeader eyebrow="Comunicação" title="Fique por Dentro — Avisos por E-mail" />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Fique por Dentro — Avisos por E-mail</h1>

        {mensagem && (
          <div className="mb-6 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-amber-300">
            {mensagem}
          </div>
        )}

        {/* Formulário para criar uma nova publicação */}
        <div className={`mb-8 ${cardCls}`}>
          <h2 className="mb-4 text-xl font-semibold">Criar nova publicação</h2>
          <form onSubmit={publicar} className="space-y-4">
            <Field label="Título da novidade">
              <input
                className={inputCls}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Inscrições abertas para o Torneio de Jiu-Jitsu"
                required
              />
            </Field>
            <Field label="Texto da publicação">
              <textarea
                className={`${inputCls} min-h-32`}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escreva aqui a novidade que os inscritos receberão por e-mail..."
                required
              />
            </Field>
            <button type="submit" disabled={enviando} className={btnPrimary}>
              {enviando ? "Publicando..." : "Publicar e avisar os inscritos"}
            </button>
          </form>
        </div>

        {/* Lista de publicações */}
        <div className={`mb-8 ${cardCls}`}>
          <h2 className="mb-4 text-xl font-semibold">Publicações ({novidades.length})</h2>
          {novidades.length === 0 ? (
            <p className="text-slate-400">Nenhuma publicação ainda.</p>
          ) : (
            <div className="space-y-3">
              {novidades.map((n) => (
                <div key={n.id} className="flex flex-col gap-2 rounded-lg border border-slate-700 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span
                        className={`mr-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          n.publicado ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-600/30 text-slate-400"
                        }`}
                      >
                        {n.publicado ? "Publicada" : "Rascunho"}
                      </span>
                      <strong>{n.titulo}</strong>
                      <span className="ml-2 text-xs text-slate-500">
                        {new Date(n.created_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => alternarPublicacao(n)}
                        className="rounded-md border border-slate-600 px-3 py-1 text-sm hover:border-amber-400"
                      >
                        {n.publicado ? "Despublicar" : "Publicar"}
                      </button>
                      <button onClick={() => excluir(n.id)} className={`${btnDanger} !px-3 !py-1 !text-sm`}>
                        Excluir
                      </button>
                    </div>
                  </div>
                  <p className="whitespace-pre-line text-sm text-slate-400">{n.texto}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lista de inscritos */}
        <div className={cardCls}>
          <h2 className="mb-4 text-xl font-semibold">Inscritos para receber avisos ({inscricoes.length})</h2>
          {inscricoes.length === 0 ? (
            <p className="text-slate-400">Nenhum e-mail inscrito ainda.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">E-mail</th>
                  <th className="pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Inscrito em</th>
                  <th className="pb-3 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {inscricoes.map((i) => (
                  <tr key={i.id} className="border-t border-border/50">
                    <td className="py-2">{i.email}</td>
                    <td className="py-2 text-sm text-slate-400">
                      {new Date(i.created_at).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-2 text-right">
                      <button onClick={() => removerInscrito(i)} className={`${btnDanger} !px-3 !py-1 !text-sm`}>
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
