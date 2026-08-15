# Melhorias Realizadas — Site AGNEP

Este documento resume todas as alterações feitas no projeto para melhorar o design, reforçar a segurança e adicionar o sistema de blocos de conteúdo editáveis.

---

## 1. Redesign do Visual

A paleta de cores foi ajustada para harmonizar com as imagens do site (tabuleiro de xadrez em madeira, kimonos brancos). A cor **dourada** passou a ser a principal, substituindo o vermelho que não combinava com o tom quente das fotos.

### Mudanças no `src/styles.css`

| Elemento | Antes | Depois |
|---|---|---|
| Cor primária | Vermelho forte | Dourado quente (oklch 0.68 0.14 72) |
| Fundo do site | Branco neutro/cinza | Creme com tom dourado sutil |
| Gradientes | Vermelho + azul marinho | Dourado + azul marinho + toque de vermelho |
| Sombras | Básicas | Com brilho dourado sutil |
| Animações | Várias pesadas | Simplificadas: fade-in-up, float-gentle, subtle-glow |
| Texturas | Nenhuma | Opcionais (surface-gold-warm, gold-border-hover) |
| Seções de destaque | Básicas | Fundos quentes com glow animado suave |

### Animações mantidas (simples e elegantes)

O site agora usa animações leves que chamam atenção sem poluir: `fade-in-up` para elementos que aparecem ao carregar, `float-gentle` para brilhos de fundo, `subtle-glow` para destaque sutil, e `border-shimmer` dourado no hover dos cards.

---

## 2. Segurança Reforçada

Quatro camadas de proteção foram adicionadas para evitar vazamento de dados.

### Headers HTTP (`src/start.ts`)

| Header | Função |
|---|---|
| `Content-Security-Policy` | Bloqueia scripts maliciosos de fontes não autorizadas |
| `Strict-Transport-Security` | Força HTTPS (máximo 1 ano) |
| `X-Frame-Options: DENY` | Impede embedding em iframes (anti-clickjacking) |
| `X-Content-Type-Options: nosniff` | Impede sniffing de MIME type |
| `Referrer-Policy` | Não expõe URL completa para outros sites |
| `Permissions-Policy` | Bloqueia câmera, microfone e geolocalização |
| `Cache-Control` | Impede dados antigos em formulários e login |
| Remove `server` e `x-powered-by` | Elimina fingerprinting do servidor |

### Validação de Upload (`src/lib/storage.ts`)

| Proteção | Detalhe |
|---|---|
| Validação de MIME type | Só aceita PDF (docs), JPG/PNG/WebP (fotos), SVG (logos) |
| Validação de extensão | Defesa em profundidade (dupla verificação) |
| Limite de tamanho | 10MB documentos, 5MB fotos, 2MB logos |
| Expiração de URLs | Reduzida de 7 dias para 1 hora |
| Sanitização de nomes | UUID + extensão apenas (previne path traversal) |

### Banco de Dados (`supabase/migrations/20260802000000_security_hardening.sql`)

| Proteção | Detalhe |
|---|---|
| Tabela de auditoria | `admin_audit_log` registra toda ação do admin |
| Triggers de auditoria | Anexados a todas as 9 tabelas administráveis |
| Grants restritos | Usuários anon só podem LER, nunca escrever |
| `has_role` protegido | Só usuários autenticados podem verificar roles |
| Índices otimizados | Performance do log de auditoria |

---

## 3. Sistema de Blocos de Conteúdo Editáveis

Nova funcionalidade que permite ao administrador **criar textos e imagens e colocá-los em qualquer página do site**, com controle de posição, alinhamento e estilo.

### Arquivos criados

| Arquivo | Função |
|---|---|
| `src/components/content-blocks.tsx` | Sistema completo: Provider, PageBlocks, AddBlockButton |
| `src/routes/_authenticated/admin.blocos.tsx` | Painel admin para gerenciar blocos |
| `supabase/migrations/20260802000100_content_blocks.sql` | Tabela no banco de dados |

### Como funciona

O administrador acessa o painel `/admin/blocos` e pode:

1. **Escolher a página** onde quer inserir o conteúdo (Home, Sobre, Eventos, etc.)
2. **Escolher o tipo** (Texto ou Imagem)
3. **Clicar em "Adicionar"** para criar o bloco
4. **Editar** título, conteúdo, alinhamento, largura e fundo
5. **Reordenar** com setas para cima/baixo
6. **Excluir** blocos que não precisa mais

Na página pública, os blocos aparecem automaticamente na ordem definida, com edição inline (clique no lápis para editar texto ou trocar imagem diretamente).

### Arquivo alterado para integrar

| Arquivo | Alteração |
|---|---|
| `src/routes/__root.tsx` | Adicionado `ContentBlocksProvider` no layout global |
| `src/routes/_authenticated/admin.tsx` | Adicionado link "Blocos de Conteúdo" no menu lateral |
| `src/routes/index.tsx` | Adicionado `<PageBlocks page="home" />` e `<AddBlockButton />` |

---

## 4. Edição Inline Continua Funcionando

A edição inline existente (EText, EImage, EVideo) **não foi alterada** e continua funcionando normalmente. O novo sistema de blocos complementa essa funcionalidade, permitindo adicionar conteúdo que antes não existia no layout fixo.

---

## Resumo dos Arquivos

| Arquivo | Status |
|---|---|
| `src/styles.css` | **Reescrito** — nova paleta e animações equilibradas |
| `src/start.ts` | **Reescrito** — headers de segurança HTTP |
| `src/lib/storage.ts` | **Reescrito** — validação e expiração reduzida |
| `src/components/content-blocks.tsx` | **Novo** — sistema de blocos editáveis |
| `src/routes/_authenticated/admin.blocos.tsx` | **Novo** — painel de gerenciamento |
| `src/routes/__root.tsx` | **Editado** — adicionado ContentBlocksProvider |
| `src/routes/_authenticated/admin.tsx` | **Editado** — link no menu |
| `src/routes/index.tsx` | **Editado** — PageBlocks na home |
| `supabase/migrations/20260802000000_security_hardening.sql` | **Novo** — auditoria e restrições |
| `supabase/migrations/20260802000100_content_blocks.sql` | **Novo** — tabela de blocos |

---

## Como Aplicar

1. Copiar os arquivos modificados/criados para o projeto Lovable
2. Executar as duas migrações SQL no Supabase (pelo SQL Editor)
3. O site ficará com novo visual, segurança reforçada e blocos editáveis
