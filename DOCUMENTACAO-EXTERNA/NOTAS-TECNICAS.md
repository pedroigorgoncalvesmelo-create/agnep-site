# Notas Técnicas — Recuperação do Projeto AGNEP (para retomada)

## Localização
- Projeto: `/home/ubuntu/projects/agnep-016614d3/agnep-site`
- ZIP original do usuário no projeto compartilhado.

## Estado atual (Fase 4-5 em andamento)
- Build: passa (npm run build OK antes de mexer no vite.config)
- TypeScript: `npx tsc --noEmit` exit 0
- SSR desabilitado em src/start.ts (`ssr: false`) — resolveu tela branca
- Login Google migrado para Supabase Auth nativo em src/routes/auth.tsx
- Lovable removido de src/integrations/lovable (pasta), __root.tsx, index.tsx, site-footer.tsx
- types.ts atualizado com admin_audit_log, content_blocks, enum block_type
- .gitignore atualizado (env, lockfiles, cobertura)
- COMO-RODAR.md reescrito (porta 8080, passo a passo, admin SQL, estado independente)
- RESUMO-FINAL-MUDANCAS.md criado
- AGNEP-PROJETO-DOCUMENTACAO.md atualizada (tabela tecnologias, sem Lovable)
- package-lock.json regenerado; bun.lock/bunfig.toml removidos

## PROBLEMA EM ABERTO (importante!)
vite.config.ts usava `@lovable.dev/vite-tanstack-config` (2.8.4, ainda no package.json devDependencies).
Tentei reescrever vite.config.ts com plugins padrão:
- react-swc + tailwind + tsconfigPaths + tanStackStartVite
- Erro: `tanStackStartVite(corePluginOpts, startPluginOpts)` exige 1º argumento
  `corePluginOpts` com `{ providerEnvironmentName, ssrIsProvider, ssrResolverStrategy }` — é a API
  do @tanstack/start-plugin-core (versão instalada 1.171.18).
- Próximo passo: verificar como o React Start exporta um wrapper que fornece corePluginOpts
  (talvez `@tanstack/react-start/vite` ou o próprio react-start precise de plugin), ou
  importar corePluginOpts de `@tanstack/react-start`.

## Dependências do package.json alteradas
- REMOVIDO: @lovable.dev/vite-tanstack-config
- ADICIONADO: @tanstack/start-plugin-core ^1.168.25 (instalou 1.171.18), @vitejs/plugin-react-swc ^4.3.3
- Mantidos: @tanstack/react-start ^1.167.50 (tem @vitejs/plugin-react-swc ~4 aninhado), nitro-beta, vite ^8
- vite-plugin-nitro não existe (removido)

## Pendências para entregar ZIP
1. Resolver vite.config.ts sem Lovable (com build OK)
2. Reinstalar + re-builadar + npm install --package-lock-only
3. Rodar dev server brevemente para confirmar tela (curl localhost:8080)
4. Remover node_modules, .env (manter .env.example), empacotar ZIP
5. Entregar ZIP + explicação ao usuário
6. Comandos para o usuário: npm install && npm run dev (porta 8080)

## Comandos de verificação
- npm run build, npx tsc --noEmit, npm run dev, curl http://localhost:8080
