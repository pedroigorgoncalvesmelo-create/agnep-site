-- ============================================================
-- AGNEP — Criar o bucket "galeria" do Supabase Storage
-- ============================================================
-- Este script cria o bucket onde as fotos enviadas pelo computador
-- são armazenadas e define as regras de acesso:
-- - Qualquer pessoa logada (admin) pode enviar e remover fotos
-- - Visitantes do site podem VER as fotos (público-leitura)
-- Execute no SQL Editor do Supabase. Se aparecer "already exists",
-- é porque o bucket já existe — pode prosseguir para as políticas.

-- 1. Cria o bucket "galeria" (público para leitura)
INSERT INTO storage.buckets (id, name, public)
VALUES ('galeria', 'galeria', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Permite que qualquer usuário logado (admin) faça upload
DROP POLICY IF EXISTS "Users authenticated can upload" ON storage.objects;
CREATE POLICY "Users authenticated can upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'galeria');

-- 3. Permite que qualquer usuário logado remova fotos
DROP POLICY IF EXISTS "Users authenticated can delete" ON storage.objects;
CREATE POLICY "Users authenticated can delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'galeria');

-- 4. Permite que visitantes do site vejam as fotos (leitura pública)
DROP POLICY IF EXISTS "Public can view gallery" ON storage.objects;
CREATE POLICY "Public can view gallery"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'galeria');
