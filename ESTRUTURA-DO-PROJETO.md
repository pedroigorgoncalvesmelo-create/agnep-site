# AGNEP — Site Institucional
## Guia completo da estrutura do projeto

Este pacote contém todo o código-fonte do site da **AGNEP – Associação Goiana Núcleo Esportivo e Paradesportivo**.

Tecnologias: **React 19 + TanStack Start (roteamento e SSR) + Vite 7 + Tailwind CSS v4** no frontend e **Lovable Cloud (banco de dados, autenticação, storage)** no backend.

---

## 1. Raiz do projeto

| Arquivo | Para que serve |
|---|---|
| `package.json` | Lista de dependências e scripts (`dev`, `build`). |
| `bun.lock` / `package-lock.json` | Trava as versões exatas das dependências. |
| `vite.config.ts` | Configuração do build e do servidor de desenvolvimento. |
| `tsconfig.json` | Configuração do TypeScript (inclui o atalho `@/` → `src/`). |
| `eslint.config.js` | Regras de qualidade/padrão de código. |
| `.prettierrc` / `.prettierignore` | Formatação automática do código. |
| `components.json` | Configuração da biblioteca de componentes (shadcn/ui). |
| `.env` | Endereço e chave pública do backend. **Não apague.** |
| `AGENTS.md` | Notas técnicas do projeto. |

### Como rodar localmente
```bash
npm install      # ou: bun install
npm run dev      # abre em http://localhost:8080
```

---

## 2. `public/`
Arquivos servidos diretamente, sem processamento.
- `robots.txt` — instruções para os buscadores (Google etc.).

---

## 3. `src/` — todo o código da aplicação

### 3.1 `src/routes/` — as páginas do site
No TanStack Start **cada arquivo vira uma URL automaticamente**.

**Páginas públicas**
| Arquivo | URL | Conteúdo |
|---|---|---|
| `index.tsx` | `/` | Home: hero com a logo, estatísticas automáticas (com modal de detalhes), próximos eventos, modalidades e chamada final. |
| `sobre.tsx` | `/sobre` | História, missão, valores e equipe. |
| `eventos.tsx` | `/eventos` | Calendário de torneios cadastrados pelo admin. |
| `resultados.tsx` | `/resultados` | Medalhas e conquistas por atleta/competição. |
| `galeria-fotos.tsx` | `/galeria-fotos` | Galeria de fotos. |
| `galeria-videos.tsx` | `/galeria-videos` | Vídeos do YouTube. |
| `documentos.tsx` | `/documentos` | PDFs institucionais (estatuto, prestação de contas etc.). |
| `patrocinadores.tsx` | `/patrocinadores` | Apoiadores e parceiros. |
| `contato.tsx` | `/contato` | Canais de contato e localização. |
| `auth.tsx` | `/auth` | **Tela de login do administrador.** |
| `sitemap[.]xml.ts` | `/sitemap.xml` | Mapa do site gerado para o Google. |

**Arquivos especiais**
- `__root.tsx` — "moldura" do site: cabeçalho, rodapé, botão de edição, SEO global e páginas de erro/404.
- `README.md` — notas sobre o sistema de rotas.

**`src/routes/_authenticated/` — área restrita (`/admin`)**
Tudo aqui exige login de administrador; quem não estiver logado é redirecionado para `/auth`.

| Arquivo | URL | Função |
|---|---|---|
| `route.tsx` | — | Portaria: verifica a sessão antes de liberar as páginas. |
| `admin.tsx` | — | Layout do painel (menu lateral). |
| `admin.index.tsx` | `/admin` | Visão geral do painel. |
| `admin.home.tsx` | `/admin/home` | Textos e números da página inicial. |
| `admin.eventos.tsx` | `/admin/eventos` | Cadastrar/editar torneios. |
| `admin.resultados.tsx` | `/admin/resultados` | Medalhas, atletas e competições. |
| `admin.galeria.tsx` | `/admin/galeria` | Upload e gestão de fotos. |
| `admin.videos.tsx` | `/admin/videos` | Vídeos do YouTube. |
| `admin.documentos.tsx` | `/admin/documentos` | Upload de PDFs. |
| `admin.patrocinadores.tsx` | `/admin/patrocinadores` | Logos e links de apoiadores. |
| `admin.equipe.tsx` | `/admin/equipe` | Professores e diretoria. |

### 3.2 `src/components/` — peças reutilizáveis
- `site-header.tsx` — cabeçalho com logo e menu de navegação.
- `site-footer.tsx` — rodapé com contatos e links.
- `page-header.tsx` — faixa de título azul usada no topo das páginas internas.
- `admin-ui.tsx` — campos, botões e tabelas padronizados do painel admin.
- `ui/` — biblioteca base (shadcn/ui): botões, diálogos, formulários etc. **Não precisa editar.**

### 3.3 `src/lib/` — lógica auxiliar
- `site-content.tsx` — **coração da edição inline**: componentes `EText`, `EImage`, `EVideo`, o botão flutuante de lápis e a verificação de quem é administrador.
- `storage.ts` — envio de arquivos (fotos e PDFs) para o storage do backend.
- `utils.ts` — funções utilitárias pequenas.
- `error-capture.ts`, `error-page.ts`, `lovable-error-reporting.ts` — captura e exibição amigável de erros.

### 3.4 `src/assets/` — imagens do site
Fotos usadas nos textos institucionais (`hero-agnep.jpg`, `jiujitsu-class.jpg`, `xadrez-class.jpg`, `podium.jpg`, `action-jj.jpg`) e o ponteiro da logo oficial (`agnep-logo.png.asset.json`).

### 3.5 `src/integrations/supabase/` — conexão com o backend
Arquivos **gerados automaticamente** (cliente do banco, autenticação e tipos das tabelas). Não edite manualmente.

### 3.6 Outros arquivos em `src/`
- `router.tsx` — configuração do roteador.
- `routeTree.gen.ts` — mapa de rotas gerado automaticamente.
- `styles.css` — **design system**: cores (navy, vermelho, dourado), tipografia, classes como `.surface-navy-glow` e todas as animações.
- `server.ts` / `start.ts` — configuração do lado servidor.

---

## 4. `supabase/` — banco de dados
- `migrations/` — histórico de todos os comandos SQL que criaram as tabelas, permissões (RLS) e políticas de segurança.
- `config.toml` — configuração do projeto de backend.

**Principais tabelas:** `eventos`, `resultados`, `fotos`, `videos`, `documentos`, `patrocinadores`, `equipe`, `site_stats`, `site_content` e `user_roles` (controle de administradores).

---

## 5. Como o administrador usa o site

1. Acesse `SEU-SITE/auth` e faça login.
2. **Painel completo:** vá em `SEU-SITE/admin` para cadastrar eventos, resultados, fotos, vídeos, documentos, patrocinadores e equipe.
3. **Edição inline:** navegando pelo site logado, clique no ícone de **lápis** no canto superior direito para ativar o modo de edição e alterar textos, imagens e vídeos direto na página.
4. Todas as alterações aparecem imediatamente no site publicado.

---

## 6. O que já está pronto x o que falta

**Pronto:** identidade visual completa, todas as páginas públicas, backend com segurança (RLS), login de administrador, painel administrativo completo, edição inline, estatísticas automáticas a partir dos resultados e SEO básico.

**Falta:** publicar o site (e conectar domínio próprio, se desejar), cadastrar o conteúdo real, envio de e-mail no formulário de contato e imagens oficiais de compartilhamento para redes sociais.
