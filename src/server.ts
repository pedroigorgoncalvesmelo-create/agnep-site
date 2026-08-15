/*
  Arquivo: server.ts

  Propósito:
  - Este arquivo exporta o handler "fetch" que será chamado pelo ambiente de execução (ex: Cloudflare Workers).
  - Faz o carregamento dinâmico e em cache da entrada do servidor (server entry) gerada pelo TanStack React Start.
  - Normaliza respostas de erro catastrófico de SSR que podem ser "engolidas" por alguns servidores (ex: h3), transformando em uma página de erro HTML legível.
  - Em caso de exceção inesperada, registra o erro e retorna a página de erro renderizada.

  Observações para desenvolvedores iniciantes:
  - O carregamento dinâmico permite carregar o código pesado do SSR apenas quando necessário.
  - A função normalizeCatastrophicSsrResponse tenta detectar um padrão específico de erro JSON retornado por h3 e substitui por uma página HTML de erro, preservando um log útil.
*/

import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

// Cache de promise para o import dinâmico da "server entry".
// Mantemos a promise para evitar múltiplos imports e garantir singleton.
let serverEntryPromise: Promise<ServerEntry> | undefined;

// Carrega e retorna a ServerEntry de forma lazy.
// Por que usar import dinâmico: reduz custo de inicialização e permite resolver a dependência apenas quando necessário.
// A promise é armazenada em `serverEntryPromise` para que o módulo seja importado apenas uma vez.
async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.

/*
  normalizeCatastrophicSsrResponse

  O QUE faz:
  - Recebe uma Response e detecta quando o servidor (ex: h3) converteu uma exceção de SSR
    em um erro 500 com body JSON padrão {"unhandled":true,"message":"HTTPError"}.
  - Se detectar esse padrão, consome o último erro capturado (para logging) e retorna uma
    Response HTML com a página de erro gerada por renderErrorPage().

  POR QUE:
  - Alguns frameworks/servidores transformam exceções internas em respostas 500 JSON,
    o que faz com que o stack trace/erro real se perca. Essa função tenta recuperar o erro
    capturado anteriormente e substituir a resposta por uma página de erro amigável.
*/
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;

  // Verifica se o content-type indica JSON — só faz sentido inspecionar bodies JSON.
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  // Lê o corpo (clonando a response para não consumir a original) e procura o padrão conhecido.
  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  // Registra o erro original se tivermos um capturado; caso contrário, cria um novo Error para log.
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));

  // Retorna uma resposta HTML com a página de erro e status 500.
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    // Fluxo principal:
    // 1) Obtém o handler do servidor (import dinâmico).
    // 2) Delegar a requisição para o handler.
    // 3) Normalizar respostas 500 "engolidas" pelo servidor (h3).
    // 4) Em caso de erro durante todo o processo, logar e retornar página de erro.
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      // Qualquer erro inesperado aqui é logado e resultará na página de erro genérica.
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
