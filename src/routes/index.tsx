/*
  Arquivo: src/routes/index.tsx
  Propósito: Página inicial (rota "/") do site AGNEP.
  Este arquivo exporta a rota principal e define o componente Index que renderiza
  o conteúdo da home: hero, estatísticas, missão/visão/valores, modalidades,
  próximos eventos, conquistas e CTA. Faz consultas ao Supabase para resultados
  e eventos e fornece um modal com detalhes estatísticos.
*/

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-agnep.jpg";
import jjImg from "@/assets/jiujitsu-class.jpg";
import xadrezImg from "@/assets/xadrez-class.jpg";
import podiumImg from "@/assets/podium.jpg";
import actionImg from "@/assets/action-jj.jpg";
import { EText, EImage } from "@/lib/site-content";

import logoAsset from "@/assets/agnep-logo.png.asset.json";

/*
  Define a rota raiz ("/") usando createFileRoute.
  head: metadados da página (title, description, og:*)
  component: componente que será renderizado para esta rota (Index).
*/
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AGNEP — Transformando Campeões no Esporte e na Vida" },
      {
        name: "description",
        content:
          "Associação Goiana Núcleo Esportivo e Paradesportivo. Jiu-Jitsu, Xadrez e desenvolvimento humano em Goiás.",
      },
      { property: "og:title", content: "AGNEP — Núcleo Esportivo e Paradesportivo" },
      {
        property: "og:description",
        content: "Disciplina do tatame, precisão do tabuleiro. Conheça nossas atividades.",
      },
    ],
  }),
  component: Index,
});

/* Valores institucionais exibidos na seção MVV (Missão/Visão/Valores). */
const VALUES = [
  {
    n: "01",
    key: "missao",
    title: "Missão",
    body: "Promover o desenvolvimento humano e esportivo através do Jiu-Jitsu, Xadrez e do paradesporto, transformando vidas pelo esporte e pela educação.",
  },
  {
    n: "02",
    key: "visao",
    title: "Visão",
    body: "Ser referência em Goiás na formação esportiva e educacional integrada, reconhecida pela técnica, pelo caráter e pela inclusão de seus atletas.",
  },
  {
    n: "03",
    key: "valores",
    title: "Valores",
    body: "Disciplina, respeito, inclusão, pensamento estratégico, resiliência e a busca incessante pela maestria técnica em todas as modalidades.",
  },
];

/* Mapeamento de identificadores de modalidade para labels legíveis. */
const MODALIDADE_LABEL: Record<string, string> = {
  "jiu-jitsu": "Jiu-Jitsu",
  xadrez: "Xadrez",
  geral: "Institucional",
};

/* Formata ISO date para uma string curta em pt-BR: "DD MMM YYYY". */
function formatEventDate(iso: string) {
  const d = new Date(iso);
  const day = d.toLocaleDateString("pt-BR", { day: "2-digit" });
  const month = d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "").toUpperCase();
  return `${day} ${month} ${d.getFullYear()}`;
}

/* Lista de conquistas exibidas na seção "Conquistas". */
const ACHIEVEMENTS = [
  {
    key: "a1",
    year: "2024",
    title: "Mundial de Jiu-Jitsu IBJJF (Las Vegas)",
    body: "3 medalhas de Ouro, 1 de Prata e 2 de Bronze na categoria Juvenil.",
  },
  {
    key: "a2",
    year: "2024",
    title: "Brasileiro de Xadrez Escolar",
    body: "Campeão absoluto Sub-14 e Vice-campeão Sub-16.",
  },
  {
    key: "a3",
    year: "2023",
    title: "Copa Centro-Oeste de Jiu-Jitsu",
    body: "Equipe campeã geral, com 12 pódios entre adultos e juvenis.",
  },
];

/* Tipagem para um resultado/registro competitivo. */
type Resultado = {
  atleta: string;
  colocacao: string;
  competicao: string;
  modalidade: string;
  categoria: string | null;
  data_conquista: string;
};

type StatKey = "ouro" | "atletas" | "titulos" | "projetos";

/* Verifica se uma colocação representa ouro/primeiro lugar.
   Útil para filtrar medalhas de ouro a partir de strings variadas. */
const isGold = (c: string | null) => {
  const v = (c ?? "").toLowerCase().trim();
  return v.includes("ouro") || v.startsWith("1");
};

/*
  Componente principal da página inicial.
  - Busca resultados e próximos eventos do Supabase ao montar.
  - Calcula estatísticas resumidas a partir dos resultados.
  - Renderiza várias seções estáticas/dinâmicas da home.
*/
function Index() {
  // estado com resultados carregados do banco
  const [rows, setRows] = useState<Resultado[]>([]);
  // controla qual bloco de estatísticas está aberto no modal
  const [open, setOpen] = useState<StatKey | null>(null);
  // próximos eventos a serem exibidos
  const [eventos, setEventos] = useState<
    { id: string; titulo: string; data_evento: string; local: string | null; cidade: string | null; modalidade: string; link_inscricao: string | null }[]
  >([]);

  useEffect(() => {
    // consulta resultados ordenados por data de conquista (mais recentes primeiro)
    supabase
      .from("resultados")
      .select("atleta,colocacao,competicao,modalidade,categoria,data_conquista")
      .order("data_conquista", { ascending: false })
      .then(({ data }) => setRows((data ?? []) as Resultado[]));
    // consulta próximos eventos a partir de hoje, limitando a 3 eventos
    supabase
      .from("eventos")
      .select("id,titulo,data_evento,local,cidade,modalidade,link_inscricao")
      .gte("data_evento", new Date().toISOString())
      .order("data_evento", { ascending: true })
      .limit(3)
      .then(({ data }) => setEventos((data ?? []) as typeof eventos));
  }, []);

  // cálculos derivativos para as estatísticas exibidas
  const medalhas = rows.filter((r) => isGold(r.colocacao));
  const atletasSet = new Set(rows.map((r) => (r.atleta ?? "").trim()).filter(Boolean));
  const titulos = rows.filter(
    (r) => (r.competicao ?? "").toLowerCase().includes("estadual") && isGold(r.colocacao)
  );
  const projetosSet = new Set(rows.map((r) => r.modalidade).filter(Boolean));

  const stats: { key: StatKey; label: string; valor: number }[] = [
    { key: "ouro", label: "Medalhas de Ouro", valor: medalhas.length },
    { key: "atletas", label: "Atletas Filiados", valor: atletasSet.size },
    { key: "titulos", label: "Títulos Estaduais", valor: titulos.length },
    { key: "projetos", label: "Projetos Ativos", valor: projetosSet.size },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-secondary">
        <EImage
          id="home.hero.image"
          defaultSrc={heroImg}
          alt="Atletas de Jiu-Jitsu e Xadrez em ação"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.15 0.03 260 / 0.95) 0%, oklch(0.15 0.03 260 / 0.7) 55%, oklch(0.15 0.03 260 / 0.3) 100%)",
          }}
        />
        <div className="container-page relative grid min-h-[85vh] items-center gap-12 py-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="max-w-2xl text-center lg:text-left">
            <EText
              as="p"
              id="home.hero.eyebrow"
              defaultValue="Associação Goiana · Núcleo Esportivo e Paradesportivo"
              className="eyebrow mb-5 text-primary"
            />
            <h1 className="heading-display text-5xl leading-[0.9] text-white sm:text-6xl md:text-7xl">
              <EText id="home.hero.title" defaultValue="Força física, precisão mental." as="span" />
            </h1>
            <EText
              as="p"
              multiline
              id="home.hero.lead"
              defaultValue="A AGNEP une a disciplina do Jiu-Jitsu à estratégia do Xadrez para formar cidadãos e atletas de alto nível no coração de Goiás."
              className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/75 lg:mx-0"
            />
            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                to="/eventos"
                className="bg-primary px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition hover:brightness-110"
              >
                <EText id="home.hero.cta1" defaultValue="Próximos Eventos" />
              </Link>
              <Link
                to="/sobre"
                className="border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
              >
                <EText id="home.hero.cta2" defaultValue="Conheça o Projeto" />
              </Link>
            </div>
          </div>

          {/* Logo emblema à direita */}
          <div className="relative mx-auto shrink-0 lg:mx-0">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -m-10 rounded-full blur-3xl opacity-60"
              style={{ background: "radial-gradient(circle, oklch(0.56 0.22 27 / 0.25) 0%, transparent 70%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -m-6 rounded-full blur-2xl opacity-50"
              style={{ background: "radial-gradient(circle, oklch(0.82 0.15 85 / 0.18) 0%, transparent 70%)" }}
            />
            <img
              src={logoAsset.url}
              alt="Emblema oficial da AGNEP"
              width={420}
              height={420}
              className="relative h-[220px] w-[220px] rounded-full object-contain drop-shadow-[0_20px_50px_oklch(0.56_0.22_27/0.35)] transition-transform duration-700 ease-out hover:scale-[1.03] sm:h-[280px] sm:w-[280px] lg:h-[340px] lg:w-[340px]"
            />
          </div>
        </div>

      </section>


      {/* STATS */}
      <section className="relative overflow-hidden bg-card">
        <div className="pointer-events-none absolute inset-0 bg-brand-soft opacity-70" />
        <div
          className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full blur-3xl animate-float-gentle"
          style={{ background: "oklch(0.56 0.22 27 / 0.12)" }}
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full blur-3xl animate-float-gentle"
          style={{ background: "oklch(0.78 0.14 80 / 0.12)" }}
        />
        <div className="container-page relative grid grid-cols-2 gap-4 py-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setOpen(s.key)}
              style={{ animationDelay: `${i * 90}ms` }}
              className="group animate-reveal-up card-lift flex flex-col items-start border-l-2 border-transparent bg-card/60 p-4 text-left backdrop-blur-sm hover:-translate-y-1 hover:border-primary hover:bg-card hover:shadow-[var(--shadow-brand)]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </span>
              <span className="mt-1 bg-gradient-to-br from-foreground to-secondary bg-clip-text text-4xl font-black italic tracking-tighter text-transparent md:text-5xl">
                {s.valor}
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-primary opacity-0 transition group-hover:opacity-100">
                Ver detalhes →
              </span>
            </button>
          ))}
        </div>
      </section>


      {open && (
        <StatsModal statKey={open} rows={rows} onClose={() => setOpen(null)} />
      )}

      {/* MISSION / VISION / VALUES */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-brand-soft opacity-90" />
        <div
          className="pointer-events-none absolute right-[-10%] top-10 h-80 w-80 rounded-full blur-3xl animate-float-gentle"
          style={{ background: "oklch(0.56 0.22 27 / 0.08)" }}
        />
        <div className="container-page relative">
          <div className="grid gap-12 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <div
                key={v.n}
                style={{ animationDelay: `${i * 120}ms` }}
                className="group animate-reveal-up card-lift space-y-4 rounded-sm bg-card/70 p-6 ring-1 ring-border backdrop-blur-sm hover:-translate-y-1 hover:shadow-[var(--shadow-brand)] hover:ring-primary/30"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-gradient-to-br from-primary to-[oklch(0.42_0.2_20)] font-black text-primary-foreground shadow-[var(--shadow-brand-red)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {v.n}
                </div>
                <EText
                  as="h3"
                  id={`home.mvv.${v.key}.title`}
                  defaultValue={v.title}
                  className="heading-display text-2xl"
                />
                <EText
                  as="p"
                  multiline
                  id={`home.mvv.${v.key}.body`}
                  defaultValue={v.body}
                  className="leading-relaxed text-muted-foreground"
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* MODALIDADES */}
      <section className="relative overflow-hidden py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.955 0.012 260) 0%, oklch(0.97 0.008 260) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 animate-gradient-pan"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, oklch(0.56 0.22 27 / 0.07), transparent 55%), radial-gradient(circle at 80% 70%, oklch(0.22 0.05 260 / 0.08), transparent 60%)",
          }}
        />
        <div className="container-page relative">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div className="animate-reveal-up">
              <EText as="p" id="home.mod.eyebrow" defaultValue="Modalidades" className="eyebrow mb-3" />
              <EText
                as="h2"
                id="home.mod.title"
                defaultValue="Dois caminhos. Um propósito."
                className="heading-display text-4xl md:text-5xl"
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                img: jjImg,
                idImg: "home.mod.jj.image",
                alt: "Aula de Jiu-Jitsu da AGNEP",
                idEye: "home.mod.jj.eyebrow",
                eye: "Modalidade Esportiva",
                idTitle: "home.mod.jj.title",
                title: "Jiu-Jitsu",
                idBody: "home.mod.jj.body",
                body: "Disciplina, autodefesa, condicionamento físico e formação de caráter para crianças, jovens e adultos em todas as faixas.",
              },
              {
                img: xadrezImg,
                idImg: "home.mod.xa.image",
                alt: "Aula de Xadrez da AGNEP",
                idEye: "home.mod.xa.eyebrow",
                eye: "Modalidade Educacional",
                idTitle: "home.mod.xa.title",
                title: "Xadrez",
                idBody: "home.mod.xa.body",
                body: "Raciocínio lógico, paciência, planejamento e desenvolvimento cognitivo em cada jogada. Aulas iniciantes a competitivas.",
              },
            ].map((m, i) => (
              <article
                key={m.idTitle}
                style={{ animationDelay: `${i * 140}ms` }}
                className="group card-lift relative animate-reveal-up overflow-hidden bg-card shadow-sm ring-1 ring-border hover:-translate-y-1 hover:shadow-[var(--shadow-brand)] hover:ring-primary/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <EImage
                    id={m.idImg}
                    defaultSrc={m.img}
                    alt={m.alt}
                    width={1280}
                    height={896}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-6 h-[3px] w-16 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
                </div>
                <div className="p-8">
                  <EText
                    as="p"
                    id={m.idEye}
                    defaultValue={m.eye}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary"
                  />
                  <EText
                    as="h3"
                    id={m.idTitle}
                    defaultValue={m.title}
                    className="heading-display mt-2 text-3xl transition-transform duration-500 group-hover:translate-x-1"
                  />
                  <EText
                    as="p"
                    multiline
                    id={m.idBody}
                    defaultValue={m.body}
                    className="mt-4 text-muted-foreground"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* EVENTOS */}
      <section className="surface-navy-glow py-24">
        <span className="glow-accent" aria-hidden />
        <div className="container-page relative">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <EText as="p" id="home.ev.eyebrow" defaultValue="Calendário" className="eyebrow mb-3" />
              <EText
                as="h2"
                id="home.ev.title"
                defaultValue="Próximas Batalhas"
                className="heading-display text-4xl text-white md:text-5xl"
              />
            </div>
            <Link
              to="/eventos"
              className="border-b-2 border-primary pb-1 text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-primary"
            >
              Ver calendário completo →
            </Link>
          </div>
          {eventos.length === 0 ? (
            <div className="bg-white/5 p-12 text-center text-sm text-white/70">
              Nenhum evento cadastrado no momento. Volte em breve para conferir o calendário oficial.
            </div>
          ) : (
            <div className="grid gap-px bg-white/5 md:grid-cols-3">
              {eventos.map((e) => (
                <article key={e.id} className="group bg-secondary p-8 transition hover:bg-primary">
                  <div className="mb-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/80">
                    <span>{formatEventDate(e.data_evento)}</span>
                    <span className="bg-white/15 px-2 py-0.5">
                      {MODALIDADE_LABEL[e.modalidade] ?? e.modalidade}
                    </span>
                  </div>
                  <h3 className="heading-display text-2xl text-white transition-transform group-hover:translate-x-1">
                    {e.titulo}
                  </h3>
                  {(e.local || e.cidade) && (
                    <p className="mt-3 text-sm text-white/55 group-hover:text-white/85">
                      {[e.local, e.cidade].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {e.link_inscricao ? (
                    <a
                      href={e.link_inscricao}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 block w-full border border-white/20 py-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white group-hover:bg-white group-hover:text-primary"
                    >
                      Inscrições
                    </a>
                  ) : (
                    <Link
                      to="/eventos"
                      className="mt-8 block w-full border border-white/20 py-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white group-hover:bg-white group-hover:text-primary"
                    >
                      Detalhes
                    </Link>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONQUISTAS */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-brand-soft opacity-80" />
        <div
          className="pointer-events-none absolute right-[-8%] top-1/3 h-72 w-72 rounded-full blur-3xl animate-float-gentle"
          style={{ background: "oklch(0.78 0.14 80 / 0.12)" }}
        />
        <div className="container-page relative grid items-center gap-16 lg:grid-cols-2">

          <div className="relative">
            <div className="pointer-events-none absolute -left-6 -top-10 select-none text-[120px] font-black uppercase leading-none text-foreground/[0.04]">
              Vitória
            </div>
            <EText as="p" id="home.hall.eyebrow" defaultValue="Hall da Fama" className="eyebrow relative mb-4" />
            <h2 className="heading-display relative text-4xl md:text-5xl">
              <EText id="home.hall.title" defaultValue="Conquistas e Reconhecimento" />
            </h2>
            <EText
              as="p"
              multiline
              id="home.hall.lead"
              defaultValue="Nossos atletas não apenas competem — eles dominam. A AGNEP orgulha-se de formar campeões estaduais, brasileiros e internacionais."
              className="relative mt-6 text-lg text-muted-foreground"
            />
            <div className="relative mt-10 space-y-4">
              {ACHIEVEMENTS.map((a) => (
                <div
                  key={a.key}
                  className="flex items-start gap-4 bg-card p-5 shadow-sm ring-1 ring-border"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-primary/10 font-mono text-sm font-bold text-primary">
                    <EText id={`home.hall.${a.key}.year`} defaultValue={a.year} />
                  </div>
                  <div>
                    <EText
                      as="h4"
                      id={`home.hall.${a.key}.title`}
                      defaultValue={a.title}
                      className="text-sm font-bold uppercase tracking-wide"
                    />
                    <EText
                      as="p"
                      multiline
                      id={`home.hall.${a.key}.body`}
                      defaultValue={a.body}
                      className="mt-1 text-sm text-muted-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/resultados"
              className="mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:brightness-110"
            >
              Ver todos os resultados →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <EImage
              id="home.hall.image1"
              defaultSrc={podiumImg}
              alt="Atletas no pódio"
              width={1280}
              height={1600}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <EImage
              id="home.hall.image2"
              defaultSrc={actionImg}
              alt="Atleta de Jiu-Jitsu em ação"
              width={1280}
              height={1600}
              loading="lazy"
              className="mt-12 aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        {/* Textura padrão do footer: azul marinho com brilho dourado (sem tom vermelho) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 15% 30%, oklch(0.68 0.14 72 / 0.12), transparent 55%), radial-gradient(circle at 85% 80%, oklch(0.30 0.05 260 / 0.2), transparent 60%)",
          }}
        />
        <div
          className="animate-float-gentle pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: "oklch(0.30 0.05 260 / 0.4)",
          }}
        />
        <div
          className="animate-float-gentle pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "oklch(0.68 0.14 72 / 0.14)",
          }}
        />
        <div className="container-page relative flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center">
          <div className="max-w-2xl animate-fade-in">
            <EText
              as="p"
              id="home.cta.eyebrow"
              defaultValue="Transformando campeões"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary"
            />
            <EText
              as="h2"
              id="home.cta.title"
              defaultValue="Faça parte da AGNEP."
              className="heading-display mt-3 text-4xl text-white md:text-5xl"
            />
            <EText
              as="p"
              multiline
              id="home.cta.body"
              defaultValue="Inscreva-se nas nossas aulas, apoie o projeto ou conheça nossa sede em Itumbiara."
              className="mt-4 text-white/85"
            />
          </div>
          <Link
            to="/contato"
            className="group relative overflow-hidden bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary shadow-[0_10px_40px_-10px_oklch(0.56_0.22_27/0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-10px_oklch(0.56_0.22_27/0.9)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative inline-flex items-center gap-2">
              <EText id="home.cta.button" defaultValue="Entrar em contato" />
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Inscrição de novidades — destaque na home */}
      <section className="relative overflow-hidden bg-background">
        {/* Textura padrão do projeto: azul marinho com brilho dourado animado */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 20% 40%, oklch(0.68 0.14 72 / 0.10), transparent 55%), radial-gradient(circle at 80% 70%, oklch(0.30 0.05 260 / 0.15), transparent 60%)",
          }}
        />
        <div
          className="animate-float-gentle pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "oklch(0.68 0.14 72 / 0.12)" }}
        />
        <div className="container-page relative flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-center">
          <div className="max-w-2xl animate-fade-in">
            <EText
              as="p"
              id="home.novidades.eyebrow"
              defaultValue="Comunicação"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary"
            />
            <EText
              as="h2"
              id="home.novidades.title"
              defaultValue="Fique por Dentro de tudo."
              className="heading-display mt-3 text-4xl md:text-5xl"
            />
            <EText
              as="p"
              multiline
              id="home.novidades.body"
              defaultValue="Cadastre seu e-mail abaixo e receba uma notificação sempre que o site for atualizado — novos resultados, fotos, eventos, documentos e publicações da AGNEP."
              className="mt-4 text-muted-foreground"
            />
          </div>
          <HomeNovidadesForm />
        </div>
      </section>

    </>
  );
}

/*
  Formulário de inscrição de novidades exibido na página inicial.
  Reutiliza a mesma lógica da página /novidades: valida o formato do e-mail,
  insere na tabela `inscricoes` e trata o caso de e-mail já cadastrado (unique).
*/
function HomeNovidadesForm() {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  async function handleInscrever(e: React.FormEvent) {
    e.preventDefault();
    setMensagem(null);
    const emailLimpo = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      setMensagem("Por favor, digite um e-mail válido.");
      return;
    }
    setEnviando(true);
    const { error } = await supabase.from("inscricoes").insert({ email: emailLimpo, ativo: true });
    setEnviando(false);
    if (error) {
      // E-mail já inscrito (viola a restrição unique) — tratamos como sucesso amigável
      if (error?.code === "23505") {
        setMensagem("Este e-mail já está inscrito! Você será avisado sempre que o site for atualizado. 🎉");
      } else {
        const det = error ? `${error.message ?? ""}${error.details ? ` (${error.details})` : ""}` : "";
        setMensagem(`Não foi possível concluir a inscrição (código ${error?.code ?? "?"}). ${det}`);
        console.error("[inscricao] erro:", error);
      }
    } else {
      setMensagem("Inscrição realizada! Você receberá um aviso por e-mail sempre que o site for atualizado. 🎉");
      setEmail("");
    }
  }

  return (
    <form onSubmit={handleInscrever} className="w-full max-w-md animate-fade-in">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu e-mail"
          required
          className="flex-1 rounded-lg border border-border bg-card px-4 py-3 focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={enviando}
          className="group relative overflow-hidden rounded-lg bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">{enviando ? "Enviando..." : "Receber"}</span>
        </button>
      </div>
      {mensagem && <p className="mt-3 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">{mensagem}</p>}
    </form>
  );
}

/* Metadados para cada tipo de estatística exibida no modal. */
const STAT_META: Record<StatKey, { title: string; subtitle: string }> = {
  ouro: { title: "Medalhas de Ouro", subtitle: "Todas as conquistas de 1º lugar dos nossos atletas." },
  atletas: { title: "Atletas Filiados", subtitle: "Atletas com pelo menos um resultado registrado." },
  titulos: { title: "Títulos Estaduais", subtitle: "Ouros conquistados em competições estaduais." },
  projetos: { title: "Projetos Ativos", subtitle: "Modalidades em atividade na AGNEP." },
};

/*
  Modal que exibe detalhes de uma estatística selecionada.
  - Fecha ao clicar fora, ao pressionar Escape ou no botão "Fechar".
  - Bloqueia rolagem do body enquanto aberto para manter foco.
  - Recebe statKey para escolher o conteúdo a renderizar.
*/
function StatsModal({
  statKey,
  rows,
  onClose,
}: {
  statKey: StatKey;
  rows: Resultado[];
  onClose: () => void;
}) {
  useEffect(() => {
    // fecha o modal ao pressionar Escape e bloqueia rolagem do body
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const meta = STAT_META[statKey];

  let body: React.ReactNode = null;
  if (statKey === "ouro") {
    // lista de medalhas de ouro
    const list = rows.filter((r) => isGold(r.colocacao));
    body = <ResultsList items={list} empty="Nenhuma medalha de ouro registrada ainda." />;
  } else if (statKey === "titulos") {
    // títulos estaduais (filtros por nome da competição)
    const list = rows.filter(
      (r) => (r.competicao ?? "").toLowerCase().includes("estadual") && isGold(r.colocacao)
    );
    body = <ResultsList items={list} empty="Nenhum título estadual registrado ainda." />;
  } else if (statKey === "atletas") {
    // agrupa resultados por atleta e ordena por número de conquistas
    const byAthlete = new Map<string, Resultado[]>();
    rows.forEach((r) => {
      const key = (r.atleta ?? "").trim();
      if (!key) return;
      const arr = byAthlete.get(key) ?? [];
      arr.push(r);
      byAthlete.set(key, arr);
    });
    const entries = Array.from(byAthlete.entries()).sort((a, b) => b[1].length - a[1].length);
    body = entries.length === 0 ? (
      <p className="p-6 text-sm text-muted-foreground">Nenhum atleta registrado ainda.</p>
    ) : (
      <ul className="divide-y divide-border">
        {entries.map(([atleta, items]) => {
          const modalidades = Array.from(new Set(items.map((i) => i.modalidade)));
          return (
            <li key={atleta} className="flex items-center justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <p className="truncate font-semibold">{atleta}</p>
                <p className="text-xs text-muted-foreground">{modalidades.join(" · ")}</p>
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                {items.length} conquista{items.length > 1 ? "s" : ""}
              </span>
            </li>
          );
        })}
      </ul>
    );
  } else {
    // agrupa por modalidade (projetos) e exibe número de atletas e conquistas
    const byMod = new Map<string, Resultado[]>();
    rows.forEach((r) => {
      const arr = byMod.get(r.modalidade) ?? [];
      arr.push(r);
      byMod.set(r.modalidade, arr);
    });
    const entries = Array.from(byMod.entries());
    body = entries.length === 0 ? (
      <p className="p-6 text-sm text-muted-foreground">Nenhum projeto registrado ainda.</p>
    ) : (
      <ul className="divide-y divide-border">
        {entries.map(([mod, items]) => {
          const atletas = new Set(items.map((i) => (i.atleta ?? "").trim())).size;
          return (
            <li key={mod} className="flex items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="font-semibold capitalize">{mod}</p>
                <p className="text-xs text-muted-foreground">
                  {atletas} atleta{atletas === 1 ? "" : "s"} · {items.length} conquista
                  {items.length === 1 ? "" : "s"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-2xl flex-col bg-card ring-1 ring-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-border p-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Detalhes
            </p>
            <h3 className="heading-display mt-1 text-2xl">{meta.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{meta.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-accent"
          >
            Fechar
          </button>
        </div>
        <div className="overflow-y-auto">{body}</div>
      </div>
    </div>
  );
}

/*
  Componente de lista de resultados genérica.
  Recebe items (Resultado[]) e uma mensagem 'empty' para quando não houver itens.
*/
function ResultsList({ items, empty }: { items: Resultado[]; empty: string }) {
  if (items.length === 0) {
    return <p className="p-6 text-sm text-muted-foreground">{empty}</p>;
  }
  return (
    <ul className="divide-y divide-border">
      {items.map((r, i) => (
        <li key={i} className="px-5 py-4">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <span className="bg-primary px-2 py-0.5 text-primary-foreground">{r.colocacao}</span>
            <span className="bg-secondary px-2 py-0.5 text-secondary-foreground">
              {r.modalidade}
            </span>
            <span className="text-muted-foreground">
              {new Date(r.data_conquista + "T00:00:00").toLocaleDateString("pt-BR")}
            </span>
          </div>
          <p className="mt-1.5 font-semibold">{r.atleta}</p>
          <p className="text-sm text-muted-foreground">
            {r.competicao}
            {r.categoria ? ` · ${r.categoria}` : ""}
          </p>
        </li>
      ))}
    </ul>
  );
}
