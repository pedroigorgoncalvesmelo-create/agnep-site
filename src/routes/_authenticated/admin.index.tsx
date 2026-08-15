/*
  Arquivo: admin.index.tsx
  Propósito: Painel administrativo do site AGNEP.
  Descrição: Define a rota "/_authenticated/admin/" e o componente AdminDashboard,
  que consulta o número de registros em várias tabelas do Supabase e exibe cartões
  com links para as páginas de gerenciamento correspondentes.
*/

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Define a rota de arquivo para o painel administrativo usando o createFileRoute.
export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

// Componente principal do painel administrativo.
// Busca contagens de registros nas tabelas do Supabase e exibe cartões com links.
function AdminDashboard() {
  // Estado que guarda as contagens por chave de tabela (ou null enquanto carrega).
  const [counts, setCounts] = useState<Record<string, number | null>>({});

  useEffect(() => {
    // Lista das tabelas a consultar no Supabase.
    const tables = ["eventos", "resultados", "documentos", "fotos", "videos", "patrocinadores", "equipe", "novidades", "inscricoes"] as const;
    // Para cada tabela, faz uma consulta head para obter apenas a contagem exata (sem dados).
    tables.forEach((t) => {
      supabase.from(t).select("*", { count: "exact", head: true }).then(({ count }) => {
        // Atualiza o estado com a nova contagem da tabela. Mantém as contagens anteriores.
        setCounts((c) => ({ ...c, [t]: count ?? 0 }));
      });
    });
    // O array vazio garante que a consulta ocorra apenas no primeiro render (montagem).
  }, []);

  // Configuração dos cartões a exibir: rótulo, chave usada em `counts` e rota de destino.
  const cards = [
    { label: "Eventos", key: "eventos", to: "/admin/eventos" as const },
    { label: "Resultados", key: "resultados", to: "/admin/resultados" as const },
    { label: "Documentos", key: "documentos", to: "/admin/documentos" as const },
    { label: "Fotos", key: "fotos", to: "/admin/galeria" as const },
    { label: "Vídeos", key: "videos", to: "/admin/videos" as const },
    { label: "Patrocinadores", key: "patrocinadores", to: "/admin/patrocinadores" as const },
    { label: "Equipe", key: "equipe", to: "/admin/equipe" as const },
    { label: "Fique por Dentro", key: "novidades", to: "/admin/novidades" as const },
  ];

  // Renderiza o cabeçalho do painel e uma grade de cartões de gerenciamento.
  return (
    <div>
      <p className="eyebrow mb-3">Bem-vindo</p>
      <h1 className="heading-display text-4xl">Painel AGNEP</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">Gerencie todo o conteúdo publicado no site institucional.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          // Cada cartão é um Link para a página de gerenciamento correspondente.
          // Exibe o label, a contagem (ou "—" enquanto indefinida) e um CTA "Gerenciar".
          <Link key={c.key} to={c.to} className="group block border-l-4 border-primary bg-card p-6 ring-1 ring-border transition hover:ring-primary">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</p>
            <p className="mt-2 text-5xl font-black italic tracking-tight">{counts[c.key] ?? "—"}</p>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-primary group-hover:underline">Gerenciar →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
