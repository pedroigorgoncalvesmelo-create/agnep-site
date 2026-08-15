-- ============================================================
-- AGNEP — Adicionar Agnepgoias@gmail.com como Administrador
-- ============================================================
-- Este script deve ser executado no SQL Editor do Supabase
-- (supabase.com > seu projeto > SQL Editor > New query)
-- ANTES de rodar: crie a conta Agnepgoias@gmail.com no site
-- (página /auth), depois rode este script para torná-la admin.

-- 1. Concede a role 'admin' ao e-mail da AGNEP
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users 
WHERE email = 'Agnepgoias@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- 2. Verificação (opcional) — confirme que os dois e-mails são admins:
-- SELECT u.email, r.role 
-- FROM auth.users u
-- JOIN public.user_roles r ON u.id = r.user_id
-- WHERE u.email IN ('pedroigorgoncalvesmelo@gmail.com', 'Agnepgoias@gmail.com');
