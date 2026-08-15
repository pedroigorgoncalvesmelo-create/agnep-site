/*
  Arquivo: error-page.ts

  Propósito:
  - Fornece uma página HTML simples como fallback quando uma rota ou página não for carregada corretamente.
  - Retorna uma string HTML pronta para ser enviada como resposta (útil em cenários de SSR/erros do servidor).
  - Mantido simples e independente de frameworks para garantir que seja exibido mesmo quando o resto da aplicação falhar.

  Observações para desenvolvedores iniciantes:
  - Esta função não faz renderização React; ela apenas monta e retorna uma string contendo todo o HTML.
  - Use esta página para exibir mensagens amigáveis ao usuário quando algo der errado.
*/

export function renderErrorPage(): string {
  // Retorna uma página HTML completa como string.
  // Por que retornar como string:
  // - Permite enviar este HTML diretamente em respostas HTTP sem depender do pipeline de renderização da aplicação.
  // - É uma proteção leve para mostrar uma interface ao usuário quando ocorre um erro crítico.
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
