-- ============================================================
-- AGNEP — Configuração do Usuário Administrador
-- ============================================================
-- Este script deve ser executado no SQL Editor do Supabase
-- para conceder permissão de administrador ao usuário principal.

-- 1. Garante que o tipo de role existe (já deve existir via migrations)
-- DO $$ BEGIN
--     CREATE TYPE public.app_role AS ENUM ('admin');
-- EXCEPTION
--     WHEN duplicate_object THEN null;
-- END $$;

-- 2. Concede a role 'admin' ao e-mail especificado
-- Substitua o e-mail abaixo se necessário, mas o padrão solicitado é:
-- pedroigorgoncalvesmelo@gmail.com

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users 
WHERE email = 'pedroigorgoncalvesmelo@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- 3. Verificação (opcional)
-- Execute este SELECT para confirmar se o usuário recebeu a role:
-- SELECT u.email, r.role 
-- FROM auth.users u
-- JOIN public.user_roles r ON u.id = r.user_id
-- WHERE u.email = 'pedroigorgoncalvesmelo@gmail.com';
