/*
  start.ts

  Arquivo responsável por configurar a inicialização da aplicação (start instance)
  usando @tanstack/react-start. Aqui registramos middlewares de requisição para:
  - adicionar cabeçalhos de segurança (Content-Security-Policy, HSTS, etc.)
  - tratar erros de forma amigável no servidor
  Também anexamos a integração de autenticação do Supabase via attachSupabaseAuth.

  Comentários em português explicam o que cada parte faz e por que é necessária.
*/

import { createStart, createMiddleware } from "@tanstack/react-start";

import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

// Middleware de cabeçalhos de segurança — adiciona proteção contra ataques comuns
const securityHeadersMiddleware = createMiddleware({ type: "request" }).server(
  async ({ next }) => {
    // Executa o próximo middleware/handler e aguarda a resposta
    const result = await next();
    if (result instanceof Response) {
      // Clona/instancia novos headers para modificar sem alterar o original
      const headers = new Headers(result.headers);
      // Define uma política de segurança de conteúdo (CSP) para reduzir XSS e outros riscos
      headers.set(
        "Content-Security-Policy",
        [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src 'self' data: blob: https://*.supabase.co https://i.ytimg.com https://img.youtube.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          "connect-src 'self' https://*.supabase.co",
          "frame-src https://www.youtube.com",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; ")
      );
      // Segurança transport layer — indica que o site só deve ser acessado via HTTPS
      headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
      // Evita que a página seja embutida em frames (clickjacking)
      headers.set("X-Frame-Options", "DENY");
      // Previne detecção incorreta do tipo de conteúdo pelo navegador
      headers.set("X-Content-Type-Options", "nosniff");
      // Política de referência para reduzir vazamento de URLs em requisições externas
      headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      // Restringe certas APIs e desativa o FLoC/interest-cohort
      headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), interest-cohort=()"
      );
      // Se o conteúdo for HTML ou JSON, desabilita cache para evitar expor dados sensíveis
      const ct = headers.get("content-type") ?? "";
      if (ct.includes("text/html") || ct.includes("application/json")) {
        headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        headers.set("Pragma", "no-cache");
      }
      // Remove informações do servidor que não são necessárias (reduz superfície de ataque)
      headers.delete("server");
      headers.delete("x-powered-by");
      // Retorna uma nova Response com os headers ajustados e mesmo corpo/estado
      return new Response(result.body, {
        status: result.status,
        statusText: result.statusText,
        headers,
      });
    }
    // Se não for uma Response, devolve o resultado original (p.ex. passthrough)
    return result;
  }
);

// Middleware de tratamento de erros — captura exceções e retorna página de erro amigável
const errorMiddleware = createMiddleware({ type: "request" }).server(async ({ next }) => {
  try {
    // Tenta executar a cadeia de middlewares/handler seguinte
    return await next();
  } catch (error) {
    // Se o erro já contiver um statusCode (provavelmente HTTP), rethrow para upstream lidar
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    // Loga o erro no servidor para depuração
    console.error(error);
    // Retorna uma página de erro simples e segura (500)
    return new Response(
      `<!DOCTYPE html><html><body><h1>Erro no servidor</h1><p>Ocorreu um erro ao processar sua requisição.</p></body></html>`,
      {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      }
    );
  }
});

// createStart recebe uma função que retorna o objeto de opções
// ssr: false — desabilita server-side rendering para evitar bloqueios/pendências de SSR
export const startInstance = createStart(() => ({
  ssr: false,
  // Middleware de função (executado para cada função/handler) — integra autenticação Supabase
  functionMiddleware: [attachSupabaseAuth],
  // Middleware de requisição (executado em cada request) — erros e segurança
  requestMiddleware: [errorMiddleware, securityHeadersMiddleware],
}));
