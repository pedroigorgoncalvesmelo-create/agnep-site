/*
  Arquivo: eventos.tsx
  Propósito:
  - Rota/Componente da página "Eventos" do site AGNEP.
  - Lista eventos do calendário, permite filtragem por modalidade e exibe um calendário mensal.
  - Busca dados do Supabase e apresenta visualização em lista e calendário.
  Observações:
  - Comentários explicativos foram adicionados para facilitar a manutenção por desenvolvedores iniciantes.
*/

 // Importa utilitários de roteamento e hooks do React
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
// Componentes e integrações do projeto
import { PageHeader } from "@/components/page-header";
import { supabase } from "@/integrations/supabase/client";
import { getSignedUrl } from "@/lib/storage";
import type { Database } from "@/integrations/supabase/types";

// Define a rota de página usando a API do react-router do projeto
export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Calendário de Eventos — AGNEP" },
      {
        name: "description",
        content:
          "Calendário de eventos da AGNEP: campeonatos de Jiu-Jitsu, torneios de Xadrez, seminários e graduações.",
      },
      { property: "og:title", content: "Eventos AGNEP" },
      {
        property: "og:description",
        content: "Próximos campeonatos, torneios e atividades da AGNEP em Goiás.",
      },
    ],
  }),
  component: Eventos,
});

 // Aliás de tipo para uma linha da tabela "eventos" vinda do Supabase
type Evento = Database["public"]["Tables"]["eventos"]["Row"];

/* Lista de modalidades usadas para filtragem.
   - v: valor usado no estado/filtragem
   - l: label exibida no botão
*/
const MODALITIES = [
  { v: "todas", l: "Todas" },
  { v: "jiu-jitsu", l: "Jiu-Jitsu" },
  { v: "xadrez", l: "Xadrez" },
  { v: "geral", l: "Institucional" },
] as const;

/* formata partes da data ISO para exibição legível.
   Retorna dia, mês (abreviado e maiúsculo), ano e hora formatada.
   Usamos localização "pt-BR" para formato brasileiro.
*/
function formatFullDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* Abre o PDF do evento em nova aba via URL assinada do Storage.
   Usamos URL assinada (temporária) para não deixar o arquivo público. */
async function openPdf(pdfUrl: string) {
  const url = await getSignedUrl("documentos", pdfUrl);
  if (url) window.open(url, "_blank");
}

function formatDateParts(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("pt-BR", { day: "2-digit" }),
    month: d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "").toUpperCase(),
    year: d.getFullYear(),
    time: d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
  };
}

/* Componente de calendário mensal.
   - Recebe todos os eventos e exibe os do mês selecionado pelo cursor.
   - Permite navegar entre meses.
*/
function MonthCalendar({ events }: { events: Evento[] }) {
  const now = new Date();
  // cursor representa o primeiro dia do mês atualmente exibido no calendário
  const [cursor, setCursor] = useState(new Date(now.getFullYear(), now.getMonth(), 1));

  // Rótulo do mês (ex: "março de 2026")
  const monthLabel = cursor.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  // Dia da semana do primeiro dia do mês (0 = domingo)
  const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
  // Quantidade de dias no mês atual do cursor
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  // Monta array para preencher o grid do calendário, incluindo células vazias antes do primeiro dia
  const days = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1,
  );

  /* Agrupa eventos por dia do mês para o mês/ano do cursor.
     useMemo evita recomputação desnecessária quando events ou cursor não mudam.
  */
  const eventByDay = useMemo(() => {
    const map = new Map<number, Evento[]>();
    events.forEach((e) => {
      const d = new Date(e.data_evento);
      // Considera somente eventos do mesmo mês/ano do cursor
      if (d.getMonth() === cursor.getMonth() && d.getFullYear() === cursor.getFullYear()) {
        const arr = map.get(d.getDate()) ?? [];
        arr.push(e);
        map.set(d.getDate(), arr);
      }
    });
    return map;
  }, [events, cursor]);

  return (
    <div className="bg-card p-6 ring-1 ring-border">
      {/* Cabeçalho do calendário com controles de navegação */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="heading-display text-xl capitalize">{monthLabel}</h3>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Mês anterior"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="border border-border px-3 py-1 text-sm hover:bg-accent"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Próximo mês"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="border border-border px-3 py-1 text-sm hover:bg-accent"
          >
            →
          </button>
        </div>
      </div>

      {/* Cabeçalho dos dias da semana */}
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Grid de dias do mês; cada célula pode conter o dia e um evento (o primeiro) */}
      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div
            key={i}
            className={`aspect-square border border-border/60 p-1.5 text-sm ${
              d ? "bg-background" : "border-transparent bg-transparent"
            }`}
          >
            {d && (
              <div className="flex h-full flex-col">
                <span
                  className={`text-xs ${
                    eventByDay.has(d) ? "font-bold text-primary" : "text-muted-foreground"
                  }`}
                >
                  {d}
                </span>
                {eventByDay
                  .get(d)
                  ?.slice(0, 1)
                  .map((e) => (
                    // Exibe apenas o primeiro evento do dia no calendário (miniatura)
                    <span
                      key={e.id}
                      className="mt-auto truncate bg-primary px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground"
                      title={e.titulo}
                    >
                      {e.titulo}
                    </span>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Componente principal da página de Eventos.
   - Busca eventos do Supabase ao montar.
   - Permite filtrar por modalidade e exibe lista + calendário lateral.
*/
function Eventos() {
  // Estado de filtro, eventos carregados e flag de loading
  const [filter, setFilter] = useState<(typeof MODALITIES)[number]["v"]>("todas");
  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  // Efeito que busca eventos da tabela "eventos" ordenados por data
  useEffect(() => {
    supabase
      .from("eventos")
      .select("*")
      // Os eventos mais recentes aparecem primeiro na lista;
      // eventos antigos ficam mais para baixo, conforme pedido da administração
      .order("data_evento", { ascending: false })
      .then(({ data }) => {
        setEvents(data ?? []);
        setLoading(false);
      });
  }, []);

  // Filtra os eventos conforme a modalidade selecionada
  const filtered = events.filter((e) => filter === "todas" || e.modalidade === filter);

  return (
    <>
      {/* Cabeçalho da página com título e descrição */}
      <PageHeader
        editableId="eventos"
        eyebrow="Calendário Oficial"
        titleTop="Eventos &"
        titleBottom="Competições"
        description="Confira os próximos campeonatos, seminários e graduações promovidos pela AGNEP e por nossas federações parceiras."
      />


      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            {/* Botões de filtro por modalidade */}
            <div className="mb-8 flex flex-wrap gap-2">
              {MODALITIES.map((m) => (
                <button
                  key={m.v}
                  type="button"
                  onClick={() => setFilter(m.v)}
                  className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition ${
                    filter === m.v
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground ring-1 ring-border hover:ring-primary"
                  }`}
                >
                  {m.l}
                </button>
              ))}
            </div>

            {/* Lista de eventos: trata estados de loading, vazio e lista de itens */}
            <ul className="divide-y divide-border border border-border bg-card">
              {loading ? (
                // Mostra placeholder enquanto carrega
                <li className="p-12 text-center text-muted-foreground">Carregando eventos...</li>
              ) : filtered.length === 0 ? (
                // Mensagem quando não há eventos filtrados
                <li className="p-12 text-center text-muted-foreground">
                  Nenhum evento {filter !== "todas" ? "nesta modalidade" : "cadastrado"} no momento.
                </li>
              ) : (
                // Mapeia eventos filtrados para itens da lista
                filtered.map((e) => {
                  const d = formatDateParts(e.data_evento);
                  const pdfUrl = e.pdf_url;
                  return (
                    <li key={e.id} className="grid gap-6 p-6 md:grid-cols-[120px_1fr] md:p-8">
                      {/* Coluna com data destacada */}
                      <div className="flex flex-col items-start border-l-4 border-primary pl-4">
                        <span className="font-mono text-xs uppercase tracking-wider text-primary">
                          {d.month}
                        </span>
                        <span className="text-5xl font-black leading-none">{d.day}</span>
                        <span className="font-mono text-xs text-muted-foreground">{d.year}</span>
                      </div>

                      {/* Coluna com detalhes do evento */}
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                          <span className="bg-secondary px-2 py-0.5 text-secondary-foreground">
                            {e.modalidade}
                          </span>
                          <span className="text-muted-foreground">{d.time}</span>
                          {e.destaque && (
                            // Badge de destaque caso o evento seja marcado como tal
                            <span className="bg-primary px-2 py-0.5 text-primary-foreground">
                              Destaque
                            </span>
                          )}
                        </div>

                        <h3 className="heading-display text-2xl">{e.titulo}</h3>

                        {/* Data de início e, se houver, período com data de término.
                            Campeonatos de vários dias aparecem como "de ... até ...". */}
                        <p className="mt-2 text-sm text-muted-foreground">
                          Início: {formatFullDate(e.data_evento)}
                          {e.data_fim ? ` — Término: ${formatFullDate(e.data_fim)}` : ""}
                        </p>

                        {/* Local e cidade, se presentes */}
                        {(e.local || e.cidade) && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {[e.local, e.cidade].filter(Boolean).join(" · ")}
                          </p>
                        )}

                        {/* Descrição curta do evento */}
                        {e.descricao && <p className="mt-3 text-sm">{e.descricao}</p>}

                        {/* Botões de ação: PDF do evento (se anexado) e link de inscrição */}
                        <div className="mt-4 flex flex-wrap gap-3">
                        {pdfUrl && (
                          <button
                            type="button"
                            onClick={() => openPdf(pdfUrl)}
                            className="inline-block border border-primary px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary hover:bg-primary/10"
                          >
                            PDF do evento
                          </button>
                        )}
                        {e.link_inscricao && (
                          <a
                            href={e.link_inscricao}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 inline-block bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground hover:brightness-110"
                          >
                            Inscreva-se →
                          </a>
                        )}
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          <aside>
            {/* Calendário mensal lateral — passa todos os eventos para que o componente selecione os do mês */}
            <MonthCalendar events={events} />
            <div className="surface-navy-glow mt-6 p-6">
              <span className="glow-accent" aria-hidden />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                Quer divulgar um evento?
              </p>
              <p className="mt-3 text-sm text-white/80">
                Federações e parceiros podem solicitar a inclusão de eventos no calendário oficial
                da AGNEP.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
