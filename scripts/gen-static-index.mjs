/*
  gen-static-index.mjs
  ------------------------------------------------------------
  O QUE faz:
  - Usa o handler de produção do TanStack Start (dist/server/server.js)
    para renderizar a página inicial (rota "/") uma única vez.
  - Extrai o HTML completo gerado (splash de carregamento + app shell).
  - Escreve o arquivo dist/client/index.html estático.

  POR QUE é necessário:
  - O TanStack Start com ssr:false NÃO gera index.html estático no build:
    todo o HTML é produzido em tempo de execução pelo handler Node.
  - A Vercel (plano Hobby, sem functions Node customizadas para este caso)
    serve apenas arquivos estáticos do outputDirectory (dist/client).
    Sem index.html, todas as rotas retornavam 404.
  - Gerando um index.html estático com o shell da aplicação, o site passa a
    funcionar como SPA: o reescrita (rewrite) do vercel.json entrega esse
    index.html para qualquer rota, e o React hidrata/rota no cliente.

  QUANDO rodar:
  - Após o "vite build" (o dist/server precisa existir).
  - Na Vercel: buildCommand = "vite build && node scripts/gen-static-index.mjs"
*/
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");
const distClient = resolve(repoRoot, "dist/client");

// Carrega o handler de produção gerado pelo build
const server = await import(resolve(distClient, "../server/server.js"));

// Renderiza a rota raiz para obter o HTML completo da aplicação
const response = await server.default.fetch(
  new Request("http://localhost/"),
  {},
  {}
);
const html = await response.text();

if (!html.includes("DOCTYPE")) {
  throw new Error(
    `O HTML gerado não contém DOCTYPE (status ${response.status}). Ajuste a rota raiz.`
  );
}

// Garante o diretório de saída
mkdirSync(distClient, { recursive: true });

// Escreve o index.html estático (fallback da SPA)
writeFileSync(resolve(distClient, "index.html"), html);
console.log(`✔ index.html estático gerado em ${resolve(distClient, "index.html")} (${html.length} bytes)`);
