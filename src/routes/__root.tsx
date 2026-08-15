/*
  Arquivo: __root.tsx

  Propósito:
  - Define a rota raiz da aplicação usando @tanstack/react-router.
  - Configura o head (meta tags e links) compartilhado pela aplicação.
  - Fornece componentes de shell (HTML básico) e o componente principal que
    envolve a aplicação com provedores (React Query e SiteContent).
  - Contém componentes de fallback para página 404 e erro geral, com instruções
    específicas quando falta a configuração do Supabase.

  Observações:
  - Comentários em português explicam o que cada parte faz e por quê, voltado
    para desenvolvedores iniciantes.
  - Não altera lógica ou nomes existentes — apenas adiciona documentação.
*/

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
// Removido import do lovable para independência total
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
// Escudo de carregamento: tela de abertura com a identidade da AGNEP
// enquanto os dados do site são carregados (ver src/components/app-splash.tsx).
import { AppSplash } from "../components/app-splash";
import { SiteContentProvider, AdminEditBar } from "../lib/site-content";


function NotFoundComponent() {
  // Componente simples para exibir página 404 (Página não encontrada).
  // Mantém o mesmo layout do site com cabeçalho e rodapé para consistência.
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <div className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="max-w-md text-center">
          <p className="eyebrow mb-3">Erro 404</p>
          <h1 className="heading-display text-6xl md:text-7xl">Página não encontrada</h1>
          <p className="mt-4 text-muted-foreground">
            O conteúdo que você procura foi movido ou ainda não existe.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:brightness-110"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  // Componente para exibir erros de carregamento nas rotas.
  // Recebe o erro e uma função reset (fornecida pelo roteador).
  console.error(error);
  const router = useRouter();
  // Detecta um erro específico quando faltam variáveis de ambiente do Supabase.
  // Isso permite mostrar instruções úteis ao desenvolvedor para configurar o .env.
  const isMissingSupabaseConfig =
    error?.message?.includes("variável(is) de ambiente do Supabase") ?? false;

  if (isMissingSupabaseConfig) {
    // Mostra instruções detalhadas para criar o arquivo .env com as chaves do Supabase.
    // Útil durante o desenvolvimento local.
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-lg">
          <p className="eyebrow mb-3 text-center">Configuração necessária</p>
          <h1 className="heading-display text-center text-3xl">
            Falta o arquivo .env do Supabase
          </h1>
          <div className="mt-6 space-y-4 rounded-lg border border-border bg-card p-6 text-left text-sm">
            <p className="text-muted-foreground">
              O site precisa se conectar ao banco de dados do Supabase. Crie o arquivo
              de configuração seguindo os passos abaixo:
            </p>
            <ol className="list-inside list-decimal space-y-3 text-muted-foreground">
              <li>
                Crie um arquivo chamado <code className="font-mono">.env</code> na raiz
                da pasta do projeto (a mesma pasta do <code className="font-mono">package.json</code>).
              </li>
              <li>
                Acesse o painel do Supabase em{" "}
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  supabase.com/dashboard
                </a>
                , selecione seu projeto e vá em{" "}
                <strong>Settings {'>'} API</strong>.
              </li>
              <li>
                Copie a <strong>Project URL</strong> e a <strong>anon public key</strong>.
              </li>
              <li>Cole dentro do arquivo <code className="font-mono">.env</code>:</li>
            </ol>
            <pre className="overflow-x-auto rounded bg-muted p-4 font-mono text-xs">
{`SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_PUBLISHABLE_KEY="sua-chave-anon-aqui"
VITE_SUPABASE_URL="https://seu-projeto.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="sua-chave-anon-aqui"`}
            </pre>
            <p className="text-muted-foreground">
              Depois de salvar, <strong>reinicie o servidor</strong> no terminal (Ctrl + C
              e depois <code className="font-mono">npm run dev</code>). Instruções
              completas em <code className="font-mono">COMO-RODAR.md</code>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Caso não seja erro de configuração do Supabase, mostra uma tela genérica com opção
  // de tentar novamente (inválida o roteador e chama reset) ou voltar ao início.
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-3">Algo deu errado</p>
        <h1 className="heading-display text-3xl">Esta página não carregou</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Tente novamente ou volte para a página inicial.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:brightness-110"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-border bg-background px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-accent"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Define head/metadata padrão para todas as páginas (SEO, fontes, CSS).
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AGNEP — Associação Goiana Núcleo Esportivo e Paradesportivo" },
      {
        name: "description",
        content:
          "AGNEP é a Associação Goiana Núcleo Esportivo e Paradesportivo. Formamos campeões no Jiu-Jitsu e no Xadrez, transformando vidas pelo esporte.",
      },
      { name: "author", content: "AGNEP" },
      { property: "og:title", content: "AGNEP — Transformando Campeões no Esporte e na Vida" },
      {
        property: "og:description",
        content:
          "Associação Goiana Núcleo Esportivo e Paradesportivo. Jiu-Jitsu, Xadrez, eventos, conquistas e história institucional.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap",
      },
    ],
  }),
  // shellComponent fornece o HTML básico (útil para SSR) — encapsula HeadContent e Scripts.
  shellComponent: RootShell,
  // component é o componente raiz renderizado dentro do shell.
  component: RootComponent,
  // Componentes de fallback para 404 e erros.
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // Componente que define a estrutura HTML base da página.
  // Coloca <HeadContent /> (meta tags) dentro de <head> e <Scripts /> antes do fechamento do body.
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  // Recupera o queryClient passado pelo contexto da rota raiz.
  const { queryClient } = Route.useRouteContext();

  // Envolve a aplicação com QueryClientProvider (react-query) e SiteContentProvider
  // (contexto de conteúdo do site). Mantém header, footer e Outlet (conteúdo das rotas).
  return (
    <QueryClientProvider client={queryClient}>
      <SiteContentProvider>
        {/* Escudo de carregamento (aparece só na abertura do site) */}
        <AppSplash />
        <div className="flex min-h-screen flex-col bg-background">
          <AdminEditBar />
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </SiteContentProvider>
    </QueryClientProvider>
  );
}
