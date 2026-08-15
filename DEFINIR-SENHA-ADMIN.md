# Como Definir a Senha do Administrador (Pedro123)

A senha de um usuário é guardada com segurança pelo Supabase Auth, e **não pode ser definida pelo código do site** — ela precisa ser configurada uma única vez diretamente no painel do Supabase. Siga os passos abaixo:

## Passo a Passo

1. Acesse [https://supabase.com/dashboard](https://supabase.com/dashboard) e entre na sua conta.
2. Selecione o projeto do AGNEP.
3. Se você **ainda não criou a conta no site**:
   - Abra o site em `http://localhost:5173`.
   - Clique em **Entrar** e crie a conta com o e-mail `pedroigorgoncalvesmelo@gmail.com` e a senha `Pedro123`. Pronto! A senha já está definida.
4. Se você **já criou a conta** e quer mudar a senha para `Pedro123`:
   - No painel do Supabase, vá em **Authentication > Users**.
   - Encontre o usuário `pedroigorgoncalvesmelo@gmail.com` e clique em **Editar** (lápis).
   - No campo **Password**, digite `Pedro123` e salve.

## E se o usuário não existir no Supabase?

Se o e-mail ainda não existe, a forma mais simples é criar a conta pelo próprio site (passo 3 acima). Alternativamente, no **SQL Editor** do Supabase, execute:

```sql
-- Cria o usuário com a senha Pedro123
INSERT INTO auth.users (
  instance_id, id, aud, role, email,
  encrypted_password, email_confirmed_at, recovery_sent_at,
  last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'pedroigorgoncalvesmelo@gmail.com',
  crypt('Pedro123', gen_salt('bf')),
  NOW(), NOW(), NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  NOW(), NOW(),
  '', '', '', ''
);
```

Depois, conceda a role de administrador (para liberar o painel `/admin`):

```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users
WHERE email = 'pedroigorgoncalvesmelo@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

## Observações de Segurança

- A senha `Pedro123` é o que você pediu, mas **recomendamos fortemente** usar uma senha mais forte (com números, símbolos e letras maiúsculas/minúsculas) para proteger o painel administrativo.
- Nunca compartilhe este arquivo com a senha fora do seu computador.
- O site não guarda a senha em nenhum arquivo — ela fica apenas no Supabase Auth, que a armazena criptografada.
