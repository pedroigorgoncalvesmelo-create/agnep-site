/*
  Arquivo: app-splash.tsx

  Propósito:
  - "Escudo" de carregamento: uma tela de abertura com a identidade da AGNEP
    (logo circular e nome da associação) que aparece por alguns instantes
    enquanto o site carrega os dados.

  Como funciona:
  - Fica visível assim que o site abre, com fundo escuro, logo em destaque
    e uma animação suave de aparecimento (fade) e de respiração da logo.
  - Depois de alguns segundos (ou quando o site termina de carregar os dados),
    o escudo desaparece com uma transição e revela o site.

  Por que isso é bom:
  - Dá uma impressão profissional de "aplicativo" ao abrir o site no celular.
  - Aproveita o tempo de carregamento dos dados do Supabase sem mostrar
    uma tela em branco.

  Como desativar (se um dia não quiser mais):
  - No arquivo src/routes/__root.tsx, remova a linha <AppSplash /> dentro
    do RootComponent.
*/

import { useEffect, useState } from "react";

export function AppSplash() {
  // `visible` controla se o escudo ainda está na tela.
  // `hidden` é o estágio final: após esconder, removemos o elemento do DOM
  // para ele não atrapalhar cliques no site.
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Duração do escudo: 2,2 segundos — tempo suficiente para aparecer a
    // identidade e não mais do que isso (ninguém gosta de esperar).
    const timer = window.setTimeout(() => {
      setVisible(false); // inicia a transição de saída
      // depois de 0,8s (duração da transição), remove do DOM
      const remover = window.setTimeout(() => setHidden(true), 800);
      return () => window.clearTimeout(remover);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, []);

  if (hidden) {
    // Escudo já saiu de cena — não renderiza nada.
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando o site da AGNEP"
      className={
        // Transição de opacidade controlada pelo estado visible.
        "fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background transition-opacity duration-700 " +
        (visible ? "opacity-100" : "opacity-0")
      }
    >
      {/* Camada de destaque por trás da logo (brilho suave dourado) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Logo circular da AGNEP com animação de "respiração" (escala suave) */}
      <img
        src="/logo-agnep.png"
        alt="Emblema oficial da AGNEP"
        className="relative h-36 w-36 animate-pulse drop-shadow-2xl md:h-44 md:w-44"
        style={{ animationDuration: "2.2s" }}
      />

      {/* Nome da associação com tipografia forte do site */}
      <div className="relative flex flex-col items-center gap-1 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-primary">
          Carregando
        </p>
        <p className="heading-display text-2xl tracking-wide md:text-3xl">AGNEP</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Núcleo Esportivo e Paradesportivo
        </p>
      </div>

      {/* Barra de progresso fina para indicar movimento */}
      <div className="relative mt-2 h-[3px] w-48 overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 left-0 bg-primary"
          style={{
            width: visible ? "100%" : "100%",
            animation: "agnep-progress 2s ease-in-out forwards",
          }}
        />
      </div>
    </div>
  );
}
