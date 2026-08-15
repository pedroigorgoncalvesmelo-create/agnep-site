# AGNEP — Guia de Uso Final (Projeto Corrigido e Independente)

Olá! O projeto do site da AGNEP foi recuperado, corrigido e tornado totalmente independente. Este guia explica o que foi feito, o que está funcionando e como usar o novo ZIP.

## O Que Estava Acontecendo (Tela Branca)

O motivo da tela branca era um recurso interno do TanStack Start (o framework do site) que tentava se conectar à infraestrutura do Lovable. Como essa infraestrutura não existe no seu computador, o servidor travava silenciosamente e o navegador recebia uma página vazia, sem nenhum erro visível. Isso foi corrigido desabilitando esse recurso no arquivo `src/start.ts`, o que **não remove nenhuma funcionalidade** do site — apenas muda a forma como ele é montado no navegador.

## O Que Foi Melhorado

**Independência total.** O arquivo `vite.config.ts` foi reescrito usando apenas pacotes oficiais (Vite, TanStack, React, Tailwind). O pacote `@lovable.dev/vite-tanstack-config` foi removido do projeto. Agora o site roda em qualquer computador com Node.js e pode ser publicado em qualquer serviço de hospedagem (Cloudflare Pages, Vercel, Netlify — todos têm plano gratuito).

**Segurança preservada e reforçada.** Como o servidor não renderiza mais as páginas, os headers de segurança (que protegem contra XSS, clickjacking e outros ataques) foram movidos para a configuração do Vite, garantindo que continuem ativos tanto no modo de desenvolvimento quanto no site publicado. As proteções do banco de dados (RLS), a validação de uploads e o log de auditoria continuam funcionando normalmente.

**Tipos do banco de dados sincronizados.** As novas tabelas `admin_audit_log` (registro de todas as ações de administração) e `content_blocks` (blocos de texto e imagem que você pode colocar em qualquer página) agora estão mapeadas no código.

**Organização.** A documentação foi atualizada para refletir o estado real do projeto, o `.gitignore` protege suas chaves secretas, e o arquivo de dependências (`package-lock.json`) foi regenerado.

## Como Testar o Novo ZIP

Apague a pasta antiga e substitua pelo conteúdo do novo ZIP (`agnep-site-completo.zip`). Depois, no terminal do VS Code (Ctrl + `), execute:

```
npm install
npm run dev
```

Aguarde até aparecer `Local: http://localhost:5173/` e abra esse endereço no navegador. O site deve carregar normalmente, com todas as páginas, o login do Google e o painel de administração funcionando.

## Resumo de Comandos

| Comando | O que faz |
|---|---|
| `npm install` | Instala as dependências (primeira vez ou após atualizações) |
| `npm run dev` | Inicia o site em modo desenvolvimento (http://localhost:5173) |
| `npm run build` | Compila o site para produção |
| `npm run preview` | Testa a versão compilada (http://localhost:4173) |

## Onde Editar e Documentação

O passo a passo completo está no arquivo `COMO-RODAR.md` dentro da pasta do projeto, e o resumo de todas as mudanças está no arquivo `RESUMO-FINAL-MUDANCAS.md`. Se quiser editar textos e imagens do site, lembre-se de que você precisa se tornar administrador: crie sua conta no site e depois execute o comando SQL indicado no `COMO-RODAR.md` no painel do Supabase.
