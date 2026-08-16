/*
  Arquivo: novidades.tsx
  Propósito:
  - Página pública "Fique por Dentro das Novidades" da AGNEP.
  - Lista as publicações feitas pelos administradores (tabela `novidades`, apenas publicadas).
  - Permite que visitantes se inscrevam com o e-mail para receber avisos de novas publicações.
  Observações:
  - Usa o padrão visual do site (azul marinho + dourado, textura animada).
  - Comentários em português para desenvolvedores iniciantes.
*/
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/page-header";
import type { Database } from "@/integrations/supabase/types";

// Tipagem derivada do schema do Supabase para a tabela novidades
type Novidade = Database["public"]["Tables"]["novidades"]["Row"];

// Registra a rota pública "/novidades" e associa o componente NovidadesPage.
// head: define título, descrição e metatags Open Graph para SEO.
export const Route = createFileRoute("/novidades")({
  head: () => ({
    meta: [
      { title: "Fique por Dentro — AGNEP" },
      {
        name: "description",
        content: "Fique por dentro de tudo que a AGNEP publica. Inscreva-se com seu e-mail e receba avisos de novas publicações.",
      },
      { property: "og:title", content: "Fique por Dentro — AGNEP" },
      {
        property: "og:description",
        content: "Receba avisos por e-mail sempre que publicarmos algo novo na AGNEP.",
      },
    ],
  }),
  component: NovidadesPage,
});

function NovidadesPage() {
  // Estado: lista de publicações publicadas
  const [novidades, setNovidades] = useState<Novidade[]>([]);
  const [loading, setLoading] = useState(true);
  // Estado do formulário de inscrição
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erroInscricao, setErroInscricao] = useState<string | null>(null);

  // Carrega as novidades publicadas do banco, ordenadas da mais recente para a mais antiga.
  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase
        .from("novidades")
        .select("*")
        .eq("publicado", true)
        .order("created_at", { ascending: false });
      if (mounted) {
        setNovidades(data ?? []);
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Envia o e-mail do visitante para a tabela `inscricoes` do Supabase.
  async function handleInscrever(e: React.FormEvent) {
    e.preventDefault();
    setMensagem(null);
    setErroInscricao(null);
    const emailLimpo = email.trim().toLowerCase();
    // Validação simples de formato de e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      setErroInscricao("Por favor, digite um e-mail válido.");
      return;
    }
    setEnviando(true);
    // Grava a inscrição sem o .select(): assim não exige política SELECT para o visitante anônimo.
    const { error } = await supabase.from("inscricoes").insert({ email: emailLimpo, ativo: true });
    setEnviando(false);
    if (error) {
      // Se o e-mail já está inscrito (viola unique), tratamos como sucesso amigável
      if (error?.code === "23505") {
        setMensagem("Este e-mail já está inscrito! Você receberá os avisos das novidades. 🎉");
      } else {
        // Exibe o código real do erro do Supabase para facilitar o diagnóstico
        const detalhe = error ? `${error.message ?? ""}${error.details ? ` (${error.details})` : ""}` : "";
        setErroInscricao(
          `Não foi possível concluir a inscrição (código ${error?.code ?? "?"}). ${detalhe}`
        );
        // Mostra o erro completo no console do navegador para o diagnóstico
        console.error("[inscricao] erro:", error);
      }
    } else {
      setMensagem("Inscrição realizada com sucesso! Você será avisado por e-mail sempre que houver uma nova publicação. 🎉");
      setEmail("");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Cabeçalho padronizado do site (navy + dourado, textura animada), igual às demais páginas */}
      <PageHeader
        editableId="novidades"
        eyebrow="Comunicação"
        titleTop="Fique por"
        titleBottom="Dentro."
        description="Receba avisos por e-mail sempre que publicarmos algo novo na AGNEP — torneios, resultados, eventos e muito mais."
      />

      {/* Formulário de inscrição */}
      <section className="relative mx-auto max-w-2xl px-6 -mt-8 mb-12">
        <div className="rounded-xl border border-amber-400/30 bg-[#12223a] p-8 shadow-2xl">
          <h2 className="mb-2 text-2xl font-bold">Receba os avisos</h2>
          <p className="mb-6 text-slate-300">
            Cadastre seu e-mail abaixo. Não enviamos spam — apenas avisos de tudo que for publicado na AGNEP.
          </p>
          <form onSubmit={handleInscrever} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu e-mail"
              className="flex-1 rounded-lg border border-slate-600 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={enviando}
              className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-6 py-3 font-bold text-slate-900 transition hover:brightness-110 disabled:opacity-60"
            >
              {enviando ? "Enviando..." : "Receber"}
            </button>
          </form>
          {mensagem && <p className="mt-4 rounded-lg bg-emerald-500/15 px-4 py-3 text-emerald-300">{mensagem}</p>}
          {erroInscricao && <p className="mt-4 rounded-lg bg-red-500/15 px-4 py-3 text-red-300">{erroInscricao}</p>}
        </div>
      </section>

      {/* Lista de publicações */}
      <section className="mx-auto mb-20 max-w-4xl px-6">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-700" />
          <h2 className="text-2xl font-bold text-amber-400">Últimas publicações</h2>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        {loading ? (
          <p className="py-16 text-center text-slate-400">Carregando publicações...</p>
        ) : novidades.length === 0 ? (
          /*
            Estado vazio: em vez do retângulo cinza, exibe um botão amarelo
            centralizado "Instagram" que leva direto ao perfil da AGNEP.
          */
          <div className="flex justify-center py-12">
            <a
              href="https://www.instagram.com/agnep_?igsh=MXVqbjQxbjlla3F5aw=="
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-12 py-5 text-center font-bold text-slate-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:from-amber-400 hover:to-amber-300 hover:shadow-amber-400/30"
            >
              Instagram
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {novidades.map((n) => (
              <article key={n.id} className="rounded-xl border border-slate-700 bg-slate-900/50 p-6 shadow-lg transition hover:border-amber-400/40">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-400">
                    Novo no site
                  </span>
                  <span className="text-sm text-slate-500">
                    {new Date(n.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold">{n.titulo}</h3>
                <p className="whitespace-pre-line text-slate-300">{n.texto}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
