# AGNEP — Pacote Completo do Projeto

Este arquivo é o **guia mestre** do pacote completo do site da AGNEP (Associação Goiana Núcleo Esportivo e Paradesportivo). Ele explica tudo o que está dentro deste arquivo e como colocar o projeto para funcionar do zero.

---

## 1. O que é este pacote

Este arquivo ZIP contém **toda a cópia completa do site da AGNEP** em um único lugar: o código-fonte, toda a documentação, os scripts de banco de dados e os guias passo a passo. Ele serve como **backup oficial** e como material de referência para reuniões com sócios.

O site é uma aplicação web moderna que apresenta a associação (Jiu-Jitsu e Xadrez, em Itumbiara - GO), com página inicial, sobre, eventos, resultados, galeria de fotos por torneio, documentos e patrocinadores. Inclui um **painel de administração** onde o administrador pode editar textos, trocar imagens (enviando fotos direto do computador), criar eventos com galerias de fotos e legendas, e gerenciar a biblioteca de imagens.

## 2. Conteúdo do pacote

| Pasta / Arquivo | O que contém |
|---|---|
| `src/` | Código-fonte completo do site (React 19 + TanStack Start + Tailwind CSS 4), com comentários em português em todos os arquivos |
| `public/` | Arquivos estáticos, incluindo o **logo oficial da AGNEP** (`logo-agnep.png`) |
| `supabase/migrations/` | Scripts SQL originais do banco de dados |
| `dist/` | Versão do site já compilada, pronta para publicação em serviço de hospedagem |
| `CONFIGURACAO-ADMIN.sql` | Script que garante a permissão de administrador ao e-mail autorizado |
| `CORRIGIR-TRIGGER-AUDIT.sql` | Correção do gatilho de auditoria do banco (resolver erros de atualização) |
| `CRIAR-BUCKET-GALERIA.sql` | Script alternativo de criação do armazenamento de fotos |
| `CRIAR-TABELA-BIBLIOTECA.sql` | Criação da tabela de biblioteca interna de fotos |
| `LEIA-ME-PACOTE-COMPLETO.md` | Este guia mestre |
| `AGNEP-PROJETO-DOCUMENTACAO.md` | Documentação geral do projeto |
| `COMO-RODAR.md` | Instruções para rodar o site no computador |
| `RELATORIO-COMPLETO-FUNCIONALIDADES.md` | Relatório detalhado de tudo que funciona no site |
| `ESTRUTURA-DO-PROJETO.md` | Mapa de todas as pastas e arquivos do código |
| `DEFINIR-SENHA-ADMIN.md` | Como definir e gerenciar a senha do administrador |
| `MELHORIAS-AGNEP.md` | Registro das melhorias aplicadas no projeto |
| `O-QUE-O-SISTEMA-FAZ.md` | Documento completo dizendo tudo que o sistema faz |
| `MAPA-DO-SISTEMA.md` | Mapa explicando como todas as peças se conectam (com diagrama) |
| `AUDITORIA-DE-SEGURANCA.md` | Relatório da auditoria de segurança completa do banco e do site |
| `GUIA-EMAIL-NOVIDADES.md` | Passo a passo para ativar o envio de e-mails das novidades (senha de aplicativo do Gmail) |
| `ADICIONAR-ADMIN-AGNEP-GMAIL.sql` | Script para dar acesso administrativo ao e-mail `Agnepgoias@gmail.com` |
| `arquitetura-sistema.png` | Diagrama visual do mapa do sistema |
| `package.json`, `vite.config.ts`, `tsconfig.json` | Configurações técnicas do projeto |

## 3. Como fazer o site funcionar (passo a passo)

### Pré-requisitos

Instale o **Node.js** (versão 20 ou superior) baixando em [nodejs.org](https://nodejs.org) e crie uma conta gratuita no [Supabase](https://supabase.com) (banco de dados e armazenamento das fotos).

### Passo 1 — Preparar a pasta

1. Extraia o ZIP em qualquer pasta (por exemplo, na Área de Trabalho)
2. Abra a pasta `agnep-site` no **Visual Studio Code**
3. **NÃO abra** a pasta pelo Windows Explorer — sempre pelo VS Code

### Passo 2 — Instalar as dependências

No VS Code, abra o terminal (**Menu Terminal → New Terminal**) e rode:

```bash
npm install
```

Aguarde terminar (pode levar alguns minutos).

### Passo 3 — Configurar o Supabase

1. No painel do Supabase, crie um projeto (ou use o projeto "Agnep" existente)
2. Clique em **Project Settings → API** e copie a **Project URL** e a **chave anon (public)**
3. No VS Code, crie um arquivo chamado `.env` na raiz da pasta `agnep-site` (painel esquerdo → botão direito → New File) com este conteúdo, substituindo pelos seus valores:

```env
SUPABASE_URL="https://SEU-PROJETO.supabase.co"
SUPABASE_PUBLISHABLE_KEY="SUA-CHAVE-ANON-AQUI"
VITE_SUPABASE_URL="https://SEU-PROJETO.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="SUA-CHAVE-ANON-AQUI"
```

⚠️ **As 4 linhas devem estar idênticas** (mesma URL e mesma chave).

### Passo 4 — Criar as tabelas do banco

1. No Supabase, abra **SQL Editor → New query**
2. Cole o conteúdo dos scripts (na ordem): `CRIAR-TABELA-BIBLIOTECA.sql` e `CONFIGURACAO-ADMIN.sql`
3. Para o armazenamento de fotos, crie um bucket chamado `galeria` em **Storage → New bucket**, marque **Public bucket**, e crie 2 políticas em Policies: uma de **INSERT para authenticated** e uma de **SELECT pública** (detalhes no arquivo `CRIAR-BUCKET-GALERIA.sql` como referência)

### Passo 5 — Criar o usuário administrador

1. No Supabase, vá em **Authentication → Users → Add user**
2. Preencha: e-mail do administrador, senha, marque **Auto Confirm User**
3. Execute o `CONFIGURACAO-ADMIN.sql` no SQL Editor para garantir a permissão de admin

### Passo 6 — Rodar o site

No terminal do VS Code:

```bash
npm run dev
```

Abra no navegador o endereço que aparecer, normalmente `http://localhost:5173`. Para entrar como administrador, acesse `/auth` e faça login.

## 4. Tecnologias usadas

O projeto usa **React 19** com **TanStack Start** (framework de aplicações), **Vite** (ferramenta de desenvolvimento), **Tailwind CSS 4** (estilo visual), **TypeScript** (segurança do código) e **Supabase** (banco de dados, login e armazenamento de fotos). O código está comentado em português para facilitar a manutenção.

## 5. Contato e manutenção

Qualquer dúvida sobre o funcionamento ou novas melhorias, consulte os demais arquivos de documentação deste pacote ou retome a conversa no Manus, onde o projeto foi desenvolvido e mantido.

## 6. Novidades da versão 7 (agosto de 2026)

Esta versão adiciona a área **"Fique por Dentro das Novidades"**:

| Novo item | Descrição |
|---|---|
| Página pública `/novidades` | Visitantes se inscrevem com o e-mail para receber avisos e veem as publicações mais recentes. |
| Painel `/admin/novidades` | Criar, publicar, despublicar e excluir novidades; ver e gerenciar a lista de inscritos. |
| Avisos por e-mail | Ao publicar uma novidade, o sistema envia um e-mail de aviso para todos os inscritos (via Gmail da AGNEP). A senha de e-mail nunca fica exposta no navegador. |
| Item no menu admin e no rodapé | "Novidades (Avisos)" no menu do administrador e link "Novidades" no rodapé do site. |

Para ativar a área de Novidades, execute no Supabase (SQL Editor → New query → Run):

1. `supabase/migrations/20260815000000_novidades.sql` — cria as tabelas `novidades` e `inscricoes` com as travas de segurança (RLS). **Obrigatório.**
2. `ADICIONAR-ADMIN-AGNEP-GMAIL.sql` — dá acesso administrativo ao e-mail `Agnepgoias@gmail.com` (se ainda não fez).

Para ativar o envio de e-mails, siga o **`GUIA-EMAIL-NOVIDADES.md`** (criar a senha de aplicativo no Gmail e adicionar `GMAIL_APP_PASSWORD` ao `.env`).

## 7. Auditoria e SEO (agosto de 2026)

Uma auditoria completa foi realizada em 13/08/2026, incluindo verificação do layout em celular (aprovado em todas as páginas), auditoria de SEO (títulos e descrições únicos em todas as páginas; recomendações de melhoria no arquivo `AUDITORIA-DE-SEGURANCA.md`), testes de invasão simulada contra o banco de dados (todas as travas aprovadas) e um relatório geral com o veredicto **APROVADO**. Leia `AUDITORIA-DE-SEGURANCA.md` para os detalhes.
