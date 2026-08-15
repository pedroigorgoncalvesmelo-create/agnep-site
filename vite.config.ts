import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Headers de segurança aplicados pelo servidor de desenvolvimento e pelo
// preview do build estático. No TanStack Start (SSR desabilitado), esses
// headers substituem os middlewares de requisição para garantir a proteção
// contra XSS, clickjacking e sniffing em todos os modos de execução.
const securityHeadersPlugin = (): Plugin => ({
  name: "agnep:security-headers",
  configureServer(server) {
    server.middlewares.use((_req, res, next) => {
      const set = (k: string, v: string) => res.setHeader(k, v);
      set(
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
      set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
      set("X-Frame-Options", "DENY");
      set("X-Content-Type-Options", "nosniff");
      set("Referrer-Policy", "strict-origin-when-cross-origin");
      set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      res.removeHeader("x-powered-by");
      next();
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((_req, res, next) => {
      const set = (k: string, v: string) => res.setHeader(k, v);
      set("X-Frame-Options", "DENY");
      set("X-Content-Type-Options", "nosniff");
      set("Referrer-Policy", "strict-origin-when-cross-origin");
      res.removeHeader("x-powered-by");
      next();
    });
  },
});

export default defineConfig({
  // Permite acesso via proxy de inspeção externa (apenas para verificação
  // pontual; não altera a segurança do site publicado).
  server: {
    allowedHosts: true,
  },
  plugins: [
    ...tanstackStart({
      start: {
        entry: "start",
      },
      server: {
        entry: "server",
      },
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    securityHeadersPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
