/*
  Arquivo: src/routes/sobre.tsx

  Propósito:
  - Define a rota "/sobre" do site da AGNEP.
  - Busca e exibe informações sobre a associação: história, projetos e equipe.
  - Recupera imagens da equipe via storage (URL assinada) e renderiza fallback quando necessário.

  Observações:
  - Comentários explicativos em português foram adicionados para auxiliar desenvolvedores iniciantes.
  - A lógica e os nomes originais do código não foram alterados — apenas foram inseridos comentários.
*/

import { createFileRoute } from "@tanstack/react-router";
// Hooks React para estado e efeitos colaterais
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { supabase } from "@/integrations/supabase/client";
import { getSignedUrl } from "@/lib/storage";
import { EText, EImage } from "@/lib/site-content";
import jjImg from "@/assets/jiujitsu-class.jpg";
import xadrezImg from "@/assets/xadrez-class.jpg";

// Define a rota "/sobre" com metadados para head e o componente que renderiza a página.
// head: define título, descrição e metatags para SEO/OG.
export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a AGNEP — Núcleo Esportivo e Paradesportivo" },
      { name: "description", content: "História, projetos, modalidades e equipe da Associação Goiana Núcleo Esportivo e Paradesportivo." },
      { property: "og:title", content: "Sobre a AGNEP" },
      { property: "og:description", content: "Conheça nossa história, missão, equipe e projetos desenvolvidos em Goiás." },
    ],
  }),
  component: Sobre,
});

// Tipo que representa um membro da equipe armazenado no banco.
type Membro = { id: string; nome: string; cargo: string; bio: string | null; foto_url: string | null };

/* Lista estática de projetos apresentados na página.
   Mantido localmente para facilitar edição de textos e versão inicial da página. */
const PROJECTS = [
  { title: "Lutar para Aprender", body: "Programa social que oferece aulas gratuitas de Jiu-Jitsu para crianças em situação de vulnerabilidade." },
  { title: "Xadrez nas Escolas", body: "Parceria com escolas públicas de Itumbiara para introduzir o xadrez como ferramenta pedagógica." },
  { title: "Paradesporto AGNEP", body: "Núcleo dedicado à formação esportiva e competitiva de atletas com deficiência." },
  { title: "Equipe de Competição", body: "Treinamento de alto rendimento para representar a AGNEP em competições estaduais, nacionais e internacionais." },
];

function Sobre() {
  // Estado com os membros da equipe vindo do Supabase.
  const [team, setTeam] = useState<Membro[]>([]);
  // Mapeamento foto_url -> url assinada para exibir imagens protegidas no storage.
  const [urls, setUrls] = useState<Record<string, string>>({});

  // Efeito para buscar dados da equipe e gerar URLs assinadas das imagens.
  useEffect(() => {
    (async () => {
      // Consulta à tabela "equipe", ordenando por 'ordem' e por 'nome' para ter reprodução previsível.
      const { data } = await supabase.from("equipe").select("*").order("ordem").order("nome");
      // Atualiza estado mesmo se data for null/undefined.
      setTeam(data ?? []);

      // Monta um mapa local de foto_url para URL assinada (evita múltiplas requisições idênticas).
      const map: Record<string, string> = {};
      for (const m of data ?? []) {
        // Se existir foto_url, tenta obter URL assinada via helper getSignedUrl.
        if (m.foto_url) { const u = await getSignedUrl("equipe", m.foto_url); if (u) map[m.foto_url] = u; }
      }
      // Salva o mapa no estado para uso na renderização.
      setUrls(map);
    })();
  }, []); // Executa apenas uma vez ao montar o componente.

  // Renderiza a página Sobre: cabeçalho, história, projetos e a lista de equipe (se houver).
  return (
    <>
      {/* Cabeçalho da página com título e descrição principal. */}
      <PageHeader
        editableId="sobre"
        eyebrow="Sobre a Associação"
        titleTop="Quem somos."
        titleBottom="O que nos move."
        description="A AGNEP — Associação Goiana Núcleo Esportivo e Paradesportivo — é uma instituição sem fins lucrativos dedicada à formação humana e esportiva por meio do Jiu-Jitsu, do Xadrez e do paradesporto."
      />

      <section className="container-page py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            {/* Seção de história com textos editáveis via EText */}
            <EText id="sobre.historia.eyebrow" defaultValue="Nossa História" as="p" className="eyebrow mb-3" />
            <EText id="sobre.historia.titulo" defaultValue="Mais que esporte. Uma comunidade." as="h2" className="heading-display text-4xl" />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <EText id="sobre.historia.p1" defaultValue="A AGNEP nasceu em Itumbiara da união de professores, atletas e educadores convencidos de que o esporte transforma vidas. Desde a primeira aula, nosso princípio é claro: disciplina, respeito e oportunidade para todos." as="p" multiline />
              <EText id="sobre.historia.p2" defaultValue="Ao longo dos anos, formamos campeões em competições estaduais, nacionais e internacionais — mas também ajudamos centenas de crianças e jovens a descobrir o valor da resiliência, da estratégia e do trabalho em equipe." as="p" multiline />
              <EText id="sobre.historia.p3" defaultValue="Hoje, a AGNEP é referência em Goiás na integração entre o esporte de alto rendimento, o paradesporto e a educação." as="p" multiline />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Imagens ilustrativas com fallback para assets locais */}
            <EImage id="sobre.historia.img1" defaultSrc={jjImg} alt="Aulas de Jiu-Jitsu" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <EImage id="sobre.historia.img2" defaultSrc={xadrezImg} alt="Aulas de Xadrez" loading="lazy" className="mt-12 aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-24">
        <div className="container-page">
          {/* Seção de projetos com lista estática definida em PROJECTS */}
          <EText id="sobre.projetos.eyebrow" defaultValue="Projetos" as="p" className="eyebrow mb-3" />
          <EText id="sobre.projetos.titulo" defaultValue="O que fazemos." as="h2" className="heading-display text-4xl" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <article key={p.title} className="border-l-2 border-primary bg-card p-8 shadow-sm ring-1 ring-border">
                <span className="font-mono text-xs font-bold text-primary">0{i + 1}</span>
                <EText id={`sobre.projeto.${i}.titulo`} defaultValue={p.title} as="h3" className="heading-display mt-3 text-2xl" />
                <EText id={`sobre.projeto.${i}.body`} defaultValue={p.body} as="p" multiline className="mt-3 text-muted-foreground" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Se a lista de equipe tiver itens, renderiza a seção de equipe */}
      {team.length > 0 && (
        <section className="container-page py-24">
          <p className="eyebrow mb-3">Equipe</p>
          <h2 className="heading-display text-4xl">Quem está no comando.</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <div key={t.id} className="bg-card p-6 ring-1 ring-border transition hover:ring-primary">
                <div className="mb-4 flex h-40 items-center justify-center overflow-hidden bg-muted">
                  {/* Renderiza a foto do membro se houver URL assinada; caso contrário, mostra iniciais como fallback */}
                  {t.foto_url && urls[t.foto_url] ? (
                    <img src={urls[t.foto_url]} alt={t.nome} className="h-full w-full object-cover" />
                  ) : (
                    <span className="heading-display text-5xl text-muted-foreground/40">
                      {t.nome.split(" ").slice(-2).map((w) => w[0]).join("")}
                    </span>
                  )}
                </div>
                <h4 className="font-bold">{t.nome}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{t.cargo}</p>
                {/* Exibe biografia curta se disponível */}
                {t.bio && <p className="mt-2 text-xs text-muted-foreground">{t.bio}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
