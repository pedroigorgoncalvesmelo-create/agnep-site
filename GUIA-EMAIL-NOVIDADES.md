# GUIA — Configurar o envio de e-mails das Novidades (AGNEP)

Este guia explica como ativar o envio automático de avisos por e-mail quando o administrador publica uma novidade no site.

## Como funciona (resumo simples)

1. Um visitante se inscreve na página **/novidades** digitando o e-mail dele. O e-mail fica salvo na tabela `inscricoes` do Supabase.
2. Quando o administrador cria uma publicação em **/admin/novidades** e clica em "Publicar", o site mostra a novidade na página pública e tenta enviar um e-mail para todos os inscritos.
3. O envio de e-mail usa o **Gmail da AGNEP** (`Agnepgoias@gmail.com`) com uma **senha de aplicativo** (não é a senha normal de login).

## Passo 1 — Criar a senha de aplicativo no Gmail

O Gmail **bloqueia** o envio de e-mails por aplicativos usando a senha normal da conta. É preciso criar uma "senha de aplicativo":

1. Acesse `Agnepgoias@gmail.com` e entre na conta.
2. Verifique se a **verificação em duas etapas** está ativada: [myaccount.google.com/security](https://myaccount.google.com/security) → seção "Como você faz login no Google" → ative a verificação em duas etapas (é necessário um celular).
3. Com a verificação ativada, acesse: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Em "Nome do aplicativo", digite `AGNEP site` e clique em **Criar**.
5. O Google mostrará uma senha de 16 caracteres (algo como `abcd efgh ijkl mnop`). **Copie essa senha** — ela só aparece uma vez.

## Passo 2 — Adicionar a senha ao arquivo .env

Abra o arquivo `.env` na raiz do projeto e adicione a linha abaixo (substituindo pela senha gerada, **sem espaços**):

```
GMAIL_APP_PASSWORD=suasenhaappde16caracteres
```

Exemplo de como o `.env` deve ficar:

```
SUPABASE_URL="https://hngrbuucehrzvpiwqrmp.supabase.co"
SUPABASE_PUBLISHABLE_KEY="..."
VITE_SUPABASE_URL="https://hngrbuucehrzvpiwqrmp.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="..."
GMAIL_APP_PASSWORD=abcdef1234567890
```

> Atenção: a senha de aplicativo **não** leva aspas e **não** tem espaços.

## Passo 3 — Reiniciar o projeto

Se o projeto estiver rodando (`npm run dev`), pressione `Ctrl+C` no terminal e rode novamente:

```
npm run dev
```

## Passo 4 — Testar

1. Acesse a página pública `/novidades` e inscreva um e-mail de teste (pode ser o seu próprio).
2. Entre em `/admin/novidades`, crie uma publicação de teste e clique em **Publicar**.
3. Você deve receber um e-mail com o aviso.

## Dúvidas comuns

| Problema | Solução |
|---|---|
| "Publicação criada no site ✓ — porém não foi possível enviar o e-mail" | A senha `GMAIL_APP_PASSWORD` está ausente ou errada no `.env`. Confira o Passo 2. |
| O Gmail não mostra a opção de senha de aplicativo | Ative primeiro a verificação em duas etapas (Passo 1, item 2). |
| O e-mail caiu no spam | É normal nos primeiros envios; peça aos destinatários para marcar como "não é spam". |
| A publicação aparece no site mas ninguém recebeu e-mail | Não há inscritos. Divulgue a página `/novidades` para captar e-mails. |

## Segurança

- A senha de aplicativo fica **apenas no seu computador/servidor**, dentro do `.env` (arquivo que nunca é enviado ao GitHub).
- O envio roda **só no servidor** — o navegador dos visitantes nunca vê a senha.
- Só administradores autenticados conseguem disparar os avisos.
