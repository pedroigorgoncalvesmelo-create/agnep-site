/*
  Arquivo: admin.tsx
  Propósito:
  - Layout protegido para páginas de administração dentro da rota "/_authenticated/admin".
  - Verifica se o usuário está autenticado e se possui o papel "admin" usando Supabase.
  - Exibe um menu lateral com links para as diferentes seções do painel administrativo.
  - Redireciona para a tela de autenticação caso o usuário não esteja logado.
  - Mostra mensagem de acesso negado caso o usuário não tenha papel de administrador.
  Observações:
  - Comentários em português para facilitar a compreensão de desenvolvedores iniciantes.
  - Não altera a lógica do componente, apenas descreve o que cada parte faz.
*/

import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Define a rota de arquivo para "/_authenticated/admin" e associa o componente AdminLayout
export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

// Componente de layout para a área administrativa
function AdminLayout() {
  const navigate = useNavigate();
  // Estado que indica se ainda estamos verificando a autenticação/permissões
  const [checking, setChecking] = useState(true);
  // Estado que indica se o usuário possui o papel de administrador
  const [isAdmin, setIsAdmin] = useState(false);
  // Email do usuário logado (usado para exibir na interface)
  const [email, setEmail] = useState<string>("");

  // Efeito que roda uma vez ao montar o componente para verificar o usuário e cargo
  useEffect(() => {
    let mounted = true;
    (async () => {
      // Busca o usuário atual no Supabase
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      // Se não há usuário autenticado, redireciona para página de autenticação
      if (!user) {
        navigate({ to: "/auth" });
        return;
      }
      // Guarda o email para exibição
      setEmail(user.email ?? "");
      // Chama uma função RPC no Supabase que verifica se o usuário tem o papel "admin"
      const { data: hasAdminRole } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      // Se o componente foi desmontado durante a chamada, aborta a atualização de estado
      if (!mounted) return;
      // Define se é admin e marca que não estamos mais checando
      setIsAdmin(Boolean(hasAdminRole));
      setChecking(false);
    })();
    // Cleanup para evitar atualizações de estado após desmontagem
    return () => {
      mounted = false;
    };
  }, [navigate]);

  // Função para deslogar o usuário e redirecionar para a tela de autenticação
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  // Enquanto verifica permissões, exibe uma mensagem de carregamento simples
  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Verificando acesso...
        </p>
      </div>
    );
  }

  // Se não for administrador, mostra mensagem de acesso negado e opção de sair
  if (!isAdmin) {
    return (
      <div className="container-page py-24 text-center">
        <p className="eyebrow mb-3">Sem permissão</p>
        <h1 className="heading-display text-4xl">Acesso negado</h1>
        <p className="mt-3 text-muted-foreground">
          A conta <strong>{email}</strong> não possui permissão de administrador.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Solicite à equipe da AGNEP para conceder o papel de admin a este email.
        </p>
        <button
          onClick={handleLogout}
          className="mt-8 bg-secondary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary-foreground hover:brightness-110"
        >
          Sair
        </button>
      </div>
    );
  }

  // Se for administrador, renderiza o layout do painel com a barra lateral e o Outlet para subrotas
  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[240px_1fr]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow mb-4">Painel</p>
        <nav className="flex flex-col">
          {[
            { to: "/admin", label: "Início", exact: true },
            { to: "/admin/home", label: "Home: Números" },
            { to: "/admin/eventos", label: "Eventos" },
            { to: "/admin/resultados", label: "Resultados" },
            { to: "/admin/documentos", label: "Documentos" },
            { to: "/admin/galeria", label: "Galeria de Fotos" },
            { to: "/admin/videos", label: "Vídeos" },
            { to: "/admin/patrocinadores", label: "Patrocinadores" },
            { to: "/admin/equipe", label: "Equipe" },
            { to: "/admin/novidades", label: "Fique por Dentro (Avisos)" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="border-l-2 border-border py-2.5 pl-4 text-sm font-semibold text-foreground/70 transition hover:border-primary hover:text-foreground"
              activeProps={{ className: "border-primary text-primary" }}
              activeOptions={{ exact: item.exact }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-border pt-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Logado como
          </p>
          {/* Exibe o email do usuário atualmente logado */}
          <p className="mt-1 truncate text-sm">{email}</p>
          {/* Botão de logout na barra lateral */}
          <button
            onClick={handleLogout}
            className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary hover:underline"
          >
            Sair
          </button>
        </div>
      </aside>

      <div>
        {/* Outlet renderiza as rotas filhas do painel administrativo */}
        <Outlet />
      </div>
    </div>
  );
}
