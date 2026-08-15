# Guia Passo a Passo — Configurando o Supabase para o Site Funcionar

Este guia resolve o problema das telas "Failed to fetch" e "Não é possível aceder a este site". A causa é simples: o arquivo `.env` ainda contém os dados de exemplo (`seu-projeto.supabase.co`), que não são reais. Você precisa colocar nele os dados do **seu projeto real do Supabase**.

Siga este guia do início ao fim. Se travar em algum passo, me envie um print da tela que eu te ajudo.

---

## Passo 1 — Criar (ou abrir) o projeto no Supabase

O Supabase é um serviço gratuito que guarda o banco de dados, os logins e as fotos do site.

1. Acesse **[https://supabase.com](https://supabase.com)** e clique em **Sign In** (Entrar).
2. Crie a conta gratuita (pode usar o Google para facilitar).
3. Depois de logado, clique em **New Project** (Novo Projeto).
4. Preencha:
   - **Name:** `AGNEP` (ou o nome que quiser)
   - **Password:** crie uma senha forte e **anote em um lugar seguro** — ela é a senha do banco de dados
   - **Region:** escolha a mais próxima (ex.: South America / São Paulo, se disponível; senão use United States)
5. Clique em **Create new project** e aguarde 2-3 minutos até aparecer "Your project is ready".

> Se você **já criou o projeto do site com o Lovable antes**, ele já existe! Procure na tela inicial do Supabase pela lista de projetos (menu lateral esquerdo) e clique nele. Pode ser que o projeto ainda esteja **pausado** — nesse caso clique em **Resume** para ativá-lo.

---

## Passo 2 — Copiar as chaves de conexão

Com o projeto aberto no painel do Supabase:

1. No menu lateral esquerdo, lá embaixo, clique no ícone de engrenagem **Settings** (Configurações).
2. Clique em **API**.
3. Nessa tela você verá duas informações importantes. **Copie cada uma** (clique no ícone de copiar ao lado):
   - **Project URL** — algo como `https://abcdefghijklmnop.supabase.co`
   - **anon public** — algo como `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzd...` (uma chave longa)

Guarde as duas em um bloco de notas, pois você vai colar no próximo passo.

---

## Passo 3 — Colocar as chaves no arquivo .env

1. No VS Code, abra a pasta do projeto `agnep-site`.
2. Procure o arquivo chamado **`.env`** na raiz (a mesma pasta do `package.json`). Ele já existe — só precisa editar.
   - **Atenção:** se o arquivo não aparecer na lista, é porque começa com um ponto (arquivos ocultos). No explorador de arquivos do VS Code, clique em **Ver > Mostrar Arquivos Ocultos** se necessário.
3. Apague o conteúdo atual (que tem `seu-projeto.supabase.co`) e cole assim, **substituindo** os dois valores pelos que você copiou no Passo 2:

```
SUPABASE_URL="https://SUAPROJETO.supabase.co"
SUPABASE_PUBLISHABLE_KEY="sua-chave-anon-copiada"
VITE_SUPABASE_URL="https://SUAPROJETO.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="sua-chave-anon-copiada"
```

Repare que o **mesmo endereço** vai nas duas linhas `URL`, e a **mesma chave** vai nas duas linhas de chave.

4. Salve o arquivo (**Ctrl + S**).

---

## Passo 4 — Reiniciar o servidor

O Vite só lê o `.env` quando inicia. Por isso:

1. No terminal do VS Code, pressione **Ctrl + C** para parar o site.
2. Digite:

```
npm run dev
```

3. Aguarde aparecer `Local: http://localhost:5173/` e abra no navegador.

---

## Passo 5 — Verificar se o banco de dados existe

Se o site abrir mas mostrar conteúdo vazio ou erro de tabela, o banco precisa ser criado:

1. No painel do Supabase, no menu lateral, clique em **SQL Editor**.
2. Clique em **New Query** (Nova consulta).
3. Abra no VS Code a pasta `supabase/migrations` do projeto.
4. Copie o conteúdo de **cada arquivo SQL** dessa pasta, um por um, e cole no SQL Editor, clicando em **Run** após cada um. (Comece pelo arquivo mais antigo — os nomes começam com a data, ex.: `20260622002602_...sql`.)
5. Se der erro "relation already exists", não se preocupe — é porque a tabela já existe, pode pular.

---

## Passo 6 — Ativar o Login com Google (opcional, mas recomendado)

1. No painel do Supabase, menu lateral > **Authentication > Providers**.
2. Encontre **Google** e clique para ativar.
3. Você precisará criar um projeto no [Google Cloud Console](https://console.cloud.google.com) para obter o *Client ID* e *Client Secret* do Google (o Supabase mostra um link "Follow guide" com as instruções).
4. **Sem o Google configurado, o botão "Continuar com Google" não funciona** — mas o login com e-mail e senha funciona imediatamente.

---

## Passo 7 — Criar a conta de administrador

1. Com o site rodando (`npm run dev`), abra http://localhost:5173 e clique em **Entrar**.
2. Crie a conta (ou faça login) com:
   - **E-mail:** `pedroigorgoncalvesmelo@gmail.com`
   - **Senha:** `Pedro123`
3. Um gatilho automático no banco libera o acesso de administrador para esse e-mail. Se o painel `/admin` ainda mostrar "Acesso Negado", execute o script `CONFIGURACAO-ADMIN.sql` no SQL Editor do Supabase (mesmo lugar do Passo 5).

---

## Resumo do Diagnóstico das Suas Telas

| Tela que apareceu | Causa | Solução |
|---|---|---|
| "Failed to fetch" no login | `.env` com endereço de exemplo que não existe | Colocar a Project URL real (Passo 2 e 3) |
| "Não é possível aceder a este site — seu-projeto.supabase.co" | O navegador tentou acessar `seu-projeto.supabase.co` (endereço inexistente) | Mesma solução: `.env` com os dados reais |

Depois de corrigir o `.env` e reiniciar o servidor, as duas telas somem e o login passa a funcionar.

---

## Check-list Final

- [ ] Projeto criado/ativado no Supabase
- [ ] Project URL copiada e colada no `.env`
- [ ] Chave anon copiada e colada no `.env` (nas duas linhas)
- [ ] Servidor reiniciado (`Ctrl + C` e `npm run dev`)
- [ ] Migrations executadas no SQL Editor (se o banco estiver vazio)
- [ ] Conta admin criada com o e-mail e senha definidos
- [ ] Painel `/admin` acessível

*Guia preparado por Manus AI — 11/08/2026*
