/*
  Arquivo: route.tsx
  Propósito: Definir a rota protegida "/_authenticated" que apenas usuários autenticados podem acessar.
  Este arquivo verifica a autenticação do usuário antes de carregar a rota e,
  caso o usuário não esteja autenticado, redireciona para a página de autenticação.
  Comentários explicativos inseridos para ajudar desenvolvedores iniciantes a entenderem
  o fluxo de autenticação e a razão das decisões (ex.: ssr: false).
*/

 // Importa utilitários de roteamento do TanStack Router
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
// Importa o cliente do Supabase para checar o estado de autenticação
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  // Desabilita Server-Side Rendering para esta rota.
  // WHY: verificações de sessão utilizam o cliente do supabase no navegador.
  ssr: false,
  /* BEFORELOAD:
     Função executada antes de carregar a rota. Serve para checar se o usuário
     está autenticado. Se não estiver, lança um redirect para "/auth".
     Retorna o objeto { user } para que dados do usuário possam ser usados
     por componentes filhos, se necessário.
  */
  beforeLoad: async () => {
    // Solicita ao Supabase o usuário atualmente autenticado (se houver)
    const { data, error } = await supabase.auth.getUser();
    // Se houve erro ou não existe usuário autenticado, redireciona para /auth
    if (error || !data.user) {
      throw redirect({ to: "/auth" });
    }
    // Retorna o usuário encontrado para disponibilizar a rota/filhos
    return { user: data.user };
  },
  // Componente renderizado por esta rota: Outlet renderiza as rotas-filhas.
  // WHAT: permite que rotas aninhadas sejam exibidas aqui.
  // WHY: mantemos a proteção nesta camada e delegamos conteúdo às rotas-filhas.
  component: () => <Outlet />,
});
