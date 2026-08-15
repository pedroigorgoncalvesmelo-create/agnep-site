-- ============================================================
-- AGNEP — Área "Fique por Dentro das Novidades"
-- ============================================================
-- Tabelas: novidades (publicações) e inscricoes (assinantes de e-mail)
-- Executar no SQL Editor do Supabase (ou aplicar via CLI).

-- 1. Tabela de publicações (novidades)
CREATE TABLE IF NOT EXISTS public.novidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  texto TEXT NOT NULL,
  publicado BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Tabela de assinantes (e-mails inscritos nas novidades)
CREATE TABLE IF NOT EXISTS public.inscricoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Políticas de segurança (RLS)
ALTER TABLE public.novidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;

-- Novidades: qualquer pessoa pode LER as publicadas; só admins gravam/editam.
CREATE POLICY "novidades_leitura_publica" ON public.novidades
  FOR SELECT USING (publicado = true);
CREATE POLICY "novidades_admin_escrita" ON public.novidades
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin'));

-- Inscrições: qualquer pessoa pode se INSCREVER (INSERT); leitura/edição só admins.
CREATE POLICY "inscricoes_inscricao_publica" ON public.inscricoes
  FOR INSERT WITH CHECK (true);
CREATE POLICY "inscricoes_admin" ON public.inscricoes
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin'));
