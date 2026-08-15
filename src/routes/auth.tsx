/*
  Arquivo: src/routes/auth.tsx

  Propósito:
  - Implementa a página de autenticação (rota /auth) do painel administrativo da AGNEP.
  - Fornece login por email/senha e login via OAuth com Google usando o Supabase.
  - Redireciona automaticamente usuários já autenticados para /admin.

  Observações:
  - Comentários explicativos foram adicionados em português para facilitar a compreensão
    por desenvolvedores iniciantes. A lógica do arquivo NÃO foi modificada.
*/

import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
// Removido import do lovable para independência total
import logoAsset from "@/assets/agnep-logo.png.asset.json";

export const Route = createFileRoute("/auth")({
  // Cabeçalho da rota para SEO e meta tags básicas
  head: () => ({
    meta: [
      { title: "Área Administrativa — AGNEP" },
      { name: "description", content: "Acesso restrito à equipe da AGNEP." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  // Componente que será renderizado quando a rota /auth for acessada
  component: AuthPage,
});

function AuthPage() {
  // Hook do react-router para navegar programaticamente
  const navigate = useNavigate();
  // Estados locais para controlar formulário e feedback ao usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  /* Modo do formulário: "login" (entrar) ou "signup" (criar conta) */
  const [mode, setMode] = useState<"login" | "signup">("login");

  /*
    Efeito para processar callbacks de autenticação na URL (fluxo PKCE) e
    verificar sessão existente ao montar o componente. Se já houver sessão
    ativa, redireciona o usuário para /admin automaticamente (evitando que
    usuários logados vejam a tela de login).
    Quando o usuário clica em um link de e-mail do Supabase
    (recuperação de senha, confirmação de e-mail), o Supabase redireciona
    para esta página com parâmetros no fragmento (#) da URL. Este efeito:
    - detecta erros e os exibe na tela em português
    - troca o código de autorização pela sessão (PKCE), permitindo concluir
      redefinições de senha e confirmações de e-mail sem tela própria
    - redireciona ao /admin caso já exista sessão ativa
  */
  useEffect(() => {
    // Verifica e trata parâmetros de callback no fragmento da URL (ex.: #error=...)
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const hashError = hashParams.get("error");
    const hashErrorCode = hashParams.get("error_code");
    const hashErrorDesc = hashParams.get("error_description");
    if (hashError) {
      if (hashErrorCode === "otp_expired") {
        setError(
          "Este link de confirmação expirou ou já foi usado. No painel do Supabase (Authentication > Users > seu e-mail), clique em \"Send password recovery\" para gerar um novo link — e abra-o em até 10 minutos."
        );
      } else {
        setError(`Erro de autenticação: ${hashErrorDesc || hashError}`);
      }
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  /*
    Função chamada ao submeter o formulário de email/senha.
    - Prevê comportamento padrão do form
    - No modo "login": tenta autenticar via Supabase com email e senha e, em
      caso de sucesso, navega para /admin
    - No modo "signup": cria uma nova conta via Supabase; um gatilho no banco
      (on_auth_user_created_grant_admin) concede automaticamente a role de
      administrador para o email autorizado; após o cadastro o usuário pode
      entrar normalmente
    - Em caso de erro, mostra mensagem apropriada
  */
  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          // Tradução amigável dos erros do Supabase para o usuário final
          setError(traduzirErroSupabase(error.message, mode));
          return;
        }
        // Autenticação bem-sucedida: redireciona para área administrativa
        navigate({ to: "/admin" });
      } else {
        /*
          SEGURANÇA: o cadastro público é permitido APENAS para o e-mail
          autorizado pela administração da AGNEP. Qualquer outro e-mail
          deve ser criado manualmente pelo administrador no painel do
          Supabase (Authentication > Users), evitando que desconhecidos
          criem contas no sistema.
        */
        const adminEmail = "pedroigorgoncalvesmelo@gmail.com";
        if (email.trim().toLowerCase() !== adminEmail) {
          setError("Cadastros são criados pela administração da AGNEP. Para criar outra conta, entre em contato conosco.");
          return;
        }
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          // Tradução amigável dos erros do Supabase (ex.: rate limit de e-mail)
          setError(traduzirErroSupabase(error.message, mode));
          return;
        }
        setSuccess(
          "Conta criada com sucesso! O acesso administrativo já está liberado. Use o botão Entrar com seus dados.",
        );
      }
    } catch {
      // Erro genérico de rede ou inesperado
      setError("Não foi possível conectar ao servidor do Supabase. Verifique sua internet e se o .env está configurado com as chaves corretas do seu projeto.");
    } finally {
      setLoading(false);
    }
  }

  /*
    Traduz as mensagens técnicas do Supabase para português claro e sugere
    a solução apropriada. Em especial, o erro de rate limit (429) ocorre no
    plano gratuito do Supabase quando há muitas tentativas de envio de
    e-mail de confirmação; a solução recomendada é criar o usuário
    diretamente no painel do Supabase.
  */
  function traduzirErroSupabase(msg: string, modo: "login" | "signup"): string {
    if (/rate limit/i.test(msg)) {
      return "O Supabase limitou temporariamente o envio de e-mails de confirmação (limite do plano gratuito, muitas tentativas seguidas). Solução: crie o usuário diretamente no painel do Supabase (Authentication > Users > Add user, marcando Auto Confirm User).";
    }
    if (/invalid login credentials/i.test(msg)) {
      return "E-mail ou senha incorretos. Verifique os dados digitados.";
    }
    if (/email not confirmed/i.test(msg)) {
      return "O e-mail ainda não foi confirmado. Crie o usuário no painel do Supabase marcando Auto Confirm User, ou desative a confirmação de e-mail em Authentication > Providers > Email.";
    }
    if (/network/i.test(msg) || /fetch/i.test(msg)) {
      return "Não foi possível conectar ao servidor do Supabase. Verifique sua internet e se o .env está configurado com as chaves corretas do seu projeto.";
    }
    return msg;
  }

  /*
    Handler para login via Google (OAuth).
    - Abre fluxo de autenticação com o provedor Google via Supabase
    - Define redirectTo para levar o usuário à /admin após autenticação
    - Exibe mensagens de erro em caso de falha
  */
  async function handleGoogle() {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/admin",
        },
      });
      if (error) {
        setError(error.message);
      }
    } catch {
      setError("Não foi possível conectar com o Google agora.");
    }
  }

  return (
    // Container centralizado da página de autenticação
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-muted/30 px-4 py-16">
      {/* Card que contém o formulário */}
      <div className="w-full max-w-md bg-card p-10 ring-1 ring-border">
        {/* Link para voltar à página inicial com logo */}
        <Link to="/" className="mb-8 flex items-center gap-3">
          <img src={logoAsset.url} alt="AGNEP" className="h-12 w-12 object-contain" />
          <div className="leading-tight">
            <p className="heading-display text-lg">AGNEP</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Painel Administrativo
            </p>
          </div>
        </Link>

        {/* Título e descrição da página */}
        <h1 className="heading-display text-3xl">
          {mode === "login" ? "Acesso restrito" : "Criar conta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login"
            ? "Entre com seu email institucional para gerenciar o conteúdo do site."
            : "Use o email autorizado pela administração da AGNEP para criar sua conta. Outros e-mails devem ser cadastrados pelo administrador."}
        </p>

        {/* Formulário de login por email/senha */}
        <form onSubmit={handleEmailLogin} className="mt-8 space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Email
            </label>
            {/* Campo controlado de email */}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Senha
            </label>
            {/* Campo controlado de senha */}
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          {/* Exibe mensagem de sucesso quando existe (após criar conta) */}
          {success && (
            <p className="border-l-4 border-primary bg-primary/10 px-3 py-2 text-xs text-primary">
              {success}
            </p>
          )}

          {/* Exibe mensagem de erro quando existe */}
          {error && (
            <p className="border-l-4 border-destructive bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          )}

          {/* Botão de submit; mostra estado de loading quando em progresso */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition hover:brightness-110 disabled:opacity-50"
          >
            {loading
              ? mode === "login"
                ? "Entrando..."
                : "Criando conta..."
              : mode === "login"
                ? "Entrar"
                : "Criar minha conta"}
          </button>
        </form>

        {/* Alternância entre entrar e criar conta */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {mode === "login" ? "Ainda não tem conta?" : "Já tem uma conta?"}{" "}
          <button
            type="button"
            onClick={() => {
              setError(null);
              setSuccess(null);
              setMode(mode === "login" ? "signup" : "login");
            }}
            className="font-bold text-primary underline-offset-2 hover:underline"
          >
            {mode === "login" ? "Criar conta" : "Entrar"}
          </button>
        </p>

        {/* Separador entre login por email e opções alternativas */}
        <div className="my-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          ou
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Botão para iniciar fluxo OAuth com Google (visível apenas no modo login) */}
        {mode === "login" && (
          <>
            {/* Separador entre login por email e opções alternativas */}
            <div className="my-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              ou
              <span className="h-px flex-1 bg-border" />
            </div>
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full border border-border bg-background px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition hover:bg-accent"
            >
              Continuar com Google
            </button>
          </>
        )}

        {/* Informação adicional para o usuário */}
        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Cadastros são criados pela administração da AGNEP
        </p>
      </div>
    </div>
  );
}
