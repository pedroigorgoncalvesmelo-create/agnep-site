# Como corrigir o erro "Não foi possível concluir a inscrição" — Passo a Passo

**Situação:** quando alguém digita o e-mail na página "Fique por Dentro" e clica em "Quero Receber", aparece a mensagem de erro vermelha.

**Motivo:** a inscrição de e-mail usa uma tabela chamada `inscricoes` no Supabase. Essa tabela (e as suas "regras de segurança") foi criada em uma versão anterior do projeto, e o Supabase do seu projeto ainda não recebeu esse script. Sem a tabela ou sem as regras certas, o banco de dados rejeita a inscrição.

A solução é colar **um único script** no Supabase. Ele cria tudo que falta (sem apagar nada do que já existe) e leva menos de 2 minutos.

---

## Passo a passo com imagens (faça exatamente nesta ordem)

### Passo 1 — Abrir o Supabase
1. Acesse [https://supabase.com](https://supabase.com) e entre com seu GitHub.
2. Clique no projeto da AGNEP (o que tem o endereço `https://hngrbuucehrzvpiwqrmp.supabase.co`).

### Passo 2 — Abrir o editor de SQL
1. No menu da esquerda, clique em **SQL Editor** (ícone de banco de dados com código).
2. Clique no botão verde **+ New query** (canto superior direito).

### Passo 3 — Copiar e colar o script abaixo

Apague tudo que estiver na caixa de texto e cole exatamente isto (é a versão simplificada que não costuma dar erro):

> O botão amarelo ao lado do "Save" é só um aviso de que você digitou algo e ainda não salvou manualmente — pode ignorar. O Supabase não salva o texto da consulta automaticamente, apenas quando você clica em **Save** (Ctrl+S). Isso não afeta o resultado do **Run**.

```sql
-- === PARTE 1: cria as tabelas (só se ainda não existirem) ===
CREATE TABLE IF NOT EXISTS public.novidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  texto TEXT NOT NULL,
  publicado BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.inscricoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.inscricao_checkpoints (
  id INTEGER PRIMARY KEY,
  ultimo_aviso TIMESTAMPTZ
);

-- === PARTE 2: liga a segurança ===
ALTER TABLE public.novidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricao_checkpoints ENABLE ROW LEVEL SECURITY;

-- === PARTE 3: libera a inscrição pública (a que resolve o erro) ===
CREATE POLICY inscricoes_inscricao_publica ON public.inscricoes
  FOR INSERT WITH CHECK (true);

CREATE POLICY inscricoes_admin ON public.inscricoes
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin'));

-- === PARTE 4: regras das publicações ===
CREATE POLICY novidades_leitura_publica ON public.novidades
  FOR SELECT USING (publicado = true);

CREATE POLICY novidades_admin_escrita ON public.novidades
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin'));
```

### Passo 4 — Executar
Clique no botão **Run** (canto inferior direito da caixa de SQL).

### Passo 5 — Conferir o resultado
- Se aparecer **"Success. No rows returned"** na cor verde no rodapé da tela, deu tudo certo.
- Se aparecer o erro **"Policy already exists"**, é normal: significa que as regras já existiam. Nesse caso, não faz mal nenhum — pode seguir para o Passo 6 e testar o site.
- Se aparecer **"Backend error!"**, é um engasgo temporário do Supabase: aguarde 1 minuto e clique em **Run** de novo. Se insistir, copie o script em partes (Parte 1 primeiro, Run; depois Parte 2, Run; e assim por diante).
- Qualquer outro erro, me mande a print que eu te ajudo a resolver.

### Passo 6 — Testar
1. No site, abra `http://localhost:5173/novidades`.
2. Digite qualquer e-mail e clique em **"Receber"**.
3. Deve aparecer a mensagem verde de sucesso: "Inscrição realizada com sucesso!"

---

## O que esse script faz, em palavras simples

| Parte do script | O que faz |
|---|---|
| `CREATE TABLE ... novidades` | Cria a gaveta onde ficam as publicações que o admin cria |
| `CREATE TABLE ... inscricoes` | Cria a gaveta onde ficam os e-mails de quem quer receber avisos |
| `CREATE TABLE ... inscricao_checkpoints` | Cria a marcação de controle para o sistema nunca enviar o mesmo aviso duas vezes |
| `ENABLE ROW LEVEL SECURITY` | Liga a tranca das gavetas (ninguém de fora acessa o que não deve) |
| `POLICY ... FOR INSERT WITH CHECK (true)` | **Esta é a que resolve seu erro:** autoriza qualquer visitante a se inscrever com o e-mail dele |
| `POLICY ... admin` | Só você (admin logado) pode ver a lista de inscritos, publicar novidades e remover e-mails |

Se a tabela já existia, o script **não duplica nada** — ele só adiciona o que faltava.

## PLANO B — Se o erro "Backend error" continuar insistindo

Esse erro é um **bug conhecido do próprio Supabase** no SQL Editor (afeta vários usuários do mundo todo — ver [issue #38358](https://github.com/supabase/supabase/issues/38358)). Ele não tem relação com o script nem com seu projeto. Quando ele insiste, o caminho mais confiável é criar a tabela **pela interface gráfica** (sem código nenhum):

1. No menu da esquerda do Supabase, clique em **Table Editor** (ícone de tabela).
2. Clique em **New table** (canto superior direito).
3. Crie a tabela com o nome `inscricoes` e estas colunas:

| Nome da coluna | Tipo | Padrão / Observações |
|---|---|---|
| id | uuid | Deixe marcado "Is Identity"? **Não** — marque **Is Primary** |
| email | text | **Is Nullable**: desmarcado; e marque **Is Unique** |
| ativo | bool | Default: `true` |
| created_at | timestamptz | Default: `now()` |

4. Clique em **Save** no canto inferior direito. A tabela fica criada em segundos.
5. Depois, autorize a inscrição pública: vá em **Authentication → Policies**, encontre a tabela **inscricoes** e clique em **New policy** (escolha o template "Create only access" → "For authenticated users" → NÃO, escolha o template que permite INSERT para todos, ou cole este comando curto no SQL Editor com poucas linhas: `CREATE POLICY inscricoes_publica ON public.inscricoes FOR INSERT WITH CHECK (true);`).

Se mesmo o comando curto der "Backend error", aguarde algumas horas (o bug costuma se resolver sozinho) e tente de novo — a tabela você já terá criado pelo passo 1–4, que não depende do SQL Editor.

## E depois?
Depois de aplicar o script, o botão "Quero Receber" funciona na Home e na página "Fique por Dentro". Os e-mails ficam salvos na tabela `inscricoes` e você os vê no painel admin em **Fique por Dentro (Avisos)**. Quando o site estiver no ar em produção com o `SUPABASE_SERVICE_ROLE_KEY` e o `GMAIL_APP_PASSWORD` no `.env`, cada publicação nova também manda o e-mail de aviso automaticamente (detalhes no `GUIA-EMAIL-NOVIDADES.md`).
