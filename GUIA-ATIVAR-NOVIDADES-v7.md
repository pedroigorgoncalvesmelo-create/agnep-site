# Guia — Ativar a Área "Fique por Dentro das Novidades" (v7)

Este guia explica, passo a passo, tudo o que você precisa fazer para ativar a nova área de Novidades no site da AGNEP após substituir o ZIP v7. Ele tem três partes: **(A)** criar as tabelas no Supabase, **(B)** ativar o envio de e-mails e **(C)** testar.

## Parte A — Criar as tabelas no Supabase (obrigatório)

A nova área usa duas tabelas novas no banco de dados. Como o banco fica no Supabase (fora do código), você precisa executar um script lá uma única vez.

1. Abra [supabase.com](https://supabase.com) e entre no projeto **Agnep**.
2. No menu lateral, clique em **SQL Editor**.
3. Clique em **New query**.
4. Abra o arquivo `supabase/migrations/20260815000000_novidades.sql` (está dentro do ZIP v7) e copie **todo o conteúdo**.
5. Cole no SQL Editor e clique em **Run**.
6. Espera de resultado: `SUCCESS`. Isso cria duas tabelas:
   - `novidades` — guarda as publicações (título + texto)
   - `inscricoes` — guarda os e-mails das pessoas que quiserem receber avisos
7. As travas de segurança (RLS) já vêm junto no mesmo script: qualquer visitante só consegue **ler** novidades publicadas e **criar** uma inscrição; só administradores conseguem criar/editar/apagar publicações e ver a lista de inscritos.

**Se aparecer o erro "relation already exists"**: as tabelas já foram criadas (é seguro ignorar). Se aparecer qualquer outro erro, me envie uma captura de tela.

## Parte B — Ativar o envio de e-mails (opcional, mas recomendado)

O envio dos avisos usa o Gmail da AGNEP (`Agnepgoias@gmail.com`). O Gmail **não permite** usar a senha normal de login em aplicativos — é preciso criar uma **senha de aplicativo** (16 caracteres). O passo a passo completo está no arquivo `GUIA-EMAIL-NOVIDADES.md` (dentro do ZIP v7). Resumo:

1. Acesse `Agnepgoias@gmail.com` e vá em **Gerenciar sua Conta do Google → Segurança**.
2. Ative a **verificação em duas etapas** (se ainda não estiver ativa).
3. Vá em [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) e crie uma senha de aplicativo (nome: "AGNEP site").
4. O Google vai mostrar uma senha de 16 letras — copie.
5. No Visual Studio Code, abra o arquivo `.env` na raiz do projeto e adicione uma linha no final:
   ```
   GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
   ```
   (substitua pelos 16 caracteres da senha de aplicativo).
6. Reinicie o servidor local: no terminal, `Ctrl + C` e depois `npm run dev`.

**Sem essa senha**, as publicações continuam funcionando no site normalmente — só o aviso por e-mail que não é enviado. O painel mostra um aviso claro nesse caso.

## Parte C — Testar

1. Com o site rodando (`npm run dev`), acesse `http://localhost:5173/novidades` em uma aba anônima.
2. Digite um e-mail e clique em **Quero Receber**. Se der "✓ Inscrito com sucesso!", a Parte A está OK.
3. Entre no painel como administrador (`/auth` → seu e-mail admin) e abra o menu **Novidades (Avisos)**.
4. Crie uma publicação de teste e clique em **Publicar**. Se tiver a senha de e-mail configurada, os inscritos recebem o aviso; senão, o painel avisa.
5. A publicação agora aparece para todos na página `/novidades`.

## Perguntas frequentes

| Pergunta | Resposta |
|---|---|
| Os visitantes podem ver a lista de e-mails dos inscritos? | Não. O banco bloqueia — só administradores veem a lista (RLS). |
| Uma pessoa pode se inscrever duas vezes? | Não. O e-mail é único no banco; a segunda tentativa avisa que já está inscrito. |
| O envio de e-mail é seguro? | Sim. A senha do Gmail fica só no `.env` do servidor e nunca é enviada ao navegador. |
| Posso desativar um inscrito? | Sim, no painel admin, na lista de inscritos, clique em remover (marca como inativo, sem enviar mais avisos). |
| A publicação de teste vai para o site? | Só quando você clicar em **Publicar**. Rascunhos não aparecem para ninguém. |

## Lembretes adicionais da v7

- **Admin novo**: o arquivo `ADICIONAR-ADMIN-AGNEP-GMAIL.sql` (dentro do ZIP) dá acesso de administrador ao e-mail `Agnepgoias@gmail.com`. Cole no SQL Editor e clique em Run (faça uma vez só).
- Depois, crie o usuário `Agnepgoias@gmail.com` em **Authentication → Users → Add user** (com senha), ou peça o envio do e-mail de recuperação de senha pelo painel do Supabase.
