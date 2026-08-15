/*
  Arquivo: error-capture.ts

  Propósito:
  - Capturar e armazenar temporariamente o último Error ocorrido fora do fluxo
    normal (por exemplo, quando o h3 já transformou uma exceção em uma
    resposta genérica 500).
  - Permitir que outro módulo (como server.ts) recupere a pilha original do
    erro chamando consumeLastCapturedError(), desde que o erro ainda esteja
    dentro do TTL (time-to-live) definido.

  Observação:
  - Comentários adicionais explicativos foram adicionados ao longo do código para
    ajudar desenvolvedores iniciantes a entenderem o que cada parte faz e por quê.
*/

/* Captures the original Error out-of-band so server.ts can recover the stack
   when h3 has already swallowed the throw into a generic 500 Response. */

// Guarda o último erro capturado e o timestamp em que foi registrado.
// Usamos `unknown` para manter a tipagem segura (o erro pode ser qualquer coisa).
let lastCapturedError: { error: unknown; at: number } | undefined;

/* TTL_MS é o tempo (em milissegundos) que um erro permanece válido para
   recuperação. Depois desse período consideramos que o erro expirou e não
   deve mais ser consumido. */
const TTL_MS = 5_000;

/* Função auxiliar para registrar o erro atual junto com o timestamp.
   O motivo de existir é centralizar o armazenamento e facilitar testes/ajustes. */
function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

/* Se o ambiente global suportar addEventListener (navegador ou alguns runtimes),
   registramos handlers para:
   - "error": captura erros lançados que resultam em ErrorEvent
   - "unhandledrejection": captura promessas rejeitadas sem tratamento

   Por que fazer isso:
   - Em muitos frameworks, uma exceção pode ser "consumida" e transformada em uma
     resposta genérica. Ao capturar o erro aqui, mantemos a pilha original para
     diagnóstico posterior.
*/
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

/* consumeLastCapturedError:
   - Retorna o último erro capturado, se existir e não tiver expirado.
   - Após a leitura bem-sucedida, limpa o armazenamento para evitar múltiplas
     leituras do mesmo erro.
   - Se o erro tiver expirado (mais antigo que TTL_MS), também limpa e retorna undefined.

   Por que isso é útil:
   - Permite que código de nível superior (por exemplo, o servidor) recupere a
     informação original do erro para logging ou para reconstruir a stack trace
     antes que ela seja perdida.
*/
export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
