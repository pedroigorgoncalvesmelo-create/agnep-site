# Roteiro do Zero — Colocando o Projeto AGNEP para Rodar de Verdade

Este roteiro foi feito para você seguir do início ao fim, uma etapa de cada vez. Não pule etapas. Ao final de cada etapa, me mande um print do resultado (ou só me diga "pronto") que eu confirmo antes de você avançar. Assim não acumulamos problemas.

---

## ETAPA 1 — Preparar a pasta do projeto (5 minutos)

1. **Apague a pasta antiga** `agnep-site` que está na sua Área de Trabalho (ou onde estiver).
2. **Extraia o ZIP mais recente** (`agnep-site-completo.zip`, o último que enviei) na Área de Trabalho.
   - Clique com o botão direito no ZIP → **Extrair tudo...** → Extrair
3. Abra o **VS Code** → **Arquivo → Abrir Pasta** → selecione a pasta `agnep-site` extraída.

## ETAPA 2 — Instalar as dependências (2 a 5 minutos)

1. No VS Code, abra o terminal: menu **Terminal → New Terminal** (ou Ctrl + `).
2. Digite o comando abaixo e pressione Enter:

   ```
   npm install
   ```

3. Aguarde aparecer `added XXX packages` (pode levar alguns minutos).
   - Se aparecer algum erro `ERESOLVE`, rode `npm install --legacy-peer-deps` em vez disso.
   - **Atenção:** execute esse comando apenas UMA VEZ e aguarde terminar. Se rodar duas vezes ao mesmo tempo, o site abre em outra porta (5174) e pode confundir.

## ETAPA 3 — Criar o arquivo .env (2 minutos)

1. No VS Code, no painel esquerdo (Explorer), clique com o **botão direito** em uma área vazia → **New File...**
2. Digite o nome: `.env` e pressione Enter.
3. Abra o arquivo e cole **exatamente** o conteúdo abaixo (esses são os dados reais do seu projeto Supabase, já validados):

   ```
   SUPABASE_URL="https://hngrbuucehrzvpiwqrmp.supabase.co"
   SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZ3JidXVjZWhyenZwaXdxcm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0OTM3NDIsImV4cCI6MjEwMjA2OTc0Mn0.W4K8sqChIQy_X8YNPPwr1swpI5NlrsR1P5zOilbvseY"
   VITE_SUPABASE_URL="https://hngrbuucehrzvpiwqrmp.supabase.co"
   VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZ3JidXVjZWhyenZwaXdxcm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0OTM3NDIsImV4cCI6MjEwMjA2OTc0Mn0.W4K8sqChIQy_X8YNPPwr1swpI5NlrsR1P5zOilbvseY"
   ```

4. Salve com **Ctrl + S**.

## ETAPA 4 — Verificar o Supabase (1 minuto)

1. Abra https://supabase.com/dashboard e entre no projeto **Agnep**.
2. No topo, o projeto deve estar marcado como **PRODUCTION** e o status deve ser **"Healthy"** (verde).
   - Se estiver em pausa (dormindo), clique no botão de **wakeup/ativar** ou simplesmente recarregue a página — o plano gratuito pausa sozinho após inatividade.

## ETAPA 5 — Rodar as migrations no banco (3 minutos)

Estas criações de tabelas são necessárias para o site funcionar por completo (conteúdo, papéis de usuário etc.):

1. No painel do Supabase, clique no ícone de **"SQL Editor"** no menu esquerdo (ícone com `>_`).
2. Clique em **"New query"**.
3. Abra a pasta do projeto no VS Code, entre em `supabase/migrations/` e abra cada arquivo `.sql`, **um por vez**.
4. Copie o conteúdo de **CADA arquivo** e cole no SQL Editor, clicando em **Run** depois de cada um (comece pelo arquivo com data mais antiga e vá na ordem).
5. Se algum arquivo der erro "já existe" (relation already exists), está tudo bem — pode pular para o próximo.

## ETAPA 6 — Iniciar o site (1 minuto)

1. No terminal do VS Code, digite:

   ```
   npm run dev
   ```

2. Aguarde aparecer:

   ```
   VITE ready in ... ms
   ➜  Local:   http://localhost:5173/
   ```

3. Abra no navegador: **http://localhost:5173**
4. O site da AGNEP deve aparecer completo (logo, menu, "Força física, precisão mental").
   - **Atenção:** se aparecer `localhost:5174`, é porque existe outra janela de terminal rodando o site. Feche uma delas (Ctrl + C no terminal extra) e use apenas a porta 5173.

## ETAPA 7 — Entrar como administrador (2 minutos)

O rate limit de e-mails do Supabase deve ter sido liberado após horas sem tentativas. Vamos tentar o caminho mais simples primeiro:

1. Abra **http://localhost:5173/auth**
2. Clique em **"Já tem uma conta? Entrar"**
3. E-mail: `pedroigorgoncalvesmelo@gmail.com` | Senha: `Pedro123`
4. Clique em **Entrar**

**Se der erro "Não foi possível conectar":** desative temporariamente antivírus/firewall e tente de novo; ou teste em aba anônima.
**Se der "E-mail não confirmado":** no Supabase → Authentication → Users → clique no seu e-mail → marque **"Email confirmed"** → Save.
**Se der "E-mail ou senha incorretos":** o e-mail pode ter sido confirmado, mas a senha pode não estar definida. Veja a ETAPA 8.
**Se abrir o painel /admin:** parabéns, está tudo funcionando! ✅

## ETAPA 8 — Garantir o acesso admin (se a Etapa 7 falhar)

1. No Supabase → **Authentication → Users**:
   - Clique na linha do seu e-mail
   - Marque **"Email confirmed"** (se estiver desmarcado) e salve
2. Ainda no painel do seu usuário, role até **"Reset password"**, clique em **"Send password recovery"** e abra o link do e-mail **rapidamente** (em menos de 10 minutos) para definir a senha `Pedro123`.
3. Se tudo falhar, use o script de emergência: abra o arquivo **`CONFIGURACAO-ADMIN.sql`** (está na pasta do projeto), copie tudo e cole no **SQL Editor** do Supabase, clicando em **Run**. Ele garante que seu e-mail existe, confirmado, com senha e role de admin.

---

## Ordem rápida de consulta

| Etapa | Ação | Comando / Local |
|---|---|---|
| 1 | Extrair ZIP e abrir no VS Code | Área de Trabalho |
| 2 | Instalar dependências | `npm install` |
| 3 | Criar .env | Arquivo `.env` na raiz |
| 4 | Conferir Supabase ativo | Dashboard → status Healthy |
| 5 | Rodar migrations | SQL Editor (arquivos de `supabase/migrations`) |
| 6 | Iniciar site | `npm run dev` → localhost:5173 |
| 7 | Fazer login | /auth com e-mail e senha |
| 8 | Garantir acesso admin | Painel Supabase ou CONFIGURACAO-ADMIN.sql |
