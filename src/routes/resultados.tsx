/*
  Arquivo: resultados.tsx
  Propósito:
  - Rota /resultados do site AGNEP que exibe o histórico de conquistas, estatísticas e ranking interno.
  - Busca dados da tabela "resultados" no Supabase, processa estatísticas (ouros/pratas/bronzes/conquistas internacionais),
    agrupa por competição/ano e monta um ranking de atletas por modalidade.
  Observações:
  - Comentários explicam o que cada parte faz e por que é feita dessa forma (focados em desenvolvedores iniciantes).
  - Não altera lógica nem nomes existentes.
*/

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import podiumImg from "@/assets/podium.jpg";
import actionImg from "@/assets/action-jj.jpg";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Define a rota do arquivo para /resultados, incluindo head/meta e componente que será renderizado.
export const Route = createFileRoute("/resultados")({
  head: () => ({
    meta: [
      { title: "Resultados e Conquistas — AGNEP" },
      {
        name: "description",
        content:
          "Histórico de medalhas, troféus e títulos dos atletas e enxadristas da AGNEP em competições estaduais, nacionais e internacionais.",
      },
      { property: "og:title", content: "Resultados AGNEP" },
      {
        property: "og:description",
        content: "Hall da fama, ranking interno e destaque dos nossos campeões.",
      },
    ],
  }),
  component: Resultados,
});

// Tipo da linha da tabela "resultados" vindo das definições do Supabase.
// Isso ajuda o TypeScript a entender a forma dos dados manipulados no componente.
type Resultado = Database["public"]["Tables"]["resultados"]["Row"];

/* Funções utilitárias simples para detectar tipo de medalha.
   Usamos regex para cobrir diferentes formas de escrita (pt/en e números). */
// Retorna true se o texto representa ouro
function isGold(c: string) {
  return /ouro|gold|1|camp/i.test(c);
}
// Retorna true se o texto representa prata
function isSilver(c: string) {
  return /prata|silver|2/i.test(c);
}
// Retorna true se o texto representa bronze
function isBronze(c: string) {
  return /bronze|3/i.test(c);
}

/* Componente principal da página de Resultados.
   - Busca dados do Supabase
   - Calcula estatísticas e agrupamentos usando useMemo para evitar recomputações desnecessárias
   - Renderiza várias seções: estatísticas, histórico recente, ranking e seção visual final */
function Resultados() {
  // Estado local: lista de resultados e indicador de carregamento
  const [rows, setRows] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(true);

  // Efeito para buscar os resultados do Supabase ao montar o componente.
  // Ordena por data_conquista descendente para mostrar os mais recentes primeiro.
  useEffect(() => {
    supabase
      .from("resultados")
      .select("*")
      .order("data_conquista", { ascending: false })
      .then(({ data }) => {
        setRows(data ?? []);
        setLoading(false);
      });
  }, []);

  /* Estatísticas agregadas calculadas a partir das linhas.
     - Conta ouros, pratas, bronzes e competições internacionais.
     - useMemo evita recalcular sempre que o componente renderiza; só recalcula quando rows muda. */
  const stats = useMemo(() => {
    const g = rows.filter((r) => isGold(r.colocacao)).length;
    const p = rows.filter((r) => isSilver(r.colocacao)).length;
    const b = rows.filter((r) => isBronze(r.colocacao)).length;
    const internacionais = rows.filter((r) => /mundial|internacional|world/i.test(r.competicao)).length;
    return { g, p, b, internacionais };
  }, [rows]);

  /* Agrupa resultados por competição e ano.
     - Chave: "competicao__ano"
     - Mantém a ordem de inserção ao transformar o Map em array e limita aos 12 primeiros grupos.
     - Útil para mostrar histórico recente agrupado por evento/ano. */
  const byCompetition = useMemo(() => {
    const map = new Map<string, Resultado[]>();
    rows.forEach((r) => {
      const key = `${r.competicao}__${new Date(r.data_conquista).getFullYear()}`;
      const arr = map.get(key) ?? [];
      arr.push(r);
      map.set(key, arr);
    });
    return Array.from(map.entries()).slice(0, 12);
  }, [rows]);

  /* Calcula um ranking interno por atleta+modalidade.
     - Conta ouros/pratas/bronces por par atleta/modalidade.
     - Ordena por pontuação ponderada (ouro=3, prata=2, bronze=1) e pega os 10 melhores.
     - Esse ranking serve para destacar atletas com mais conquistas. */
  const ranking = useMemo(() => {
    const map = new Map<string, { athlete: string; modality: string; gold: number; silver: number; bronze: number }>();
    rows.forEach((r) => {
      const key = `${r.atleta}__${r.modalidade}`;
      const cur = map.get(key) ?? {
        athlete: r.atleta,
        modality: r.modalidade,
        gold: 0,
        silver: 0,
        bronze: 0,
      };
      if (isGold(r.colocacao)) cur.gold++;
      else if (isSilver(r.colocacao)) cur.silver++;
      else if (isBronze(r.colocacao)) cur.bronze++;
      map.set(key, cur);
    });
    return Array.from(map.values())
      .sort((a, b) => b.gold * 3 + b.silver * 2 + b.bronze - (a.gold * 3 + a.silver * 2 + a.bronze))
      .slice(0, 10);
  }, [rows]);

  return (
    <>
      {/* Cabeçalho da página com título e descrição */}
      <PageHeader
        editableId="resultados"
        eyebrow="Hall da Fama"
        titleTop="Resultados &"
        titleBottom="Conquistas"
        description="Cada medalha conta uma história de disciplina. Conheça os resultados dos atletas e enxadristas da AGNEP."
      />


      {/* Seção de estatísticas resumidas (ouro/prata/bronze/internacional) */}
      <section className="container-page py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: stats.g, l: "Medalhas de Ouro" },
            { v: stats.p, l: "Medalhas de Prata" },
            { v: stats.b, l: "Bronzes" },
            { v: stats.internacionais, l: "Conquistas Internacionais" },
          ].map((s) => (
            <div key={s.l} className="border-l-4 border-primary bg-card p-6 ring-1 ring-border">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {s.l}
              </span>
              <p className="mt-2 text-5xl font-black italic tracking-tighter">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de histórico recente com tratamento de loading e caso sem dados */}
      <section className="bg-muted/40 py-16">
        <div className="container-page">
          <p className="eyebrow mb-3">Histórico Recente</p>
          <h2 className="heading-display mb-10 text-4xl">Participações em destaque</h2>

          {loading ? (
            // Enquanto os dados estão sendo carregados
            <p className="text-sm text-muted-foreground">Carregando...</p>
          ) : byCompetition.length === 0 ? (
            // Caso não existam resultados cadastrados
            <p className="bg-card p-8 text-sm text-muted-foreground ring-1 ring-border">
              Nenhuma conquista cadastrada ainda.
            </p>
          ) : (
            // Lista de competições agrupadas (competicao + ano)
            <div className="space-y-8">
              {byCompetition.map(([key, items]) => {
                const year = key.split("__")[1];
                const first = items[0];
                return (
                  <article key={key} className="bg-card p-8 ring-1 ring-border">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                          {first.modalidade}
                        </span>
                        <h3 className="heading-display mt-1 text-2xl">{first.competicao}</h3>
                      </div>
                      <span className="font-mono text-3xl font-black italic">{year}</span>
                    </div>
                    <ul className="mt-6 divide-y divide-border border-t border-border">
                      {items.map((m) => (
                        <li
                          key={m.id}
                          className="grid gap-2 py-3 text-sm md:grid-cols-[1fr_1fr_140px] md:items-center"
                        >
                          <span className="font-semibold">{m.atleta}</span>
                          <span className="text-muted-foreground">{m.categoria ?? "—"}</span>
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary md:text-right">
                            {m.colocacao}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Seção de ranking interno: só renderiza se houverem itens no ranking */}
      {ranking.length > 0 && (
        <section className="container-page py-16">
          <p className="eyebrow mb-3">Ranking Interno</p>
          <h2 className="heading-display mb-10 text-4xl">Destaques AGNEP</h2>

          <div className="overflow-hidden bg-card ring-1 ring-border">
            <div className="hidden grid-cols-[60px_1fr_140px_80px_80px_80px] border-b border-border bg-muted/50 px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:grid">
              <span>#</span>
              <span>Atleta</span>
              <span>Modalidade</span>
              <span className="text-right">Ouro</span>
              <span className="text-right">Prata</span>
              <span className="text-right">Bronze</span>
            </div>
            <ul className="divide-y divide-border">
              {ranking.map((r, i) => (
                <li
                  key={r.athlete + r.modality}
                  className="grid gap-2 px-6 py-4 transition hover:bg-muted/30 md:grid-cols-[60px_1fr_140px_80px_80px_80px] md:items-center"
                >
                  <span className="font-mono text-xl font-black italic text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold">{r.athlete}</span>
                  <span className="text-sm text-muted-foreground">{r.modality}</span>
                  <span className="font-mono text-sm font-bold md:text-right">{r.gold}</span>
                  <span className="font-mono text-sm md:text-right">{r.silver}</span>
                  <span className="font-mono text-sm md:text-right">{r.bronze}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Seção final com imagens e mensagem institucional sobre os treinos e formação de atletas */}
      <section className="surface-navy-glow py-20">
        <span className="glow-accent" aria-hidden />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={podiumImg}
              alt="Pódio de campeonato"
              width={1280}
              height={1600}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-sm border border-primary/25 object-cover shadow-[0_24px_60px_oklch(0_0_0/0.5)]"
            />
            <img
              src={actionImg}
              alt="Combate de Jiu-Jitsu"
              width={1280}
              height={1600}
              loading="lazy"
              className="mt-12 aspect-[4/5] w-full rounded-sm border border-primary/25 object-cover shadow-[0_24px_60px_oklch(0_0_0/0.5)]"
            />
          </div>
          <div>
            <p className="eyebrow mb-3">Por trás das conquistas</p>
            <h2 className="heading-display text-4xl text-white md:text-5xl">
              Cada pódio começa<br />no treino de terça.
            </h2>
            <p className="mt-6 text-lg text-white/75">
              Acompanhamos cada atleta de perto. Resultados são consequência de método, repetição e
              ambiente saudável. É assim que a AGNEP forma campeões para a vida toda.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
