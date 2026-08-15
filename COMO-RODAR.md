# Como Rodar o Projeto AGNEP no VS Code

## Pré-requisitos

Antes de começar, instale os seguintes programas no seu computador:

| Programa | Versão Mínima | Para que serve |
|---|---|---|
| **Node.js** | 20.0+ | Motor JavaScript que roda o projeto |
| **npm** (vem com Node) | 10.0+ | Gerenciador de pacotes |
| **VS Code** | Qualquer | Editor de código |

Verifique se estão instalados abrindo o terminal do VS Code (Ctrl + `) e digitando:

```
node -v
npm -v
```

---

## Passo a Passo

### 1. Extrair o ZIP

Descompacte o arquivo `agnep-site-completo.zip` em qualquer pasta do seu computador.

### 2. Abrir no VS Code

Abra o VS Code, vá em **Arquivo > Abrir Pasta** e selecione a pasta `agnep-site`.

### 3. Abrir o Terminal

No VS Code, pressione **Ctrl + `** (ou vá em Terminal > Novo Terminal).

### 4. Instalar as Dependências

Cole o comando abaixo no terminal e pressione Enter:

```
npm install
```

Aguarde até aparecer "added XXX packages" (pode levar 1-3 minutos).

### 5. Configurar o .env

Crie um arquivo chamado `.env` na raiz da pasta `agnep-site` com o conteúdo abaixo, substituindo pelos dados do seu projeto Supabase:

```
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_PUBLISHABLE_KEY="sua-chave-anon-aqui"
SUPABASE_SERVICE_ROLE_KEY="sua-service-role-key-aqui"
SUPABASE_PROJECT_ID="seu-project-id"
VITE_SUPABASE_URL="https://seu-projeto.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="sua-chave-anon-aqui"
VITE_SUPABASE_PROJECT_ID="seu-project-id"
```

> **IMPORTANTE (v8 — notificações automáticas):** a linha `SUPABASE_SERVICE_ROLE_KEY` é obrigatória para o sistema de e-mails funcionar. Para obtê-la: no painel do Supabase → ícone de engrenagem (**Settings / Configurações**) → **API** → copie a chave **service_role** (a segunda da lista). **Nunca compartilhe essa chave** — ela ignora as travas de segurança do banco e só deve existir no arquivo `.env` do seu computador.

Opcionalmente, para que os avisos por e-mail cheguem de verdade na caixa de entrada dos inscritos, adicione também `GMAIL_APP_PASSWORD` (passo a passo em `GUIA-EMAIL-NOVIDADES.md`).

Para encontrar seus dados do Supabase:
1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings > API**
4. Copie a **Project URL** e a **anon/public key**

### 6. Rodar o Projeto

No terminal, digite:

```
npm run dev
```

Aguarde alguns segundos. Quando aparecer algo como:

```
  ➜  Local:   http://localhost:5173/
```

Abra o navegador e acesse **http://localhost:5173**

---

## Comandos Úteis

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento (modo teste, com recarregamento automático) |
| `npm run build` | Compila o projeto para produção (site otimizado) |
| `npm run build:dev` | Compila para desenvolvimento |
| `npm run preview` | Testa a versão compilada localmente |
| `npm run lint` | Verifica erros de código |
| `npm run format` | Formata todo o código automaticamente |

---

## Parar o Servidor

Para parar o servidor de desenvolvimento, pressione **Ctrl + C** no terminal.

---

## Possíveis Problemas

**"EISDIR: illegal operation on a directory"**
→ Apague a pasta `node_modules` e rode `npm install` novamente.

**"Error: Cannot find module '@lovable.dev/vite-tanstack-config'"**
→ Verifique se o `npm install` foi concluído sem erros.

**"Port 3000 is already in use"**
→ O projeto vai tentar outra porta automaticamente (3001, 3002, etc.).

**Página em branco**
→ Verifique se as variáveis do `.env` estão corretas e se o projeto Supabase está ativo.

---

## Configuração do Acesso Administrativo

Para acessar a área administrativa (`/admin`), o usuário deve estar logado e possuir a role `admin` no banco de dados.

### 1. Criar Conta
Acesse o site, clique em **Entrar** e crie uma conta com o e-mail: `pedroigorgoncalvesmelo@gmail.com`.

### 2. Conceder Permissão
No SQL Editor do Supabase, execute o comando abaixo para tornar este usuário um administrador:

```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users 
WHERE email = 'pedroigorgoncalvesmelo@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

---

## Estado Atual do Projeto

- **Independência**: O projeto é 100% independente do Lovable.
- **Autenticação**: Gerenciada via Supabase Auth nativo.
- **Instagram**: Link oficial adicionado ao rodapé: [https://www.instagram.com/agnep_/](https://www.instagram.com/agnep_/)


---

## Acesso do Administrador

O acesso administrativo usa o e-mail **pedroigorgoncalvesmelo@gmail.com** com a senha **Pedro123** (conforme solicitado; recomenda-se fortalecer a senha depois, no painel do Supabase).

1. Com o site rodando, clique em **Entrar** e crie a conta (ou faça login) com o e-mail acima e a senha `Pedro123`.
2. Um gatilho no banco concede automaticamente a role de administrador a esse e-mail. Se não funcionar, execute o script `CONFIGURACAO-ADMIN.sql` no SQL Editor do Supabase.
3. Acesse **http://localhost:5173/admin** para abrir o painel completo de gestão.

> Instruções detalhadas, inclusive como definir a senha pelo painel do Supabase, estão em `DEFINIR-SENHA-ADMIN.md`.
