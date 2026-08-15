/*
  Arquivo: sitemap.xml.ts

  Propósito:
  - Fornece uma rota de arquivo "/sitemap.xml" que gera dinamicamente um sitemap em XML
    para o site da AGNEP. O sitemap ajuda motores de busca a indexarem as páginas principais.
  - Define as URLS principais do site, frequência de mudança e prioridade de indexação.
  - Gera o conteúdo XML no servidor quando a rota GET é acessada e retorna com cabeçalho
    apropriado de Content-Type e Cache-Control.

  Observações:
  - Mantém as rotas estáticas definidas na constante ROUTES. Para adicionar páginas ao sitemap,
    basta incluir novos objetos em ROUTES.
  - BASE_URL pode ser ajustado para incluir domínio em produção, se necessário.
*/

/* Importa a função para criar uma rota de arquivo com o TanStack Router */
import { createFileRoute } from "@tanstack/react-router";
/* Import de tipos do react-start (mantido para compatibilidade/declarações de tipo) */
import type {} from "@tanstack/react-start";

/* URL base do site. Em produção pode ser definido para 'https://www.seudominio.com' */
const BASE_URL = "";

/* 
  Lista de rotas que devem constar no sitemap.
  Cada item contém:
  - path: caminho relativo no site
  - changefreq: frequência sugerida de atualização (para bots)
  - priority: prioridade de indexação (0.0 a 1.0)
*/
const ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/sobre", changefreq: "monthly", priority: "0.8" },
  { path: "/eventos", changefreq: "weekly", priority: "0.9" },
  { path: "/documentos", changefreq: "monthly", priority: "0.7" },
  { path: "/galeria-fotos", changefreq: "weekly", priority: "0.7" },
  { path: "/galeria-videos", changefreq: "weekly", priority: "0.7" },
  { path: "/resultados", changefreq: "weekly", priority: "0.9" },
  { path: "/patrocinadores", changefreq: "monthly", priority: "0.6" },
  { path: "/contato", changefreq: "yearly", priority: "0.6" },
];

/* 
  Cria a rota de arquivo "/sitemap.xml".
  A opção 'server.handlers.GET' define o que será retornado quando a URL for requisitada.
*/
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Constrói uma entrada <url> para cada rota definida em ROUTES
        const urls = ROUTES.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );

        // Monta o XML completo do sitemap unindo o cabeçalho, as URLs e o fechamento
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        // Retorna a resposta com o XML e cabeçalhos apropriados para cache e tipo de conteúdo
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
