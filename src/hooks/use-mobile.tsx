/*
  Arquivo: use-mobile.tsx
  Propósito: Hook React para detectar se a visualização atual é mobile com base
            em um breakpoint (largura da janela). Fornece um booleano indicando
            se o dispositivo/viewport deve ser tratado como mobile.

  Observações:
  - Usa window.matchMedia para reagir a mudanças de tamanho de janela.
  - Inicializa o estado com undefined e converte para boolean no retorno.
  - Comentários explicativos em português foram adicionados para orientar
    desenvolvedores iniciantes sobre o que cada parte faz e porquê.
*/

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// Hook que informa se a viewport atual é considerada mobile (true/false).
export function useIsMobile() {
  // Estado que pode ser true, false ou undefined até a primeira medição.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Cria um MediaQueryList para monitorar quando a largura ficar abaixo do breakpoint.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Callback executado quando a query de mídia mudar.
    // Atualiza o estado com base na largura atual da janela.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Adiciona o listener para alterações da media query.
    mql.addEventListener("change", onChange);

    // Define imediatamente o estado com base no tamanho atual da janela,
    // garantindo que o valor esteja correto logo após o mount.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Cleanup: remove o listener ao desmontar o componente/useEffect.
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Converte o estado possivelmente undefined para um booleano (false quando undefined).
  // Isso simplifica o consumo do hook, evitando que componentes lidem com undefined.
  return !!isMobile;
}
